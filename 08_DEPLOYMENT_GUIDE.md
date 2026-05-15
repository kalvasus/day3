# 08. 배포 가이드

## 목표
프로젝트를 Vercel에 배포하고, OpenAI API와 Supabase 연동이 배포 환경에서도 정상 동작하도록 설정한다.

## 1. 사전 준비

### 필요 계정
- GitHub
- Vercel
- Supabase
- OpenAI API 계정

### 필요 환경변수
```env
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## 2. GitHub 저장소 준비

### `.gitignore`
```gitignore
node_modules
.env
.env.local
.vercel
```

### 커밋 전 확인
- `.env` 파일이 Git에 포함되지 않았는지 확인한다.
- `package.json`이 존재하는지 확인한다.
- `api/analyze.js`가 존재하는지 확인한다.
- `public/index.html`이 존재하는지 확인한다.

## 3. Vercel 프로젝트 생성

1. Vercel에 로그인한다.
2. `Add New Project`를 클릭한다.
3. GitHub 저장소를 선택한다.
4. Framework Preset은 `Other` 또는 프로젝트 설정에 맞게 선택한다.
5. Build 설정을 확인한다.
6. Deploy를 실행한다.

## 4. Vercel 환경변수 설정

Vercel Project Settings → Environment Variables에 다음 값을 추가한다.

| Key | Value |
|---|---|
| OPENAI_API_KEY | OpenAI API Key |
| SUPABASE_URL | Supabase Project URL |
| SUPABASE_SERVICE_ROLE_KEY | Supabase Service Role Key |

환경변수 추가 후 반드시 재배포한다.

## 5. 배포 후 확인

### UI 확인
- 배포 URL 접속
- 메인 화면 표시 확인
- 모바일 화면 확인

### API 확인
브라우저에서 직접 `POST` 요청은 어렵기 때문에 로컬 터미널 또는 API 클라이언트로 확인한다.

```bash
curl -X POST https://{vercel-project-domain}/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"오늘 서비스가 정말 만족스러웠어요."}'
```

### Supabase 확인
- Supabase Table Editor 접속
- `sentiment_analyses` 테이블 확인
- 새 분석 결과 row 생성 여부 확인

## 6. 배포 오류 대응

### 환경변수 누락
증상:
```text
감성 분석 중 문제가 발생했습니다.
```

확인:
- Vercel Environment Variables에 값이 등록되어 있는지 확인한다.
- 환경변수 추가 후 재배포했는지 확인한다.

### Supabase 저장 실패
확인:
- `SUPABASE_URL` 값이 올바른지 확인한다.
- `SUPABASE_SERVICE_ROLE_KEY` 값이 올바른지 확인한다.
- 테이블명이 `sentiment_analyses`인지 확인한다.

### API 라우트 오류
확인:
- `api/analyze.js` 경로가 올바른지 확인한다.
- Vercel 서버리스 함수 형식에 맞게 export 되었는지 확인한다.

## 7. 배포 완료 기준
- 배포 URL에서 화면이 정상 표시된다.
- 감성분석 버튼 클릭 시 API가 호출된다.
- OpenAI API 응답 결과가 모달에 표시된다.
- Supabase에 분석 결과가 저장된다.
- 브라우저 콘솔에 보안 키가 노출되지 않는다.
