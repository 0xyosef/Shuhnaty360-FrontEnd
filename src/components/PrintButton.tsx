import { useState } from "react";
import { Printer } from "lucide-react";
import { print } from "@/utils/printHelper";

interface PrintButtonProps {
  elementId: string;
  title?: string;
  pageSize?: "A4" | "A5";
  orientation?: "portrait" | "landscape";
  className?: string;
  children?: React.ReactNode;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  onPrintError?: (error: Error) => void;
}

export const PrintButton = ({
  elementId,
  title,
  pageSize = "A4",
  orientation = "portrait",
  className = "",
  children,
  onBeforePrint,
  onAfterPrint,
  onPrintError,
}: PrintButtonProps) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    try {
      setIsPrinting(true);

      if (onBeforePrint) {
        onBeforePrint();
      }

      await print({
        elementId,
        title,
        pageSize,
        orientation,
        onBeforePrint,
        onAfterPrint,
      });
    } catch (error) {
      console.error("Print failed:", error);

      if (onPrintError) {
        onPrintError(error as Error);
      } else {
        // Fallback: استخدام الطباعة العادية
        try {
          window.print();
        } catch (fallbackError) {
          console.error("Fallback print also failed:", fallbackError);
          alert(
            "عذراً، فشلت عملية الطباعة. يرجى المحاولة مرة أخرى أو استخدام متصفح آخر.",
          );
        }
      }
    } finally {
      setIsPrinting(false);

      if (onAfterPrint) {
        onAfterPrint();
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={isPrinting}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Printer className={`size-5 ${isPrinting ? "animate-pulse" : ""}`} />
      {children || (isPrinting ? "جاري الطباعة..." : "طباعة")}
    </button>
  );
};

export default PrintButton;
