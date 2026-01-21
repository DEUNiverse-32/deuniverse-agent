// lib/posts.ts
import { russianRoulette } from './posts/russian-roulette';

// 새로운 기록이 생길 때마다 이 배열 안에 이름을 추가하면 돼
export const posts = [
  russianRoulette,
];

export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string | string[] | undefined) {
  // 주소가 배열로 들어올 경우를 대비한 안전장치
  const actualSlug = Array.isArray(slug) ? slug[0] : slug;
  return posts.find((post) => post.slug === actualSlug);
}
