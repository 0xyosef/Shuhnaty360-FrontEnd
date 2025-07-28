import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useRef, useState } from "react";
import type { ShipmentSerializerDetail } from "../../../../Api";
import { quickPrint } from "../../../utils/printHelper";
import { Waybill } from "./Waybill";

export default function PrintWaybillDialog({
  shipment,
  open,
  setOpen,
}: {
  shipment: ShipmentSerializerDetail;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      await quickPrint("waybill-printable", `بوليصة شحن - ${shipment.id}`);
      setTimeout(() => setOpen(false), 400);
    } catch (error) {
      console.error("Print failed:", error);
      // في حالة فشل الطباعة المحسنة، استخدم الطباعة العادية
      window.print();
      setTimeout(() => setOpen(false), 400);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        scroll={"paper"}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "0px",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: "0",
          }}
        >
          <Waybill shipment={shipment} />
        </DialogContent>
        <DialogActions sx={{ margin: "10px 0 0" }}>
          <div className="grid grid-cols-2 gap-4 w-full mb-2">
            {[
              { text: "إلغاء", action: () => setOpen(false) },
              {
                text: isPrinting ? "جاري الطباعة..." : "طباعة",
                action: handlePrint,
              },
            ].map((item, index) => (
              <button
                type="button"
                onClick={item.action}
                key={item.text}
                disabled={isPrinting}
                className={`col-span-1 ${
                  index === 0
                    ? "bg-[#FCFCFC] text-[#DD7E1F]"
                    : "bg-[#DD7E1F] text-[#FCFCFC]"
                } border border-[#DD7E1F] py-3 rounded-lg disabled:opacity-50`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
