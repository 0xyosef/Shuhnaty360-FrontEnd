import { cn } from "@/lib/utils";

type FormSectionWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const FormSectionWrapper = ({
  title,
  children,
  className,
}: FormSectionWrapperProps) => {
  return (
    <>
      <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
      <div className={cn("w-full grid gap-10 my-10 md:grid-cols-2", className)}>
        {children}
      </div>
    </>
  );
};

export default FormSectionWrapper;
