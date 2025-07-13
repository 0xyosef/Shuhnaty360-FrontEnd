// import avatar from '../../../../assets/images/avatar.jpg';
import ActionsMenu from "../../../actionsMenu/ActionsMenu";
import InfoRow from "./infoRow/InfoRow";
const UserDriverProfileCard = ({
  moreInfoData,
  personalInfoData,
  menuActions,
  page,
}: any) => {
  return (
    <>
      <div className="w-full flex justify-end">
        <div className="relative w-full flex justify-end me-5 lg:me-0">
          <ActionsMenu options={menuActions} position="top-7 -left-4" />{" "}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-8">
        {/* <div className='rounded-full border-2 border-[#2E853F]'>
          <img
            src={avatar}
            alt='avatar pic'
            className='w-20 h-20 rounded-full object-cover'
          />
        </div> */}
        <h1 className="mt-4 mb-2 text-[#1A1A1A] font-bold text-xl">
          {personalInfoData.name}
        </h1>
        {page === "user" ? (
          <h6
            className={`text-sm ${
              personalInfoData.status === "نشط"
                ? "text-[#2E853F]"
                : "text-[#666666]"
            } font-bold`}
          >
            {personalInfoData.status}
          </h6>
        ) : (
          <h6
            className={`text-sm ${
              personalInfoData.status === "available"
                ? "text-[#2E853F]"
                : "text-[#666666]"
            } font-bold`}
          >
            {personalInfoData.status === "available" ? "متاح" : "غير متاح"}
          </h6>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {moreInfoData.map((row: any, index: any) => (
          <div key={index}>
            <InfoRow image={row.image} label={row.label} value={row.value} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDriverProfileCard;
