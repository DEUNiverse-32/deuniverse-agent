// lib/posts.ts
import { russianRoulette } from './posts/russianroulette';

// 여기서 대괄호 []를 사용해 기록들을 하나로 묶어주는 거야.
export const posts = [
  russianRoulette,
];

export function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string | string[] | undefined) {
  const actualSlug = Array.isArray(slug) ? slug[0] : slug;
  return posts.find((p) => p.slug === actualSlug);
}

