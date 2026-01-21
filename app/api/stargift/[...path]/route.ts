import apiClient from "@/lib/apiClient";
import { NextResponse } from "next/server";

// context contains params
export async function GET(
  request: Request,
  context: RouteContext<"/api/stargift/[...path]">,
) {
  const { path } = await context.params;
  const endpoint = path.join("/");
  try {
    const res = await apiClient.get(`/stargift/${endpoint}`);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/stargift/[...path]">,
) {
  const { path } = await context.params;
  const endpoint = path.join("/");
  try {
    const res = await apiClient.post(`/stargift/${endpoint}`);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
