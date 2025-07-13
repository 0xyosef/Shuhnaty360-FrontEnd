import inShippingIcon from "../../../../assets/images/in-shipping-truck.svg";

const InShippingShipment = () => {
  return (
    <>
      <div className="flex items-center font-Rubik">
        <img src={inShippingIcon} alt="driver on the way" className="ml-4" />
        <div className="flex flex-col justify-between gap-4 w-full">
          <h2 className="text-lg">قيد الشحن</h2>
          <div className="flex justify-between items-center w-full">
            <h4 className="text-[#666666] text-xs">بواسطة صالح حسين</h4>
            <span className="text-[#666666] text-xs">15 يناير 2025 م</span>
          </div>
        </div>
      </div>
      <h1 className="text-[#DD7E1F] font-medium text-xl font-Rubik text-center mt-8">
        تم إضافة الشحنة والسائق في طريقه لتحميلها
      </h1>
    </>
  );
};

export default InShippingShipment;
