import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  // 샘플 프로젝트 데이터
  const projects = [
    {
      id: '1',
      title: 'Two Sum',
      description: '배열에서 두 수의 합이 target이 되는 인덱스를 찾는 문제. 해시맵을 활용한 최적화된 솔루션.',
      href: '/problems/two-sum'
    },
    {
      id: '2',
      title: 'Valid Parentheses',
      description: '괄호의 유효성을 검사하는 문제. 스택을 활용한 효율적인 알고리즘 구현.',
      href: '/problems/valid-parentheses'
    },
    {
      id: '3',
      title: 'Merge Two Sorted Lists',
      description: '두 개의 정렬된 연결 리스트를 병합하는 문제. 재귀와 반복문을 활용한 다양한 접근법.',
      href: '/problems/merge-two-sorted-lists'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <Header />
      
      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* 히어로 섹션 */}
          <section className="mb-24">
            <div className="max-w-4xl">
              <h1 className="text-6xl font-bold text-black leading-tight mb-8">
                Hello, I'm ShareYourFlow.
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                프로그래머들이 알고리즘 문제 해결 과정을 공유하고 학습할 수 있는 플랫폼입니다. 
                노션이나 블로그에 나열식으로 올려도 가독성이 좋지 않은 문제를 해결하기 위해 시작했습니다.
              </p>
            </div>
          </section>

          {/* 프로젝트 섹션 */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-12">
              Selected Problems
            </h2>
            
            {/* 프로젝트 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  href={project.href}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
