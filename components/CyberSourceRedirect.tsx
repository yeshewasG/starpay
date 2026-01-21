"use client";
/* eslint-disable */

import { useEffect, useRef, useState } from "react";

type Props = {
  payload: Record<string, string>;
  width?: string | number;
  height?: string | number;
};

export default function CyberSourceIframe({
  payload,
  width = "100%",
  height = 600,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const doc = iframeRef.current.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <body onload="document.forms[0].submit()">
          <form method="POST" action="https://testsecureacceptance.cybersource.com/pay">
            ${Object.entries(payload)
              .map(
                ([k, v]) => `<input type="hidden" name="${k}" value="${v}" />`,
              )
              .join("")}
          </form>
        </body>
      </html>
    `);
    doc.close();

    setIframeLoaded(true);
  }, [payload]);

  return (
    <div className="w-full" style={{ width, height }}>
      {!iframeLoaded && <p className="text-center">Loading payment...</p>}
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
