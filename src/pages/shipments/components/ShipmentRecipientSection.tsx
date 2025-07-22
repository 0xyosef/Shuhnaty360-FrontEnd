import { useRecipientQuery, useRecipientsOptions } from "@/api/recipients.api";
import { useShipmentQuery } from "@/api/shipments.api";
import { Button } from "@/components/ui/button";
import ComboboxField, { Option } from "@/components/ui/ComboboxField";
import PhoneInputField from "@/components/ui/PhoneInputField";
import TextAreaField from "@/components/ui/TextAreaField";
import TextInputField from "@/components/ui/TextInputField";
import AddRecipientDialog from "@/pages/shipments/components/AddRecipientDialog";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import FormSectionWrapper from "../../../components/FormSectionWrapper";

type ShipmentRecipientSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
};

const ShipmentRecipientSection = ({
  register,
  errors,
  control,
  setValue,
}: ShipmentRecipientSectionProps) => {
  const { shipmentId } = useParams();
  const [addRecipientDialogIsOpen, setAddRecipientDialogIsOpen] =
    useState(false);
  const { data: shipmentData } = useShipmentQuery(shipmentId);
  const comboboxRef = useRef<{
    setSelectedOption: (option: Option) => void;
  } | null>(null);

  const [showNotes, setShowNotes] = useState(false);
  const [recipientNotes, recipientId] = useWatch({
    control,
    name: ["notes_recipient", "recipient"],
  });
  const hasNotes = !!recipientNotes;

  const selectedRecipient = shipmentData?.data
    ? {
        value: shipmentData.data.recipient?.id as number,
        label: shipmentData.data.recipient?.name,
      }
    : undefined;

  const {
    data: recipients,
    isLoading: isLoadingRecipients,
    setSearch: setRecipientSearch,
    hasNextPage: hasNextRecipientPage,
    ref: recipientRef,
  } = useRecipientsOptions();
  const { data: recipientData } = useRecipientQuery(recipientId || undefined);

  const recipientOptions = recipients?.items || [];

  useEffect(() => {
    setShowNotes(hasNotes || showNotes);
  }, [hasNotes, showNotes]);

  return (
    <FormSectionWrapper
      title="المستلِم"
      sectionOptions={() => {
        return (
          <Button onClick={() => setAddRecipientDialogIsOpen(true)}>
            <Plus />
            إضافة مستلم
          </Button>
        );
      }}
    >
      <ComboboxField
        name="recipient"
        label="الاسم"
        control={control}
        options={recipientOptions}
        error={errors.recipient?.message}
        isLoading={isLoadingRecipients}
        selectedOption={selectedRecipient}
        hasNextPage={hasNextRecipientPage}
        onSearch={setRecipientSearch}
        setValue={setValue}
        ref={recipientRef}
        imperativeRef={comboboxRef}
      />
      <TextInputField
        value={recipientData?.data.address || undefined}
        label="العنوان"
        disabled
      />
      <PhoneInputField
        name="recipient_phone"
        label="رقم الهاتف (أساسي)"
        value={recipientData?.data.phone_number || undefined}
        control={control}
      />
      <PhoneInputField
        name="recipient_phone2"
        label="رقم الهاتف (احتياطي)"
        value={recipientData?.data.second_phone_number || undefined}
        control={control}
      />
      {showNotes ? (
        <TextAreaField
          label="ملاحظات المستلم"
          containerClassName="col-span-2"
          className="h-40"
          error={errors.notes_recipient?.message}
          {...register("notes_recipient")}
        />
      ) : (
        <button
          className="py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          type="button"
          onClick={() => setShowNotes(!showNotes)}
        >
          إضافة ملاحظات
        </button>
      )}
      <AddRecipientDialog
        isOpen={addRecipientDialogIsOpen}
        setIsOpen={setAddRecipientDialogIsOpen}
        onCreate={(data) => {
          console.log(data);
          setValue("recipient", data.data.id!);

          comboboxRef.current?.setSelectedOption({
            value: data.data.id!,
            label: data.data.name,
          });

          setAddRecipientDialogIsOpen(false);
        }}
      />
    </FormSectionWrapper>
  );
};

export default ShipmentRecipientSection;
