import { useShipmentQuery } from "@/api/shipments.api";
import { AutocompleteOption } from "@/components/ui/AutoCompleteSelectField";
import { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useClientBranchesOptions,
  useClientQuery,
  useClientsOptions,
} from "../../../api/clients.api";
import FormSectionWrapper from "../../../components/FormSectionWrapper";
import ComboboxField from "../../../components/ui/ComboboxField";
import PhoneInputField from "../../../components/ui/PhoneInputField";
import TextAreaField from "../../../components/ui/TextAreaField";
import TextInputField from "../../../components/ui/TextInputField";
import { ShipmentSerializerSchema } from "../../../schemas/shipment.schema";

type ShipmentClientSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
};

const ShipmentClientSection = ({
  register,
  errors,
  control,
  setValue,
}: ShipmentClientSectionProps) => {
  const { shipmentId } = useParams();
  const { data: shipmentData } = useShipmentQuery(shipmentId);

  const [branchOptions, setBranchOptions] = useState<AutocompleteOption[]>([]);

  const [showNotes, setShowNotes] = useState(false);
  const [customerNotes, clientId] = useWatch({
    control,
    name: ["notes_customer", "client"],
  });

  const hasNotes = !!customerNotes;

  const selectedClient = shipmentData?.data
    ? {
        value: shipmentData.data.client?.id as number,
        label: shipmentData.data.client?.name,
      }
    : undefined;

  const selectedClientBranch = shipmentData?.data
    ? {
        value: shipmentData.data.client_branch?.id as number,
        label: shipmentData.data.client_branch?.name,
      }
    : undefined;

  const {
    data: clients,
    isLoading: isLoadingClients,
    setSearch: setClientSearch,
    hasNextPage: hasNextClientPage,
    ref: clientRef,
  } = useClientsOptions();
  const {
    data: branches,
    isLoading: isLoadingBranches,
    setSearch: setBranchSearch,
    hasNextPage: hasNextBranchPage,
    ref: branchRef,
  } = useClientBranchesOptions(clientId);
  const { data: selectedClientData } = useClientQuery(clientId);

  const clientOptions = clients?.items || [];

  useEffect(() => {
    setShowNotes(hasNotes || showNotes);
  }, [hasNotes, showNotes]);

  useEffect(() => {
    if (!clientId) {
      setBranchOptions([]);
    } else {
      const options = branches?.items.filter((b) => b.client === clientId);
      setBranchOptions(() => options || []);
    }
  }, [clientId, branches?.items]);

  return (
    <FormSectionWrapper title="المرسِل">
      <ComboboxField
        name="client"
        label="الاسم"
        control={control}
        options={clientOptions}
        error={errors.client?.message}
        isLoading={isLoadingClients}
        selectedOption={selectedClient}
        hasNextPage={hasNextClientPage}
        onSearch={setClientSearch}
        setValue={setValue}
        ref={clientRef}
      />
      <ComboboxField
        name="client_branch"
        label="الفرع"
        control={control}
        options={branchOptions}
        error={errors.client_branch?.message}
        isLoading={isLoadingBranches}
        selectedOption={selectedClientBranch}
        hasNextPage={hasNextBranchPage}
        onSearch={setBranchSearch}
        setValue={setValue}
        ref={branchRef}
      />
      <TextInputField
        label="رقم الفاتورة"
        type="number"
        error={errors.client_invoice_number?.message}
        {...register("client_invoice_number")}
      />
      <span className="hidden md:block" />
      <PhoneInputField
        name="phone"
        label="رقم الهاتف (أساسي)"
        value={selectedClientData?.data?.phone_number || "+966"}
        control={control}
      />
      <PhoneInputField
        name="phone2"
        label="رقم الهاتف (احتياطي)"
        value={selectedClientData?.data?.second_phone_number || "+966"}
        control={control}
      />

      {showNotes ? (
        <TextAreaField
          label="ملاحظات المرسل"
          containerClassName="col-span-2"
          className="h-40"
          error={errors.notes_customer?.message}
          {...register("notes_customer")}
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
    </FormSectionWrapper>
  );
};

export default ShipmentClientSection;
