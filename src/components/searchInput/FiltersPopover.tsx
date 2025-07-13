import filterIcon from "@/assets/images/filter.svg";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useImperativeHandle, useState } from "react";

interface FiltersPopoverProps {
  children: React.ReactNode;
  ref?: React.RefObject<{
    open: boolean;
    setOpen: (open: boolean) => void;
  } | null>;
  contentClassName?: string;
  activeFilterCount?: number;
}

export default function FiltersPopover({
  children,
  ref,
  contentClassName,
  activeFilterCount = 0,
}: FiltersPopoverProps) {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    open,
    setOpen,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-full m-0 p-0 relative"
        >
          <img src={filterIcon} />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-primary text-white text-[10px] leading-none">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-80 p-0", contentClassName)}
        align="start"
        sideOffset={20}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </Button>
            <h3 className="text-lg font-medium text-right">تصفية النتائج</h3>
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
