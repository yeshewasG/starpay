import { authBaseUrl } from "@/lib/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/yeshilab/[...path]">,
) {
  const { path } = await context.params;
  const endpoint = path.join("/");

  try {
    const res = await fetch(`${authBaseUrl}/api/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    // const res = await axios.get(`${authBaseUrl}/api/${endpoint}`);
    // Return the API response as-is
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/yeshilab/[...path]">,
) {
  const { path } = await context.params;
  const endpoint = path.join("/");

  try {
    const body = await request.json(); // read the request body
    const res = await fetch(`${authBaseUrl}/api/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
    // const res = await axios.post(`${authBaseUrl}/api/${endpoint}`, body);

    // return NextResponse.json(res, { status: res.status });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
