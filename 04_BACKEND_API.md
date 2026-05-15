# 04. 백엔드 API 구현 명세

## 목표
Node.js 기반 API를 구현하여 프론트엔드 요청을 받고 OpenAI API를 호출한 뒤 분석 결과를 반환한다.

## 구현 파일
```text
api/
└── analyze.js

lib/
└── supabase.js
```

## 환경변수
```env
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## API 명세

### Endpoint
```http
POST /api/analyze
```

### Request Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
  "text": "오늘 서비스가 정말 만족스러웠어요."
}
```

## 입력값 검증

| 조건 | 응답 코드 | 메시지 |
|---|---:|---|
| text 없음 | 400 | 분석할 텍스트를 입력해주세요. |
| text 빈 문자열 | 400 | 분석할 텍스트를 입력해주세요. |
| text 1,000자 초과 | 400 | 텍스트는 최대 1,000자까지 입력할 수 있습니다. |

## OpenAI 요청

### System Prompt
```text
당신은 한국어 텍스트의 감성을 분석하는 AI입니다.
입력 문장을 positive, negative, neutral 중 하나로 분류하세요.
반드시 JSON 형식으로만 응답하세요.
confidence는 0부터 100 사이의 정수입니다.
reason은 한국어 2~3문장으로 작성하세요.
```

### User Prompt
```text
다음 텍스트의 감성을 분석하세요.

텍스트:
{{USER_TEXT}}

응답 형식:
{
  "sentiment": "positive | negative | neutral",
  "confidence": 0-100,
  "reason": "분석 이유 2~3문장"
}
```

## OpenAI 응답 정규화

### AI 응답
```json
{
  "sentiment": "positive",
  "confidence": 92,
  "reason": "문장에 긍정적인 표현이 포함되어 있습니다. 전반적인 어조가 호의적입니다."
}
```

### 서버 응답
```json
{
  "success": true,
  "data": {
    "sentiment": "positive",
    "sentimentLabel": "긍정",
    "confidence": 92,
    "reason": "문장에 긍정적인 표현이 포함되어 있습니다. 전반적인 어조가 호의적입니다."
  }
}
```

## sentimentLabel 변환 규칙

```js
const sentimentLabelMap = {
  positive: "긍정",
  negative: "부정",
  neutral: "중립"
};
```

## Supabase 저장 로직

OpenAI 응답이 정상적으로 파싱된 후 다음 데이터를 저장한다.

```js
{
  input_text: text,
  sentiment,
  sentiment_label: sentimentLabel,
  confidence,
  reason
}
```

## 오류 처리

### OpenAI API 오류
```json
{
  "success": false,
  "message": "감성 분석 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
}
```

### JSON 파싱 오류
```json
{
  "success": false,
  "message": "AI 응답을 처리하는 중 문제가 발생했습니다."
}
```

### Supabase 저장 오류
- 사용자에게는 분석 결과를 정상 반환한다.
- 서버 콘솔에만 저장 실패 로그를 남긴다.

## 완료 기준
- `POST /api/analyze` 요청을 받을 수 있다.
- 입력값 검증이 서버에서 수행된다.
- OpenAI API 호출이 서버에서만 수행된다.
- 응답이 정해진 JSON 형식으로 반환된다.
- Supabase 저장 실패가 사용자 경험을 막지 않는다.
