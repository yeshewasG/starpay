import { NextResponse } from "next/server";
import axios from "axios";
import { paymentBaseUrl } from "@/lib/constants";

export async function GET() {
  try {
    const response = await axios.get(`${paymentBaseUrl}`);
    const { serverPublicKey, keyVersion } = response.data.data;

    // 2. Create the response
    const res = NextResponse.json({ success: true });

    // 3. Set cookies on the client browser from the server
    res.cookies.set("server_public_key", serverPublicKey, {
      path: "/",
      maxAge: 3600,
      httpOnly: false, // Must be false so your Axios Interceptor can read it
      sameSite: "lax",
    });

    res.cookies.set("key_version", keyVersion, {
      path: "/",
      maxAge: 3600,
      httpOnly: false,
    });

    return res;
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Handshake failed" }, { status: 500 });
  }
}
