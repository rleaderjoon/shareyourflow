import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginPageProps {
  onBackToHome: () => void;
}

export function LoginPage({ onBackToHome }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="pt-16 pb-8 px-8">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={onBackToHome}
            className="text-6xl font-light tracking-wider hover:text-gray-600 transition-colors"
          >
            shareyourflow
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-16">
        <div className="max-w-6xl mx-auto flex items-start justify-center pt-24">
          <div className="w-full max-w-md">
            {/* Login Title */}
            <div className="mb-16">
              <h2 className="text-2xl font-light mb-2">로그인</h2>
              <p className="text-base font-light text-gray-600">계정에 접속하세요</p>
            </div>

            {/* Login Form */}
            <form className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-normal">
                  이메일 주소
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="h-12 border-0 border-b border-black rounded-none bg-transparent px-0 focus:border-b-2 focus:ring-0"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-normal">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="h-12 border-0 border-b border-black rounded-none bg-transparent px-0 focus:border-b-2 focus:ring-0"
                />
              </div>

              <div className="pt-8 space-y-6">
                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-none font-light text-base"
                >
                  로그인
                </Button>

                <div className="flex items-center justify-between text-sm font-light">
                  <button type="button" className="text-gray-600 hover:text-black">
                    비밀번호를 잊으셨나요?
                  </button>
                  <button type="button" className="text-gray-600 hover:text-black">
                    계정 만들기
                  </button>
                </div>
              </div>
            </form>

            {/* Additional Options */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm font-light text-gray-600 mb-6">
                  또는 다른 방법으로 로그인
                </p>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-black text-black hover:bg-black hover:text-white rounded-none font-light"
                  >
                    Google로 계속하기
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-black text-black hover:bg-black hover:text-white rounded-none font-light"
                  >
                    Apple로 계속하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center text-sm font-light text-gray-600">
            <div className="space-x-8">
              <button className="hover:text-black">개인정보처리방침</button>
              <button className="hover:text-black">서비스 약관</button>
              <button className="hover:text-black">고객지원</button>
            </div>
            <div>
              <p>© 2025 shareyourflow. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}