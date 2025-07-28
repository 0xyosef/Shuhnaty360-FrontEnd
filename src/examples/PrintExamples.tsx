/**
 * مثال على استخدام حلول الطباعة الجديدة
 */

import React from "react";
import PrintButton from "@/components/PrintButton";
import { usePrint } from "@/hooks/usePrint";

// مثال 1: استخدام PrintButton
export const InvoiceWithPrintButton = () => {
  return (
    <div>
      {/* المحتوى القابل للطباعة */}
      <div id="invoice-content" className="bg-white p-4">
        <h1>فاتورة رقم #12345</h1>
        <p>تاريخ: 2025-01-28</p>
        <div>
          <p>العميل: شركة المثال</p>
          <p>المبلغ: 1000 ر.س</p>
        </div>
      </div>

      {/* زر الطباعة المحسن */}
      <PrintButton
        elementId="invoice-content"
        title="فاتورة #12345"
        pageSize="A4"
        orientation="portrait"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onBeforePrint={() => console.log("بدء طباعة الفاتورة")}
        onAfterPrint={() => console.log("انتهت طباعة الفاتورة")}
      />
    </div>
  );
};

// مثال 2: استخدام usePrint hook
export const VoucherWithCustomPrint = () => {
  const { handlePrint, isPrinting, printError } = usePrint({
    elementId: "voucher-content",
    title: "سند صرف",
    pageSize: "A5",
    orientation: "landscape",
    onBeforePrint: () => {
      console.log("بدء طباعة السند");
      // يمكن إضافة منطق إضافي هنا
    },
    onAfterPrint: () => {
      console.log("انتهت طباعة السند");
      // يمكن إضافة منطق إضافي هنا
    },
    onError: (error) => {
      console.error("خطأ في الطباعة:", error);
      alert(`فشلت الطباعة: ${error.message}`);
    },
  });

  return (
    <div>
      {/* المحتوى القابل للطباعة */}
      <div id="voucher-content" className="bg-white p-4">
        <h1>سند صرف</h1>
        <p>رقم السند: V-2025-001</p>
        <div>
          <p>المستفيد: أحمد محمد</p>
          <p>المبلغ: 500 ر.س</p>
          <p>السبب: مصاريف سفر</p>
        </div>
      </div>

      {/* زر طباعة مخصص */}
      <button
        onClick={handlePrint}
        disabled={isPrinting}
        className={`
          px-4 py-2 rounded text-white
          ${
            isPrinting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }
        `}
      >
        {isPrinting ? "جاري الطباعة..." : "طباعة السند"}
      </button>

      {/* عرض الخطأ إن وجد */}
      {printError && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
          خطأ: {printError.message}
        </div>
      )}
    </div>
  );
};

// مثال 3: طباعة مباشرة باستخدام helper functions
export const QuickPrintExample = () => {
  const printWaybill = async () => {
    try {
      const { quickPrint } = await import("@/utils/printHelper");
      await quickPrint("waybill-printable", "بوليصة شحن #WB-001");
    } catch (error) {
      console.error("فشلت الطباعة:", error);
    }
  };

  const printInvoice = async () => {
    try {
      const { printInvoice } = await import("@/utils/printHelper");
      await printInvoice("invoice-printable", "فاتورة #INV-001");
    } catch (error) {
      console.error("فشلت الطباعة:", error);
    }
  };

  return (
    <div>
      <div id="waybill-printable" className="bg-white p-4 mb-4">
        <h2>بوليصة شحن #WB-001</h2>
        <p>من: الرياض</p>
        <p>إلى: جدة</p>
      </div>

      <div id="invoice-printable" className="bg-white p-4 mb-4">
        <h2>فاتورة #INV-001</h2>
        <p>المبلغ: 750 ر.س</p>
      </div>

      <div className="space-x-2">
        <button
          onClick={printWaybill}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          طباعة البوليصة
        </button>

        <button
          onClick={printInvoice}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          طباعة الفاتورة (A5)
        </button>
      </div>
    </div>
  );
};

export default InvoiceWithPrintButton;
