import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("RESP");

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // CyberSource returns the transaction ID in the 'transaction_id' field
    const transactionId = data.transaction_id || data.request_token || "N/A";

    // We redirect to the GET version of the same page with the ID in the URL
    // We use a script to "break out" of the iframe so the success page is full-screen
    return new NextResponse(
      `<html>
        <body>
          <script>
            window.top.location.href = "/?tid=${transactionId}";
          </script>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } },
    );
  } catch (err) {
    return NextResponse.redirect(new URL("/failed", request.url));
  }
}
