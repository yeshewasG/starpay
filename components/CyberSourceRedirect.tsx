"use client";

import { useRemittanceStore } from "@/lib/stores/remittanceStore";
import { useEffect, useRef, useState } from "react";

export interface CybersourcePayload {
  paymentUrl: string;
  fields: {
    access_key: string;
    profile_id: string;
    transaction_uuid: string;
    signed_field_names: string;
    unsigned_field_names: string;
    transaction_type: string;
    reference_number: string;
    amount: string;
    currency: string;
    signature: string;
    [key: string]: string;
  };
}

type Props = {
  width?: string | number;
  height?: string | number;
};

export default function CyberSourceIframe({
  width = "100%",
  height = 600,
}: Props) {
  const { cybersourcePayload } = useRemittanceStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  useEffect(() => {
    if (!iframeRef.current || !cybersourcePayload) return;

    const doc = iframeRef.current.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <body>
          <form id="cybersourceForm" method="POST" action="${escapeHtml(
            cybersourcePayload?.paymentUrl!,
          )}">
            ${Object.entries(cybersourcePayload?.fields!)
              .map(
                ([key, value]) =>
                  `<input type="hidden" name="${escapeHtml(
                    key,
                  )}" value="${escapeHtml(value)}" />`,
              )
              .join("")}
          </form>
        </body>
      </html>
    `);
    doc.close();

    // Submit the form immediately after writing
    const form = doc.getElementById(
      "cybersourceForm",
    ) as HTMLFormElement | null;
    form?.submit();

    setIframeLoaded(true);
  }, [cybersourcePayload]);

  return (
    <div
      className="w-full relative rounded-xl overflow-hidden"
      style={{ width, height }}
    >
      {!iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <p className="text-center text-gray-700">Loading payment...</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="CyberSource Payment"
        width="100%"
        height={height}
        frameBorder={0}
        className="rounded-xl overflow-hidden"
      />
    </div>
  );
}
