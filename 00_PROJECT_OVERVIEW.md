# 00. 프로젝트 개요

## 제품명
AI Sentiment Analyzer

## 목표
사용자가 텍스트를 입력하면 OpenAI API를 통해 감성을 분석하고, 결과를 긍정/부정/중립으로 분류하여 모달창에 표시하는 웹 서비스를 만든다.

## 핵심 사용자 흐름
1. 사용자가 웹 페이지에 접속한다.
2. 텍스트 입력창에 분석할 문장을 입력한다.
3. 사용자가 감성분석 버튼을 클릭한다.
4. 프론트엔드는 백엔드 API로 입력 텍스트를 전송한다.
5. 백엔드는 OpenAI API를 호출하여 감성 분석 결과를 받는다.
6. 백엔드는 결과를 Supabase에 저장한다.
7. 프론트엔드는 응답 결과를 모달창으로 표시한다.

## 최종 결과 화면에 반드시 포함할 정보
- 감성 결과: 긍정 / 부정 / 중립
- 신뢰도: 백분율
- 구분선
- 분석 이유: 2~3문장

## 기술 스택
| 영역 | 기술 |
|---|---|
| Front-end | HTML, CSS, JavaScript |
| Back-end | Node.js |
| AI | OpenAI API |
| Database | Supabase |
| Deployment | Vercel |

## 권장 프로젝트 구조
```text
sentiment-analyzer/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── api/
│   └── analyze.js
├── lib/
│   └── supabase.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## MVP 완료 정의
다음 흐름이 정상 동작하면 MVP 완료로 본다.

```text
텍스트 입력 → 감성분석 버튼 클릭 → 백엔드 API 호출 → OpenAI API 분석 → Supabase 저장 → 결과 모달 표시
```
