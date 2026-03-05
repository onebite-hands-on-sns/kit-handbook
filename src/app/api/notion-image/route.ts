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

    return NextResponse.redirect(imageUrl, {
      headers: {
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
