export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  description?: string;
}

const posts: Post[] = [
  {
    slug: 'first-log',
    title: 'DEUNiverse: 첫 번째 아카이브',
    date: '2026-01-21',
    description: '시스템 가동 및 이해든(Lee Hae-Deun)의 첫 번째 기록.',
    content: '무사히 시스템이 구축되었습니다. 이곳에 앞으로의 궤적을 기록합니다.'
  },
  {
    slug: 'system-status',
    title: '시스템 안정화 리포트',
    date: '2026-01-21',
    description: '현재 시스템의 상태를 점검합니다.',
    content: '빌드 에러를 수정하고 데이터 구조를 확립했습니다.'
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts;
}
