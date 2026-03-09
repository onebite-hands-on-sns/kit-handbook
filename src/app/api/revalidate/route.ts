import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const { slug } = await request.json();

  if (slug) {
    revalidatePath(`/${slug}`);
    return NextResponse.json({ revalidated: true, slug });
  }

  // slug 없으면 전체 페이지 revalidate
  revalidatePath("/[slug]", "page");
  return NextResponse.json({ revalidated: true, all: true });
}
