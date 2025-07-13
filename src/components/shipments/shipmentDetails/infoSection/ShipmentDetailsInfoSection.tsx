const ShipmentDetailsInfoSection = ({
  title,
  data,
}: {
  title?: any;
  data: any;
}) => (
  <div className="col-span-1">
    {title && (
      <h1 className="text-xl sm:text-2xl font-bold font-Almarai">{title}</h1>
    )}
    {data.map((item: any, index: any) => (
      <div
        key={index}
        className={`flex items-center gap-2 ${index === 0 ? "mt-6" : "mt-4"}`}
      >
        <span>{item.label}:</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
);

export default ShipmentDetailsInfoSection;
