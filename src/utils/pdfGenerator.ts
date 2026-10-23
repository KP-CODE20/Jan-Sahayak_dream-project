import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BlankFormTemplate, DemoUserProfile } from '../types';

export interface DownloadPdfOptions {
  elementId?: string;
  element?: HTMLElement | null;
  fileName?: string;
  activeBlankForm?: BlankFormTemplate;
  userProfile?: DemoUserProfile;
}

export function getFormPdfFileName(
  activeBlankForm?: BlankFormTemplate, 
  userProfile?: DemoUserProfile
): string {
  const applicantName = userProfile?.name 
    ? userProfile.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
    : 'KanakPandey';

  if (activeBlankForm?.code?.includes('SB-1') || activeBlankForm?.id === 'blank-sbi-sb1') {
    return `SBI_Savings_Form_SB-1_${applicantName}.pdf`;
  }

  const issuer = activeBlankForm?.issuer 
    ? activeBlankForm.issuer.replace(/\(.*?\)/g, '').trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
    : 'Bank';
  const code = activeBlankForm?.code 
    ? activeBlankForm.code.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')
    : 'Form';

  return `${issuer}_${code}_${applicantName}.pdf`;
}

export async function generateAndDownloadFormPdf(options: DownloadPdfOptions = {}): Promise<boolean> {
  const elementId = options.elementId || 'printable-form-canvas';
  const target = options.element || document.getElementById(elementId);

  if (!target) {
    console.warn(`[PDF Generator] Target element "#${elementId}" not found in DOM.`);
    return false;
  }

  const originalTransform = target.style.transform;
  
  try {
    // Temporarily reset transform on target during capture
    target.style.transform = 'none';

    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedEl = (options.elementId ? clonedDoc.getElementById(options.elementId) : null) || 
                         clonedDoc.getElementById('printable-form-canvas');
        if (clonedEl) {
          clonedEl.style.transform = 'none';
          clonedEl.style.opacity = '1';
          clonedEl.style.visibility = 'visible';
          clonedEl.style.display = 'block';
          clonedEl.style.boxShadow = 'none';
          clonedEl.style.width = '820px';
          clonedEl.style.maxWidth = '820px';
          clonedEl.style.margin = '0 auto';

          // Ensure any hidden parent container is visible in clone
          let parent = clonedEl.parentElement;
          while (parent && parent !== clonedDoc.body) {
            parent.style.opacity = '1';
            parent.style.visibility = 'visible';
            parent.style.display = 'block';
            parent = parent.parentElement;
          }
        }
      }
    });

    // Restore original transform
    target.style.transform = originalTransform;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const printWidth = pageWidth - (margin * 2);
    const printHeight = (canvas.height * printWidth) / canvas.width;

    if (printHeight <= pageHeight - (margin * 2)) {
      pdf.addImage(imgData, 'JPEG', margin, margin, printWidth, printHeight);
    } else {
      let heightLeft = printHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, printWidth, printHeight);
      heightLeft -= (pageHeight - margin);

      while (heightLeft > 0) {
        position = heightLeft - printHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, printWidth, printHeight);
        heightLeft -= pageHeight;
      }
    }

    const finalFileName = options.fileName || getFormPdfFileName(options.activeBlankForm, options.userProfile);
    pdf.save(finalFileName);
    return true;
  } catch (err) {
    console.error('[PDF Generator] Error generating PDF:', err);
    target.style.transform = originalTransform;
    return false;
  }
}
