const WaybillInfoRow = ({ image, label, value }: any) => (
  <div className="flex items-center justify-end px-0 py-1 font-Rubik max-w-screen">
    <div className="flex items-center gap-2 mr-1">
      <img src={image} alt="" />
      <span className="font-medium text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
    </div>
    <span>
      <span className="text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap">
        :{value}
      </span>
    </span>
  </div>
);

export default WaybillInfoRow;
