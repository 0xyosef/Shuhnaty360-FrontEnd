import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="absolute top-0 left-0 size-full flex justify-center items-center z-50">
      <Loader2 className="animate-spin size-14 text-[#DD7E1F]" />
    </div>
  );
};

export default PageLoader;
