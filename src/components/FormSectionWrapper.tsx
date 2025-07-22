import { cn } from "@/lib/utils";
import { JSX } from "react";

type FormSectionWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  sectionOptions?: () => JSX.Element;
};

const FormSectionWrapper = ({
  title,
  children,
  className,
  sectionOptions,
}: FormSectionWrapperProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
        {sectionOptions?.()}
      </div>
      <div className={cn("w-full grid gap-10 my-10 md:grid-cols-2", className)}>
        {children}
      </div>
    </>
  );
};

export default FormSectionWrapper;
