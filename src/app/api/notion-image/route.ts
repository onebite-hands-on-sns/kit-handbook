import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get("blockId");
  if (!blockId) {
    return NextResponse.json({ error: "Missing blockId" }, { status: 400 });
  }

  try {
    const block = await notion.blocks.retrieve({ block_id: blockId });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blockData = block as any;
    let imageUrl: string | undefined;

    if (blockData.type === "image") {
      const image = blockData.image;
      if (image.type === "file") {
        imageUrl = image.file.url;
      } else if (image.type === "external") {
        imageUrl = image.external.url;
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Stream image through to avoid Notion URL expiry (1hr)
    // CDN/browser caches the proxied response for 30min, then revalidates
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      return NextResponse.json({ error: "Image fetch failed" }, { status: 502 });
    }

    const contentType = imgRes.headers.get("content-type") || "image/png";

    return new NextResponse(imgRes.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
