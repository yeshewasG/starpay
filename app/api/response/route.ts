import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    console.log("CyberSource Response:", data);

    // Send the data to the parent window using postMessage
    // No page reload, SPA can handle it
    return new NextResponse(
      `<html>
        <body>
          <script>
            // Send CyberSource payload to parent window
            window.top.postMessage(
              {
                type: "CYBERSOURCE_RESPONSE",
                payload: ${JSON.stringify(data)}
              },
              "*"
            );
          </script>
          <p>Processing payment...</p>
        </body>
      </html>`,
      {
        headers: { "Content-Type": "text/html" },
      },
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      `<html>
        <body>
          <script>
            window.top.postMessage(
              {
                type: "CYBERSOURCE_RESPONSE",
                payload: { error: "Failed to process payment" }
              },
              "*"
            );
          </script>
          <p>Failed to process payment.</p>
        </body>
      </html>`,
      {
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
