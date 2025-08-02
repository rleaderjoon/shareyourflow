import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
}

export default function ProjectCard({ title, description, imageUrl, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="space-y-4">
        {/* 이미지 */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-gray-400 text-sm">이미지 준비 중</div>
            </div>
          )}
        </div>
        
        {/* 제목 */}
        <h3 className="text-lg font-bold text-black">
          {title}
        </h3>
        
        {/* 설명 */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
} 