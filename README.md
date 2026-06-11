# (주)라온누리나무병원

소규모 조경회사·나무병원·수목관리 전문기업을 위한 클라우드 ERP SaaS 웹플랫폼

## 기술 스택

- **Frontend**: Next.js 16, TypeScript, TailwindCSS v4, Shadcn-style UI
- **State**: Zustand, TanStack React Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Charts**: Recharts

## 시작하기

```bash
cd landscape-erp
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 데모 로그인

- 이메일: `admin@raonnuri.co.kr`
- 비밀번호: 아무 값 (데모 모드)

Supabase 미설정 시 목업 데이터로 동작합니다.

### 법령 상담 챗봇 (Gemini)

산림보호법 PDF를 텍스트로 변환해 `data/forest-protection-law.txt`에 포함합니다.  
사이드바 **법령 상담** 메뉴(`/chat`)에서 AI에게 법령 질문을 할 수 있습니다.

**로컬 / Vercel 환경변수**

```env
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-pro
```

Vercel 대시보드 → Project → Settings → Environment Variables에서 `GEMINI_API_KEY`를 추가하세요.

### Supabase 연동

1. [Supabase](https://supabase.com) 프로젝트 생성
2. `supabase/migrations/001_initial_schema.sql` 실행
3. `.env.local` 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## 폴더 구조

```
src/
├── app/
│   ├── (auth)/          # 로그인, 회원가입
│   └── (dashboard)/     # ERP 메인 화면
├── components/
│   ├── ui/              # Atomic UI (Button, Card, Input...)
│   ├── layout/          # Sidebar, Header, PageShell
│   ├── dashboard/       # KPI, Charts, Notifications
│   ├── crm/             # 고객 폼
│   ├── projects/        # 프로젝트, 수익성
│   └── schedule/        # 캘린더
├── lib/
│   ├── types/           # TypeScript 타입
│   ├── mock/            # 데모 시드 데이터
│   └── supabase/        # Supabase 클라이언트
├── stores/              # Zustand (auth, ui, data)
└── providers/           # React Query, Theme
supabase/migrations/     # PostgreSQL 스키마
docs/                    # API 설계 문서
```

## MVP 구현 현황

### MVP 1 (완료)
- [x] 로그인 (이메일, Google 데모)
- [x] 대시보드 (KPI, 차트, 알림)
- [x] CRM 고객관리 (등록/수정/검색/필터/태그)
- [x] 프로젝트 관리 + 수익성 자동 계산
- [x] 일정 관리 (월/주/일 캘린더)

### MVP 2 (UI 스켈레톤)
- [x] 견적 관리 목록
- [x] 계약 관리 placeholder
- [x] 회계 관리 (미수금 현황)

### MVP 3 (진행 중)
- [x] 산림보호법 AI 챗봇 (Gemini)
- [ ] AI 문서 생성
- [ ] 자동 보고서 PDF/Excel

## 디자인 시스템 (DESIGN.md)

Apple-design-analysis 기반 UI:

- **Primary**: Action Blue `#0066cc` (단일 인터랙션 컬러)
- **Surface**: Canvas `#ffffff`, Parchment `#f5f5f7`, Tile Dark `#272729`
- **Typography**: Inter Variable (SF Pro 대체) + Noto Sans KR, 본문 17px
- **Components**: Pill CTA, hairline card, frosted sub-nav, 44px global nav
- **Elevation**: 카드/버튼 그림자 없음 (DESIGN.md 준수)

### 폰트 (로컬 설치)

```bash
npm install @fontsource-variable/inter @fontsource/noto-sans-kr
```

- `layout.tsx`에서 로컬 `@fontsource` 패키지 import (CDN 미사용)
- `public/fonts/`에 woff2 백업 파일 126개 포함

## 라이선스

Private - All rights reserved
