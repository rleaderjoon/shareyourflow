# ShareYourFlow

ShareYourFlow는 Next.js, TypeScript, Firebase를 사용하여 구축된 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Vercel

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

1. 저장소를 클론합니다:
```bash
git clone https://github.com/rleaderjoon/shareyourflow.git
cd shareyourflow
```

2. 의존성을 설치합니다:
```bash
npm install
```

3. 환경 변수를 설정합니다:
`.env.local` 파일을 생성하고 Firebase 설정을 추가하세요:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. 개발 서버를 실행합니다:
```bash
npm run dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 홈페이지
├── components/          # 재사용 가능한 컴포넌트
├── lib/                # 유틸리티 및 설정
│   └── firebase.ts     # Firebase 설정
└── hooks/              # 커스텀 훅
```

## 배포

이 프로젝트는 Vercel을 통해 배포됩니다. GitHub 저장소에 푸시하면 자동으로 배포됩니다.

## 라이선스

MIT License
