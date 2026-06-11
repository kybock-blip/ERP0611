# GreenTree ERP API 설계

## 아키텍처

- **Frontend**: Next.js App Router (Server/Client Components)
- **Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **State**: Zustand (클라이언트 UI/데모 데이터), React Query (서버 데이터 캐시)

## 인증 API (Supabase Auth)

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/auth/v1/token?grant_type=password` | 이메일 로그인 |
| POST | `/auth/v1/signup` | 회원가입 |
| GET | `/auth/v1/authorize` | Google OAuth |
| POST | `/auth/v1/recover` | 비밀번호 찾기 |

## REST API (Supabase PostgREST)

### Customers
- `GET /rest/v1/customers?organization_id=eq.{orgId}` - 목록
- `POST /rest/v1/customers` - 등록
- `PATCH /rest/v1/customers?id=eq.{id}` - 수정
- `DELETE /rest/v1/customers?id=eq.{id}` - 삭제

### Projects
- `GET /rest/v1/projects?select=*,customers(name)` - 목록
- `POST /rest/v1/projects` - 생성
- `PATCH /rest/v1/projects?id=eq.{id}` - 수정
- `GET /rest/v1/project_profitability?project_id=eq.{id}` - 수익성 (View)

### Project Costs
- `GET /rest/v1/project_costs?project_id=eq.{id}`
- `POST /rest/v1/project_costs` - 비용 등록

### Schedules
- `GET /rest/v1/schedules?start_at=gte.{from}&end_at=lte.{to}`
- `POST /rest/v1/schedules`
- `PATCH /rest/v1/schedules?id=eq.{id}` - 드래그앤드롭 이동

### Dashboard (RPC 또는 View)
- `GET /rest/v1/rpc/get_dashboard_kpi` - KPI 집계
- `GET /rest/v1/rpc/get_monthly_revenue` - 월별 매출

## Storage API

- `POST /storage/v1/object/attachments/{path}` - 현장 사진/문서 업로드
- `GET /storage/v1/object/public/attachments/{path}` - 파일 조회

## 권한 (RLS)

| Role | customers | projects | accounting | settings |
|------|-----------|----------|------------|----------|
| owner | CRUD | CRUD | CRUD | CRUD |
| admin | CRUD | CRUD | CRUD | RU |
| manager | CRUD | CRUD | R | R |
| staff | R | RU | - | R |

## MVP 단계별 API 우선순위

1. **MVP1**: auth, customers, projects, project_costs, schedules, dashboard RPC
2. **MVP2**: estimates, contracts, invoices, expenses
3. **MVP3**: documents (AI), reports, attachments
