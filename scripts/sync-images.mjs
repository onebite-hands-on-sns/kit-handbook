import { v2 as cloudinary } from "cloudinary";
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency needed)
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx);
    const val = trimmed.slice(eqIdx + 1);
    if (!process.env[key]) process.env[key] = val;
  }
}

// --- Config ---
const CLOUDINARY_FOLDER = "react-lib-kit-handbook";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// --- Curriculum (duplicated to avoid TS import issues) ---
const CURRICULUM = [
  {
    section: "02. Tailwind CSS",
    pages: [
      { id: "3114d9b4-7b7c-8023-bbb6-edc640c621ba" },
      { id: "3114d9b4-7b7c-80c3-a586-f9af992af2b4" },
      { id: "3114d9b4-7b7c-80c8-8975-da15847d9e78" },
    ],
  },
  {
    section: "03. 사전준비 - 스타일링과 라우팅",
    pages: [
      { id: "3114d9b4-7b7c-80b6-b97c-dbdec12c30d2" },
      { id: "3114d9b4-7b7c-8056-8d85-d162ecdbcf42" },
      { id: "3114d9b4-7b7c-8032-9dfc-fbfbae9e7265" },
      { id: "3114d9b4-7b7c-80d6-86b1-c6a3bcd55623" },
    ],
  },
  {
    section: "04. Zustand를 이용한 전역 상태관리",
    pages: [
      { id: "3114d9b4-7b7c-80c1-b960-c8d48b02034e" },
      { id: "3114d9b4-7b7c-808c-bd3c-f106ab77d4fd" },
      { id: "3114d9b4-7b7c-8086-a3a4-d1e81411dbf9" },
      { id: "3114d9b4-7b7c-80bf-bba4-c032c7528ac8" },
      { id: "3114d9b4-7b7c-8011-8f5a-c0bab8e4edc5" },
      { id: "3114d9b4-7b7c-8063-957f-f290d7970272" },
      { id: "3114d9b4-7b7c-808b-a9e9-fd94a58251b1" },
    ],
  },
  {
    section: "05. 서버 상태관리와 TanstackQuery",
    pages: [
      { id: "3114d9b4-7b7c-809f-96ec-c6084009c192" },
      { id: "3114d9b4-7b7c-8081-b905-fba3af0f5e0e" },
      { id: "3114d9b4-7b7c-8052-ad02-ceb1389a2cb8" },
      { id: "3114d9b4-7b7c-802c-a0ed-ffb8f51318b0" },
      { id: "3114d9b4-7b7c-80c7-9a9a-c4a0e58174a4" },
      { id: "3114d9b4-7b7c-80c8-8abb-ffd784b6232d" },
      { id: "3114d9b4-7b7c-8019-8ef6-fa0ffb2b8555" },
      { id: "3114d9b4-7b7c-8098-987c-dfed87e1b1e4" },
      { id: "3114d9b4-7b7c-80b3-b67c-f94dc23e68d2" },
      { id: "3114d9b4-7b7c-80c8-b076-f921f7e700c6" },
      { id: "3114d9b4-7b7c-8027-9611-d2c78783aba2" },
      { id: "3114d9b4-7b7c-80f4-ac89-d8544b7d9b0d" },
      { id: "3114d9b4-7b7c-8050-a3a2-dd9e0f1d2b14" },
    ],
  },
];

// --- Helpers ---

async function deleteAllInFolder() {
  console.log(`🗑️  Deleting all images in ${CLOUDINARY_FOLDER}...`);
  try {
    await cloudinary.api.delete_resources_by_prefix(CLOUDINARY_FOLDER + "/");
  } catch (err) {
    // Folder may not exist yet
    if (err?.error?.http_code !== 404) {
      console.warn("Warning during delete:", err?.error?.message || err);
    }
  }
}

async function getImageBlocksRecursive(blockId) {
  const images = [];
  let cursor;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const block of response.results) {
      if (block.type === "image") {
        images.push(block);
      }
      if (block.has_children) {
        images.push(...(await getImageBlocksRecursive(block.id)));
      }
    }
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  return images;
}

function getImageUrl(block) {
  const img = block.image;
  if (img.type === "file") return img.file.url;
  if (img.type === "external") return img.external.url;
  return null;
}

async function uploadToCloudinary(url, blockId) {
  const publicId = `${CLOUDINARY_FOLDER}/${blockId}`;
  const result = await cloudinary.uploader.upload(url, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return result.secure_url;
}

// --- Main ---

async function main() {
  console.log("🔄 Starting Notion → Cloudinary image sync...\n");

  await deleteAllInFolder();

  const imageMap = {};
  const allPages = CURRICULUM.flatMap((s) => s.pages);

  for (const page of allPages) {
    console.log(`📄 Processing page: ${page.id}`);
    const imageBlocks = await getImageBlocksRecursive(page.id);

    if (imageBlocks.length === 0) {
      console.log("   No images found.\n");
      continue;
    }

    console.log(`   Found ${imageBlocks.length} image(s)`);

    for (const block of imageBlocks) {
      const url = getImageUrl(block);
      if (!url) {
        console.warn(`   ⚠️  No URL for block ${block.id}`);
        continue;
      }

      try {
        const cloudinaryUrl = await uploadToCloudinary(url, block.id);
        imageMap[block.id] = cloudinaryUrl;
        console.log(`   ✅ ${block.id} → uploaded`);
      } catch (err) {
        console.error(`   ❌ Failed to upload ${block.id}:`, err.message);
      }
    }
    console.log();
  }

  // Write image map
  const outputPath = path.join(__dirname, "../src/lib/image-map.json");
  fs.writeFileSync(outputPath, JSON.stringify(imageMap, null, 2));
  console.log(`\n📝 Image map written to ${outputPath}`);
  console.log(`   Total images: ${Object.keys(imageMap).length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
