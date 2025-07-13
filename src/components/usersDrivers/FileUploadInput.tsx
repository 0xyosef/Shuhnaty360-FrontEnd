import cameraIcon from "../../assets/images/camera.svg";

const FileUploadInput = ({
  title = "اضغط لإضافة صورة",
}: {
  title?: string;
}) => {
  return (
    <div className="w-full border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center py-8 font-Rubik relative">
      <div className="flex flex-col items-center">
        <div className="bg-[#F2F2F2] p-4 rounded-full">
          <img src={cameraIcon} alt="camera icon" />
        </div>
        <span className="text-[#DD7E1F] mt-2 font-lg">{title}</span>
        <span className="text-gray-500 text-sm">(أقصى حجم 5 MB)</span>
      </div>
      <input
        type="file"
        className="opacity-0 absolute w-full h-full cursor-pointer"
      />
    </div>
  );
};

export default FileUploadInput;
