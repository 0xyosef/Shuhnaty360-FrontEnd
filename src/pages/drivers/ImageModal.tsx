import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import imageIcon from "../../assets/images/gallery.svg";
const style = {
  bgcolor: "background.paper",
  p: 4,
};

export default function ImageModal({ image, fileName }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="text-[#DD7E1F]! normal-case! flex items-center gap-2 px-0!"
      >
        <span> {fileName}</span>
        <span>
          {" "}
          <img src={imageIcon} alt="license image" />
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
        >
          <img src={image} alt="modal image" />
        </Box>
      </Modal>
    </div>
  );
}
