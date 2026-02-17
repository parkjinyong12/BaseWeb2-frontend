# BaseWeb2 Frontend

React + TypeScript + Vite 기반 SPA 프로젝트입니다.

## Tech Stack
- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form + Zod
- TailwindCSS

## 주요 라우트
- `/login`: 더미 로그인 폼 (JWT 연동 대비)
- `/dashboard`: 대시보드 + `/api/health` 상태 확인

## 개발
```bash
npm install
npm run dev
```

Vite dev server는 `/api` 요청을 `http://localhost:8080`으로 프록시합니다.

## 빌드
```bash
npm run build
```

빌드 결과물은 `dist/`에 생성됩니다.
