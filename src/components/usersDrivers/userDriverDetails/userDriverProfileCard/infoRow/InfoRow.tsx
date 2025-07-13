const InfoRow = ({ image, label, value }: any) => (
  <div className="flex items-center justify-between md:justify-start px-4 lg:px-0 py-2 font-Rubik max-w-screen">
    <div className="flex items-center gap-2 ">
      <img src={image} alt="" />
      <span className="font-medium text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
    </div>
    <div className="md:grow flex items-center gap-2">
      <div className="md:grow border-t-2 border-[#999999] border-dashed mx-2"></div>
      <span className="text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap">
        {value}
      </span>
    </div>
  </div>
);

export default InfoRow;
