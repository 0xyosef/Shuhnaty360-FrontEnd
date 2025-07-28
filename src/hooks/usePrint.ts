/**
 * Hook محسن للطباعة مع حل مشاكل الموبايل و Chrome
 */

import { useCallback, useState } from "react";
import { print } from "@/utils/printHelper";

interface UsePrintOptions {
  elementId: string;
  title?: string;
  pageSize?: "A4" | "A5";
  orientation?: "portrait" | "landscape";
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  onError?: (error: Error) => void;
}

interface UsePrintReturn {
  handlePrint: () => Promise<void>;
  isPrinting: boolean;
  printError: Error | null;
}

export const usePrint = (options: UsePrintOptions): UsePrintReturn => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printError, setPrintError] = useState<Error | null>(null);

  const handlePrint = useCallback(async () => {
    try {
      setIsPrinting(true);
      setPrintError(null);

      await print(options);
    } catch (error) {
      console.error("Print failed:", error);
      const errorObj = error as Error;
      setPrintError(errorObj);

      if (options.onError) {
        options.onError(errorObj);
      } else {
        // Fallback: استخدام الطباعة العادية
        try {
          if (options.onBeforePrint) {
            options.onBeforePrint();
          }

          window.print();

          if (options.onAfterPrint) {
            options.onAfterPrint();
          }
        } catch (fallbackError) {
          console.error("Fallback print also failed:", fallbackError);
          alert(
            "عذراً، فشلت عملية الطباعة. يرجى المحاولة مرة أخرى أو استخدام متصفح آخر.",
          );
        }
      }
    } finally {
      setIsPrinting(false);
    }
  }, [options]);

  return {
    handlePrint,
    isPrinting,
    printError,
  };
};

export default usePrint;
