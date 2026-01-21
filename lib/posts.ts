// lib/posts.ts
import { russianRoulette } from './posts/russian-roulette';

// 1. 모든 포스트를 하나의 배열로 묶어. 
// 여기에 russianRoulette이 정확히 들어가 있는지 확인해 줘.
export const posts = [
  russianRoulette,
];

// 2. 외부에서 포스트 목록을 가져갈 수 있게 내보내는 함수
export function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 3. 특정 포스트를 찾는 함수 (상세 페이지용)
export function getPostBySlug(slug: string | string[] | undefined) {
  const actualSlug = Array.isArray(slug) ? slug[0] : slug;
  return posts.find((post) => post.slug === actualSlug);
}
