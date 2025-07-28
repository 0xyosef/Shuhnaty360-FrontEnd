/**
 * مكون للطباعة المتقدمة - يحل مشاكل الطباعة على الموبايل وChrome
 */

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface PrintWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

/**
 * مكون يلف المحتوى القابل للطباعة مع الحلول المتقدمة
 */
export const PrintWrapper = ({
  children,
  id,
  className = "",
}: PrintWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // إضافة معرف فريد للعنصر
    const element = wrapperRef.current;
    if (element) {
      element.id = id;
    }

    // إضافة CSS محسن للطباعة عند تحميل المكون
    const printStyle = document.createElement("style");
    printStyle.id = `print-style-${id}`;
    printStyle.textContent = `
      @media print {
        /* إخفاء كل شيء ما عدا المحتوى القابل للطباعة */
        body * {
          visibility: hidden !important;
        }
        
        #${id}, #${id} * {
          visibility: visible !important;
        }
        
        #${id} {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: auto !important;
          background: white !important;
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
          border: none !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* تحسينات للموبايل */
        @media screen and (max-width: 768px) {
          #${id} {
            font-size: 12px !important;
          }
          
          #${id} .text-xs {
            font-size: 10px !important;
          }
          
          #${id} .text-sm {
            font-size: 11px !important;
          }
          
          #${id} .text-lg {
            font-size: 14px !important;
          }
        }
        
        /* إصلاح Chrome */
        .MuiDialog-root,
        .MuiDialog-container,
        .MuiDialog-paper,
        .MuiDialogContent-root,
        .MuiDialogActions-root {
          background: transparent !important;
          box-shadow: none !important;
        }
        
        /* إخفاء أزرار الحوار */
        .MuiDialogActions-root {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(printStyle);

    return () => {
      // تنظيف النمط عند إزالة المكون
      const styleElement = document.getElementById(`print-style-${id}`);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [id]);

  return (
    <div
      ref={wrapperRef}
      className={`print-content ${className}`}
      style={{
        width: "100%",
        background: "white",
        color: "black",
        fontFamily: "Almarai, Rubik, Arial, sans-serif",
      }}
    >
      {children}
    </div>
  );
};

export default PrintWrapper;
