import { russianRoulette } from './posts/russian-roulette';

// 앞으로 새로운 기록 파일을 만들 때마다 여기에 추가하면 돼
export const posts = [
  russianRoulette,
];

// 전체 목록을 가져오는 함수
export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 특정 기록을 주소(slug)로 찾는 함수
export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
