import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DeleteItemDialog({
  isDialogOpen,
  setIsDialogOpen,
  handleDeleteItemClick,
  label,
}: any) {
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    handleDeleteItemClick();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className=""
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-[#DD7E1F] text-center !font-Almarai text-xl!"
          >
            {label}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: "10px 6px 0" }}>
          <div className="grid grid-cols-2 gap-4 w-full mb-2">
            <button
              onClick={handleClose}
              className="col-span-1 bg-[#FCFCFC] text-[#DD7E1F] border border-[#DD7E1F] py-3 rounded-lg"
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirm}
              className="col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] py-3 rounded-lg"
            >
              تأكيد
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
