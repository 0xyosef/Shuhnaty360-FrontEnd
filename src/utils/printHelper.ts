/**
 * أداة مساعدة للطباعة مع حل مشاكل الموبايل و Chrome
 * يحل مشاكل:
 * 1. PDF فارغ على الموبايل
 * 2. طباعة غير كاملة في Chrome
 * 3. مشاكل الخطوط والتنسيق
 */

interface PrintOptions {
  elementId: string;
  title?: string;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  pageSize?: "A4" | "A5";
  orientation?: "portrait" | "landscape";
}

const ensureFontsLoaded = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => resolve());
    } else {
      // Fallback for browsers that don't support FontFaceSet API
      setTimeout(() => resolve(), 100);
    }
  });
};

const isMobile = (): boolean => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || window.innerWidth <= 768
  );
};

const isChrome = (): boolean => {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
};

const createPrintStyles = (options: PrintOptions): string => {
  const { pageSize = "A4", orientation = "portrait" } = options;

  return `
    <style id="print-styles">
      @media print {
        @page {
          size: ${pageSize} ${orientation};
          margin: 0.5cm !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          font-family: 'Almarai', 'Rubik', Arial, sans-serif !important;
          color: black !important;
          line-height: 1.4 !important;
        }
        
        body * {
          visibility: hidden !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }
        
        #${options.elementId},
        #${options.elementId} * {
          visibility: visible !important;
        }
        
        #${options.elementId} {
          position: static !important;
          left: auto !important;
          top: auto !important;
          width: 100% !important;
          height: auto !important;
          background: white !important;
          transform: none !important;
          box-sizing: border-box !important;
          overflow: visible !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* إصلاح مشاكل Chrome */
        .MuiDialog-root,
        .MuiDialog-container,
        .MuiDialog-paper,
        .MuiDialogContent-root,
        .MuiDialogActions-root {
          background: transparent !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* إصلاح مشاكل الخطوط */
        * {
          font-family: 'Almarai', 'Rubik', Arial, sans-serif !important;
        }
        
        /* إصلاح الألوان */
        .print-bg-gray {
          background-color: #f2f2f2 !important;
        }
        
        /* إصلاح الحدود */
        .border, [class*="border"] {
          border-color: #000 !important;
        }
        
        /* إخفاء عناصر لا نريد طباعتها */
        button:not(.print-keep),
        .no-print,
        .MuiDialogActions-root {
          display: none !important;
        }
      }
      
      /* إعدادات خاصة للموبايل */
      @media print and (max-width: 768px) {
        @page {
          size: A4 portrait;
          margin: 0.3cm !important;
        }
        
        #${options.elementId} {
          font-size: 12px !important;
          padding: 8px !important;
        }
        
        #${options.elementId} .text-xs {
          font-size: 10px !important;
        }
        
        #${options.elementId} .text-sm {
          font-size: 11px !important;
        }
        
        #${options.elementId} .text-base {
          font-size: 12px !important;
        }
        
        #${options.elementId} .text-lg {
          font-size: 14px !important;
        }
      }
    </style>
  `;
};

const createPrintDocument = (
  element: HTMLElement,
  options: PrintOptions,
): string => {
  // الحصول على كل الـ styles المطلوبة
  const styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  const printStyles = createPrintStyles(options);

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${options.title || "طباعة"}</title>
      
      <!-- خطوط Google -->
      <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      
      <style>
        ${styles}
        ${printStyles}
        
        body {
          font-family: 'Almarai', 'Rubik', Arial, sans-serif !important;
          direction: rtl;
          background: white;
          margin: 0;
          padding: 20px;
        }
        
        /* إخفاء scroll bars */
        ::-webkit-scrollbar {
          display: none;
        }
        
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      </style>
    </head>
    <body>
      ${element.outerHTML}
      
      <script>
        // انتظار تحميل الخطوط والصور
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };
        
        // إغلاق النافذة بعد الطباعة أو الإلغاء
        window.onafterprint = function() {
          window.close();
        };
        
        // للمتصفحات التي لا تدعم onafterprint
        setTimeout(function() {
          window.close();
        }, 60000);
      </script>
    </body>
    </html>
  `;
};

const printForMobile = async (
  element: HTMLElement,
  options: PrintOptions,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // إنشاء محتوى HTML كامل للطباعة
      const printContent = createPrintDocument(element, options);

      // إنشاء نافذة جديدة
      const printWindow = window.open("", "_blank", "width=800,height=600");
      if (!printWindow) {
        throw new Error(
          "Could not open print window. Please allow popups for this site.",
        );
      }

      printWindow.document.write(printContent);
      printWindow.document.close();

      // انتظار تحميل المحتوى
      printWindow.onload = () => {
        setTimeout(() => {
          try {
            printWindow.print();

            // مراقبة حالة الطباعة
            const checkClosed = setInterval(() => {
              if (printWindow.closed) {
                clearInterval(checkClosed);
                resolve();
              }
            }, 500);

            // إغلاق النافذة بعد 30 ثانية كحد أقصى
            setTimeout(() => {
              clearInterval(checkClosed);
              if (!printWindow.closed) {
                printWindow.close();
              }
              resolve();
            }, 30000);
          } catch (printError) {
            console.error("Mobile print error:", printError);
            printWindow.close();
            reject(printError);
          }
        }, 500);
      };

      printWindow.onerror = (error) => {
        console.error("Print window error:", error);
        printWindow.close();
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

const printForDesktop = async (isChromeFlag: boolean): Promise<void> => {
  return new Promise((resolve) => {
    // للـ Chrome: انتظار إضافي للتأكد من التحميل
    const printDelay = isChromeFlag ? 300 : 100;

    setTimeout(() => {
      try {
        window.print();
        resolve();
      } catch (error) {
        console.error("Desktop print error:", error);
        resolve();
      }
    }, printDelay);
  });
};

export const print = async (options: PrintOptions): Promise<void> => {
  const element = document.getElementById(options.elementId);
  if (!element) {
    throw new Error(`Element with id '${options.elementId}' not found`);
  }

  try {
    // تحديد إذا كنا على موبايل أو Chrome
    const isMobileFlag = isMobile();
    const isChromeFlag = isChrome();

    if (options.onBeforePrint) {
      options.onBeforePrint();
    }

    // إضافة فئة خاصة للجسم
    document.body.classList.add("is-printing");

    // التأكد من تحميل الخطوط
    await ensureFontsLoaded();

    // إضافة styles للطباعة
    const existingStyles = document.getElementById("print-styles");
    if (existingStyles) {
      existingStyles.remove();
    }

    const styleElement = document.createElement("style");
    styleElement.id = "print-styles";
    styleElement.innerHTML = createPrintStyles(options)
      .replace('<style id="print-styles">', "")
      .replace("</style>", "");
    document.head.appendChild(styleElement);

    // إعداد العنوان
    const originalTitle = document.title;
    if (options.title) {
      document.title = options.title;
    }

    // للموبايل: إنشاء نافذة جديدة للطباعة
    if (isMobileFlag) {
      await printForMobile(element, options);
    }
    // للمتصفحات العادية مع تحسينات Chrome
    else {
      await printForDesktop(isChromeFlag);
    }

    // استعادة العنوان الأصلي
    document.title = originalTitle;

    // إزالة الـ styles
    setTimeout(() => {
      const styles = document.getElementById("print-styles");
      if (styles) {
        styles.remove();
      }
      document.body.classList.remove("is-printing");

      if (options.onAfterPrint) {
        options.onAfterPrint();
      }
    }, 1000);
  } catch (error) {
    console.error("Print error:", error);
    document.body.classList.remove("is-printing");
    throw error;
  }
};

// دالة مساعدة للطباعة السريعة
export const quickPrint = async (
  elementId: string,
  title?: string,
): Promise<void> => {
  return print({
    elementId,
    title,
    pageSize: "A4",
    orientation: "portrait",
  });
};

// دالة مساعدة لطباعة الفواتير بحجم A5
export const printInvoice = async (
  elementId: string,
  title?: string,
): Promise<void> => {
  return print({
    elementId,
    title,
    pageSize: "A5",
    orientation: "landscape",
  });
};
