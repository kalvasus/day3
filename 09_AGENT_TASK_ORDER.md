# 09. Antigravity AI 작업 순서

## 목표
Antigravity AI 코딩 에이전트가 프로젝트를 단계적으로 구현할 수 있도록 작업 순서를 정의한다.

## 작업 순서 요약

```text
1. 프로젝트 초기 세팅
2. 디자인 토큰 및 기본 CSS 작성
3. HTML 화면 구조 작성
4. 모달 UI 작성
5. 프론트엔드 이벤트 구현
6. 백엔드 API 구현
7. OpenAI API 연동
8. Supabase 연동
9. 테스트 검증
10. Vercel 배포
```

## Step 1. 프로젝트 초기 세팅

### 작업
- `package.json` 생성
- 필요한 패키지 설치
- 폴더 구조 생성
- `.env.example` 생성
- `.gitignore` 생성

### 설치 패키지
```bash
npm install openai @supabase/supabase-js dotenv
```

Vercel 서버리스 함수 기반이면 Express는 필수 아님.  
로컬 Express 서버를 별도로 만들 경우 다음도 설치한다.

```bash
npm install express cors
```

## Step 2. 디자인 토큰 및 기본 CSS 작성

참고 문서:
- `01_DESIGN_SYSTEM.md`

### 작업
- CSS 변수 선언
- 기본 body 스타일 작성
- 버튼 스타일 작성
- 카드 스타일 작성
- 모달 스타일 작성
- 반응형 스타일 작성

## Step 3. HTML 화면 구조 작성

참고 문서:
- `02_UI_IMPLEMENTATION.md`

### 작업
- Header 구현
- Hero Section 구현
- Textarea 구현
- Analyze Button 구현
- Info Cards 구현
- Result Modal 구현
- Footer 구현

## Step 4. 프론트엔드 기능 구현

참고 문서:
- `03_FRONTEND_FEATURES.md`

### 작업
- DOM 요소 선택
- 입력값 검증
- fetch API 호출
- 로딩 상태 처리
- 결과 모달 데이터 바인딩
- 모달 열기/닫기
- 에러 메시지 표시

## Step 5. 백엔드 API 구현

참고 문서:
- `04_BACKEND_API.md`
- `06_API_SPEC.md`

### 작업
- `POST /api/analyze` 구현
- Request Body 검증
- OpenAI API 호출 함수 구현
- AI 응답 JSON 파싱
- sentimentLabel 변환
- JSON 응답 반환

## Step 6. Supabase 연동

참고 문서:
- `05_DATABASE_SUPABASE.md`

### 작업
- Supabase 프로젝트 생성
- SQL로 테이블 생성
- `lib/supabase.js` 작성
- API 성공 후 분석 결과 저장
- 저장 실패 시 서버 로그만 기록

## Step 7. 테스트 검증

참고 문서:
- `07_TESTING_CHECKLIST.md`

### 작업
- UI 테스트
- 입력값 검증 테스트
- API 테스트
- 감성 결과 테스트
- 모달 테스트
- Supabase 저장 테스트
- 보안 테스트

## Step 8. Vercel 배포

참고 문서:
- `08_DEPLOYMENT_GUIDE.md`

### 작업
- GitHub 저장소 연결
- Vercel 프로젝트 생성
- 환경변수 등록
- 배포 실행
- 배포 URL에서 최종 테스트

## 작업 원칙
- 한 번에 전체를 구현하지 말고 단계별로 구현한다.
- 각 단계 완료 후 브라우저 또는 API 테스트를 수행한다.
- OpenAI API Key와 Supabase Service Role Key는 절대 프론트엔드 코드에 작성하지 않는다.
- 실패 케이스를 먼저 방어하고 정상 케이스를 구현한다.
- UI는 첨부 디자인 시스템의 warm cream, green CTA, pill button, rounded card 원칙을 유지한다.

## 최종 완료 조건
- UI가 정상 표시된다.
- 사용자가 텍스트를 입력할 수 있다.
- 버튼 클릭 시 백엔드 API가 호출된다.
- OpenAI API가 감성을 분석한다.
- 결과가 Supabase에 저장된다.
- 결과 모달에 감성 결과, 신뢰도, 구분선, 분석 이유가 표시된다.
- Vercel 배포 환경에서도 정상 동작한다.
