# FLUX 프롬프트 최적화 가이드
> PicoArt/ArtTouch 프로젝트용 - 2025.12

## 🎯 핵심 원칙

### 1. 자연어 문장형 사용
FLUX는 GPT 기반이라 **자연어 문장**을 더 잘 이해함

| ❌ 비효율 (키워드 나열) | ✅ 효율 (자연어 문장) |
|----------------------|---------------------|
| `sunset, mountain, sky, pastel colors` | `A serene sunset over a mountain with pastel hues in the sky` |
| `thick brushstrokes, impasto, visible texture` | `thick impasto brushstrokes that are clearly visible throughout the canvas` |

### 2. "in the style of" 안 먹힘!
```
❌ "in the style of Van Gogh"
✅ "by Van Gogh, Van Gogh art style, expressive brushstrokes"
✅ "painting by Vincent van Gogh with thick swirling impasto"
```

### 3. 프롬프트 구조 (앞→뒤 순서)
중요한 정보를 **앞에 배치** (FLUX가 앞부분에 가중치 더 줌)
```
[핵심 주제/변환 목표] → [스타일/기법] → [색상/분위기] → [제외어]
```

### 4. 길이: 15-75 단어 권장
- 너무 짧으면 → 정보 부족
- 너무 길면 → 혼란 유발, 뒷부분 무시

---

## 🔧 효율적 표현 규칙

### 괄호/콜론 제거 → 쉼표로 통일
| Before | After |
|--------|-------|
| `(ruby red, sapphire blue, emerald green)` | `ruby red, sapphire blue, emerald green` |
| `style: POINTILLIST technique` | `POINTILLIST technique` |
| `painting by Van Gogh:` | `painting by Van Gogh,` |

### 범위 → 고정값 (AI가 작은 값 선택 방지)
| Before | After | 이유 |
|--------|-------|------|
| `(20mm or thicker)` | `20mm+` | 간결 |
| `tesserae tiles (20-30mm)` | `tesserae tiles 50mm` | AI가 20mm 선택 방지 |
| `dots (5-10mm)` | `LARGE DOTS 8mm` | 모바일에서 보여야 함 |

### 스타일별 권장 크기 고정값
| 스타일 | 크기 | 이유 |
|--------|:----:|------|
| **붓터치** | `20mm+` | 확대 없이도 보여야 함 |
| **점묘법** | `8mm` | 범위 주면 AI가 작은 점 선택 |
| **모자이크** | `50mm` | 타일이 커야 모바일에서 보임 |

---

## 🚫 FLUX의 사진 편향 극복

FLUX는 사진처럼 렌더링하려는 경향이 있음 → NOT 제외어 필수!

```
NOT photograph, NOT photorealistic, NOT smooth skin, 
NOT digital render, NOT 3D, NOT airbrushed
```

**자연어 통합 버전:**
```
This MUST look like a REAL HAND-PAINTED oil painting with visible brushwork, 
absolutely NOT a photograph, NOT digital art, NOT 3D render
```

---

## 💪 강조 기법

### 대문자 키워드
강조할 특징은 대문자로 (FLUX가 가중치 높게 인식)
```
DRAMATIC SPOTLIGHT, ANGULAR planes, MASK-LIKE features
VISIBLE THICK BRUSHSTROKES 20mm+
70% of canvas in PURE BLACK darkness
```

### NOT 부정어
원치 않는 결과 명시적 배제
```
deep rich blacks NOT grey NOT washed out
geometric fragmentation NOT realistic proportions
```

### 수치/비율 명시
```
70% of canvas in PURE BLACK
control_strength: 0.60
brushstrokes 20mm or thicker
```

---

## 🥪 샌드위치 기법

중요한 규칙을 **앞과 뒤에 반복** 배치
(FLUX가 프롬프트 앞부분과 뒷부분을 다르게 가중치 줄 수 있어서 효과적)

```javascript
const sandwichCore = 'PRESERVE FACE IDENTITY, VISIBLE BRUSHSTROKES 20mm+, NOT photograph';

finalPrompt = sandwichCore + ', ' + mainPrompt + ', ' + sandwichCore;
//            ↑ 앞에 한번              ↑ 뒤에 한번
```

---

## 🎨 화가별 효과적 키워드

| 화가 | 핵심 키워드 |
|------|------------|
| **반 고흐** | `thick impasto, swirling brushstrokes, expressive texture, vibrant yellows and blues` |
| **피카소** | `geometric planes, fractured forms, multiple perspectives, bold black outlines` |
| **모네** | `soft diffused light, delicate brushstrokes, atmospheric, pastel palette` |
| **카라바조** | `TENEBRISM, 70% PURE BLACK, DRAMATIC SPOTLIGHT, extreme light-dark contrast` |
| **쇠라/시냐크** | `LARGE VISIBLE DOTS 8mm, pointillist, soft pastel palette` |
| **워홀** | `bold flat colors, high contrast, pop art, silkscreen effect` |
| **클림트** | `gold leaf patterns, decorative mosaics, Byzantine influence` |

---

## ⚙️ control_strength 조절

스타일 변환 강도 조절 (0.0~1.0)

| 값 | 용도 | 예시 화가 |
|:--:|------|----------|
| **0.60** | 강한 스타일 변환 | 카라바조, 렘브란트 (명암 극단적) |
| **0.65** | 중간 | 루벤스 |
| **0.80** | 기본값 | 대부분 화가 |

---

## ❌ 피해야 할 것들

### Quality Tags 불필요
FLUX에서 효과 없음, 토큰 낭비
```
❌ "masterpiece, best quality, highly detailed, 8k, ultra HD"
```

### 과도한 반복
같은 키워드 반복은 효과 없고 혼란만 유발
```
❌ "NOT photograph, NOT photograph, NOT digital, NOT digital"
✅ "NOT photograph, NOT 3D, NOT digital" (한 번씩만)
```

### 모호한 표현
```
❌ "beautiful artistic style with dramatic lighting"
✅ "TENEBRISM technique with 70% PURE BLACK, DRAMATIC SPOTLIGHT from single source"
```

---

## 📝 최적화된 프롬프트 템플릿

### 일반 유화 스타일
```
Transform this photo into an authentic TRADITIONAL OIL PAINTING 
by [화가명], [화가명] art style, 
thick impasto with visible 20mm+ brushstrokes on face and clothing,
[색상 팔레트], [분위기/배경],
preserving face identity and gender exactly,
NOT photograph, NOT 3D, NOT digital
```

### 예시 - 반 고흐
```
Transform this photo into an authentic oil painting by Vincent van Gogh, 
Van Gogh art style, thick swirling impasto with visible 20mm+ brushstrokes 
throughout face and clothing, vibrant cobalt blue chrome yellow and emerald green palette, 
expressive turbulent background with dynamic brushwork,
preserving face identity age and gender exactly,
NOT photograph, NOT 3D, NOT digital
```

### 예시 - 카라바조 (테네브리즘)
```
Transform this photo into a Baroque oil painting by Caravaggio, 
Caravaggio art style with TENEBRISM technique, 
70% of canvas in PURE BLACK darkness with DRAMATIC SPOTLIGHT from single source,
EXTREME light-dark contrast on face with half in shadow half in light,
deep rich blacks NOT grey NOT washed out,
preserving face identity and gender exactly,
NOT photograph, NOT 3D, NOT digital
```

### 예시 - 피카소 (입체주의)
```
Transform this photo into an authentic CUBIST OIL PAINTING by Pablo Picasso,
Picasso art style with geometric fragmentation,
face MUST be broken into ANGULAR planes showing nose from side while both eyes visible from front,
bold black outlines separating each geometric section,
muted earth tones with occasional blue or rose accents,
preserving subject identity through fragmented forms,
NOT realistic proportions, NOT photograph, NOT 3D
```

---

## 📚 참고 자료
- Black Forest Labs 공식 가이드
- getimg.ai, fal.ai 2025 최신 가이드
- PicoArt 프로젝트 테스트 결과 (2024-2025)

---

## 🛠️ 대표작 관리 가이드 (v67)

### 거장 대표작 추가/수정 방법

**이제 masterworks.js 1곳만 수정하면 됩니다!**

#### 1️⃣ 작품명 매핑 추가 (파일 상단)
```javascript
// masterworks.js
export const masterworkNameMapping = {
  // 기존 작품들...
  
  // 뭉크에 새 작품 추가 예시
  'the sick child': 'munch-sickchild',
  '병든 아이': 'munch-sickchild',  // 한글명도 반드시 추가
  
  // 반 고흐에 새 작품 추가 예시
  'bedroom in arles': 'vangogh-bedroom',
  '아를의 침실': 'vangogh-bedroom',
  ...
};
```

#### 2️⃣ 대표작 프롬프트 정의
```javascript
// masterworks.js
export const munchMasterworks = {
  'munch-scream': { ... },
  'munch-sickchild': {  // 새 작품 추가
    name: '병든 아이',
    nameEn: 'The Sick Child',
    prompt: 'Transform this into The Sick Child by Edvard Munch, Munch art style with emotional rawness and visible brushstrokes, pale sickly colors...',
    feature: '단독, 슬픔'
  }
};
```

#### 3️⃣ 끝!
- flux-transfer.js는 수정 불필요 (자동 반영)
- artistStyles.js는 수정 불필요 (화풍만 관리)

---

### 사조 화가 대표작 추가/수정 방법

**카라바조, 루벤스 등 사조 화가는 더 간단합니다!**

#### masterworks.js만 수정
```javascript
export const caravaggioMasterworks = {
  'caravaggio-david': { ... },
  'caravaggio-judith': { ... },  // ✅ 유디트로 교체 완료
  'caravaggio-matthew': { ... }
};

const artistMasterworks = {
  'caravaggio': ['caravaggio-david', 'caravaggio-judith', 'caravaggio-matthew']  // ✅ 목록도 업데이트
};
```

- 작품명 매핑 불필요 (AI가 키를 직접 반환)
- flux-transfer.js 수정 불필요

---

### 📊 대표작 관리 요약

| 구분 | 수정 파일 | 수정 항목 |
|------|----------|----------|
| **거장 7명** | masterworks.js | 1. 작품명 매핑<br>2. 대표작 프롬프트 |
| **사조 화가** | masterworks.js | 대표작 프롬프트만 |
| **공통** | ~~flux-transfer.js~~ | ❌ 수정 불필요 |
