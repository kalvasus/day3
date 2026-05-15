# 03. 프론트엔드 기능 구현 명세

## 목표
`public/js/app.js`에서 사용자 입력, API 호출, 로딩 상태, 에러 처리, 모달 표시 기능을 구현한다.

## 주요 DOM 요소
```js
const textarea = document.querySelector("#sentimentText");
const analyzeButton = document.querySelector("#analyzeButton");
const errorMessage = document.querySelector("#errorMessage");

const modalBackdrop = document.querySelector("#resultModalBackdrop");
const modal = document.querySelector("#resultModal");
const modalCloseButton = document.querySelector("#modalCloseButton");
const modalConfirmButton = document.querySelector("#modalConfirmButton");

const resultLabel = document.querySelector("#resultLabel");
const resultConfidence = document.querySelector("#resultConfidence");
const resultReason = document.querySelector("#resultReason");
```

## 기능 1. 입력값 검증

### 조건
- 입력값이 비어 있으면 요청하지 않는다.
- 공백만 입력된 경우도 비어 있는 것으로 처리한다.
- 1,000자를 초과하면 요청하지 않는다.

### 에러 메시지
```text
분석할 텍스트를 입력해주세요.
```

```text
텍스트는 최대 1,000자까지 입력할 수 있습니다.
```

## 기능 2. API 요청

### Endpoint
```http
POST /api/analyze
```

### Request Body
```json
{
  "text": "오늘 서비스가 정말 만족스러웠어요."
}
```

### fetch 예시
```js
async function analyzeSentiment(text) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "감성 분석 중 문제가 발생했습니다.");
  }

  return result.data;
}
```

## 기능 3. 로딩 상태 처리

### 요청 전
- 버튼 비활성화
- 버튼 텍스트를 `분석 중...`으로 변경
- 기존 에러 메시지 제거

### 요청 완료 후
- 버튼 활성화
- 버튼 텍스트를 `감성분석`으로 복구

## 기능 4. 결과 모달 표시

### API 응답 예시
```json
{
  "sentiment": "positive",
  "sentimentLabel": "긍정",
  "confidence": 92,
  "reason": "문장에 긍정적인 표현이 포함되어 있습니다. 전반적인 어조가 호의적입니다."
}
```

### 표시 규칙
- `sentimentLabel`을 큰 텍스트로 표시한다.
- `confidence`는 `신뢰도 92%` 형식으로 표시한다.
- `reason`은 구분선 아래에 표시한다.
- 감성별 색상을 적용한다.

## 기능 5. 감성별 색상 매핑

```js
const sentimentColors = {
  positive: "#00754A",
  negative: "#c82014",
  neutral: "rgba(0,0,0,0.58)"
};
```

## 기능 6. 모달 닫기

### 닫기 트리거
- 닫기 버튼 클릭
- 확인 버튼 클릭
- 모달 바깥 영역 클릭
- ESC 키 입력

## 기능 7. 에러 처리

### 네트워크 에러
```text
서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.
```

### 서버 에러
서버에서 전달한 `message` 값을 표시한다.

## 완료 기준
- 입력값 검증이 동작한다.
- 버튼 클릭 시 API 요청이 발생한다.
- 요청 중 버튼 상태가 변경된다.
- 성공 응답 시 모달이 열린다.
- 실패 응답 시 에러 메시지가 표시된다.
- 모달 닫기 기능이 정상 동작한다.
