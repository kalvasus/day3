# 06. API 명세서

## Base URL

### 로컬 개발
```text
http://localhost:3000
```

### Vercel 배포
```text
https://{vercel-project-domain}
```

## 1. 감성 분석 API

### Endpoint
```http
POST /api/analyze
```

### 설명
사용자가 입력한 텍스트를 받아 OpenAI API로 감성 분석을 수행하고, 결과를 Supabase에 저장한 뒤 프론트엔드로 반환한다.

## Request

### Headers
```http
Content-Type: application/json
```

### Body
```json
{
  "text": "오늘 서비스가 정말 만족스러웠어요."
}
```

### Body Fields

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| text | string | 필수 | 분석할 사용자 입력 텍스트 |

## Success Response

### Status Code
```http
200 OK
```

### Body
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

## Error Responses

### 400 Bad Request: 입력값 없음
```json
{
  "success": false,
  "message": "분석할 텍스트를 입력해주세요."
}
```

### 400 Bad Request: 입력값 길이 초과
```json
{
  "success": false,
  "message": "텍스트는 최대 1,000자까지 입력할 수 있습니다."
}
```

### 500 Internal Server Error: OpenAI 오류
```json
{
  "success": false,
  "message": "감성 분석 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
}
```

### 500 Internal Server Error: AI 응답 파싱 오류
```json
{
  "success": false,
  "message": "AI 응답을 처리하는 중 문제가 발생했습니다."
}
```

## Sentiment Enum

| 값 | 화면 표시 |
|---|---|
| positive | 긍정 |
| negative | 부정 |
| neutral | 중립 |

## API 테스트용 cURL

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"오늘 서비스가 정말 만족스러웠어요."}'
```

## 완료 기준
- 정상 요청 시 200 응답을 반환한다.
- 잘못된 요청 시 400 응답을 반환한다.
- 서버 오류 시 500 응답을 반환한다.
- 모든 응답은 JSON 형식이다.
