# 05. Supabase 데이터베이스 명세

## 목표
사용자의 감성 분석 요청과 결과를 Supabase PostgreSQL에 저장한다.

## 테이블명
```text
sentiment_analyses
```

## 테이블 스키마

| 컬럼명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | uuid | 필수 | 기본키 |
| input_text | text | 필수 | 사용자가 입력한 원문 |
| sentiment | text | 필수 | positive, negative, neutral |
| sentiment_label | text | 필수 | 긍정, 부정, 중립 |
| confidence | integer | 필수 | 신뢰도 백분율 |
| reason | text | 필수 | 분석 이유 |
| created_at | timestamptz | 필수 | 생성일시 |

## SQL 생성문

```sql
create table sentiment_analyses (
  id uuid primary key default gen_random_uuid(),
  input_text text not null,
  sentiment text not null check (sentiment in ('positive', 'negative', 'neutral')),
  sentiment_label text not null check (sentiment_label in ('긍정', '부정', '중립')),
  confidence integer not null check (confidence >= 0 and confidence <= 100),
  reason text not null,
  created_at timestamptz not null default now()
);
```

## 인덱스

```sql
create index sentiment_analyses_created_at_idx
on sentiment_analyses (created_at desc);

create index sentiment_analyses_sentiment_idx
on sentiment_analyses (sentiment);
```

## Row Level Security
MVP에서는 서버 API에서만 Service Role Key를 사용해 저장한다.

권장 설정:
- RLS 활성화 여부는 프로젝트 보안 정책에 따라 결정한다.
- 클라이언트에서 직접 insert하지 않는다.
- Service Role Key는 프론트엔드에 절대 노출하지 않는다.

## 저장 예시

```json
{
  "id": "9d2b70e1-4e6a-4a71-8df4-1c6e1f4e8b10",
  "input_text": "오늘 서비스가 정말 만족스러웠어요.",
  "sentiment": "positive",
  "sentiment_label": "긍정",
  "confidence": 92,
  "reason": "문장에 긍정적인 표현이 포함되어 있습니다. 전반적인 어조가 호의적입니다.",
  "created_at": "2026-05-15T09:00:00Z"
}
```

## 완료 기준
- `sentiment_analyses` 테이블이 생성되어 있다.
- 감성 분석 성공 시 데이터가 저장된다.
- `confidence`는 0~100 사이 값만 저장된다.
- `sentiment`는 positive, negative, neutral 중 하나만 저장된다.
