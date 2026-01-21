// lib/posts.ts
import { russian-roulette } from './posts/russian-roulette';

// 여기서 대괄호 []를 사용해 기록들을 하나로 묶어주는 거야.
export const posts = [
  russian-roulette,
];

export function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string | string[] | undefined) {
  const actualSlug = Array.isArray(slug) ? slug[0] : slug;
  return posts.find((p) => p.slug === actualSlug);
}
