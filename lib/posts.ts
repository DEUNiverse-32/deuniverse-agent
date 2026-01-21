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
    title: 'DEUNiverse의 첫 번째 기록',
    date: '2026-01-21',
    description: '시스템 가동 및 초기화 기록.',
    content: '여기에 기록의 본문을 적어주면 돼. Markdown 형식을 써도 좋고, 일반 텍스트를 써도 좋아.'
  },
  {
    slug: 'system-init',
    title: '시스템 초기화',
    date: '2026-01-21',
    description: '보안 프로토콜 설정 완료.',
    content: 'Lee Hae-Deun의 아카이브가 생성되었습니다.'
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts;
}
