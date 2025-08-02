import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* 왼쪽: ShareYourFlow 로고 */}
        <Link href="/" className="text-gray-600 text-sm hover:text-black transition-colors">
          shareyourflow
        </Link>
        
        {/* 오른쪽: 네비게이션 메뉴 */}
        <nav className="flex space-x-8">
          <Link href="/problems" className="text-gray-600 text-sm hover:text-black transition-colors">
            Problems
          </Link>
          <Link href="/solutions" className="text-gray-600 text-sm hover:text-black transition-colors">
            Solutions
          </Link>
          <Link href="/about" className="text-gray-600 text-sm hover:text-black transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 text-sm hover:text-black transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
} 