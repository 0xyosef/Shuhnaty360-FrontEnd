import ErrorContainer from "@/components/ErrorContainer";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "../../../utils/utils";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableHead, { TableColumn } from "./TableHead";
import TableLoader from "./TableLoader";
import TableNoDataRow from "./TableNoDataRow";
import TableRow from "./TableRow";

type TableProps = {
  children: React.ReactNode;
  columns: TableColumn[];
  dataCount?: number;
  isLoading: boolean;
  error?: any;
  onRetry?: () => void;
  defaultMessage?: string;
  className?: string;
};

const Table = ({
  columns,
  children,
  dataCount,
  isLoading,
  error,
  onRetry,
  defaultMessage,
  className,
}: TableProps) => {
  const [showLoadingToast, setShowLoadingToast] = useState(false);
  const toastId = "loading-toast";
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) {
      if (!timeoutIdRef.current && isLoading) {
        timeoutIdRef.current = setTimeout(() => {
          setShowLoadingToast(true);
          toast.loading(
            "يبدو أن هناك مشكلة في الاتصال بالإنترنت. جاري إعادة المحاولة.",
            {
              id: toastId,
              duration: Infinity,
            },
          );
        }, 5000);
      }
    } else {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (showLoadingToast) {
        toast.dismiss(toastId);
        setShowLoadingToast(false);
      }
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (showLoadingToast) {
        toast.dismiss(toastId);
        setShowLoadingToast(false);
      }
    };
  }, [error, isLoading, showLoadingToast]);

  return (
    <div className={`w-full overflow-x-auto min-h-[40vh]`}>
      <table className={cn(`bg-white w-full`, className)}>
        <TableHead columns={columns} />
        <TableBody>
          {children}

          {isLoading ? (
            <TableLoader span={columns.length} />
          ) : error ? (
            <TableRow index={1}>
              <TableCell colSpan={columns.length}>
                <ErrorContainer
                  error={error}
                  onRetry={onRetry}
                  defaultMessage={defaultMessage}
                />
              </TableCell>
            </TableRow>
          ) : !dataCount ? (
            <TableNoDataRow span={columns.length} />
          ) : null}
          {/* {isLoading && !error && <TableLoader span={columns.length} />}
          {!isLoading && !dataCount && !error && (
            <TableNoDataRow span={columns.length} />
          )}
          {error && (
            <TableRow index={1}>
              <TableCell colSpan={columns.length}>
                <ErrorContainer
                  error={error}
                  onRetry={onRetry}
                  defaultMessage={defaultMessage}
                />
              </TableCell>
            </TableRow>
          )} */}
        </TableBody>
      </table>
    </div>
  );
};

export default Table;
