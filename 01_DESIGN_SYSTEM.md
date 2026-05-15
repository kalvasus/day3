# 01. 디자인 시스템

## 디자인 방향
첨부된 스타벅스풍 디자인 시스템을 참고하여 따뜻하고 신뢰감 있는 AI 분석 서비스를 구현한다.

핵심 방향은 다음과 같다.

- 따뜻한 크림색 배경
- 녹색 계열의 명확한 CTA
- 50px pill 버튼
- 12px 카드/모달 라운드
- 부드러운 다중 그림자
- 클릭 시 `scale(0.95)` 인터랙션
- 과한 그래디언트보다 단색 컬러 블록 중심

## 색상 토큰

```css
:root {
  --color-starbucks-green: #006241;
  --color-green-accent: #00754A;
  --color-house-green: #1E3932;
  --color-green-light: #d4e9e2;

  --color-warm-bg: #f2f0eb;
  --color-ceramic-bg: #edebe9;
  --color-white: #ffffff;

  --color-text-main: rgba(0, 0, 0, 0.87);
  --color-text-sub: rgba(0, 0, 0, 0.58);
  --color-text-white: #ffffff;
  --color-text-white-soft: rgba(255, 255, 255, 0.70);

  --color-error: #c82014;
  --color-gold: #cba258;
}
```

## Typography

```css
:root {
  --font-main: Inter, Manrope, "Helvetica Neue", Arial, sans-serif;

  --text-h1: 32px;
  --text-h2: 24px;
  --text-body: 16px;
  --text-small: 14px;

  --line-normal: 1.5;
  --line-compact: 1.2;

  --letter-tight: -0.01em;
}
```

## Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 40px;
  --space-7: 48px;
  --space-8: 56px;
  --space-9: 64px;
}
```

## Border Radius

```css
:root {
  --radius-card: 12px;
  --radius-button: 50px;
  --radius-circle: 50%;
}
```

## Shadow

```css
:root {
  --shadow-card: 0 0 0.5px rgba(0,0,0,0.14),
                 0 1px 1px rgba(0,0,0,0.24);

  --shadow-nav: 0 1px 3px rgba(0,0,0,0.1),
                0 2px 2px rgba(0,0,0,0.06),
                0 0 2px rgba(0,0,0,0.07);

  --shadow-modal: 0 0 6px rgba(0,0,0,0.24),
                  0 8px 12px rgba(0,0,0,0.14);
}
```

## 버튼 스타일

```css
.button-primary {
  background: var(--color-green-accent);
  color: var(--color-white);
  border: 1px solid var(--color-green-accent);
  border-radius: var(--radius-button);
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: var(--letter-tight);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-primary:active {
  transform: scale(0.95);
}

.button-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

## 카드 스타일

```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 24px;
}
```

## 모달 스타일

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.48);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: var(--color-white);
  border-radius: var(--radius-card);
  padding: 24px;
  box-shadow: var(--shadow-modal);
}
```

## 감성별 색상

| 감성 | 표시명 | 색상 |
|---|---|---|
| positive | 긍정 | `#00754A` |
| negative | 부정 | `#c82014` |
| neutral | 중립 | `rgba(0,0,0,0.58)` |
