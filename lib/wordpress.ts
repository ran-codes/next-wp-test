// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";

const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

class WordPressAPIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

async function wordpressFetch<T>(url: string): Promise<T> {
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  return response.json();
}

export async function getAllPosts(): Promise<Post[]> {
  const query = {
    _embed: true,
    per_page: 100,
  };

  const url = getUrl("/wp-json/wp/v2/posts", query);
  return wordpressFetch<Post[]>(url);
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  return wordpressFetch<Post>(url);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug, _embed: true });
  const response = await wordpressFetch<Post[]>(url);
  return response[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages", { _embed: true });
  return wordpressFetch<Page[]>(url);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug, _embed: true });
  const response = await wordpressFetch<Page[]>(url);
  return response[0];
}

export { WordPressAPIError };
