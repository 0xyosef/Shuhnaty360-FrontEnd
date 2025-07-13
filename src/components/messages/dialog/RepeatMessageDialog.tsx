import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTimes from "./DialogTimes";
import DialogDurations from "./DialogDurations";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RepeatMessageDialog = ({ isDialogVisible, setIsDialogVisible }: any) => {
  const handleClose = () => {
    setIsDialogVisible(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogVisible}
    >
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className="text-[#DD7E1F] text-center !font-Almarai text-2xl!"
      >
        تكرار الإرسال
      </DialogTitle>
      <DialogContent dividers dir="rtl" sx={{ margin: "0 6px" }}>
        <span className="text-[#DD7E1F] text-lg">رسالة كل:</span>
        <DialogTimes />
        <span className="text-[#DD7E1F] text-lg inline-block mt-4">
          تكرار لمدة:
        </span>
        <DialogDurations />
      </DialogContent>
      <DialogActions sx={{ margin: "10px 6px 0" }}>
        <div className="grid grid-cols-2 gap-4 w-full mb-2">
          <button className="col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] py-3 rounded-lg">
            تطبيق
          </button>
          <button className="col-span-1 bg-[#FCFCFC] text-[#DD7E1F] border border-[#DD7E1F] py-3 rounded-lg">
            حذف
          </button>
        </div>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default RepeatMessageDialog;
