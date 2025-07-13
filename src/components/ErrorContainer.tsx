import { classifyAxiosError } from "@/utils/api";
import { RefreshCcw } from "lucide-react";

type ErrorContainerProps = {
  error: any;
  title?: string;
  defaultMessage?: string;
  className?: string;
  onRetry?: () => void;
};

const ErrorContainer = ({
  error,
  title,
  defaultMessage,
  className,
  onRetry,
}: ErrorContainerProps) => {
  const err = classifyAxiosError(error);

  return (
    <div
      className={`p-4 flex flex-col gap-2 items-center justify-center ${className}`}
    >
      <h2 className="text-lg font-bold">{title || "حدث خطأ"}</h2>
      <p className="mt-2">
        {err?.message || defaultMessage || "حدث خطاء غير متوقع"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded bg-transparent px-4 py-2 text-[#DD7E1F] cursor-pointer"
        >
          <RefreshCcw className="h-4 w-4" />
          إعادة المحاولة
        </button>
      )}
    </div>
  );
};

export default ErrorContainer;
