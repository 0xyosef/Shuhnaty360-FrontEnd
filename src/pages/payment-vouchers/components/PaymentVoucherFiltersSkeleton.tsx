import { Skeleton } from "@/components/ui/skeleton";

export function PaymentVoucherFiltersSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-4 w-16 mb-1 ml-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-12 mb-1 ml-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-12 mb-1 ml-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-12 mb-1 ml-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-16 mb-1 ml-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-24 mb-1 ml-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-4 w-20 mb-1 ml-auto" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-16 mb-1 ml-auto" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  );
}
