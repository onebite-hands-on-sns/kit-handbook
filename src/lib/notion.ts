import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { getPageBySlug as getPageBySlugFromCurriculum } from "./curriculum";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Custom transformer for image blocks: use proxy API route
n2m.setCustomTransformer("image", async (block) => {
  const blockId = block.id;
  return `![image](/api/notion-image?blockId=${blockId})`;
});


function stripCurriculumHeader(md: string): string {
  // Remove everything up to and including the last </details> block
  // These are the curriculum navigation blocks at the top of each Notion page
  const lastDetailsClose = md.lastIndexOf("</details>");
  if (lastDetailsClose !== -1) {
    return md.slice(lastDetailsClose + "</details>".length).trim();
  }
  // Fallback: remove common header patterns
  return md
    .replace(/^\*\*📓 커리큘럼\*\*\s*/m, "")
    .replace(/^---\s*/m, "")
    .replace(/^◻️\s*\[Main Page\].*\n?/m, "");
}

// In-memory cache for dev mode speed
const contentCache = new Map<string, { content: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getPageContent(pageId: string): Promise<string> {
  const cached = contentCache.get(pageId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.content;
  }

  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  const stripped = stripCurriculumHeader(mdString.parent);
  // Remove double quotes wrapping blockquote lines (notion-to-md callout artifact)
  const content = stripped.replace(/^(>+\s*)"(.+)"$/gm, "$1$2");

  contentCache.set(pageId, { content, timestamp: Date.now() });
  return content;
}

export async function getPageContentBySlug(
  slug: string
): Promise<{ title: string; content: string } | null> {
  const page = getPageBySlugFromCurriculum(slug);
  if (!page) return null;

  const content = await getPageContent(page.id);
  return { title: page.title, content };
}
