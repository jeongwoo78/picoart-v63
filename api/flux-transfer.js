// PicoArt v64 - FLUX 프롬프트 효율화 (자연어 + 키워드 하이브리드)
// v64: 자연어 문장형 프롬프트 적용
//      - 대전제, 샌드위치, paintingEnforcement 자연어 문장형으로 변환
//      - "by [Artist], [Artist] art style" 패턴 적용
//      - FLUX 효율적 전달 방식 적용 (연구 결과 기반)
//      - 핵심 내용 유지하면서 더 명확한 전달
//
// v63: 대전제 v2 + 화가별 프롬프트 개선
//      - 대전제: 스타일 우선 + 사진 제외어 강화
//      - 화가: "by XY, XY art style" 패턴 적용
//      - 기법: 구체적 묘사 추가 (impasto, palette knife 등)
//      - 사진 제외: NOT photograph, NOT photorealistic, NOT cinematic 추가
//
// v62.5: FLUX Pro 테스트 (반 고흐/피카소/워홀)
//      - 결과: 비용 2배, 효과 없음 → 포기
//
// v62.1: 대전제 PREFIX 위치 수정
//      - 환각 방지 강화: "If 1 person in photo, output must have EXACTLY 1 person"
//      - 스타일 적용 강화: "people must look PAINTED not photographic"
//
// v62: artistEnhancements.js 연동 + 프롬프트 순서 최적화
//      - 대전제 6개 규칙 → 프롬프트 맨 앞으로 이동 (AI 우선순위)
//      - 거장 대표작별 세부 프롬프트 실제 적용 (20개)
//      - avoidFor 관계 체크 (부모-자녀 → The Kiss 금지 등)
//      - expressionRule 적용 (뭉크 NO bright NO smiling 등)
//      - artistEnhancements.js에서 프롬프트 import
//
// v61: 의상 변환 체계화 + 붓터치 강화 + 거장 표정 규칙
//      - 대전제 6개 규칙 (신원/관계/매력/환각/스타일+붓터치/텍스트)
//      - 사조별 강화 프롬프트 53개 (체계화)
//      - 거장 대표작별 강화 프롬프트 20개 (신규)
//      - 붓터치 필수 규칙 공통 적용
//      - 거장 모드: 사조 개인 + 대표작 프롬프트 결합

// ========================================
// v62: artistEnhancements.js → v66에서 삭제됨 (artistStyles.js로 통합)
// ========================================

// ========================================
// v64: 사조별 대표작 매칭 시스템
// ========================================
import {
  getMovementMasterwork,
  getMasterworkGuideForAI,
  getArtistMasterworkList,
  getMovementMasterworkGuide,
  allMovementMasterworks,
  masterworkNameMapping
} from './masterworks.js';

// ========================================
// v66: 통합 화풍 프롬프트
// ========================================
import {
  ARTIST_STYLES,
  GENDER_RULE,
  PAINT_TEXTURE,
  getArtistStyle,
  getArtistStyleByName
} from './artistStyles.js';

// ========================================
// v67: 대표작 키 변환 함수 (간소화)
// "The Kiss" → "klimt-kiss"
// "The Starry Night" → "vangogh-starrynight"
// masterworks.js의 masterworkNameMapping 사용
// ========================================
function convertToWorkKey(artistName, workTitle) {
  if (!artistName || !workTitle) return null;
  
  // 작품명으로 직접 조회 (masterworks.js에서 관리)
  const normalized = workTitle.toLowerCase().trim();
  const directKey = masterworkNameMapping[normalized];
  
  if (directKey) return directKey;
  
  // 매핑에 없으면 null 반환 (fallback 처리는 호출하는 쪽에서)
  return null;
}

// ========================================
// v62: 대체 대표작 선택 (avoidFor 적용시)
// ========================================
function getAlternativeWork(artistName, avoidedWork) {
  const alternatives = {
    'klimt': {
      'kiss': 'treeoflife',      // The Kiss 대신 → 생명의 나무
      'treeoflife': 'judith',
      'judith': 'treeoflife'
    },
    'munch': {
      'scream': 'madonna',       // 절규 대신 → 마돈나
      'madonna': 'scream'
    },
    'picasso': {
      'demoiselles': 'weepingwoman',
      'guernica': 'demoiselles',
      'weepingwoman': 'demoiselles'
    },
    'frida': {
      'brokencolumn': 'parrots', // 부러진 기둥 대신 → 앵무새
      'thornnecklace': 'monkeys',
      'parrots': 'monkeys',
      'monkeys': 'parrots'
    }
  };
  
  const artistKey = artistName.toLowerCase().trim();
  if (alternatives[artistKey] && alternatives[artistKey][avoidedWork]) {
    return alternatives[artistKey][avoidedWork];
  }
  return null;
}
//
// v59: 20세기 모더니즘 7명으로 축소 + 사진 유형별 비중 시스템
//      - 7명: 피카소, 마그리트, 미로, 샤갈, 워홀, 리히텐슈타인, 키스해링
//      - 제외: 브라크(피카소 중복), 달리(완전 삭제)
//      - 사진 유형별 비중:
//        🧑 단독 인물: 피카소35%, 마그리트25%, 워홀25%, 리히텐슈타인10%, 해링5%
//        💑 커플: 피카소30%, 샤갈25%, 마그리트20%, 워홀15%, 리히텐슈타인10%
//        👥 그룹3+: 피카소35%, 해링35%, 샤갈15%, 리히텐슈타인15%
//        🏞️ 풍경: 피카소25%, 마그리트25%, 샤갈20%, 미로15%
//        🍎 정물: 피카소35%, 마그리트25%, 미로20%, 워홀20%
//      - 미로: 풍경/정물 전용 (인물 제외)
//
// v58: 20세기 모더니즘 가이드라인 단순화 (네가티브 원칙)
//      - 거장 11명 강화 프롬프트 한글 감지 추가
//        (샤갈, 반 고흐, 모네, 클림트, 뭉크, 마티스, 피카소, 워홀, 프리다, 마그리트)
//
// v51: 20세기 모더니즘 추가 (11번째 사조)
//      - 입체주의: 피카소
//      - 초현실주의: 마그리트, 미로, 샤갈
//      - 팝아트: 워홀, 리히텐슈타인, 키스해링
//      ⛔ 제외: 만 레이(사진작가), 프리다(마스터 전용), 뒤샹(개념미술), 폴록/로스코(완전추상), 달리(삭제), 브라크(중복)
//
// v57: 중세 미술 회화 느낌 방지 강화
//      
//      고딕 (Gothic):
//        "FLAT TWO-DIMENSIONAL medieval style"
//        "NOT realistic smooth oil painting"
//        "angular linear forms with hard edges"
//        "like stained glass panels + manuscripts"
//      
//      로마네스크 (Romanesque):
//        "FLAT MURAL FRESCO style like church walls"
//        "NOT smooth realistic painting"
//        "solid block-like forms with heavy outlines"
//        "simple colors and bold shapes like stone carvings"
//      
//      목표: 스테인드글라스/필사본/프레스코 느낌
//      금지: 사실적 유화, 부드러운 회화
//
// v56: 40% 구성 기준 + 순백 대리석
//
// v47: 고대 그리스 대리석 조각 + 생동감 있는 눈동자
//
// v46: 르네상스 남성 초상화 최적화
//      남성 상반신 → 티치아노 70% (베네치아 초상화 전통)
//      여성 상반신 → 다 빈치 80% (모나리자 스푸마토)
//      남성 전신 → 미켈란젤로 (다비드 영웅성)
//
// v45: 중세 미술에 이슬람 미술 추가 (로마네스크 제거)
//      인물 사진: 비잔틴 55% / 고딕 25% / 이슬람 세밀화 20%
//      풍경 사진: 비잔틴 / 고딕 / 이슬람 기하학 (AI 선택, 세밀화 금지)
//
// 미술사조 11개 (시간순):
//   1. 고대 그리스-로마 (BC 800~AD 500) - 유지
//   2. 중세 미술 (4~15세기) - 비잔틴·고딕·로마네스크·이슬람
//      → Islamic Miniature: 인물 전용 (페르시아 세밀화, 궁정 우아함)
//      → Islamic Geometric: 풍경 전용 (기하학 패턴, 아라베스크)
//   3. 르네상스 (1400~1600) - 5명 화가 선택 ⭐ 남성 초상화 최적화
//   4. 바로크 (1600~1750) - 5명 화가 선택
//   5. 로코코 (1720~1780) - 2명 화가 선택
//   6. 신고전 vs 낭만 vs 사실주의 (1770~1870) - 7명 화가 선택 (AI가 3개 중 선택)
//      → David, Ingres (신고전주의)
//      → Turner, Delacroix (낭만주의)
//      → Courbet, Manet (사실주의)
//   7. 인상주의 (1860~1890) - 4명 화가 선택
//   8. 후기인상주의 (1880~1910) - 4명 화가 선택
//   9. 야수파 (1905~1908) - 3명 화가 선택
//  10. 표현주의 (1905~1920) - 4명 화가 선택
//  11. 20세기 모더니즘 (1907~1970) - 7명 화가 선택 ⭐ v59 업데이트
//      → 입체주의: 피카소
//      → 초현실주의: 마그리트, 미로(풍경/정물전용), 샤갈
//      → 팝아트: 워홀, 리히텐슈타인, 키스해링
//      ⛔ 제외: 브라크(피카소중복), 달리(삭제), 만 레이(사진작가), 프리다(마스터전용)
//
// 거장 7명 (시간순 + 생사연도):
//   1. 반 고흐 (1853-1890, 후기인상주의)
//   2. 클림트 (1862-1918, 아르누보)
//   3. 뭉크 (1863-1944, 표현주의)
//   4. 마티스 (1869-1954, 야수파)
//   5. 피카소 (1881-1973, 입체주의)
//   6. 프리다 칼로 (1907-1954, 멕시코)
//   7. 앤디 워홀 (1928-1987, 팝아트)


// ========================================
// 사조별 화가 가이드라인 함수
// ========================================

// ========================================
// 🎯 대전제: 가중치 기반 랜덤 화가 선택 시스템
// ========================================
// 비중이 설정된 사조에서는 AI에게 맡기지 않고
// 코드에서 비율대로 랜덤 선택 → AI에게 지정
// ========================================

// 가중치 기반 랜덤 선택 함수
function weightedRandomSelect(weightedOptions) {
  const totalWeight = weightedOptions.reduce((sum, opt) => sum + opt.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const option of weightedOptions) {
    random -= option.weight;
    if (random <= 0) {
      return option.name;
    }
  }
  return weightedOptions[0].name; // fallback
}

// 사진 유형 감지 함수
function detectPhotoType(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // 풍경 감지
  const isLandscape = subject && (
    subject.includes('landscape') || subject.includes('nature') || 
    subject.includes('mountain') || subject.includes('sea') || 
    subject.includes('sky') || subject.includes('scenery') ||
    subject.includes('building') || subject.includes('city')
  ) && (!count || count === 0);
  
  // 정물 감지
  const isStillLife = subject && (
    subject.includes('food') || subject.includes('flower') || 
    subject.includes('object') || subject.includes('still') ||
    subject.includes('fruit') || subject.includes('bottle') ||
    subject.includes('table')
  ) && (!count || count === 0);
  
  // 동물 감지
  const isAnimal = subject && (
    subject.includes('animal') || subject.includes('pet') || 
    subject.includes('dog') || subject.includes('cat') || 
    subject.includes('bird') || subject.includes('horse')
  ) && (!count || count === 0);
  
  if (isLandscape) return 'landscape';
  if (isStillLife) return 'stillLife';
  if (isAnimal) return 'animal';
  if (count >= 3) return 'group';
  if (count === 2) return 'couple';
  if (count === 1) return 'portrait';
  
  return 'default';
}

// ========================================
// 사조별 가중치 테이블
// ========================================

const ARTIST_WEIGHTS = {
  // 모더니즘 (7명)
  modernism: {
    portrait: [
      { name: 'PICASSO', weight: 35 },
      { name: 'MAGRITTE', weight: 25 },
      { name: 'WARHOL', weight: 25 },
      { name: 'LICHTENSTEIN', weight: 10 },
      { name: 'KEITH HARING', weight: 5 }
    ],
    couple: [
      { name: 'PICASSO', weight: 30 },
      { name: 'CHAGALL', weight: 25 },
      { name: 'MAGRITTE', weight: 20 },
      { name: 'WARHOL', weight: 15 },
      { name: 'LICHTENSTEIN', weight: 10 }
    ],
    group: [
      { name: 'PICASSO', weight: 35 },
      { name: 'KEITH HARING', weight: 35 },
      { name: 'CHAGALL', weight: 15 },
      { name: 'LICHTENSTEIN', weight: 15 }
    ],
    landscape: [
      { name: 'PICASSO', weight: 25 },
      { name: 'MAGRITTE', weight: 25 },
      { name: 'CHAGALL', weight: 20 },
      { name: 'MIRÓ', weight: 15 },
      { name: 'PICASSO', weight: 15 } // 나머지
    ],
    stillLife: [
      { name: 'PICASSO', weight: 35 },
      { name: 'MAGRITTE', weight: 25 },
      { name: 'MIRÓ', weight: 20 },
      { name: 'WARHOL', weight: 20 }
    ],
    default: [
      { name: 'PICASSO', weight: 30 },
      { name: 'MAGRITTE', weight: 20 },
      { name: 'WARHOL', weight: 20 },
      { name: 'LICHTENSTEIN', weight: 15 },
      { name: 'CHAGALL', weight: 10 },
      { name: 'KEITH HARING', weight: 5 }
    ]
  },
  
  // 르네상스
  renaissance: {
    portrait: [
      { name: 'LEONARDO DA VINCI', weight: 40 },
      { name: 'TITIAN', weight: 30 },
      { name: 'RAPHAEL', weight: 20 },
      { name: 'BOTTICELLI', weight: 10 }
    ],
    femaleFace: [
      { name: 'LEONARDO DA VINCI', weight: 80 },
      { name: 'BOTTICELLI', weight: 15 },
      { name: 'RAPHAEL', weight: 5 }
    ],
    maleFace: [
      { name: 'TITIAN', weight: 70 },
      { name: 'RAPHAEL', weight: 20 },
      { name: 'LEONARDO DA VINCI', weight: 10 }
    ],
    landscape: [
      { name: 'TITIAN', weight: 50 },
      { name: 'LEONARDO DA VINCI', weight: 30 },
      { name: 'RAPHAEL', weight: 20 }
    ],
    default: [
      { name: 'LEONARDO DA VINCI', weight: 35 },
      { name: 'TITIAN', weight: 30 },
      { name: 'RAPHAEL', weight: 20 },
      { name: 'BOTTICELLI', weight: 15 }
    ]
  },
  
  // 바로크
  baroque: {
    portrait: [
      { name: 'CARAVAGGIO', weight: 45 },
      { name: 'REMBRANDT', weight: 35 },
      { name: 'VELÁZQUEZ', weight: 12 },
      { name: 'RUBENS', weight: 8 }
    ],
    elderly: [
      { name: 'REMBRANDT', weight: 70 },
      { name: 'CARAVAGGIO', weight: 20 },
      { name: 'VELÁZQUEZ', weight: 10 }
    ],
    femaleWindow: [
      { name: 'REMBRANDT', weight: 60 },
      { name: 'VELÁZQUEZ', weight: 25 },
      { name: 'RUBENS', weight: 15 }
    ],
    formal: [
      { name: 'VELÁZQUEZ', weight: 60 },
      { name: 'REMBRANDT', weight: 25 },
      { name: 'CARAVAGGIO', weight: 15 }
    ],
    couple: [
      { name: 'RUBENS', weight: 60 },
      { name: 'REMBRANDT', weight: 25 },
      { name: 'CARAVAGGIO', weight: 15 }
    ],
    group: [
      { name: 'RUBENS', weight: 50 },
      { name: 'REMBRANDT', weight: 30 },
      { name: 'CARAVAGGIO', weight: 20 }
    ],
    default: [
      { name: 'CARAVAGGIO', weight: 35 },
      { name: 'REMBRANDT', weight: 30 },
      { name: 'VELÁZQUEZ', weight: 20 },
      { name: 'RUBENS', weight: 15 }
    ]
  },
  
  // 로코코
  rococo: {
    outdoor: [
      { name: 'WATTEAU', weight: 70 },
      { name: 'BOUCHER', weight: 30 }
    ],
    default: [
      { name: 'BOUCHER', weight: 70 },
      { name: 'WATTEAU', weight: 30 }
    ]
  },
  
  // 중세 - v67: 비잔틴 주력 (60%)
  medieval: {
    default: [
      { name: 'BYZANTINE', weight: 60 },
      { name: 'GOTHIC', weight: 20 },
      { name: 'ISLAMIC MINIATURE', weight: 20 }
    ]
  },
  
  // 신고전주의
  neoclassicism: {
    formal: [
      { name: 'JACQUES-LOUIS DAVID', weight: 70 },
      { name: 'INGRES', weight: 30 }
    ],
    femaleFace: [
      { name: 'INGRES', weight: 65 },
      { name: 'JACQUES-LOUIS DAVID', weight: 35 }
    ],
    landscape: [
      { name: 'JACQUES-LOUIS DAVID', weight: 60 },
      { name: 'INGRES', weight: 40 }
    ],
    default: [
      { name: 'JACQUES-LOUIS DAVID', weight: 60 },
      { name: 'INGRES', weight: 40 }
    ]
  },
  
  // 신고전 vs 낭만 vs 사실주의 (프론트엔드 카테고리명)
  neoclassicism_vs_romanticism_vs_realism: {
    portrait: [
      { name: 'INGRES', weight: 35 },
      { name: 'MANET', weight: 35 },
      { name: 'JACQUES-LOUIS DAVID', weight: 30 }
    ],
    movement: [  // 스포츠/액션
      { name: 'DELACROIX', weight: 60 },       // 역동적 군중, 격렬한 동작
      { name: 'JACQUES-LOUIS DAVID', weight: 25 },  // 영웅적 포즈
      { name: 'TURNER', weight: 15 }
    ],
    landscape: [
      { name: 'TURNER', weight: 50 },        // 낭만주의 풍경 대표
      { name: 'DELACROIX', weight: 20 },     // 낭만주의
      { name: 'COURBET', weight: 20 },       // 사실주의 풍경
      { name: 'MANET', weight: 10 }          // 사실주의
    ],
    dramatic: [
      { name: 'DELACROIX', weight: 50 },
      { name: 'TURNER', weight: 30 },
      { name: 'COURBET', weight: 20 }
    ],
    default: [
      { name: 'JACQUES-LOUIS DAVID', weight: 20 },
      { name: 'DELACROIX', weight: 20 },
      { name: 'TURNER', weight: 20 },
      { name: 'MANET', weight: 15 },
      { name: 'COURBET', weight: 15 },
      { name: 'INGRES', weight: 10 }
    ]
  },
  
  // 고대 그리스-로마 (스타일 선택)
  ancient: {
    indoor: [
      { name: 'CLASSICAL SCULPTURE', weight: 80 },
      { name: 'ROMAN MOSAIC', weight: 20 }
    ],
    outdoor: [
      { name: 'ROMAN MOSAIC', weight: 80 },
      { name: 'CLASSICAL SCULPTURE', weight: 20 }
    ],
    sports: [
      { name: 'CLASSICAL SCULPTURE', weight: 90 },
      { name: 'ROMAN MOSAIC', weight: 10 }
    ],
    animal: [
      { name: 'ROMAN MOSAIC', weight: 95 },
      { name: 'CLASSICAL SCULPTURE', weight: 5 }
    ],
    default: [
      { name: 'CLASSICAL SCULPTURE', weight: 50 },
      { name: 'ROMAN MOSAIC', weight: 50 }
    ]
  },
  
  // 인상주의 (4명) - 피사로→칼리보트 교체 (도시풍경/남성인물 차별화)
  impressionism: {
    portrait: [
      { name: 'RENOIR', weight: 35 },      // 여성/아이 인물 (AI힌트로 분기)
      { name: 'MONET', weight: 30 },
      { name: 'CAILLEBOTTE', weight: 35 }  // 남성 인물 (AI힌트로 분기)
    ],
    movement: [
      { name: 'DEGAS', weight: 50 },
      { name: 'RENOIR', weight: 30 },
      { name: 'MONET', weight: 15 },
      { name: 'CAILLEBOTTE', weight: 5 }
    ],
    landscape_nature: [  // 자연 풍경 (산, 숲, 바다, 정원)
      { name: 'MONET', weight: 85 },       // 자연 풍경 전문
      { name: 'RENOIR', weight: 15 }       // 야외 장면
      // 드가/칼리보트 제외
    ],
    landscape_urban: [   // 도시 풍경 (건물, 거리)
      { name: 'CAILLEBOTTE', weight: 70 }, // 도시 풍경 전문
      { name: 'MONET', weight: 30 }
    ],
    landscape: [  // 기본 풍경 (분류 불가 시)
      { name: 'MONET', weight: 70 },
      { name: 'RENOIR', weight: 20 },
      { name: 'CAILLEBOTTE', weight: 10 }
      // 드가 제외 (발레/실내 전문)
    ],
    default: [
      { name: 'RENOIR', weight: 35 },
      { name: 'MONET', weight: 35 },
      { name: 'CAILLEBOTTE', weight: 20 },
      { name: 'DEGAS', weight: 10 }
    ]
  },
  
  // 후기인상주의 (4명)
  postImpressionism: {
    portrait: [
      { name: 'VAN GOGH', weight: 50 },
      { name: 'GAUGUIN', weight: 35 },
      { name: 'SIGNAC', weight: 15 }
      // CÉZANNE 제외 - 정물/풍경 전문
    ],
    landscape: [
      { name: 'VAN GOGH', weight: 35 },
      { name: 'CÉZANNE', weight: 30 },
      { name: 'GAUGUIN', weight: 20 },
      { name: 'SIGNAC', weight: 15 }
    ],
    stillLife: [
      { name: 'CÉZANNE', weight: 60 },
      { name: 'VAN GOGH', weight: 25 },
      { name: 'GAUGUIN', weight: 10 },
      { name: 'SIGNAC', weight: 5 }
    ],
    default: [
      { name: 'VAN GOGH', weight: 40 },
      { name: 'GAUGUIN', weight: 30 },
      { name: 'CÉZANNE', weight: 15 },
      { name: 'SIGNAC', weight: 15 }
    ]
  },
  
  // 야수파 (3명)
  fauvism: {
    portrait: [
      { name: 'MATISSE', weight: 45 },
      { name: 'DERAIN', weight: 30 },
      { name: 'VLAMINCK', weight: 25 }
    ],
    landscape: [
      { name: 'DERAIN', weight: 45 },
      { name: 'VLAMINCK', weight: 35 },
      { name: 'MATISSE', weight: 20 }
    ],
    default: [
      { name: 'MATISSE', weight: 35 },
      { name: 'DERAIN', weight: 35 },
      { name: 'VLAMINCK', weight: 30 }
    ]
  },
  
  // 표현주의 (3명) - 칸딘스키 제외
  expressionism: {
    portrait: [
      { name: 'MUNCH', weight: 40 },
      { name: 'KOKOSCHKA', weight: 35 },
      { name: 'KIRCHNER', weight: 25 }
    ],
    urban: [
      { name: 'KIRCHNER', weight: 50 },
      { name: 'KOKOSCHKA', weight: 30 },
      { name: 'MUNCH', weight: 20 }
    ],
    default: [
      { name: 'MUNCH', weight: 40 },
      { name: 'KOKOSCHKA', weight: 35 },
      { name: 'KIRCHNER', weight: 25 }
    ]
  }
};

// 사조별 가중치 선택 함수
function selectArtistByWeight(category, photoAnalysis) {
  const weights = ARTIST_WEIGHTS[category];
  if (!weights) return null; // 가중치 없으면 AI 자유 선택
  
  const photoType = detectPhotoType(photoAnalysis);
  
  // 특수 케이스 처리 (성별 등)
  if (category === 'renaissance') {
    if (photoAnalysis.gender === 'female' && photoType === 'portrait') {
      return weightedRandomSelect(weights.femaleFace);
    }
    if (photoAnalysis.gender === 'male' && photoType === 'portrait') {
      return weightedRandomSelect(weights.maleFace);
    }
  }
  
  if (category === 'baroque') {
    if (photoAnalysis.age === 'elderly') {
      return weightedRandomSelect(weights.elderly);
    }
  }
  
  if (category === 'rococo') {
    if (photoAnalysis.background?.includes('outdoor') || photoAnalysis.background?.includes('garden')) {
      return weightedRandomSelect(weights.outdoor);
    }
  }
  
  // 고대 그리스-로마 특수 처리
  if (category === 'ancient') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    const background = (photoAnalysis.background || '').toLowerCase();
    
    // 동물 → 모자이크
    if (subject.includes('animal') || subject.includes('pet') || subject.includes('dog') || subject.includes('cat')) {
      return weightedRandomSelect(weights.animal);
    }
    // 스포츠/액션 → 조각
    if (subject.includes('sport') || subject.includes('action') || subject.includes('running') || subject.includes('athletic')) {
      return weightedRandomSelect(weights.sports);
    }
    // 야외 → 모자이크
    if (background.includes('outdoor') || background.includes('nature') || background.includes('landscape')) {
      return weightedRandomSelect(weights.outdoor);
    }
    // 실내 → 조각
    if (background.includes('indoor') || background.includes('studio') || background.includes('room')) {
      return weightedRandomSelect(weights.indoor);
    }
  }
  
  // 인상주의 특수 처리
  if (category === 'impressionism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    const background = (photoAnalysis.background || '').toLowerCase();
    
    // 움직임/액션 → 드가
    if (subject.includes('dance') || subject.includes('movement') || subject.includes('action') || subject.includes('sport')) {
      return weightedRandomSelect(weights.movement);
    }
    
    // 인물 사진 + 배경 체크 → 카유보트 조건부 제외
    if (subject.includes('person') || subject.includes('portrait') || subject === 'person') {
      // 단색/단순 배경이면 카유보트 제외 (르누아르/모네/드가만)
      const isSimpleBackground = background.includes('plain') || background.includes('solid') || 
                                  background.includes('studio') || background.includes('simple') ||
                                  background.includes('white') || background.includes('gray') ||
                                  background.includes('neutral') || background === '' ||
                                  !background || background.includes('indoor');
      
      // 도시/거리/건물 배경이면 카유보트 포함
      const isUrbanBackground = background.includes('city') || background.includes('urban') || 
                                 background.includes('street') || background.includes('building') ||
                                 background.includes('paris') || background.includes('cafe');
      
      if (isSimpleBackground && !isUrbanBackground) {
        // 단순 배경: 카유보트 제외 (르누아르 60%, 모네 35%, 드가 5%)
        // console.log('🎨 Impressionism portrait: Simple background → Caillebotte excluded');
        return weightedRandomSelect([
          { name: 'RENOIR', weight: 60 },
          { name: 'MONET', weight: 35 },
          { name: 'DEGAS', weight: 5 }
        ]);
      }
      // 도시/복잡한 배경이면 기존 portrait 비중 사용 (카유보트 포함)
    }
    
    // 풍경 분기: 자연 vs 도시
    // 'landscape' 또는 ('object'인데 outdoor 배경)이면 풍경으로 처리
    const isOutdoorBackground = background.includes('outdoor') || background.includes('nature') || 
                                 background.includes('park') || background.includes('garden') ||
                                 background.includes('tree') || background.includes('sky') ||
                                 background.includes('path') || background.includes('road') ||
                                 background.includes('forest') || background.includes('mountain');
    
    const isLandscapeScene = subject.includes('landscape') || subject === 'landscape' ||
                             (subject === 'object' && isOutdoorBackground);
    
    if (isLandscapeScene) {
      // 도시/건물/거리 → 칼리보트
      if (background.includes('city') || background.includes('urban') || background.includes('building') || 
          background.includes('street') || subject.includes('city') || subject.includes('urban') || subject.includes('building')) {
        return weightedRandomSelect(weights.landscape_urban);
      }
      // 자연 풍경 (산, 숲, 바다, 정원 등) → 모네
      return weightedRandomSelect(weights.landscape_nature);
    }
  }
  
  // 신고전 vs 낭만 vs 사실주의 특수 처리
  if (category === 'neoclassicism_vs_romanticism_vs_realism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    
    // 스포츠/액션/움직임 → 들라크루아, 고야
    if (subject.includes('sport') || subject.includes('action') || subject.includes('movement') || 
        subject.includes('running') || subject.includes('dance') || subject.includes('athletic')) {
      return weightedRandomSelect(weights.movement);
    }
  }
  
  // 표현주의 특수 처리
  if (category === 'expressionism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    const background = (photoAnalysis.background || '').toLowerCase();
    // 도시/도심 → 키르히너
    if (background.includes('city') || background.includes('urban') || background.includes('street')) {
      return weightedRandomSelect(weights.urban);
    }
  }
  
  // 후기인상주의 특수 처리 - 세잔은 정물/풍경 전문
  if (category === 'postImpressionism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    
    // 정물 → 세잔 강력 추천 (60%)
    if (subject.includes('still') || subject.includes('object') || subject.includes('fruit') || 
        subject.includes('flower') || subject.includes('food') || subject.includes('bottle')) {
      return weightedRandomSelect(weights.stillLife);
    }
    // 풍경 → 세잔 포함
    if (subject.includes('landscape') || subject === 'landscape') {
      return weightedRandomSelect(weights.landscape);
    }
    // 인물 → 세잔 제외 (반 고흐 50%, 고갱 35%, 시냑 15%)
    if (subject.includes('person') || subject.includes('portrait') || subject === 'person') {
      return weightedRandomSelect(weights.portrait);
    }
  }
  
  // 일반 사진 유형별 선택
  const typeWeights = weights[photoType] || weights.default;
  return weightedRandomSelect(typeWeights);
}

// ========================================
// 끝: 가중치 기반 랜덤 화가 선택 시스템
// ========================================

// 고대 그리스-로마 (2가지 스타일)
function getAncientGreekRomanGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS/STYLES LISTED BELOW!
DO NOT select artists from other movements (Renaissance, Baroque, Impressionism, etc.)
ONLY "CLASSICAL SCULPTURE" or "ROMAN MOSAIC" are allowed!

Available Ancient Greek-Roman Styles (2가지):

⭐ STYLE 1: CLASSICAL SCULPTURE (고대 그리스-로마 조각)
   - For: INDOOR PORTRAITS or SPORTS/ACTION PHOTOS ONLY
   - PRIORITY: Sports/athletic action OR indoor portrait settings
   - Examples: Sports action shots (running, jumping, throwing)
              Indoor portraits (studio, home, office settings)
              Athletic poses, gym photos
              Indoor group photos
   - NOT for: Outdoor portraits, casual outdoor photos, landscapes with people
   - Material: Pure white marble only (classical aesthetic)
   - Technique: Dynamic poses for sports, classical poses for indoor portraits
   - Background: Simple plain neutral background (museum-like)
   - Aesthetic: Classical Greek/Roman white marble sculpture

⭐ STYLE 2: ROMAN MOSAIC (로마 모자이크)
   - For: ALL OTHER PHOTOS (outdoor portraits, landscapes, nature, etc.)
   - Examples: Outdoor portraits (any setting)
              All landscape shots (with or without people)
              Nature scenes, flowers, plants
              City scenes, buildings
              Beach photos, mountain photos
              ANY outdoor photos with people
   - Technique: LARGE VISIBLE tesserae tiles 50mm, THICK DARK GROUT LINES between tiles
   - CRITICAL: Each tile must be CLEARLY DISTINGUISHABLE as individual square/rectangular pieces
   - Aesthetic: Roman floor/wall mosaic with chunky stone tiles, jewel-tone colors
   📚 ROMAN MOSAIC MASTERWORKS - Select one matching photo characteristics:
   • Alexander Mosaic (알렉산더 모자이크) → Battle/action, dynamic diagonal, earth tones
   • Cave Canem (카베 카넴) → Animals (dogs, cats, pets), bold graphic contrast
   • Dionysus Mosaic (디오니소스 모자이크) → Mythological, wine/grape imagery, celebratory
   • Oceanus and Tethys (오케아노스와 테티스) → Sea/water themes, blue-turquoise palette
   • Four Seasons (사계절 모자이크) → Portrait busts, seasonal themes, elegant female
   • Nile Mosaic (닐 모자이크) → Landscape panorama, exotic wildlife, river scenes

🎯 KEY DECISION RULE - SIMPLIFIED:
1. SPORTS/ATHLETIC ACTION? → SCULPTURE (highest priority!)
2. INDOOR PORTRAIT/GROUP? → SCULPTURE
3. OUTDOOR PORTRAIT? → MOSAIC
4. LANDSCAPE/NATURE? → MOSAIC
5. ANY OTHER OUTDOOR SCENE? → MOSAIC

Examples:
- Volleyball game = SCULPTURE (sports action)
- Indoor portrait at home = SCULPTURE (indoor setting)
- Gym workout = SCULPTURE (athletic/indoor)
- Office team photo = SCULPTURE (indoor group)
- Couple at beach = MOSAIC (outdoor portrait)
- Person in garden = MOSAIC (outdoor setting)
- Mountain hiking = MOSAIC (outdoor landscape)
- Street portrait = MOSAIC (outdoor)
- Sunflower = MOSAIC (nature)
`;
}

function getAncientGreekRomanHints(photoAnalysis) {
  const { count, subject, shot_type, background, activity } = photoAnalysis;
  
  // 동물 → 모자이크 (역사적으로 로마가 동물 모자이크 전성기)
  if (subject === 'animal' || subject === 'pet' || subject === 'dog' || subject === 'cat' || 
      subject === 'horse' || subject === 'bird' || subject === 'fish' || 
      subject.includes('animal') || subject.includes('pet') || subject.includes('dog') || 
      subject.includes('cat') || subject.includes('horse') || subject.includes('bird')) {
    return `
🎯 HIGHEST PRIORITY: ROMAN MOSAIC (로마 모자이크)
This photo has ANIMALS - perfect for Roman mosaic!
Historical accuracy: Romans excelled at animal mosaics (Pompeii Cave Canem, Orpheus mosaics).
Roman mosaic with LARGE CHUNKY tesserae tiles 50mm, THICK BLACK GROUT between every tile.
`;
  }
  
  // 스포츠/운동 → 조각 (최우선)
  if (subject.includes('sport') || subject.includes('athletic') || 
      activity === 'sports' || activity === 'exercise' || activity === 'athletic' ||
      subject.includes('running') || subject.includes('jumping') || subject.includes('throwing') ||
      subject.includes('soccer') || subject.includes('football') || subject.includes('ball') ||
      subject.includes('kick') || subject.includes('catch') || subject.includes('play')) {
    return `
🎯 HIGHEST PRIORITY: CLASSICAL SCULPTURE (고대 조각)
SPORTS/ATHLETIC ACTION detected - MUST be Greek sculpture!
⚠️ CRITICAL: Ball games, soccer, football = ALWAYS SCULPTURE
Think: Discobolus, Olympic athletes in marble
Dynamic athletic pose frozen in white marble.
NEVER mosaic for sports, even if outdoor!
`;
  }
  
  // 실내 인물 → 조각
  if (background === 'indoor' || background === 'studio' || background === 'home' || 
      background === 'office' || background.includes('indoor')) {
    return `
🎯 RECOMMENDATION: CLASSICAL SCULPTURE (고대 조각)
INDOOR PORTRAIT setting - suitable for classical sculpture.
White marble portrait with museum-like presentation.
`;
  }
  
  // 야외 인물 → 모자이크
  if (background === 'outdoor' || background === 'nature' || background === 'street' ||
      background === 'beach' || background === 'park' || background.includes('outdoor')) {
    return `
🎯 RECOMMENDATION: ROMAN MOSAIC (로마 모자이크)
OUTDOOR setting detected - Roman mosaic style.
LARGE VISIBLE tesserae tiles (50mm with THICK BLACK GROUT LINES.
`;
  }
  
  // 풍경/정물 → 모자이크
  if (subject === 'landscape' || subject === 'flowers' || subject === 'plants' || 
      subject === 'cityscape' || subject === 'objects' || subject === 'still_life') {
    return `
🎯 RECOMMENDATION: ROMAN MOSAIC (로마 모자이크)
Landscape/still life detected - Roman mosaic style.
BIG CHUNKY tesserae 50mm creating mosaic with VISIBLE GROUT LINES.
`;
  }
  
  // 기본값: 실내면 조각, 야외면 모자이크
  return `
🎯 DECISION GUIDE:
1. SPORTS/ATHLETIC? → SCULPTURE (highest priority)
2. INDOOR SETTING? → SCULPTURE  
3. OUTDOOR SETTING? → MOSAIC
4. LANDSCAPE/NATURE? → MOSAIC
Default: Check if indoor (sculpture) or outdoor (mosaic)
`;
}

// 르네상스 (5명)
function getRenaissanceGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Baroque, Impressionism, Expressionism, etc.)
ONLY Renaissance artists: LEONARDO, TITIAN, MICHELANGELO, RAPHAEL, BOTTICELLI!

Available Renaissance Artists (5명):

1. LEONARDO DA VINCI (레오나르도 다 빈치) ⭐ STRONGEST for female portraits
   - Specialty: Sfumato technique, mysterious smile, soft transitions, psychological depth
   - Best for: Female upper body portraits, mysterious/serene expressions
   - Signature: Sfumato soft atmosphere, gentle beauty, enigmatic quality
   - Masterpiece: Various portraits with sfumato technique
   - When to prioritize: Female face/upper body portrait (STRONG RECOMMENDATION 80%)

2. TITIAN (티치아노) ⭐⭐ STRONG for male portraits & landscapes (70%)
   - Specialty: Venetian golden color, luminous flesh tones, ARISTOCRATIC MALE PORTRAITS
   - Best for: MALE upper body portraits, landscapes with sky/sunset, noble dignified men
   - Signature: Rich Titian red, glowing golden atmosphere, Venetian warmth and power
   - Masterpieces: Portrait of a Man, Venetian nobleman portraits
   - When to prioritize: Male face/upper body portrait (STRONG 70%) OR landscapes with sky

3. RAPHAEL (라파엘로) - Best for mother+baby, peaceful scenes
   - Specialty: Harmonious balanced composition, graceful figures, serene beauty
   - Best for: Mother with child, peaceful family scenes, gentle relationships
   - Signature: Madonna-like grace, perfect harmony
   - When to prioritize: Clear mother+baby or peaceful multi-person scene

4. MICHELANGELO (미켈란젤로) - Best for ADULT male, dynamic/heroic
   - Specialty: Sculptural powerful anatomy, heroic masculine figures
   - Best for: ADULT male (age 18+) with full body, athletic, dynamic, heroic poses
   - Signature: David-like muscular strength, monumental dignity
   - When to prioritize: Adult male with masculine energy, sports, action, heroic subject
   - CRITICAL: NEVER for children, teenagers, women, or elderly - ONLY adult men

5. BOTTICELLI (보티첼리) - Best for young female full body, graceful
   - Specialty: Flowing elegant lines, ethereal beauty, graceful movement
   - Best for: Young female full body, dance-like poses, gentle movement
   - Signature: Birth of Venus-like flowing grace, lyrical beauty
   - When to prioritize: Young female full body with graceful pose
`;
}

function getRenaissanceHints(photoAnalysis) {
  const { count, gender, shot_type, subject, age_range } = photoAnalysis;
  
  // 아동/청소년 → 라파엘로 또는 보티첼리 (미켈란젤로 절대 금지)
  if (age_range === 'child' || age_range === 'teen' || subject.includes('child') || subject.includes('boy') || subject.includes('girl')) {
    if (gender === 'female' || subject.includes('girl')) {
      return `
🎯 RECOMMENDATION: BOTTICELLI
Young person detected - Botticelli's graceful style suitable.
NEVER Michelangelo for children!
`;
    } else {
      return `
🎯 RECOMMENDATION: RAPHAEL or TITIAN
Young person detected - Raphael's gentle style or Titian's warmth.
CRITICAL: NEVER Michelangelo for children or teens!
`;
    }
  }
  
  // 여성 상반신 → 다 빈치 (80%)
  if (count === 1 && gender === 'female' && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    return `
🎯 STRONG RECOMMENDATION: LEONARDO DA VINCI (80% priority)
This is a female portrait - perfect for Da Vinci's sfumato technique!
His sfumato technique creates mysterious atmosphere and gentle beauty 
will create the most iconic Renaissance portrait.
Unless this is clearly:
- Landscape/sunset (→ Titian)
- Young female full body with graceful pose (→ Botticelli)
`;
  }
  
  // 남성 상반신 → 티치아노 (70%) ⭐ NEW
  if (count === 1 && gender === 'male' && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    return `
🎯 STRONG RECOMMENDATION: TITIAN (70% priority)
This is a male portrait - perfect for Titian's Venetian portrait tradition!
His rich golden colors, luminous flesh tones, and aristocratic dignity
create powerful Renaissance male portraits.
Unless this is clearly:
- Male full body heroic pose (→ Michelangelo)
`;
  }
  
  // 풍경/하늘 → 티치아노
  if (subject === 'landscape' || subject.includes('sky')) {
    return `
🎯 STRONG RECOMMENDATION: TITIAN
This landscape/sky scene is perfect for Titian's golden Venetian atmosphere!
`;
  }
  
  // 엄마+아기 → 라파엘로
  if (count >= 2 && subject.includes('baby')) {
    return `
🎯 STRONG RECOMMENDATION: RAPHAEL
This scene with baby is perfect for Raphael's Madonna-like grace!
`;
  }
  
  // 성인 남성 + (전신 OR 역동적/스포츠/액션) → 미켈란젤로 (아동/청소년/노인 제외)
  // v59: 남성 전신뿐 아니라 남성적+역동적 사진에도 적용
  if (count === 1 && gender === 'male' && 
      age_range !== 'child' && age_range !== 'teen' && age_range !== 'elderly' &&
      (shot_type === 'full_body' || 
       subject.includes('sport') || subject.includes('athletic') || 
       subject.includes('action') || subject.includes('dynamic') ||
       subject.includes('heroic') || subject.includes('muscular'))) {
    return `
🎯 STRONG RECOMMENDATION: MICHELANGELO
ADULT male with dynamic/heroic qualities - perfect for Michelangelo's David-like heroic strength!
His sculptural anatomy and monumental power suit masculine energy.
CRITICAL: Only for adult men (18-60), never for children/teens/elderly.
`;
  }
  
  // 기본값 → 다 빈치
  return `
🎯 Default: LEONARDO DA VINCI is the most versatile Renaissance master.
Consider the subject carefully and choose the best match.
`;
}

// 바로크 (4명)
function getBaroqueGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Renaissance, Impressionism, Expressionism, etc.)
ONLY Baroque artists: CARAVAGGIO, RUBENS, REMBRANDT, VELÁZQUEZ!

Available Baroque Artists (4명):

1. CARAVAGGIO (카라바조) ⭐⭐⭐ STRONGEST - default choice for single portraits
   - Specialty: Dramatic chiaroscuro, tenebrism, theatrical spotlight effect
   - Best for: Single person portraits, dramatic mood, strong expressions
   - When to prioritize: Most single portraits (70%)

2. RUBENS (루벤스) ⭐⭐ Best for couples & groups
   - Specialty: Warm sensual flesh, dynamic movement, voluptuous forms
   - Best for: Couples, romantic scenes, multi-person compositions, warm energy
   - When to prioritize: 2+ people, romantic/intimate mood, dynamic poses

3. REMBRANDT (렘브란트) - Best for elderly subjects & window light
   - Specialty: Warm golden light, psychological depth, soft window illumination
   - Best for: Elderly subjects (60+), contemplative mood, female with natural light
   - When to prioritize: Clear elderly subject or window light scenes

4. VELÁZQUEZ (벨라스케스) - Best for formal portraits
   - Specialty: Courtly dignity, Spanish formality
   - Best for: Formal clothing, aristocratic mood
   - When to prioritize: Formal/official context
`;
}

function getBaroqueHints(photoAnalysis) {
  const { count, age_range, gender, lighting, background } = photoAnalysis;
  
  // 1명 독사진 → 카라바조 (70-80%)
  if (count === 1) {
    // 노인 → 렘브란트
    if (age_range === 'elderly') {
      return `
🎯 STRONG RECOMMENDATION: REMBRANDT (70%+)
This elderly subject is PERFECT for Rembrandt's warm golden light!
His soul-revealing depth captures the wisdom of age beautifully.
`;
    }
    
    // 여성 + 창가 → 렘브란트
    if (gender === 'female' && (lighting === 'window' || lighting === 'natural_side')) {
      return `
🎯 STRONG RECOMMENDATION: REMBRANDT (60%+)
Female subject with natural window light - Rembrandt's warm golden illumination!
Consider: Intimate contemplative atmosphere with soft natural lighting.
`;
    }
    
    // 격식있는 복장 → 벨라스케스
    if (background === 'formal' || lighting === 'formal') {
      return `
🎯 STRONG RECOMMENDATION: VELÁZQUEZ (60%+)
This formal portrait matches Velázquez's courtly dignity.
But Caravaggio's drama is also powerful - choose based on mood.
`;
    }
    
    // 기본 1명 → 카라바조
    return `
🎯 STRONG RECOMMENDATION: CARAVAGGIO (70-80%)
Single person portrait - Caravaggio's STRONGEST specialty!
His dramatic chiaroscuro creates the most distinctive Baroque impact.
Unless:
- Elderly subject (→ Rembrandt 70%+)
- Female + window light (→ Rembrandt 60%+)
- Formal portrait (→ Velázquez 60%+)
`;
  }
  
  // 2명 커플 → 루벤스
  if (count === 2) {
    return `
🎯 STRONG RECOMMENDATION: RUBENS (60%+)
Couple detected - PERFECT for Rubens' warm sensual style!
His dynamic compositions and glowing flesh tones capture romantic intimacy.
Alternative: REMBRANDT for more contemplative couple mood.
`;
  }
  
  // 3명 이상 그룹 → 루벤스 또는 렘브란트
  return `
🎯 STRONG RECOMMENDATION: RUBENS (50%) or REMBRANDT (30%)
Group scene - Rubens excels at dynamic multi-figure compositions.
For more dramatic spotlight effect, consider CARAVAGGIO.
`;
}

// 로코코 (2명)
function getRococoGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Baroque, Impressionism, Expressionism, etc.)
ONLY Rococo artists: BOUCHER, WATTEAU!

Available Rococo Artists (2명):

1. BOUCHER (부셰) ⭐⭐ STRONGEST for Rococo (70%)
   - Specialty: Playful sensual charm, soft pink and blue pastels, ornate decoration
   - Best for: Most photos - quintessential Rococo style
   - Signature: Whimsical charm, light pastel palette, cherubs and cupids
   - When to prioritize: Most cases (DEFAULT 70%)

2. WATTEAU (와토) - Best for romantic outdoor scenes (30%)
   - Specialty: Fêtes galantes (elegant outdoor parties), romantic gardens
   - Best for: Outdoor scenes specifically, romantic atmosphere, leisure activities
   - Signature: Dreamy pastoral elegance, soft romantic mood, melancholic charm
   - When to prioritize: Clear outdoor/garden/romantic settings (30%)

Note: Boucher is the quintessential Rococo artist.
`;
}

function getRococoHints(photoAnalysis) {
  const { background, subject } = photoAnalysis;
  
  // 야외 정원만 → 와토
  if (background === 'outdoor' || background === 'garden' || subject.includes('garden')) {
    return `
🎯 RECOMMENDATION: WATTEAU (30%)
Outdoor garden setting matches Watteau's fêtes galantes!
Romantic garden atmosphere is his specialty.
`;
  }
  
  // 기본값 → 부셰 (70%)
  return `
🎯 STRONG: BOUCHER (70%) - DEFAULT for Rococo
Quintessential Rococo playful charm and pastel colors.
Unless clear outdoor garden → Watteau (30%)
`;
}

// 중세 미술 (비잔틴·고딕·이슬람) ⭐ v59 로마네스크 삭제
function getMedievalGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE STYLES LISTED BELOW!
DO NOT select artists from other movements (Renaissance, Baroque, Impressionism, etc.)
ONLY Medieval styles: BYZANTINE, GOTHIC, ISLAMIC MINIATURE!

Available Medieval Art Styles:

📍 FOR PORTRAITS/PEOPLE (인물화) - 3 styles available:

1. BYZANTINE (비잔틴) ⭐⭐⭐⭐ (40%)
   - Specialty: SACRED GOLDEN MOSAIC backgrounds, flat iconic forms, divine transcendence
   - Best for: Formal dignified portraits - Byzantine spirituality and eternal presence
   - Signature: GOLDEN HALO behind head, Gold leaf backgrounds, hieratic frontal poses
   - CRITICAL: Must have CIRCULAR GOLDEN NIMBUS (halo) behind subject's head
   📚 BYZANTINE MASTERWORKS - Select one matching photo characteristics:
   • Emperor Justinian (유스티니아누스 황제) → Male/group, imperial majesty, dignified
   • Empress Theodora (테오도라 황후) → Female, jeweled crown, opulent splendor
   • Deesis (데이시스) → Gentle expression, compassionate, sacred presence
   • Christ Pantocrator (판토크라토르) → Intense gaze, monumental, divine judgment

2. ISLAMIC MINIATURE (이슬람 세밀화) ⭐⭐⭐⭐ (40%)
   - Specialty: Persian/Ottoman COURT MINIATURE painting, intricate delicate details, vibrant jewel colors
   - Best for: Courtly elegant portraits, delicate graceful figures, ornamental backgrounds
   - Signature: Persian manuscript illumination style, flat decorative composition, rich jewel tones, intricate patterns
   - Also good for: Animals (hunting scenes, garden scenes)
   📚 ISLAMIC MINIATURE MASTERWORKS - Select one matching photo characteristics:
   • Youth Holding a Flower (꽃을 든 귀족) → Single portrait, elegant S-curve posture
   • Miraj Night Journey (미라지) → Mystical/fantasy, celestial atmosphere
   • Simurgh (시무르그) → Animals, mythical phoenix with elaborate plumage
   • Lovers in a Garden (정원의 연인) → Couples, romantic moonlit garden
   • Rustam Slaying Dragon (루스탐과 용) → Action/battle, epic heroic scene

3. GOTHIC (고딕) ⭐⭐ (20%)
   - Specialty: CATHEDRAL STAINED GLASS with thick BLACK LEAD LINES dividing colored glass sections
   - Reference: Chartres Cathedral stained glass windows style
   - Best for: Religious atmosphere with jewel-tone translucent colors
   - Signature: ENTIRE IMAGE composed of colored glass pieces separated by BLACK LEAD CAMES
   - CRITICAL: Must show THICK BLACK LINES between EVERY color section like real stained glass
   - Glass colors: Deep ruby red, sapphire blue, emerald green, amber yellow, purple
   - Key features: Flat 2D figures, no perspective, translucent glass effect, light passing through
   - NOT a painting - must look like actual STAINED GLASS WINDOW with lead dividers
   📚 GOTHIC MASTERWORKS - Select one matching photo characteristics:
   • Blue Virgin of Chartres (샤르트르 푸른 성모) → Madonna/child, dominant cobalt blue
   • Notre-Dame Rose Window (노트르담 장미창) → Radial circular, kaleidoscopic symmetry
   • Sainte-Chapelle (생트샤펠) → Tall vertical, dominant ruby red, biblical narrative

📍 FOR LANDSCAPES/NON-PORTRAITS (풍경/사물):
Choose: Byzantine or Gothic

🎯 SELECTION:
IF photo has PEOPLE:
  → Byzantine (40%), Islamic Miniature (40%), Gothic (20%)
  
IF photo has ANIMALS:
  → Islamic Miniature preferred
  
IF photo has NO people AND NO animals (landscape only):
  → Byzantine or Gothic
`;
}

function getMedievalHints(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // 동물 있으면 → 무조건 이슬람 세밀화 (신성모독 방지!)
  if (subject === 'animal' || subject === 'pet' || subject === 'dog' || subject === 'cat' || 
      subject === 'horse' || subject === 'bird' || subject === 'fish' || 
      subject.includes('animal') || subject.includes('pet') || subject.includes('dog') || 
      subject.includes('cat') || subject.includes('horse') || subject.includes('bird')) {
    return `
🚨 CRITICAL: This photo has ANIMALS

🎯 MUST use Islamic Miniature (ONLY safe option for animals):
- Persian/Ottoman court painting style
- Garden or hunting scenes with animals
- Vibrant jewel colors, ornamental patterns
- NO Christian religious imagery (avoids sacred context)
- Secular courtly art aesthetic

⚠️ NEVER Byzantine/Gothic for animals (religious context inappropriate!)
`;
  }
  
  // 인물 있으면 → 비잔틴 40%, 이슬람 세밀화 40%, 고딕 20%
  if (count >= 1 || subject.includes('person') || subject.includes('people') || subject.includes('portrait')) {
    return `
⚠️ CRITICAL: This photo has PEOPLE

🎯 Choose from 3 portrait styles:
- Byzantine (40%) - Sacred golden mosaic, GOLDEN HALO, divine transcendence
- Islamic MINIATURE (40%) - Persian court elegance, ornamental beauty
- Gothic (20%) - Cathedral stained glass, BLACK LEAD LINES, holy atmosphere
`;
  }
  
  // 인물 없으면 → 비잔틴, 고딕
  return `
⚠️ CRITICAL: This photo has NO people (landscape/objects)

🎯 Choose from 2 landscape styles:
- Byzantine (preferred) - Golden mosaic atmosphere
- Gothic - Cathedral heavenly light
`;
}

// 신고전 vs 낭만 vs 사실주의 (7명) ⭐ v42 통합
function getNeoclassicismVsRomanticismVsRealismGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Baroque, Impressionism, Expressionism, etc.)
ONLY these 6 artists: DAVID, INGRES, TURNER, DELACROIX, COURBET, MANET!

Available Artists (7명) - AI will choose BEST style (Neoclassicism vs Romanticism vs Realism):

⚖️ NEOCLASSICISM (신고전주의) - Reason and Order:

1. DAVID (다비드) ⭐ BEST for formal/heroic portraits
   - Specialty: Classical heroic compositions, clear lines, dignified formality
   - Best for: Formal portraits, static balanced poses, heroic subjects
   - Signature: Napoleon's Coronation - cold perfection, clear structure
   - When to prioritize: Formal/static/balanced photos (70%)

2. INGRES (앵그르) - BEST for elegant female portraits
   - Specialty: Perfect smooth contours, classical beauty, refined elegance
   - Best for: Female portraits, graceful poses, elegant beauty
   - Signature: La Grande Odalisque - idealized smooth perfection
   - When to prioritize: Elegant female subjects (65%)

⚡ ROMANTICISM (낭만주의) - Emotion and Passion:

3. TURNER (터너) ⭐⭐ STRONGEST for landscapes
   - Specialty: Atmospheric light effects, misty dreamlike landscapes, sublime nature
   - Best for: Landscapes, fog/mist, atmospheric effects, natural scenery
   - Signature: Golden luminous atmosphere, dissolving forms in light
   - When to prioritize: Landscape photos (STRONG 80%)

4. DELACROIX (들라크루아) - BEST for dramatic action, intense emotions
   - Specialty: Vivid passionate colors, dynamic movement, revolutionary energy
   - Best for: Action scenes, dramatic expressions, multiple people in motion
   - Signature: Liberty Leading the People - passionate drama
   - When to prioritize: Action/drama/multiple people in motion (75%)

🎨 REALISM (사실주의) - Honest Truth:

5. COURBET (쿠르베) ⭐ STRONGEST for rural/landscape realism
   - Specialty: Honest rural reality, landscapes, everyday life, anti-idealized truth
   - Best for: Rural settings, landscapes, working class subjects, realistic portrayal
   - Signature: The Stone Breakers, Burial at Ornans - unvarnished reality
   - When to prioritize: Rural/landscape/working class subjects (STRONG 80%)

6. MANET (마네) - BEST for urban/modern scenes
   - Specialty: Modern Paris life, café scenes, urban sophistication
   - Best for: Urban settings, modern atmosphere, café/city backgrounds
   - Signature: Olympia, A Bar at the Folies-Bergère - modern realism
   - When to prioritize: Clear urban/modern/city context (75%)

🎯 CRITICAL DECISION LOGIC:
- Photo is STATIC, BALANCED, FORMAL → Choose Neoclassicism (David or Ingres)
- Photo is DYNAMIC, EMOTIONAL, DRAMATIC → Choose Romanticism (Turner/Delacroix)
- Photo is RURAL, PEACEFUL → Choose Realism - Courbet (80%)
- Photo is URBAN, MODERN → Choose Realism - Manet (70%)
- Landscape → ALWAYS Romanticism (Turner 80%)
`;
}

function getNeoclassicismVsRomanticismVsRealismHints(photoAnalysis) {
  const { subject, count, mood, composition, shot_type, gender } = photoAnalysis;
  
  // 초상화 → 앵그르/마네 추천
  if (count === 1 && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    // 여성 초상화 → 앵그르 또는 마네
    if (gender === 'female') {
      return `
🎯 STRONG RECOMMENDATION: NEOCLASSICISM - INGRES (75%)
Female portrait - Ingres' idealized smooth perfection!
Classical beauty with elegant contours.
Alternative: Manet (Realism) for modern sophisticated style.
`;
    }
    // 남성 초상화 → 다비드 또는 마네
    return `
🎯 STRONG RECOMMENDATION: NEOCLASSICISM - DAVID (70%)
Portrait detected - David's formal heroic style!
Dignified formality with clear structure.
Alternative: Manet (Realism) for modern approach.
`;
  }
  
  // 시골/농촌 → 사실주의 (쿠르베)
  if (subject.includes('rural') || subject.includes('countryside') || subject.includes('farm')) {
    return `
🎯 STRONG: REALISM - COURBET (80%)
Rural/countryside = Realism territory!
Courbet's honest rural reality is supreme.
NEVER use Neoclassicism or Romanticism for rural scenes.
`;
  }
  
  // 도시/현대 → 사실주의 (마네)
  if (subject.includes('urban') || subject.includes('city') || subject.includes('café')) {
    return `
🎯 STRONG: REALISM - MANET (75%)
Urban/modern = Realism!
Manet's modern Paris sophistication perfect.
`;
  }
  
  // 풍경 → 낭만주의 (터너)
  if (subject === 'landscape') {
    return `
🎯 STRONG: ROMANTICISM - TURNER (80%)
Landscape = Romanticism territory!
Turner's atmospheric sublime light is supreme.
NEVER use Neoclassicism for landscapes.
`;
  }
  
  // 어둡고 드라마틱한 장면 → 낭만주의 (들라크루아)
  if (mood === 'dark' || mood === 'psychological' || subject.includes('night')) {
    return `
🎯 STRONG: ROMANTICISM - DELACROIX (75%)
Dark/dramatic mood = Romanticism territory!
Passionate drama with intense emotions.
`;
  }
  
  // 여러 명 + 역동적 → 낭만주의 (들라크루아)
  if (count >= 2 && (mood === 'dramatic' || mood === 'energetic')) {
    return `
🎯 ROMANTICISM - DELACROIX (75%)
Dramatic multi-person action = Romanticism!
Revolutionary energy and passion.
`;
  }
  
  // 격식 있는 정적인 초상화 → 신고전주의 (다비드)
  if ((shot_type === 'portrait' || shot_type === 'upper_body') && 
      (composition === 'balanced' || mood === 'formal')) {
    return `
🎯 NEOCLASSICISM - DAVID (75%)
Formal balanced portrait = Neoclassicism!
Cold perfection and heroic dignity.
Unless dynamic/emotional → then Romanticism.
`;
  }
  
  // 우아한 여성 초상화 → 앵그르 또는 마네
  if (subject === 'female' && (mood === 'elegant' || mood === 'graceful')) {
    return `
🎯 PRIMARY: NEOCLASSICISM - INGRES (smooth perfection) OR
ALTERNATIVE: REALISM - MANET (modern sophistication)
Ingres offers idealized classical beauty.
Manet offers Parisian modern elegance.
`;
  }
  
  return `
🎯 DECISION GUIDE:
- Rural/Countryside → REALISM (Courbet 80%)
- Urban/Modern → REALISM (Manet 75%)
- Static/Balanced/Formal → NEOCLASSICISM (David/Ingres)
- Dynamic/Emotional/Dramatic → ROMANTICISM (Turner/Delacroix)
- Landscape → ALWAYS Romanticism (Turner 80%)
`;
}

// 인상주의 (4명)
function getImpressionismGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Post-Impressionism, Expressionism, Fauvism, etc.)
ONLY Impressionism artists: RENOIR, MONET, DEGAS, CAILLEBOTTE!

Available Impressionism Artists (4명):

1. RENOIR (르누아르) ⭐⭐⭐⭐ STRONGEST - Best for portraits (35%)
   - Specialty: SOFT WARM figures in dappled sunlight, joyful atmosphere, peachy skin tones
   - Best for: ALL portraits (indoor/outdoor), happy people, sunlit gatherings, festive scenes
   - Signature: "Luncheon of the Boating Party", "Dance at Le Moulin de la Galette"
   - When to prioritize: Most portrait cases (35%)
   - CRITICAL: Soft feathery brushstrokes, warm peachy skin tones work BEST in AI

2. DEGAS (드가) ⭐⭐⭐ Best for movement AND composition (30%)
   - Specialty: Movement capture, unusual angles, dynamic compositions, ballet dancers
   - Best for: Action shots, dance, sports, movement, diagonal compositions, interesting angles
   - Signature: Ballet rehearsals - movement frozen in time, asymmetric cropping
   - When to prioritize: Movement/action/dance OR unique compositional angles (30%)
   - CRITICAL: Degas excels at both MOVEMENT and COMPOSITION

3. MONET (모네) ⭐⭐ Good for landscapes (25%)
   - Specialty: Light effects, outdoor atmosphere, water reflections
   - Best for: Landscapes, gardens, water scenes (NOT portraits)
   - Signature landscapes: "Water Lilies", "Impression, Sunrise"
   - When to prioritize: Pure landscapes without people (25%)
   - Note: Impressionist hazy effects can be challenging for AI

4. CAILLEBOTTE (칼리보트) ⭐ Urban specialist (20%)
   - Specialty: Modern urban scenes, dramatic perspective, city life
   - Best for: City backgrounds, male portraits, geometric compositions
   - Signature works: "Paris Street, Rainy Day", "The Floor Scrapers"
   - When to prioritize: Urban/city scenes (80%), male portraits (35%)

🎯 CRITICAL DECISION LOGIC:
- Female/child portraits → RENOIR (35%) ⭐⭐⭐⭐ PRIMARY
- Male portraits → CAILLEBOTTE (35%) ⭐⭐⭐ (modern urban men)
- Movement/action/interesting angles → DEGAS (30%) ⭐⭐⭐
- Natural landscapes (no people) → MONET (50%) ⭐⭐
- Urban/city scenes → CAILLEBOTTE (80%) ⭐⭐⭐⭐
`;
}

function getImpressionismHints(photoAnalysis) {
  const { subject, count, mood, shot_type } = photoAnalysis;
  
  // 인물 사진 → 르누아르 (35%) 우선!
  if (count >= 1 && (shot_type === 'portrait' || shot_type === 'upper_body' || shot_type === 'full_body')) {
    return `
🎯 STRONG RECOMMENDATION: RENOIR (35%)
Portrait detected - RENOIR's soft warm style works BEST in AI!
Soft feathery brushstrokes, warm peachy skin tones.
"Luncheon of the Boating Party" style for all portraits.
Alternative: Degas (30%) for interesting angles/movement.
`;
  }
  
  // 움직임/춤/액션 → 드가 (30%)
  if (subject.includes('movement') || subject.includes('dance') || subject.includes('action') || 
      subject.includes('sport') || shot_type === 'action') {
    return `
🎯 STRONG RECOMMENDATION: DEGAS (30%)
Movement/dance/action is Degas's unique strength!
His ballet-like capture of motion is distinctive.
Also excellent for diagonal compositions and unusual angles.
`;
  }
  
  // 풍경 (인물 없음) → 모네 (25%)
  if (count === 0 && (subject === 'landscape' || subject.includes('water') || subject.includes('garden'))) {
    return `
🎯 RECOMMENDATION: MONET (25%)
Pure landscape (no people) - Monet specialty.
Water lilies, garden scenes, light on water.
Note: Impressionist hazy effects may vary in AI.
`;
  }
  
  // 행복한 사교 장면 → 르누아르 (35%)
  if (count >= 2 && (mood === 'happy' || mood === 'joyful')) {
    return `
🎯 STRONG RECOMMENDATION: RENOIR (35%)
Happy social gathering - Renoir's joyful atmosphere!
Warm sunlit people, festive scenes.
"Dance at Le Moulin de la Galette" style.
`;
  }
  
  return `
🎯 Priority order:
- Female/child portraits → RENOIR (35%) - warm soft style
- Male portraits → CAILLEBOTTE (35%) - modern urban men
- Movement/angles → DEGAS (30%)
- Natural landscapes → MONET (50%)
- Urban/city scenes → CAILLEBOTTE (80%)
`;
}

// 후기인상주의 (4명) - v48 간소화
function getPostImpressionismGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Impressionism, Fauvism, Expressionism, etc.)
ONLY Post-Impressionism artists: VAN GOGH, GAUGUIN, CÉZANNE, SIGNAC!

Available Post-Impressionism Artists (4명) + MASTERWORKS:

1. VAN GOGH (반 고흐) - Swirling impasto brushstrokes, intense emotional colors
   ⭐ BEST FOR: Portraits, emotional scenes, night scenes
   📚 MASTERWORKS:
   - "The Starry Night" (별이 빛나는 밤) → night, sky, landscape, FEMALE portrait | SWIRLING SPIRALS, cobalt blue + yellow
   - "Sunflowers" (해바라기) → flowers, still life | THICK IMPASTO, chrome yellow dominates
   - "Self-Portrait" (자화상) → MALE portrait ONLY | turquoise swirling background, intense gaze
   - "Café Terrace at Night" (밤의 카페 테라스) → outdoor evening, cafe, street | yellow gas lamp, cobalt blue night
   
2. GAUGUIN (고갱) - Flat bold colors, primitive exotic Tahitian style
   ⭐ BEST FOR: Portraits, tropical scenes, exotic mood
   📚 MASTERWORKS:
   - "Tahitian Women" (타히티 여인들) → FEMALE, exotic, tropical | flat bold colors, decorative
   - "Where Do We Come From?" (우리는 어디서 왔는가) → philosophical, group | Tahitian paradise, primitivism
   - "Yellow Christ" (황색 그리스도) → religious, emotional | flat yellow, Breton folk art
   
3. CÉZANNE (세잔) - Geometric structured forms, analytical approach
   ⭐ BEST FOR: Still life, landscapes, geometric compositions
   ⚠️ NOT FOR PORTRAITS!
   📚 MASTERWORKS:
   - "Still Life with Apples" (사과 정물) → still life | geometric forms, structured color patches
   - "Mont Sainte-Victoire" (생트빅투아르 산) → landscape | geometric mountain, analytical brushwork
   - "Card Players" (카드 놀이하는 사람들) → group activity | geometric figures, muted colors
   
4. SIGNAC (시냑) - POINTILLIST LARGE DOTS 8mm, bright Mediterranean sunlight
   ⭐ BEST FOR: Seascapes, harbors, sunny outdoor scenes
   📚 MASTERWORKS:
   - "Port of Saint-Tropez" (생트로페 항구) → harbor, boats | pointillist dots, Mediterranean light
   - "Portrait of Félix Fénéon" (펠릭스 페네옹 초상) → portrait | swirling pointillist background
   - "Time of Harmony" (조화의 시대) → idyllic scene | vibrant pointillist colors

🎯 CRITICAL MATCHING RULES:
- PORTRAITS/PEOPLE → VAN GOGH or GAUGUIN (NEVER Cézanne!)
- MALE portrait → Van Gogh Self-Portrait or Signac Fénéon
- FEMALE portrait → Van Gogh Starry Night or Gauguin Tahitian
- STILL LIFE → CÉZANNE (Still Life with Apples)
- NIGHT/EVENING → Van Gogh (Starry Night or Café Terrace)
`;
}

function getPostImpressionismHints(photoAnalysis) {
  const subject = (photoAnalysis?.subject || '').toLowerCase();
  
  // 인물 사진 → 세잔 절대 금지
  if (subject.includes('person') || subject.includes('portrait') || subject === 'person') {
    return `
🎯 PORTRAIT DETECTED - CRITICAL RULES:
⚠️ DO NOT SELECT CÉZANNE - he is a still life/landscape specialist!
✅ VAN GOGH (50%) - Emotional swirling portraits with intense colors
✅ GAUGUIN (35%) - Exotic bold colors, decorative flat style  
✅ SIGNAC (15%) - Pointillist dots for variety
`;
  }
  
  // 정물 → 세잔 강력 추천
  if (subject.includes('still') || subject.includes('object') || subject.includes('fruit') ||
      subject.includes('flower') || subject.includes('food')) {
    return `
🎯 STILL LIFE DETECTED:
✅ CÉZANNE (60%) - Geometric forms, analytical structure - PERFECT for still life!
✅ VAN GOGH (25%) - Expressive emotional still life
✅ GAUGUIN (10%) - Decorative exotic style
✅ SIGNAC (5%) - Pointillist approach
`;
  }
  
  // 풍경 → 세잔 포함
  if (subject.includes('landscape') || subject === 'landscape') {
    return `
🎯 LANDSCAPE DETECTED:
✅ VAN GOGH (35%) - Swirling emotional landscapes
✅ CÉZANNE (30%) - Geometric structured landscapes (Mont Sainte-Victoire)
✅ GAUGUIN (20%) - Exotic tropical landscapes
✅ SIGNAC (15%) - Pointillist Mediterranean light
`;
  }
  
  // 기본값 - 인물 우선 가정
  return `
🎯 SELECTION GUIDE:
- Portraits → VAN GOGH or GAUGUIN (avoid Cézanne!)
- Still life → CÉZANNE (priority)
- Landscapes → Any artist works
- Pointillist variety → SIGNAC
`;
}

// 야수파 (3명) ⭐ v42 NEW
function getFauvismGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Expressionism, Post-Impressionism, etc.)
ONLY Fauvism artists: MATISSE, DERAIN, VLAMINCK!
⚠️ Expressionism artists (Munch, Kirchner, Kokoschka, Kandinsky) are FORBIDDEN here!

Available Fauvism Artists (3명):

1. MATISSE (마티스) ⭐⭐⭐ STRONG for portraits and interiors (35%)
   - Specialty: Pure bold colors, decorative flat patterns, joyful harmonious compositions
   - Best for: Most photos, especially people, interiors, calm atmosphere
   - Signature: The Dance, La Desserte - flat decorative color harmony
   - When to prioritize: Most Fauvism cases (35%)
   - Note: Also available in Masters collection

2. DERAIN (드랭) ⭐⭐⭐ STRONG for landscapes (35%)
   - Specialty: Bold landscape colors, vivid natural scenery, strong contrasts
   - Best for: Landscapes, trees, outdoor nature, bright scenery
   - Signature: Charing Cross Bridge - bold landscape colors
   - When to prioritize: Clear landscape/outdoor scene (35%)

3. VLAMINCK (블라맹크) ⭐⭐⭐ STRONG for dramatic colors (30%)
   - Specialty: Violent expressive colors, turbulent brushwork, emotional intensity
   - Best for: Dramatic mood, intense emotions, stormy atmosphere
   - Signature: Most violent Fauvist colors - emotional explosions
   - When to prioritize: Dramatic/intense emotional mood (30%)

🎯 CRITICAL DECISION LOGIC - BALANCED DISTRIBUTION:
- Most photos/portraits → MATISSE (35%) - versatile, harmonious
- Landscape/outdoor → DERAIN (35%) - landscape specialist
- Dramatic/intense mood → VLAMINCK (30%) - most emotional
All three artists equally represent Fauvism's bold colors!
`;
}

function getFauvismHints(photoAnalysis) {
  const { subject, mood, shot_type } = photoAnalysis;
  
  // 풍경 → 드랭 (35%)
  if (subject === 'landscape' || subject.includes('outdoor') || subject.includes('nature')) {
    return `
🎯 STRONG: DERAIN (35%)
Landscape/outdoor = Derain specialty!
Bold landscape colors and vivid natural scenery.
Matisse also excellent (35%) for decorative approach.
`;
  }
  
  // 극적/강렬한 분위기 → 블라맹크 (30%)
  if (mood === 'dramatic' || mood === 'intense' || mood === 'stormy') {
    return `
🎯 RECOMMENDATION: VLAMINCK (30%)
Dramatic/intense mood = Vlaminck!
Most violent and emotional Fauvist colors.
`;
  }
  
  // 기본값 → 마티스 (35%)
  return `
🎯 BALANCED DISTRIBUTION:
- Most photos/portraits → MATISSE (35%)
- Landscape/outdoor → DERAIN (35%)
- Dramatic mood → VLAMINCK (30%)

Matisse is versatile and harmonious for people/interiors.
The Dance and La Desserte style - pure color harmony.
Note: Matisse also available in Masters collection.
All three artists equally powerful for Fauvism!
`;
}

// 표현주의 (5명)
function getExpressionismGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Fauvism, Post-Impressionism, Impressionism, etc.)
ONLY Expressionism artists: MUNCH, KOKOSCHKA, KIRCHNER, KANDINSKY!
⚠️ FORBIDDEN: Derain, Matisse, Vlaminck (they are FAUVISM, NOT Expressionism!)

Available Expressionism Artists (4명):

1. MUNCH (뭉크) ⭐⭐⭐ STRONG for emotional portraits (30%)
   - Specialty: Existential anxiety, psychological tension, swirling distorted forms
   - Best for: Emotional portraits with depth, anxious expressions, dramatic scenes
   - Signature: "The Scream" - iconic anxiety and modern alienation
   - When to prioritize: Emotional/dramatic portraits (30%)
   - Note: Also available in Masters collection

2. KOKOSCHKA (코코슈카) ⭐⭐⭐ STRONG for psychological portraits (30%)
   - Specialty: Intense psychological portraits, violent brushstrokes, inner turmoil
   - Best for: Deep character portraits, emotional intensity, raw expression
   - Signature: "The Bride of the Wind" - turbulent emotional portraits
   - When to prioritize: Portraits needing psychological depth (30%)
   - CRITICAL: Rough expressive brushwork (30mm+ reveals inner psyche

3. KIRCHNER (키르히너) ⭐⭐⭐ STRONG for urban expressionism (25%)
   - Specialty: JAGGED ANGULAR FORMS, urban anxiety, street energy
   - Best for: Urban settings, bold color contrasts, city scenes, angular compositions
   - Signature: "Street Scenes" - angular urban life
   - When to prioritize: Urban/city backgrounds or angular aesthetic (25%)

   - Specialty: Abstract expressionism, spiritual compositions, pure color emotion
   - Best for: Abstract interpretation, spiritual atmosphere, emotional abstraction
   - Signature: "Compositions" - non-representational emotional color
   - When to prioritize: Abstract/spiritual desired (15%)

🎯 CRITICAL DECISION LOGIC - 4 ARTISTS ONLY:
- Emotional portraits → MUNCH (30%, also in Masters)
- Psychological depth → KOKOSCHKA (30%)
- Urban/city/angular → KIRCHNER (25%)
- Abstract/spiritual → KANDINSKY (15%)
⚠️ NEVER select Fauvism artists (Derain, Matisse, Vlaminck) for Expressionism!
`;
}

function getExpressionismHints(photoAnalysis) {
  const { count, shot_type, expression, background, subject, mood } = photoAnalysis;
  
  // 초상화 → 뭉크 (30%) 또는 코코슈카 (30%)
  if (count === 1 && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    // 심리적 깊이 필요 → 코코슈카 고려
    if (mood === 'intense' || mood === 'psychological' || mood === 'turbulent') {
      return `
🎯 STRONG RECOMMENDATION: KOKOSCHKA (30%)
Deep psychological portrait - Kokoschka's violent brushwork (30mm+!
Equally strong as Munch for psychological portraits.
`;
    }
    
    // 감정적/불안 → 뭉크
    return `
🎯 STRONG RECOMMENDATION: MUNCH (30%)
Emotional portrait - Munch's existential anxiety!
The Scream-like intensity even in calm subjects.
Alternative: Kokoschka (30%) equally strong for portraits.
`;
  }
  
  // 도시 배경 또는 각진 구도 → 키르히너 (25%)
  if (background === 'urban' || background === 'city' || subject.includes('street') ||
      subject.includes('angular') || subject.includes('geometric')) {
    return `
🎯 STRONG RECOMMENDATION: KIRCHNER (25%)
Urban/city/angular setting matches Kirchner's jagged forms!
Street scenes and angular expressionism specialty.
`;
  }
  
  if (subject === 'abstract' || subject === 'unclear' || mood === 'spiritual') {
    return `
🎯 RECOMMENDATION: KANDINSKY (15%)
Abstract/spiritual mood suits Kandinsky's non-representational approach.
Pure emotional color without representational forms.
`;
  }
  
  return `
🎯 BALANCED DISTRIBUTION - Choose based on photo type:
- Emotional/anxious portraits → MUNCH (30%)
- Deep psychological portraits → KOKOSCHKA (30%)
- Urban/angular scenes → KIRCHNER (25%)
- Abstract/spiritual → KANDINSKY (15%)
Strong core of 4 Expressionist masters!
`;
}

// 20세기 모더니즘 (7명 - 3개 세부 사조)
// 제외: 뒤샹(개념미술), 폴록/로스코(완전추상), 만 레이(사진작가), 프리다/달리(마스터 전용), 브라크(피카소 중복)
function getModernismGuidelines() {
  return `
🚫🚫🚫 CRITICAL RESTRICTION 🚫🚫🚫
YOU MUST ONLY SELECT FROM THE 7 ARTISTS LISTED BELOW!
DO NOT select artists from other movements (Expressionism, Fauvism, Impressionism, etc.)
ONLY these 7 artists: PICASSO, MAGRITTE, MIRÓ, CHAGALL, WARHOL, LICHTENSTEIN, HARING!
⚠️ FORBIDDEN: Boccioni, Mondrian, Man Ray, Dalí, Frida Kahlo, Braque, Munch, Matisse, etc.

Available 20th Century Modernism Artists (7명):

=== CUBISM 입체주의 ===
1. PICASSO (피카소) - Geometric fragmented forms, multiple perspectives

=== SURREALISM 초현실주의 ===
2. MAGRITTE (마그리트) - Philosophical paradox, multiplication of figures
3. MIRÓ (미로) - Playful biomorphic forms, childlike symbols, primary colors (LANDSCAPE/STILL LIFE ONLY)
4. CHAGALL (샤갈) - Soft dreamy floating figures, muted pastel colors

=== POP ART 팝아트 ===
5. WARHOL (워홀) - Silkscreen 4-panel grid, bold flat colors
6. LICHTENSTEIN (리히텐슈타인) - Ben-Day dots, comic book style
7. KEITH HARING (키스 해링) - Bold black outlines, dancing figures

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PHOTO TYPE WEIGHT GUIDE (사진 유형별 비중)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧑 SINGLE PORTRAIT (단독 인물):
   PICASSO 35%, MAGRITTE 25%, WARHOL 25%, LICHTENSTEIN 10%, HARING 5%
   ❌ CHAGALL, MIRÓ 제외

💑 COUPLE (커플 2인):
   PICASSO 30%, CHAGALL 25%, MAGRITTE 20%, WARHOL 15%, LICHTENSTEIN 10%
   ❌ HARING, MIRÓ 제외

👥 GROUP 3+ (단체 3명 이상):
   PICASSO 35%, HARING 35%, CHAGALL 15%, LICHTENSTEIN 15%
   ❌ WARHOL, MAGRITTE, MIRÓ 제외

🏞️ LANDSCAPE (풍경):
   PICASSO 25%, MAGRITTE 25%, CHAGALL 20%, MIRÓ 15%
   ❌ WARHOL, LICHTENSTEIN, HARING 제외

🍎 STILL LIFE (정물):
   PICASSO 35%, MAGRITTE 25%, MIRÓ 20%, WARHOL 20%
   ❌ CHAGALL, LICHTENSTEIN, HARING 제외

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ FINAL REMINDER: ONLY these 7 artists are valid:
PICASSO, MAGRITTE, MIRÓ, CHAGALL, WARHOL, LICHTENSTEIN, KEITH HARING
`;
}

function getModernismHints(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // ========================================
  // 네가티브 원칙 기반 힌트 (단순화)
  // ========================================
  
  let negativeWarnings = '';
  
  // 3명 이상 단체 사진
  if (count >= 3) {
    negativeWarnings = `
⚠️ GROUP PHOTO DETECTED (${count} people):
❌ DO NOT select WARHOL (4-grid doesn't work with groups)
❌ DO NOT select MAGRITTE (multiplication effect confusing with groups)
❌ DO NOT select MIRÓ (abstract symbols, not suitable for portraits)

✅ VALID OPTIONS for groups:
- PICASSO: Cubist fragmentation of multiple figures
- KEITH HARING: Bold outlines, dynamic dancing figures (best for energetic/fun groups)
- CHAGALL: Dreamy floating figures (best for romantic/family groups)
- LICHTENSTEIN: Comic book style (best for dramatic/action groups)

Choose based on the GROUP'S MOOD and ENERGY!
`;
  }
  
  // 커플 사진
  if (count === 2) {
    negativeWarnings = `
💑 COUPLE PHOTO DETECTED:
❌ DO NOT select HARING (too energetic for romantic couples)
❌ DO NOT select MIRÓ (abstract symbols, not suitable for portraits)

✅ VALID OPTIONS for couples:
- CHAGALL: Dreamy floating lovers (best for romantic mood)
- PICASSO: Merged/overlapping faces (best for passionate/artistic)
- MAGRITTE: Philosophical mystery (best for elegant/formal)
- WARHOL: Pop art repetition (best for modern/fun)
- LICHTENSTEIN: Comic romance (best for playful)

Choose based on the COUPLE'S MOOD!
`;
  }
  
  // 단독 인물
  if (count === 1) {
    negativeWarnings = `
🧑 SINGLE PORTRAIT DETECTED:
❌ DO NOT select CHAGALL (romantic style needs couple)
❌ DO NOT select MIRÓ (abstract symbols, not suitable for portraits)

✅ VALID OPTIONS for single portrait:
- PICASSO: Cubist face fragmentation (best for artistic/bold)
- MAGRITTE: Apple mystery or multiplication (best for philosophical)
- WARHOL: 4-panel pop art grid (best for iconic/colorful)
- LICHTENSTEIN: Comic book dots (best for dramatic expression)
- HARING: Bold outline figure (best for dynamic pose)

Choose based on the PERSON'S EXPRESSION and POSE!
`;
  }
  
  // 동물만 있는 사진
  const isAnimalOnly = (subject && (subject.includes('animal') || subject.includes('pet') || 
                        subject.includes('dog') || subject.includes('cat') || 
                        subject.includes('bird'))) && (!count || count === 0);
  if (isAnimalOnly) {
    negativeWarnings += `
⚠️ ANIMAL-ONLY PHOTO DETECTED:
❌ DO NOT select CHAGALL (romantic/human-focused style, not suitable for animals alone)
`;
  }
  
  // 풍경 사진
  const isLandscape = subject && (subject.includes('landscape') || subject.includes('nature') || 
                      subject.includes('mountain') || subject.includes('sea') || 
                      subject.includes('sky')) && (!count || count === 0);
  if (isLandscape) {
    negativeWarnings = `
🏞️ LANDSCAPE DETECTED:
❌ DO NOT select WARHOL (portrait-focused 4-grid)
❌ DO NOT select LICHTENSTEIN (comic style for people)
❌ DO NOT select HARING (figure-focused)

✅ VALID OPTIONS for landscape:
- PICASSO: Cubist geometric landscape
- MAGRITTE: Surreal dreamscape
- CHAGALL: Floating village scene
- MIRÓ: Playful biomorphic symbols

Choose based on the LANDSCAPE'S MOOD!
`;
  }
  
  return `
${negativeWarnings}

🎯 Choose the BEST artist based on photo type!

Each artist has unique strengths:
- PICASSO: Geometric fragmentation, multiple viewpoints, cubist deconstruction
- MAGRITTE: Philosophical paradox, multiplication, apple-over-face mystery
- MIRÓ: Playful biomorphic shapes, stars/moons, primary colors (LANDSCAPE/STILL LIFE ONLY)
- CHAGALL: Soft dreamy floating figures, muted pastels, romantic nostalgia
- WARHOL: 4-panel grid, bold flat pop colors, silkscreen repetition
- LICHTENSTEIN: Ben-Day dots, comic book style, thick black outlines
- KEITH HARING: Bold black outlines, dancing figures, radiant energy lines

Return the artist that will create the most compelling transformation!
`;
}


// ========================================
// v66: 화풍 프롬프트는 artistStyles.js로 통합됨
// getArtistStyle(artistKey) 또는 getArtistStyleByName(artistName) 사용
// ========================================

// ========================================
// Fallback 프롬프트 (AI 실패시 사용)
// ========================================
const fallbackPrompts = {
  ancient: {
    name: '그리스·로마',
    prompt: 'Transform this image into ancient Greek-Roman art. STRICT RULES: 1) ANY SPORTS/ATHLETIC ACTION (soccer, football, running, jumping, throwing, catching ball, ANY physical activity) → ALWAYS Greek/Roman MARBLE SCULPTURE in style of Discobolus or ancient Olympic athletes, pure white Carrara marble with visible carved muscles and dynamic frozen movement, classical athletic proportions, museum display style. CRITICAL: Ball games = SCULPTURE, NOT mosaic. 2) INDOOR PORTRAITS (no sports) → Greek/Roman marble sculpture with classical poses. 3) OUTDOOR SCENES WITHOUT SPORTS → Roman mosaic with LARGE CHUNKY TESSERAE TILES 50mm, THICK BLACK GROUT LINES clearly visible between EVERY tile, LIMITED COLORS (terracotta, ochre, umber, ivory, slate blue), Pompeii villa floor style. PRIORITY: Sports/athletic = ALWAYS SCULPTURE regardless of indoor/outdoor. Ancient masterpiece quality'
  },
  
  medieval: {
    name: '중세 미술',
    prompt: 'Medieval sacred art with dynamic style selection, IF ANIMALS in photo ALWAYS use Islamic Miniature style, Persian Ottoman COURT MINIATURE painting with intricate delicate details, vibrant jewel colors ruby red sapphire blue emerald green gold, flat decorative composition, ornamental floral patterns, courtly elegant aesthetic, richly decorated background, animals depicted in garden or hunting scenes, luxurious manuscript illumination quality, NO religious Christian imagery for animals to avoid inappropriate context, IF PEOPLE in photo choose from BYZANTINE 35% with GOLDEN MOSAIC sacred backgrounds with shimmering gold leaf and CIRCULAR GOLDEN HALO behind head and flat hieratic frontal iconic figures and divine transcendent spiritual atmosphere, OR GOTHIC 35% with CATHEDRAL STAINED GLASS jewel tones with THICK BLACK LEAD LINES dividing colored segments and vertical elongated figures and DIVINE HOLY LIGHT streaming through Gothic arches and FLAT TWO-DIMENSIONAL medieval aesthetic NOT realistic smooth painting, OR ISLAMIC MINIATURE 30% Persian Ottoman COURT MINIATURE for people, IF NO PEOPLE AND NO ANIMALS landscape only Choose BYZANTINE or GOTHIC based on scene characteristics, ANIMALS equals ISLAMIC MINIATURE ALWAYS safe secular art, Medieval masterpiece quality, NOT photograph, NOT 3D, NOT digital'
  },
  
  renaissance: {
    name: '르네상스',
    prompt: 'Renaissance painting by Leonardo da Vinci, Leonardo art style, EXTREME sfumato technique, PRESERVE original person face and features exactly, apply Mona Lisa PAINTING TECHNIQUE ONLY sfumato haze, do NOT transform face into Mona Lisa apply Leonardo STYLE not LIKENESS, apply very strong soft atmospheric haze throughout, all edges must be completely blurred, no sharp outlines anywhere in entire painting, mysterious smoky depth with sfumato technique, every boundary softly dissolved into atmosphere, warm golden Renaissance colors, harmonious balanced composition, unified composition all figures together NOT separated, preserve facial identity, Renaissance masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  baroque: {
    name: '바로크',
    prompt: 'Baroque painting by Caravaggio, Caravaggio art style, DRAMATIC chiaroscuro lighting with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique, rich deep colors, dynamic diagonal composition, theatrical emotional atmosphere, single unified composition with all figures together in one cohesive continuous scene NOT separated into multiple groups, Baroque masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  rococo: {
    name: '로코코',
    prompt: 'Rococo oil painting by Watteau, Watteau art style, VISIBLE BRUSHSTROKES with oil paint texture throughout, light pastel colors, playful ornate decoration, soft delicate brushwork, romantic elegant atmosphere, graceful curved lines, whimsical charm, single unified composition with all figures together in one cohesive scene NOT separated into multiple groups, painted on canvas with VISIBLE PAINT TEXTURE, Rococo masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  neoclassicism_vs_romanticism_vs_realism: {
    name: '신고전 vs 낭만 vs 사실주의',
    prompt: 'Choose best style based on photo: if static balanced formal use Neoclassical style by Jacques-Louis David, David art style, with cold perfection and clear lines, if dynamic emotional landscape use Romantic style by J.M.W. Turner, Turner art style, with atmospheric sublime effects, if rural peaceful use Realist style by Gustave Courbet, Courbet art style, with honest rural reality, if urban modern use Realist style by Édouard Manet, Manet art style, with sophisticated Paris realism, masterpiece quality with single unified composition NOT separated, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  impressionism: {
    name: '인상주의',
    prompt: 'Impressionist painting by Claude Monet, Monet art style, ROUGH VISIBLE BROKEN brushstrokes, SOFT HAZY atmospheric effects like morning mist, colors BLENDED and DISSOLVED into each other, NO sharp edges, dreamy blurred boundaries, dappled light filtering through atmosphere, Woman with a Parasol style atmospheric haze, everything slightly out of focus and impressionistic, NOT photographic clarity, Impressionist masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  postImpressionism: {
    name: '후기인상주의',
    prompt: 'Post-Impressionist painting, Post-Impressionist art style, bold expressive colors, personal artistic vision, emotional depth and symbolic meaning, visible distinctive brushwork, Post-Impressionist masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  fauvism: {
    name: '야수파',
    prompt: 'Fauvist painting by Henri Matisse, Matisse Fauvist art style, pure bold unmixed colors, flat decorative patterns, intense color contrasts, liberation of color from reality, simplified forms, joyful energetic atmosphere, The Dance-like pure color harmony, Fauvist masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  expressionism: {
    name: '표현주의',
    prompt: 'MUNCH_EXPRESSIONISM',  // 기본값 - 실제로는 artistStyles.js에서 동적 생성
    dynamicPrompt: true
  },
  
  modernism: {
    name: '20세기 모더니즘',
    prompt: 'PICASSO_CUBIST',  // 기본값 - 실제로는 artistStyles.js에서 동적 생성
    dynamicPrompt: true  // 동적 프롬프트 플래그
  },
  
  // ========================================
  // 거장 11명 (시간순 정렬 + 생사연도 + 사조)
  // ========================================
  // 원칙: 사용자가 거장 선택 → 어떤 사진이든 그 거장의 화풍으로 변환
  // ========================================
  
  vangogh: {
    name: '반 고흐',
    artist: 'Vincent van Gogh (1853-1890)',
    movement: '후기인상주의 (Post-Impressionism)',
    defaultWork: 'The Starry Night',
    prompt: 'painting by Vincent van Gogh, Van Gogh art style, THICK SWIRLING IMPASTO brushstrokes visible throughout, VIBRANT INTENSE emotional colors, cobalt blue, chrome yellow, emerald green, dynamic energetic turbulent sky and background, Starry Night style spiraling movement, passionate expressive emotional power, preserve subject identity, Van Gogh masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  klimt: {
    name: '클림트',
    artist: 'Gustav Klimt (1862-1918)',
    movement: '아르누보 (Art Nouveau)',
    defaultWork: 'The Kiss',
    prompt: 'painting by Gustav Klimt, Klimt Golden Phase art style, GOLD LEAF decorative patterns throughout background, Byzantine mosaic geometric ornaments, The Kiss style intimate sensuous atmosphere, MYSTERIOUS ALLURING EXPRESSION, femme fatale for women, homme fatale for men, jewel-like rich colors, gold, bronze, deep reds, flowing organic Art Nouveau lines, symbolic decorative elements, golden glow on skin, preserve subject identity, Klimt masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  munch: {
    name: '뭉크',
    artist: 'Edvard Munch (1863-1944)',
    movement: '표현주의 (Expressionism)',
    defaultWork: 'The Scream',
    prompt: 'painting by Edvard Munch, Munch Expressionist art style, INTENSE PSYCHOLOGICAL emotional depth, The Scream style existential anxiety atmosphere, WAVY DISTORTED flowing lines throughout background AND on figure, haunting symbolic colors, blood red orange sky, sickly yellows, deep blues, ANXIOUS ANGUISHED EXPRESSION on face NOT happy NOT smiling, raw emotional vulnerability exposed, visible brushwork, preserve subject identity, Munch Expressionist masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  matisse: {
    name: '마티스',
    artist: 'Henri Matisse (1869-1954)',
    movement: '야수파 (Fauvism)',
    defaultWork: 'The Dance',
    prompt: 'painting by Henri Matisse, Matisse Fauvist art style, PURE BOLD UNMIXED COLORS in flat decorative areas, The Dance style simplified joyful forms, complete liberation of color from reality, saturated intense primary colors, red, blue, green, APPLY UNREALISTIC COLORS TO FACE AND SKIN, green purple red on face OK, simplified facial features, rhythmic flowing harmonious lines, ROUGH FAUVIST BRUSHSTROKES clearly visible throughout including on skin NOT smooth NOT blended, life-affirming energetic atmosphere, preserve subject identity, Matisse Fauvist masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  picasso: {
    name: '피카소',
    artist: 'Pablo Picasso (1881-1973)',
    movement: '입체주의 (Cubism)',
    defaultWork: 'Les Demoiselles d\'Avignon',
    prompt: 'Cubist painting by Pablo Picasso, Picasso Cubism art style, MOST IMPORTANT THE FACE MUST BE CUBIST DECONSTRUCTED NOT REALISTIC, REQUIRED DISTORTIONS: show PROFILE NOSE side view while BOTH EYES face FORWARD on same face, FRAGMENT face into FLAT ANGULAR GEOMETRIC PLANES, break JAW FOREHEAD CHEEKS into separate angular shapes like shattered glass, Les Demoiselles d Avignon African mask angular style, Earth tones, ochre, brown, olive, grey, If the face looks normal or realistic YOU ARE DOING IT WRONG faces must look abstracted and geometrically impossible, Picasso Cubist masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  frida: {
    name: '프리다 칼로',
    artist: 'Frida Kahlo (1907-1954)',
    movement: '멕시코 초현실주의 (Mexican Surrealism)',
    defaultWork: 'Me and My Parrots',
    prompt: 'painting by Frida Kahlo, Frida Kahlo art style, INTENSE DIRECT GAZE portrait style, vibrant Mexican folk art colors, symbolic personal imagery, flowers, animals, vines, hearts, emotional raw vulnerability, Mexican traditional dress and floral headpiece, lush tropical green foliage background, autobiographical symbolic elements, rich saturated colors, detailed oil painting brushwork visible, preserve subject identity, Frida Kahlo masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  warhol: {
    name: '앤디 워홀',
    artist: 'Andy Warhol (1928-1987)',
    movement: '팝아트 (Pop Art)',
    defaultWork: 'Marilyn Monroe',
    prompt: 'Andy Warhol Pop Art, Warhol art style, CRITICAL LAYOUT divide canvas into 2x2 GRID with 4 EQUAL QUADRANTS separated by visible lines, Place the SAME PORTRAIT in each of the 4 squares, TOP-LEFT hot pink and yellow, TOP-RIGHT cyan and orange, BOTTOM-LEFT lime green and purple, BOTTOM-RIGHT red and blue, Each quadrant shows IDENTICAL face but with DIFFERENT BOLD FLAT COLORS, Silkscreen printing effect with HIGH CONTRAST, NO gradients, visible halftone dots, The face in all 4 panels must be the SAME PERSON from input photo with correct body proportions, Warhol Pop Art masterpiece, NOT photograph, NOT 3D, NOT digital'
  },
  
  // ========================================
  // 동양화 - AI가 스타일 자동 선택
  // v60: 텍스트는 A가 생성 → F가 그림 (텍스트 금지 규칙 제거)
  // ========================================
  korean: {
    name: '한국 전통화',
    prompt: 'Korean traditional painting, Joseon Dynasty art style, GENDER PRESERVATION preserve exact gender and facial features from original photo, Choose appropriate Korean style: Minhwa folk art for animals and flowers with light subtle Obangsaek colors and soft gentle pigments, Pungsokdo genre painting for people with LIGHT INK WASH technique and subtle colors over ink lines in Kim Hong-do and Shin Yun-bok style, Jingyeong landscape for nature with expressive ink and minimal color, SINGLE UNIFIED COMPOSITION, VISIBLE BRUSH TEXTURE 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  chinese: {
    name: '중국 전통화',
    prompt: 'Chinese traditional painting, classical Chinese art style, GENDER PRESERVATION preserve exact gender and facial features from original photo, Choose appropriate Chinese style: Shuimohua ink wash for landscapes with monochrome gradations, Gongbi meticulous painting for people with fine detailed brushwork and rich colors, Huaniao bird-and-flower for animals with precise naturalistic rendering, Chinese aesthetic principles, SINGLE UNIFIED COMPOSITION, VISIBLE INK BRUSH TEXTURE 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  japanese: {
    name: '일본 우키요에',
    prompt: 'Japanese Ukiyo-e woodblock print, Ukiyo-e art style, flat areas of bold solid colors, strong clear black outlines, completely flat two-dimensional composition, transform clothing to traditional kimono, decorative patterns, stylized simplified forms, elegant refined Japanese aesthetic, authentic Japanese ukiyo-e masterpiece quality, CRITICAL ANTI-HALLUCINATION preserve EXACT number of people from original photo, if 1 person then ONLY 1 person in result, DO NOT add crowds or extra figures in background, NO background people, NO audience, simple scenic background ONLY Mt Fuji or cherry blossom or waves or sky, VISIBLE WOODBLOCK PRINT TEXTURE 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  masters: {
    name: '거장 화풍',
    prompt: 'Master artist painting, master artist art style, exceptional technical skill, distinctive artistic vision, profound emotional depth, timeless masterpiece quality, VISIBLE THICK BRUSHSTROKES 20mm+, NOT photograph, NOT 3D, NOT digital'
  },
  
  oriental: {
    name: '동양화',
    prompt: 'Traditional East Asian painting, East Asian art style, ink wash brushwork, minimalist composition, harmony with nature, philosophical contemplation, classical Oriental masterpiece quality, VISIBLE INK BRUSH TEXTURE 20mm+, NOT photograph, NOT 3D, NOT digital'
  }
};

// ========================================
// 간단한 사진 분석 함수
// ========================================
function analyzePhoto() {
  // 실제로는 이미지를 보고 AI가 분석하지만,
  // 프롬프트에서 AI가 직접 분석하도록 함
  // 이 함수는 필요시 확장 가능
  return {
    analyzed: false,
    note: 'AI will analyze photo directly in prompt'
  };
}

// ========================================
// AI 화가 자동 선택 (타임아웃 포함)
// ========================================
async function selectArtistWithAI(imageBase64, selectedStyle, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  // 변수 선언을 함수 최상단으로 이동 (스코프 문제 해결)
  const categoryName = selectedStyle.name;
  // v74: 미술사조는 id를 사용 (rococo, impressionism 등), 거장/동양화는 category 사용
  const categoryType = (selectedStyle.category === 'movements') 
    ? selectedStyle.id 
    : selectedStyle.category;
  
  try {
    let promptText;
    
    if (categoryType === 'masters') {
      // ========================================
      // v62.1: 거장별 분기 처리
      // - 반 고흐/뭉크: 대표작 선택 방식 (AI가 사진에 맞는 작품 선택)
      // - 나머지 5명: 화풍 프롬프트 방식
      // ========================================
      const masterId = selectedStyle.id.replace('-master', '');
      
      // ========== 반 고흐/뭉크/클림트/마티스/피카소/프리다/워홀: 대표작 선택 방식 ==========
      if (masterId === 'vangogh' || masterId === 'munch' || masterId === 'klimt' || masterId === 'matisse' || masterId === 'picasso' || masterId === 'frida' || masterId === 'warhol') {
        // console.log('');
        // console.log('🎨🎨🎨 [V66] 대표작 선택 모드 (7거장 전원 매칭) 🎨🎨🎨');
        // console.log('   Master:', masterId);
        // console.log('   AI가 사진 분석 후 최적 대표작 선택 예정');
        // console.log('');
        
        // 대표작 DB (반 고흐 4개, 뭉크 4개)
        const masterWorksDB = {
          'vangogh': `
VINCENT VAN GOGH - SELECT ONE:
1. "The Starry Night" (별이 빛나는 밤) → night scene, sky, landscape, evening, OR FEMALE portrait (50% chance) | Style: SWIRLING SPIRAL brushstrokes, COBALT BLUE and YELLOW, cypress trees
2. "Café Terrace at Night" (밤의 카페 테라스) → outdoor evening, cafe, restaurant, street scene, city night, OR FEMALE portrait (50% chance) | Style: BRIGHT YELLOW gas lamp glow against DEEP COBALT BLUE night sky, strong perspective depth, cobblestone street, warm inviting atmosphere
3. "Sunflowers" (해바라기) → flowers, still life, bouquet ONLY | Style: THICK IMPASTO, CHROME YELLOW dominates, expressive petal strokes
4. "Self-Portrait" (자화상, 1889 Saint-Rémy) → MALE portrait ONLY | Style: TURQUOISE SWIRLING BACKGROUND, intense gaze, directional brushstrokes, CRITICAL: PRESERVE SUBJECT GENDER - do NOT add Van Gogh's beard or male features

⚠️ For FEMALE portrait: RANDOMLY select between "The Starry Night" OR "Café Terrace at Night" with equal 50/50 probability. Do NOT always pick the same one.`,

          'munch': `
EDVARD MUNCH - SELECT ONE:
1. "The Scream" (절규) → emotional portrait, anxiety, existential dread | Style: WAVY DISTORTED swirling LINES throughout, BLOOD RED and orange sky, skull-like distorted face, bridge setting, extreme anxiety
2. "Madonna" (마돈나) → mysterious, sensual, ecstatic mood | Style: flowing dark hair like HALO, RED AURA, pale luminous skin, half-closed eyes, mystical power
3. "Jealousy" (질투) → psychological tension, torment | Style: PALE GREEN sickly face, intense haunted stare, emotional turmoil colors

⚠️ AI selects based on photo mood and atmosphere.`,

          'klimt': `
GUSTAV KLIMT - SELECT ONE:
1. "The Kiss" (키스) → COUPLE embracing, romantic, intimate (NOT for single person, NOT for parent-child) | Style: GOLD LEAF patterns throughout, geometric rectangular patterns on male robe, circular patterns on female robe, Byzantine mosaic gold background, kneeling on flower meadow
2. "Judith I" (유디트) → FEMALE portrait, powerful, sensual, dangerous | Style: Wide GOLD CHOKER necklace, seductive half-closed eyes, bare shoulders, gold decorative elements, femme fatale atmosphere
3. "The Tree of Life" (생명의 나무) → landscape, decorative, ANY subject | Style: SPIRAL BRANCHES swirling outward, gold and bronze decorative swirls, elaborate curving patterns, Stoclet Frieze style`,

          'matisse': `
HENRI MATISSE - SELECT ONE:
1. "Woman in a Purple Coat" (보라 코트를 입은 여인) → FEMALE portrait (⭐PREFERRED DEFAULT for single female) | Style: RICH PURPLE COAT, BOLD BLACK OUTLINES around figure, decorative patterned background, mature elegant style, strong contour lines
2. "The Green Stripe" (초록 줄무늬) → FEMALE portrait ONLY when experimental/avant-garde/artistic mood | Style: GREEN STRIPE down CENTER of face dividing it in half, LEFT side yellow-pink tones, RIGHT side green-purple tones, RADICAL FAUVIST COLOR directly on skin
3. "The Dance" (춤) → GROUP of people (2+), movement, joy | Style: THREE-COLOR ONLY (RED figures + BLUE sky + GREEN ground), simplified flattened dancing bodies, primitive rhythmic energy
4. "The Red Room" (붉은 방) → interior, still life, single person in room | Style: RED DOMINATES 80% of scene, blue arabesque vine patterns on red, flattened space where wall and table merge`,

          'picasso': `
PABLO PICASSO - USE GUERNICA STYLE:
"Guernica" (게르니카) → ALL portraits | Style: BLACK WHITE GREY ONLY monochrome, ANGULAR GEOMETRIC face fragmentation, bold black outlines, Cubist multiple viewpoints, anguished expression allowed`,

          'frida': `
FRIDA KAHLO - SELECT ONE:
1. "Me and My Parrots" (나와 앵무새들) → person with birds/pets, colorful, tropical mood | Style: COLORFUL PARROTS on shoulders, LUSH GREEN TROPICAL FOLIAGE background, direct confident gaze, vibrant jewel-tone colors, traditional Mexican clothing
2. "Self-Portrait with Thorn Necklace" (가시 목걸이 자화상) → portrait with nature/animals, symbolic | Style: THORNY VINE NECKLACE with dead hummingbird pendant, black cat and monkey companions, large tropical leaves background, intense direct gaze
3. "Self-Portrait with Monkeys" (원숭이와 자화상) → person with pets/animals, warm intimate mood | Style: MONKEYS EMBRACING from behind shoulders, dense green tropical leaves, warm protective atmosphere, tender loving expression
4. "Diego and I" (디에고와 나) → emotional portrait, intense feelings | Style: DIEGO RIVERA face PAINTED ON FOREHEAD as third eye, loose flowing dark hair, tears streaming, raw emotional intimacy`,

          'warhol': `
ANDY WARHOL - USE THIS STYLE FOR ALL:
1. "Marilyn Monroe" (마릴린 먼로) → ANY portrait | Style: 2x2 FOUR-PANEL GRID, SAME FACE repeated 4 times, each panel with DIFFERENT BOLD NEON COLORS (hot pink, cyan, yellow, orange), HIGH CONTRAST silkscreen, FLAT colors NO gradients
2. "Campbell's Soup Cans" (캠벨 수프 캔) → objects, products, still life | Style: GRID REPETITION of same image, DIFFERENT BOLD POP COLORS each panel, commercial product aesthetic, flat graphic silkscreen style`
        };

        const masterWorks = masterWorksDB[masterId] || '';
        
        promptText = `You are selecting the BEST masterwork from ${categoryName}'s collection for this photo.

AVAILABLE MASTERWORKS (YOU MUST SELECT FROM THIS LIST ONLY):
${masterWorks}

⚠️ CRITICAL: You MUST select ONLY from the works listed above. Do NOT select any other works not in this list. If you select a work not listed above, the system will fail.

CRITICAL MATCHING RULES:
- If MALE subject → AVOID works with "Woman/여인/Madonna" in title, choose neutral or male-themed works
- If FEMALE subject → CAN select any work, female-themed preferred
- If SINGLE person (1) → NEVER select "Anxiety" (requires group), NEVER select "The Kiss" (requires couple)
- If GROUP (2+ people) → prefer "Anxiety" for Munch

STYLE APPLICATION RULE:
- Apply the artwork's TECHNIQUE, COLOR, MOOD to the subject.
- Do NOT literally copy figures from the artwork onto the subject.

INSTRUCTIONS:
1. Analyze the photo THOROUGHLY:
   - Subject type (person/landscape/animal/object)
   - If PERSON: gender (male/female), age, physical features (jaw shape, hair, build)
   - PERSON COUNT: How many people are in the photo? (1, 2, 3+)
   - BACKGROUND: What's in the background? (simple/complex/outdoor/indoor)
   - Mood, composition
2. Apply CRITICAL MATCHING RULES above - eliminate unsuitable works first
3. From remaining works, select the MOST SUITABLE one
4. Generate a FLUX prompt that STARTS with detailed subject description
5. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly
6. CRITICAL: If only 1 person in photo, add "DO NOT add extra people in background"

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo analysis",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or "both" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "ethnicity": "asian" or "caucasian" or "african" or "hispanic" or "middle_eastern" or "mixed" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc. ALWAYS include skin tone and ethnic features." or null,
  "person_count": 1 or 2 or 3 (number of people in photo),
  "background_type": "simple" or "complex" or "outdoor" or "indoor" or "studio",
  "selected_artist": "${categoryName}",
  "selected_work": "exact title of the masterwork you selected",
  "reason": "why this masterwork matches this photo (mention gender/count compatibility)",
  "prompt": "Start with 'MALE/FEMALE SUBJECT with [physical features]' if person, then 'painting by ${categoryName} in the style of [selected work title], [that work's distinctive techniques]'. If person_count=1, END with 'DO NOT add extra people, NO hallucinated figures in background'"
}`;
        
      } else {
        // ========== 나머지 5명: 화풍 프롬프트 방식 ==========
        // v66: 거장 화풍 프롬프트 가져오기 (artistStyles.js)
        const masterStylePrompt = getArtistStyleByName(masterId);
        
        // AI에게는 단순 사진 분석만 요청
        promptText = `Analyze this photo for ${categoryName}'s painting style transformation.

IMPORTANT: The user has ALREADY SELECTED ${categoryName} as their preferred master artist.
Your job is ONLY to analyze the photo - NOT to select a different artist or artwork.

STYLE TO APPLY (FIXED - DO NOT CHANGE):
${masterStylePrompt}

INSTRUCTIONS:
1. Analyze the photo:
   - Subject type (person/landscape/animal/object)
   - If PERSON: gender (male/female), age, physical features
   - Number of people in photo
   - Background type
   - Mood and composition
2. Generate a FLUX prompt that applies ${categoryName}'s style to THIS specific photo
3. CRITICAL: Preserve the original subject's identity, gender, age, and ethnicity

GENDER PRESERVATION RULE:
- If MALE subject → MUST preserve MASCULINE features (strong jaw, angular face, male body)
- If FEMALE subject → MUST preserve FEMININE features (soft features, female body)
- NEVER change the subject's gender

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo analysis",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or "both" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "ethnicity": "asian" or "caucasian" or "african" or "hispanic" or "middle_eastern" or "mixed" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc. ALWAYS include skin tone and ethnic features." or null,
  "person_count": 1 or 2 or 3,
  "background_type": "simple" or "complex" or "outdoor" or "indoor" or "studio",
  "selected_artist": "${categoryName}",
  "selected_work": null,
  "reason": "applying ${categoryName}'s distinctive painting style",
  "prompt": "Start with subject description (gender, age, features), then '${masterStylePrompt.substring(0, 200)}...'. If person_count=1, END with 'DO NOT add extra people'"
}`;
      }
      
    } else if (categoryType === 'oriental') {
      // 동양화: 한국/중국/일본 스타일 선택 (기존 로직 유지)
      const styleId = selectedStyle.id;
      
      if (styleId === 'korean') {
        // 한국 - Claude가 3가지 스타일 중 선택
        promptText = `Analyze this photo and select the BEST Korean traditional painting style.

You must choose ONE of these THREE styles:

Style 1: Korean Minhwa Folk Painting (민화)
- Best for: animals (tiger, magpie, fish), flowers (peony), birds, simple subjects
- Characteristics: Folk painting on ROUGH THICK HANJI PAPER with PROMINENT FIBER TEXTURE visible throughout, UNEVEN PIGMENT ABSORPTION creating patchy color areas, genuinely FADED OLD colors (like 200-year museum piece), TREMBLING UNSTEADY brushlines (amateur folk artist quality), thick black outlines but IRREGULAR and wobbly, colors pooling in paper fibers, authentic Joseon folk artifact NOT illustration
- When: Photo has animals, flowers, or needs folk art treatment

Style 2: Korean Pungsokdo Genre Painting (풍속도)
- Best for: people, portraits, daily life, couples, festivals, human activities  
- Characteristics: KOREAN INK PAINTING on ROUGH TEXTURED HANJI, BLACK INK BRUSHWORK dominates (70-80%), then EXTREMELY MINIMAL pale color washes (20-30% only), visible hanji fiber texture throughout, spontaneous confident ink strokes, Kim Hong-do's elegant restraint, earth-tone washes ONLY (pale brown, grey-green, faint ochre), NOT colorful NOT bright, distinctly different from Chinese gongbi's detailed colors
- CLOTHING: MUST transform modern clothing to traditional Joseon hanbok (저고리/치마 for women, 도포/갓 for men), NO modern clothes allowed
- When: Photo has people, faces, human subjects

Style 3: Korean Jingyeong Landscape (진경산수)
- Best for: mountains, nature, rocks, landscapes, scenery
- Characteristics: Bold expressive brushwork, dramatic angular forms, monochrome ink with strong contrasts, REAL Korean scenery (not idealized Chinese mountains)
- When: Photo has natural landscapes, mountains, rocks

Analyze the photo and choose the MOST suitable style.

CRITICAL INSTRUCTIONS FOR PROMPT GENERATION:

1. KOREAN VS CHINESE DISTINCTION:
   - Korean Pungsokdo: ROUGH hanji paper, spontaneous loose brushwork, 90% ink 10% color
   - NOT Chinese Gongbi: Chinese is meticulous/tight, Korean is loose/spontaneous
   - Korean uses MORE INK LESS COLOR than Chinese

2. GENDER PRESERVATION (MANDATORY IN PROMPT):
   - FIRST identify if photo has person(s) and their gender
   - If MALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows MALE person, PRESERVE MASCULINE FEATURES - strong jaw, masculine face, male body structure, KEEP MALE GENDER."
   - If FEMALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows FEMALE person, PRESERVE FEMININE FEATURES - soft face, feminine features, female body structure, KEEP FEMALE GENDER."
   - This gender instruction MUST be the FIRST thing in your generated prompt

3. CALLIGRAPHY TEXT - YOU GENERATE:
   - Choose ONE appropriate Korean/Hanja text from these options:
   - For portraits/people: "風流" (풍류) or "雅趣" (아취) or "淸雅" (청아)
   - For landscapes: "山水" (산수) or "眞景" (진경) or "江山" (강산)
   - For folk art: "福" (복) or "壽" (수) or "囍" (희)
   - Include in your prompt: "include calligraphic text '[YOUR CHOSEN TEXT]' as vertical calligraphy with red seal stamp in corner"

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description including gender if person present (1 sentence)",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc." or null,
  "selected_artist": "Korean Minhwa" or "Korean Pungsokdo" or "Korean Jingyeong Landscape",
  "selected_style": "minhwa" or "pungsokdo" or "landscape",
  "calligraphy_text": "YOUR CHOSEN KOREAN/HANJA TEXT (e.g. 風流, 山水, 福)",
  "reason": "why this style fits (1 sentence)",
  "prompt": "KEEP UNDER 150 WORDS. [Gender rule] Korean [style] with key characteristics, include calligraphic text '[calligraphy_text]' as vertical calligraphy with red seal stamp in corner"
}

CRITICAL: Keep prompt field UNDER 150 WORDS to avoid truncation.`;
      }
      
      if (styleId === 'chinese') {
        // 중국 - Claude가 3가지 스타일 중 선택
        promptText = `Analyze this photo and select the BEST Chinese traditional painting style.

You must choose ONE of these THREE styles:

Style 1: Chinese Ink Wash Painting (水墨畫 Shuimohua)
- Best for: landscapes, mountains, nature, trees, contemplative subjects, simple compositions
- Characteristics: Monochrome black ink with gradations (deep black to light grey), soft flowing brushstrokes, minimalist composition with elegant empty space, misty atmosphere
- When: Photo has landscapes, nature, or needs meditative serene treatment

Style 2: Chinese Gongbi Meticulous Painting (工筆畫)
- Best for: portraits, people, detailed subjects, colorful compositions
- Characteristics: EXTREMELY FINE detailed brushwork with DELICATE HAIR-THIN brush lines, SILK SURFACE TEXTURE throughout (not paper), rich MINERAL PIGMENT colors (malachite green, azurite blue, cinnabar red), ornate decorative patterns, TRADITIONAL PAINTED FEEL not digital, imperial court quality, VISIBLE FINE BRUSHSTROKES showing meticulous hand-painted technique
- When: Photo has people, faces, or needs detailed colorful treatment
- CRITICAL: Must look like TRADITIONAL HAND-PAINTED silk painting, NOT smooth digital art, NOT AI-generated look

Style 3: Chinese Huaniao Bird-and-Flower Painting (花鳥畫)
- Best for: birds, flowers, animals (dogs, cats, rabbits), fish, insects, any natural creatures
- Characteristics: Traditional genre includes "flowers, birds, fish, insects" (花鳥魚蟲) PLUS animals, detailed naturalistic rendering, precise brushwork for fur/feathers/petals, delicate colors, symbolic meanings
- When: Photo has birds, flowers, animals, or plants

Analyze the photo and choose the MOST suitable style.

CRITICAL INSTRUCTIONS FOR PROMPT GENERATION:

1. GENDER PRESERVATION (MANDATORY IN PROMPT):
   - FIRST identify if photo has person(s) and their gender
   - If MALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows MALE person, PRESERVE MASCULINE FEATURES - strong jaw, masculine face, male body structure, KEEP MALE GENDER."
   - If FEMALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows FEMALE person, PRESERVE FEMININE FEATURES - soft face, feminine features, female body structure, KEEP FEMALE GENDER."
   - This gender instruction MUST be the FIRST thing in your generated prompt

2. CALLIGRAPHY TEXT - YOU GENERATE:
   - Choose ONE appropriate Chinese text (Hanzi) from these options:
   - For portraits/people: "仙姿" (선자) or "雅趣" (아취) or "淸雅" (청아)
   - For landscapes: "山水" (산수) or "水墨" (수묵) or "雲山" (운산)
   - For flowers/birds: "花鳥" (화조) or "梅蘭竹菊" (매란국죽) or "春" (춘)
   - For Gongbi: "仙鶴圖" (선학도) or "牡丹" (모란) or "宮廷" (궁정)
   - Include in your prompt: "include calligraphic text '[YOUR CHOSEN TEXT]' as vertical calligraphy with red seal stamp in corner"

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description including gender if person present (1 sentence)",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc." or null,
  "selected_artist": "Chinese Ink Wash" or "Chinese Gongbi" or "Chinese Huaniao",
  "selected_style": "ink_wash" or "gongbi" or "huaniao",
  "calligraphy_text": "YOUR CHOSEN CHINESE TEXT (e.g. 仙鶴圖, 山水, 花鳥)",
  "reason": "why this style fits (1 sentence)",
  "prompt": "KEEP UNDER 150 WORDS. [Gender rule] Chinese [style] with key characteristics, include calligraphic text '[calligraphy_text]' as vertical calligraphy with red seal stamp in corner"
}

CRITICAL: Keep prompt field UNDER 150 WORDS to avoid truncation.`;
      }
      
      if (styleId === 'japanese') {
        // 일본 - 우키요에 고정
        return {
          success: true,
          artist: '일본 우키요에',
          reason: 'Japanese traditional ukiyo-e style',
          prompt: fallbackPrompts.japanese.prompt,
          analysis: 'Japanese ukiyo-e style applied'
        };
      }
      
    } else {
      // ========================================
      // 미술사조: v33 업그레이드된 화가 선택
      // ========================================
      
      // 사조별 가이드라인 가져오기
      let guidelines = '';
      let hints = '';
      
      // 간단한 사진 분석 (AI가 직접 하지만 힌트용)
      const photoAnalysis = {
        count: 1,  // AI가 실제 분석
        gender: 'unknown',
        shot_type: 'portrait',
        subject: 'person',
        background: 'neutral',
        mood: 'neutral',
        age_range: 'adult',
        lighting: 'normal',
        expression: 'neutral',
        composition: 'normal'
      };
      
      if (categoryType === 'ancient') {
        guidelines = getAncientGreekRomanGuidelines();
        hints = getAncientGreekRomanHints(photoAnalysis);
      } else if (categoryType === 'renaissance') {
        guidelines = getRenaissanceGuidelines();
        hints = getRenaissanceHints(photoAnalysis);
      } else if (categoryType === 'baroque') {
        guidelines = getBaroqueGuidelines();
        hints = getBaroqueHints(photoAnalysis);
      } else if (categoryType === 'rococo') {
        guidelines = getRococoGuidelines();
        hints = getRococoHints(photoAnalysis);
      } else if (categoryType === 'medieval') {
        guidelines = getMedievalGuidelines();
        hints = getMedievalHints(photoAnalysis);
      } else if (categoryType === 'neoclassicism_vs_romanticism_vs_realism') {
        guidelines = getNeoclassicismVsRomanticismVsRealismGuidelines();
        hints = getNeoclassicismVsRomanticismVsRealismHints(photoAnalysis);
      } else if (categoryType === 'impressionism') {
        guidelines = getImpressionismGuidelines();
        hints = getImpressionismHints(photoAnalysis);
      } else if (categoryType === 'postImpressionism') {
        guidelines = getPostImpressionismGuidelines();
        hints = getPostImpressionismHints(photoAnalysis);
      } else if (categoryType === 'fauvism') {
        guidelines = getFauvismGuidelines();
        hints = getFauvismHints(photoAnalysis);
      } else if (categoryType === 'expressionism') {
        guidelines = getExpressionismGuidelines();
        hints = getExpressionismHints(photoAnalysis);
      } else if (categoryType === 'modernism') {
        guidelines = getModernismGuidelines();
        hints = getModernismHints(photoAnalysis);
      } else {
        // 고대 그리스-로마, 중세 미술 등 - 기본 로직
        promptText = `Analyze this photo and select the BEST artist from ${categoryName} period/style to transform it.

Instructions:
1. Analyze: subject, age, mood, composition, lighting
2. Select the MOST SUITABLE ${categoryName} artist for THIS specific photo
3. Generate a detailed prompt for FLUX Depth in that artist's style
4. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description",
  "selected_artist": "Artist Full Name",
  "reason": "why this artist fits this photo",
  "prompt": "painting by [Artist], [artist's technique], [artist's characteristics], depicting the subject while preserving original features and age"
}

Keep it concise and accurate.`;
      }
      
      // 상세 가이드라인이 있는 사조
      if (guidelines) {
        // 고대 그리스-로마는 스타일 선택 (화가 아님)
        if (categoryType === 'ancient') {
          // v67: 로마 모자이크 대표작 가이드 추가
          const ancientMasterworkGuide = getMovementMasterworkGuide('ancient') || '';
          
          promptText = `Select the BEST ${categoryName} STYLE for this photo.

${guidelines}

${ancientMasterworkGuide}

${hints}

Instructions - PRIORITY ORDER:
1. FIRST check: Are there ANIMALS in this photo?
   - Dogs, cats, horses, birds, fish, any animals → ROMAN MOSAIC
   - Historical accuracy: Romans excelled at animal mosaics (Pompeii Cave Canem)
   - Animals = MOSAIC priority!
2. SECOND check: Is there DYNAMIC MOVEMENT/ACTION/SPORTS in this photo?
   - If YES → CLASSICAL SCULPTURE (even if landscape/stadium visible!)
   - Sports, jumping, running, athletic action = SCULPTURE priority!
3. THIRD check: Is it a STATIC photo WITH landscape/nature elements?
   - If YES → ROMAN MOSAIC
4. FOURTH: Portrait without landscape → CLASSICAL SCULPTURE
5. If ROMAN MOSAIC selected, also choose the BEST MASTERWORK from the list above
6. Follow RECOMMENDATIONS (80% weight)
7. Preserve subject identity

Return JSON only:
{
  "analysis": "brief - note if animals/dynamic/static (1 sentence)",
  "selected_artist": "Classical Sculpture" or "Roman Mosaic",
  "selected_work": "If Roman Mosaic, select best masterwork from list above (e.g. 'Alexander Mosaic'). If Classical Sculpture, use null",
  "reason": "why this style fits, mention animals/dynamic/static (1 sentence)",
  "prompt": "Ancient Greek-Roman art in [chosen style], [style characteristics - for Sculpture mention material choice, for Mosaic mention tesserae tiles and selected masterwork style], depicting subject while preserving original facial features"
}`;
        } else if (categoryType === 'medieval') {
          // 중세 미술만 동물 체크 (Islamic Miniature)
          // v67: 고딕 대표작 가이드 추가
          const medievalMasterworkGuide = getMovementMasterworkGuide('medieval') || '';
          
          promptText = `Select the BEST ${categoryName} artist for this photo.

${guidelines}

${medievalMasterworkGuide}

${hints}

Instructions:
1. 🚨 FIRST CHECK: Does this photo have ANIMALS?
   - If YES → MUST choose Islamic Miniature (ONLY safe option)
   - NEVER Byzantine/Gothic/Romanesque for animals (religious context!)
2. Analyze photo: people count, subject, mood, age
3. Follow RECOMMENDATIONS (70-80% weight)
4. Choose most DISTINCTIVE artist/style
5. If GOTHIC selected, also choose the BEST MASTERWORK from the list above
6. Preserve facial identity
7. IMPORTANT: Include DETAILED style characteristics in your prompt
   - For Islamic Miniature with animals: mention "Persian/Ottoman court painting, garden or hunting scenes with animals, vibrant jewel colors, ornamental floral patterns, secular courtly aesthetic"
   - For Islamic Geometric: mention "CLEARLY VISIBLE geometric patterns, Islamic tessellation, star patterns, interlocking shapes, arabesque motifs, symmetrical geometric composition, decorative Islamic mosaic aesthetic" AND CRITICAL: "ABSOLUTELY NO HUMAN FIGURES OR FACES, pure geometric and floral patterns only, Islamic aniconism tradition"
   - For Byzantine: mention "golden mosaic backgrounds with shimmering gold leaf, flat hieratic frontal figures, divine sacred atmosphere"
   - For Gothic: mention "cathedral stained glass jewel tones, vertical elongated figures, divine holy light streaming through Gothic arches" AND "FLAT TWO-DIMENSIONAL medieval style NOT realistic smooth painting, angular linear forms with hard edges like stained glass panels"
   - For Romanesque: mention "church fresco flat solid forms, biblical narrative simplicity, stone relief aesthetic" AND "FLAT MURAL FRESCO style NOT smooth realistic painting, solid block-like forms with heavy outlines like stone carvings"
   - For other styles: include their signature techniques and visual characteristics

Return JSON only:
{
  "analysis": "brief (1 sentence)",
  "selected_artist": "Artist Name or Style Name",
  "selected_work": "If Gothic, select best masterwork from list above. Otherwise use null",
  "reason": "why (1 sentence)",
  "prompt": "Medieval art in [style name], [DETAILED style characteristics including techniques and visual features], depicting subject while preserving original features"
}`;
        } else {
          // 다른 사조들 (표현주의, 르네상스, 바로크 등)
          // v67: 화가 + 대표작 동시 선택 방식
          
          // 사조별 대표작 가이드 가져오기
          const masterworkGuide = getMovementMasterworkGuide(categoryType) || '';
          
          promptText = `Select the BEST ${categoryName} artist AND their BEST MASTERWORK for this photo.

${guidelines}

${masterworkGuide}

${hints}

Instructions:
1. FIRST analyze the photo THOROUGHLY:
   - Subject type (person/landscape/animal/object)
   - If PERSON: gender (male/female), age, physical features (jaw shape, hair, build)
   - PERSON COUNT: How many people are in the photo? (1, 2, 3+)
   - BACKGROUND: What's in the background? (simple/complex/outdoor/indoor)
   - Mood, composition
2. Follow RECOMMENDATIONS (70-80% weight)
3. Choose most DISTINCTIVE artist for THIS specific photo
4. CRITICAL: Select the BEST MASTERWORK from that artist's list above that matches this photo
5. Preserve facial identity and original features
6. Include the masterwork's SPECIFIC style characteristics in your prompt
7. IMPORTANT: Start prompt with subject description if person
8. CRITICAL: If only 1 person in photo, add "DO NOT add extra people in background, keep background clean"

Return JSON only:
{
  "analysis": "brief (1 sentence)",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or "both" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "ethnicity": "asian" or "caucasian" or "african" or "hispanic" or "middle_eastern" or "mixed" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc. ALWAYS include skin tone and ethnic features." or null,
  "person_count": 1 or 2 or 3 (number of people in photo),
  "background_type": "simple" or "complex" or "outdoor" or "indoor" or "studio",
  "selected_artist": "Artist Full Name",
  "selected_work": "EXACT masterwork title from the list above",
  "reason": "why this artist AND this masterwork fit (1 sentence)",
  "prompt": "Start with 'MALE/FEMALE SUBJECT with [physical features]' if person, then 'painting by [Artist] in the style of [selected_work], [that work's distinctive techniques and colors]'. If person_count=1, END with 'DO NOT add extra people, NO hallucinated figures in background, keep background CLEAN'"
}`;
        }
      }
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',  // Claude Sonnet 4.5 (최신)
        max_tokens: 1000,  // 500 → 1000 (JSON 잘림 방지)
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64.split(',')[1]
              }
            },
            {
              type: 'text',
              text: promptText
            }
          ]
        }]
      })
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.content[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const result = JSON.parse(text);
    
    // 검증
    if (!result.prompt || !result.selected_artist) {
      throw new Error('Invalid AI response format');
    }
    
    return {
      success: true,
      artist: result.selected_artist,
      work: result.selected_work,  // 거장 모드: 선택된 대표작
      reason: result.reason,
      prompt: result.prompt,
      analysis: result.analysis,
      // Vision 분석 결과 (통합됨)
      visionData: {
        subject_type: result.subject_type || null,
        gender: result.gender || null,
        age_range: result.age_range || null,
        physical_description: result.physical_description || null,
        person_count: result.person_count || null,
        background_type: result.background_type || null
      }
    };
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('AI selection failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ========================================
// A 방안: 상세 분석 결과를 프롬프트로 변환
// ========================================
function buildIdentityPrompt(visionAnalysis) {
  if (!visionAnalysis || visionAnalysis.subject_type !== 'person') {
    return '';
  }
  
  const parts = [];
  
  // 성별 강조 (가장 중요)
  if (visionAnalysis.gender === 'male') {
    parts.push('MALE SUBJECT with MASCULINE features');
    if (visionAnalysis.physical_description) {
      parts.push(visionAnalysis.physical_description);
    } else {
      parts.push('strong angular jaw, male bone structure, masculine build');
    }
    parts.push('DO NOT feminize, DO NOT soften features, KEEP AS MAN');
  } else if (visionAnalysis.gender === 'female') {
    parts.push('FEMALE SUBJECT with FEMININE features');
    if (visionAnalysis.physical_description) {
      parts.push(visionAnalysis.physical_description);
    } else {
      parts.push('soft delicate features, female bone structure, feminine build');
    }
    parts.push('DO NOT masculinize, KEEP AS WOMAN');
  } else if (visionAnalysis.gender === 'both') {
    // 남녀 혼합 (커플, 그룹 등)
    parts.push('MIXED GENDER GROUP - PRESERVE BOTH GENDERS EXACTLY');
    if (visionAnalysis.physical_description) {
      parts.push(visionAnalysis.physical_description);
    }
    parts.push('MALE figures MUST remain MASCULINE with strong jaw and male bone structure');
    parts.push('FEMALE figures MUST remain FEMININE with soft features and female bone structure');
    parts.push('DO NOT swap genders, DO NOT feminize males, DO NOT masculinize females');
  }
  
  // 나이
  if (visionAnalysis.age_range) {
    const ageMap = {
      'baby': 'BABY infant',
      'child': 'CHILD young kid',
      'teen': 'TEENAGER adolescent',
      'young_adult': 'young adult in 20s',
      'adult': 'adult in 30s-40s',
      'middle_aged': 'middle-aged person in 50s',
      'elderly': 'ELDERLY senior person'
    };
    parts.push(ageMap[visionAnalysis.age_range] || visionAnalysis.age_range);
  }
  
  // 머리
  if (visionAnalysis.hair) {
    parts.push(visionAnalysis.hair);
  }
  
  // 민족성 (매우 중요!)
  if (visionAnalysis.ethnicity) {
    const ethnicityMap = {
      'asian': 'ASIAN ethnicity with East Asian facial features, monolid or double eyelid eyes, warm golden-brown skin tone',
      'caucasian': 'CAUCASIAN ethnicity with European facial features, light skin tone',
      'african': 'AFRICAN ethnicity with African facial features, dark brown skin tone',
      'hispanic': 'HISPANIC/LATINO ethnicity with Latin American features, warm tan skin tone',
      'middle_eastern': 'MIDDLE EASTERN ethnicity with Middle Eastern features, olive skin tone',
      'mixed': 'MIXED ethnicity preserving original mixed heritage features'
    };
    const ethnicDesc = ethnicityMap[visionAnalysis.ethnicity] || `${visionAnalysis.ethnicity} ethnicity`;
    parts.push(ethnicDesc);
    parts.push('DO NOT change race, DO NOT alter skin color, PRESERVE original ethnicity EXACTLY');
  }
  
  return parts.join(', ');
}

// ========================================
// B 방안: 성별에 맞지 않는 화가 필터링
// ========================================
const FEMALE_BIASED_ARTISTS = [
  'BOUCHER', 'WATTEAU', 'BOTTICELLI', 'RENOIR'
];

const MALE_BIASED_ARTISTS = [
  'REMBRANDT', 'CARAVAGGIO', 'TITIAN', 'VELÁZQUEZ', 'VELAZQUEZ'
];

// 사조별 남성 적합 화가 목록 (여성 편향 화가 제외)
// 여성 편향: BOUCHER, WATTEAU, BOTTICELLI, RENOIR
const MALE_SUITABLE_ARTISTS_BY_CATEGORY = {
  'impressionism': [
    // RENOIR 제외
    { name: 'CAILLEBOTTE', weight: 50 },  // 도시 남성 전문
    { name: 'MONET', weight: 30 },
    { name: 'DEGAS', weight: 20 }
  ],
  'postImpressionism': [
    // 여성 편향 없음
    { name: 'VAN GOGH', weight: 40 },
    { name: 'CÉZANNE', weight: 25 },
    { name: 'GAUGUIN', weight: 25 },
    { name: 'SIGNAC', weight: 10 }
  ],
  'baroque': [
    { name: 'CARAVAGGIO', weight: 45 },
    { name: 'REMBRANDT', weight: 40 },
    { name: 'VELÁZQUEZ', weight: 15 }
  ],
  'renaissance': [
    // BOTTICELLI 제외
    { name: 'LEONARDO DA VINCI', weight: 45 },
    { name: 'TITIAN', weight: 30 },
    { name: 'MICHELANGELO', weight: 15 },
    { name: 'RAPHAEL', weight: 10 }
  ],
  'rococo': [
    // WATTEAU, BOUCHER 둘 다 여성 편향 - 로코코는 원래 여성적 사조
    // 남성 사진엔 로코코 자체가 부적합하지만, 그래도 와토가 그나마 나음
    { name: 'WATTEAU', weight: 70 },
    { name: 'BOUCHER', weight: 30 }
  ],
  'fauvism': [
    // 여성 편향 없음
    { name: 'MATISSE', weight: 40 },
    { name: 'DERAIN', weight: 35 },
    { name: 'VLAMINCK', weight: 25 }
  ],
  'expressionism': [
    // 여성 편향 없음
    { name: 'MUNCH', weight: 30 },
    { name: 'KIRCHNER', weight: 30 },
    { name: 'KOKOSCHKA', weight: 25 },
    { name: 'KANDINSKY', weight: 15 }
  ],
  'modernism': [
    // 여성 편향 없음
    { name: 'PICASSO', weight: 35 },
    { name: 'WARHOL', weight: 25 },
    { name: 'MAGRITTE', weight: 20 },
    { name: 'LICHTENSTEIN', weight: 15 },
    { name: 'KEITH HARING', weight: 5 }
  ],
  'neoclassicism': [
    // 여성 편향 없음 (INGRES는 여성 인물 잘 그리지만 남성도 잘 그림)
    { name: 'JACQUES-LOUIS DAVID', weight: 45 },
    { name: 'INGRES', weight: 25 },
    { name: 'DELACROIX', weight: 20 }
  ],
  'neoclassicism_vs_romanticism_vs_realism': [
    // neoclassicism과 동일 (별칭)
    { name: 'JACQUES-LOUIS DAVID', weight: 25 },
    { name: 'DELACROIX', weight: 20 },
    { name: 'TURNER', weight: 20 },
    { name: 'COURBET', weight: 15 },
    { name: 'MANET', weight: 10 },
    { name: 'INGRES', weight: 10 }
  ]
};

function filterArtistByGender(artistName, gender, category = null) {
  const upperArtist = artistName.toUpperCase();
  
  if (gender === 'male') {
    // 남자 사진인데 여성 편향 화가 선택됨
    for (const femaleArtist of FEMALE_BIASED_ARTISTS) {
      if (upperArtist.includes(femaleArtist)) {
        // console.log(`⚠️ Gender filter: ${artistName} is female-biased, but subject is MALE`);
        
        // 사조에 맞는 남성 적합 화가 중 가중치 랜덤 선택
        const maleSuitable = MALE_SUITABLE_ARTISTS_BY_CATEGORY[category];
        if (maleSuitable) {
          const suggestion = weightedRandomSelect(maleSuitable);
          // console.log(`🔄 [GENDER-FILTER] Category: ${category}, weight-selected: ${suggestion}`);
          return {
            filtered: true,
            reason: `${artistName} specializes in female subjects`,
            suggestion: suggestion
          };
        }
        
        // fallback
        return {
          filtered: true,
          reason: `${artistName} specializes in female subjects`,
          suggestion: 'REMBRANDT'
        };
      }
    }
  } else if (gender === 'female') {
    // 여자 사진인데 남성 편향 화가는 괜찮음 (여성도 잘 그림)
    // 필터링 안 함
  }
  
  return { filtered: false };
}

// ========================================
// 메인 핸들러
// ========================================
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();
    const { image, selectedStyle } = req.body;

    // v66: 구조화된 로그 수집 객체
    const logData = {
      vision: { count: 0, gender: '', age: '', subjectType: '' },
      selection: { category: '', movement: '', artist: '', masterwork: '', reason: '' },
      prompt: { 
        wordCount: 0, 
        applied: { 
          coreRules: false, gender: false, artist: false, masterwork: false, 
          identity: false, attractive: false, painting: false, brushwork: false, sandwich: false 
        }
      },
      flux: { model: 'flux-depth-dev', control: 0 }
    };

    // 디버깅 로그 (v66: 주석처리)
    // console.log('=== FLUX Transfer v33 Debug ===');
    // console.log('Has REPLICATE_API_KEY:', !!process.env.REPLICATE_API_KEY);
    // console.log('Has ANTHROPIC_API_KEY:', !!process.env.ANTHROPIC_API_KEY);
    // console.log('Has image:', !!image);
    // console.log('Image length:', image ? image.length : 0);
    // console.log('Image starts with:', image ? image.substring(0, 50) : 'N/A');
    // console.log('Has selectedStyle:', !!selectedStyle);
    // console.log('selectedStyle:', selectedStyle);

    if (!process.env.REPLICATE_API_KEY) {
      console.error('ERROR: REPLICATE_API_KEY not configured');
      return res.status(500).json({ error: 'Replicate API key not configured' });
    }

    if (!image || !selectedStyle) {
      console.error('ERROR: Missing image or selectedStyle');
      console.error('image exists:', !!image);
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ error: 'Missing image or style' });
    }

    // selectedStyle 구조 검증
    if (!selectedStyle.name || !selectedStyle.category) {
      console.error('ERROR: Invalid selectedStyle structure');
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ 
        error: 'Invalid style structure',
        details: 'Missing name or category'
      });
    }

    let finalPrompt;
    let selectedArtist;
    let selectedWork;  // 거장 모드: 선택된 대표작
    let selectionMethod;
    let selectionDetails = {};
    let controlStrength = 0.80; // 기본값
    const categoryType = selectedStyle.category; // categoryType 변수 추가
    
    // ========================================
    // 사조별 기본 control_strength 설정
    // 미술사 흐름: 형태 유지 → 변형 → 해체
    // ========================================
    const movementStrengthMap = {
      // 형태 충실 유지 (0.80)
      'ancient-greek-sculpture': 0.80,
      'roman-mosaic': 0.80,
      'byzantine': 0.80,
      'islamic-miniature': 0.80,
      'gothic': 0.80,
      'renaissance': 0.80,
      'baroque': 0.80,
      'rococo': 0.70,  // 로코코: 회화적 붓터치 강조
      'neoclassicism': 0.80,
      'neoclassicism_vs_romanticism_vs_realism': 0.80,
      'romanticism': 0.80,
      
      // 빛으로 형태 흐릿 (0.70)
      'impressionism': 0.70,
      
      // 붓터치/기하학 변형 시작 (0.65)
      'post-impressionism': 0.65,
      
      // 점묘법 (0.60 - 점으로 형태 구성)
      'pointillism': 0.60,
      
      // 색채/감정 폭발 (0.55~0.60)
      'fauvism': 0.60,
      'expressionism': 0.55,
      
      // 동양화 (0.75 - 형태 유지하되 화풍 적용)
      'korean': 0.75,
      'chinese': 0.75,
      'japanese': 0.75,
      
      // 20세기 모더니즘 (화가별 개별 설정 - 여기선 기본값만)
      'modernism': 0.50
    };
    
    // 사조별 기본값 적용
    if (selectedStyle.id && movementStrengthMap[selectedStyle.id]) {
      controlStrength = movementStrengthMap[selectedStyle.id];
      // console.log(`📊 Movement-based control_strength: ${selectedStyle.id} → ${controlStrength}`);
    } else if (categoryType === 'oriental') {
      controlStrength = 0.75;
      // console.log(`📊 Oriental category control_strength: ${controlStrength}`);
    } else if (categoryType === 'modernism') {
      controlStrength = 0.50; // 모더니즘 기본값 (화가별로 개별 재설정됨)
      // console.log(`📊 Modernism category control_strength: ${controlStrength} (will be overridden per artist)`);
    }
    
    // 🎨 풍경/정물/동물일 때 control_strength 높여서 원본 구도 유지
    // (나중에 visionAnalysis 확인 후 조정됨)
    let landscapeStrengthBoost = false;
    
    if (selectedStyle.category === 'oriental' && selectedStyle.id === 'japanese') {
      // 일본 우키요에 (고정)
      // console.log('Japanese Ukiyo-e - using fixed style');
      
      const fallback = fallbackPrompts.japanese;
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectionMethod = 'oriental_fixed';
      selectionDetails = {
        style: 'japanese_ukiyoe'
      };
      
    } else if (process.env.ANTHROPIC_API_KEY) {
      // console.log(`Trying AI artist selection for ${selectedStyle.name}...`);
      
      // ========================================
      // 🎯 통합된 AI 호출 (화가 선택 + Vision 분석)
      // ========================================
      const aiResult = await selectArtistWithAI(
        image, 
        selectedStyle,
        15000 // 15초 타임아웃 (성공률 98%)
      );
      
      // Vision 분석 결과 추출 (통합됨)
      let visionAnalysis = null;
      let identityPrompt = '';
      
      if (aiResult.success && aiResult.visionData) {
        visionAnalysis = aiResult.visionData;
        identityPrompt = buildIdentityPrompt(visionAnalysis);
        // console.log('📸 Vision data (integrated):', visionAnalysis);
        // console.log('📸 Identity prompt:', identityPrompt);
        
        // v66: Vision 로그 수집
        logData.vision.count = visionAnalysis.person_count || 0;
        logData.vision.gender = visionAnalysis.gender || '';
        logData.vision.age = visionAnalysis.age_range || '';
        logData.vision.subjectType = visionAnalysis.subject_type || '';
      }
      
      // ========================================
      // 🎯 대전제: 가중치 기반 화가 사전 선택
      // ========================================
      let preSelectedArtist = null;
      const photoAnalysis = {}; // AI가 분석하기 전 기본 분석
      
      // Vision 분석 결과를 photoAnalysis에 반영
      if (visionAnalysis) {
        photoAnalysis.gender = visionAnalysis.gender;
        photoAnalysis.age_range = visionAnalysis.age_range;
        photoAnalysis.count = visionAnalysis.person_count || 0;
      }
      
      // 이미지에서 기본 정보 추출 시도 (카테고리별 가중치 테이블이 있는 경우)
      const categoryForWeight = selectedStyle.category;
      if (ARTIST_WEIGHTS[categoryForWeight]) {
        preSelectedArtist = selectArtistByWeight(categoryForWeight, photoAnalysis);
        if (preSelectedArtist) {
          // console.log(`🎲 [WEIGHT-BASED] Pre-selected artist: ${preSelectedArtist} (category: ${categoryForWeight})`);
          
          // ========================================
          // 🔴 B 방안: 성별에 맞지 않는 화가 필터링
          // ========================================
          if (visionAnalysis && visionAnalysis.gender) {
            const filterResult = filterArtistByGender(preSelectedArtist, visionAnalysis.gender, categoryForWeight);
            if (filterResult.filtered) {
              // console.log(`🚫 [GENDER-FILTER] ${filterResult.reason}`);
              // console.log(`🔄 [GENDER-FILTER] Suggesting: ${filterResult.suggestion}`);
              preSelectedArtist = filterResult.suggestion;
            }
          }
        }
      }
      
      if (aiResult.success) {
        // AI 성공!
        finalPrompt = aiResult.prompt;
        selectedArtist = aiResult.artist;
        selectedWork = aiResult.work;  // 거장 모드: 선택된 대표작
        selectionMethod = 'ai_auto';
        selectionDetails = {
          analysis: aiResult.analysis,
          reason: aiResult.reason
        };
        // console.log('✅✅✅ [V41-TEST-SUCCESS] AI selected:', selectedArtist);
        // console.log('✅✅✅ [V48] Selected work:', selectedWork);
        
        // v66: AI 선택 결과 로그 수집
        logData.selection.category = selectedStyle.category || '';
        logData.selection.artist = selectedArtist || '';
        logData.selection.masterwork = selectedWork || '';
        logData.selection.reason = aiResult.reason || '';
        
        // 반 고흐/뭉크 대표작 선택 결과 강조 로그
        const masterId = selectedStyle?.id?.replace('-master', '') || '';
        if (masterId === 'vangogh' || masterId === 'munch') {
          // console.log('');
          // console.log('🖼️🖼️🖼️ [V62.1] 대표작 선택 결과 🖼️🖼️🖼️');
          // console.log('   화가:', selectedArtist);
          // console.log('   선택된 작품:', selectedWork);
          // console.log('   선택 이유:', aiResult.reason);
          // console.log('🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️');
          // console.log('');
        }
        
        // ========================================
        // 🎯 대전제: AI 분석 후 가중치 기반 화가 재선택
        // ========================================
        const categoryForWeight = selectedStyle.category;
        if (ARTIST_WEIGHTS[categoryForWeight]) {
          // AI 분석 결과에서 사진 정보 추출
          const analysisText = (aiResult.analysis || '').toLowerCase();
          const photoAnalysisFromAI = {
            count: 0,
            subject: analysisText,
            gender: null,
            age: null,
            background: analysisText
          };
          
          // 🚨 Vision이 landscape/animal/object로 판단했으면 count=0 유지
          if (visionAnalysis && (visionAnalysis.subject_type === 'landscape' || 
                                  visionAnalysis.subject_type === 'animal' || 
                                  visionAnalysis.subject_type === 'object')) {
            photoAnalysisFromAI.count = 0;
            photoAnalysisFromAI.subject = visionAnalysis.subject_type;
            // console.log(`📸 [VISION-OVERRIDE] Subject is ${visionAnalysis.subject_type}, keeping count=0`);
          } else {
            // 인원수 추출 (인물 사진일 때만)
            if (analysisText.includes('group') || analysisText.includes('people') || analysisText.includes('family')) {
              photoAnalysisFromAI.count = 3;
            } else if (analysisText.includes('couple') || analysisText.includes('two') || analysisText.includes('pair')) {
              photoAnalysisFromAI.count = 2;
            } else if (analysisText.includes('person') || analysisText.includes('portrait') || analysisText.includes('face') || 
                       analysisText.includes('man') || analysisText.includes('woman') || analysisText.includes('child')) {
              photoAnalysisFromAI.count = 1;
            }
          }
          
          // 성별 추출
          if (analysisText.includes('woman') || analysisText.includes('female') || analysisText.includes('girl')) {
            photoAnalysisFromAI.gender = 'female';
          } else if (analysisText.includes('man') || analysisText.includes('male') || analysisText.includes('boy')) {
            photoAnalysisFromAI.gender = 'male';
          }
          
          // 나이 추출
          if (analysisText.includes('elderly') || analysisText.includes('old') || analysisText.includes('aged')) {
            photoAnalysisFromAI.age = 'elderly';
          }
          
          // 가중치 기반 화가 선택
          let weightSelectedArtist = selectArtistByWeight(categoryForWeight, photoAnalysisFromAI);
          
          // ========================================
          // 🔴 B 방안: 성별에 맞지 않는 화가 필터링 (가중치 선택 후)
          // ========================================
          if (weightSelectedArtist && visionAnalysis && visionAnalysis.gender) {
            const filterResult = filterArtistByGender(weightSelectedArtist, visionAnalysis.gender, categoryForWeight);
            if (filterResult.filtered) {
              // console.log(`🚫 [GENDER-FILTER] ${weightSelectedArtist} filtered: ${filterResult.reason}`);
              // console.log(`🔄 [GENDER-FILTER] Replacing with: ${filterResult.suggestion}`);
              weightSelectedArtist = filterResult.suggestion;
            }
          }
          
          if (weightSelectedArtist) {
            // console.log(`🎲 [WEIGHT-OVERRIDE] Changing from "${selectedArtist}" to "${weightSelectedArtist}"`);
            // console.log(`   Photo analysis: count=${photoAnalysisFromAI.count}, gender=${photoAnalysisFromAI.gender}, age=${photoAnalysisFromAI.age}`);
            
            // 화가 교체
            const oldArtist = selectedArtist;
            selectedArtist = weightSelectedArtist;
            selectionMethod = 'weight_random';
            selectionDetails.weightOverride = {
              original: oldArtist,
              selected: weightSelectedArtist,
              photoType: detectPhotoType(photoAnalysisFromAI)
            };
            
            // v66: 모든 사조 - artistStyles.js에서 통합 관리
            const artistStyle = getArtistStyleByName(weightSelectedArtist);
            
            if (artistStyle) {
              // subjectType 전달 (풍경/정물/동물일 때 인물 관련 프롬프트 제거)
              const subjectType = visionAnalysis ? visionAnalysis.subject_type : 'person';
              finalPrompt = artistStyle;
              // console.log(`🎨 [${categoryForWeight.toUpperCase()}] Applied ${weightSelectedArtist} style from artistStyles.js (subjectType: ${subjectType})`);
            } else {
              // 프롬프트 없는 화가: 기존 방식 (화가 이름만 교체)
              finalPrompt = finalPrompt.replace(new RegExp(oldArtist, 'gi'), weightSelectedArtist);
            }
            
            // 🚨 성별 감지 기반 강력한 프롬프트 삽입 (맨 앞)
            // E 방안: Vision 분석 결과가 있으면 더 상세한 프롬프트 사용
            let genderPrefix = '';
            
            // 풍경/정물/동물일 때는 성별 프롬프트 건너뛰기
            const isNonPerson = visionAnalysis && (
              visionAnalysis.subject_type === 'landscape' || 
              visionAnalysis.subject_type === 'animal' || 
              visionAnalysis.subject_type === 'object'
            );
            
            if (isNonPerson) {
              // console.log(`📸 [NON-PERSON] Subject is ${visionAnalysis.subject_type}, skipping gender prefix`);
              // 풍경/정물용 프롬프트
              genderPrefix = `CRITICAL: This is a ${visionAnalysis.subject_type.toUpperCase()} photo - DO NOT add any people or human figures. Keep as pure ${visionAnalysis.subject_type}. `;
              
              // 🎨 풍경/정물일 때 control_strength 높여서 원본 구도 유지
              const originalStrength = controlStrength;
              controlStrength = Math.min(controlStrength + 0.15, 0.90);  // +0.15, 최대 0.90
              // console.log(`📊 [LANDSCAPE-BOOST] control_strength: ${originalStrength} → ${controlStrength} (원본 구도 유지 강화)`);
              
              // 🎨 [방법 C] 풍경일 때 프롬프트에서 사람 관련 표현 제거
              const originalPromptLength = finalPrompt.length;
              finalPrompt = finalPrompt
                // 들라크루아 - 사람/액션 관련
                .replace(/Liberty Leading the People style dramatic action,?\s*/gi, '')
                .replace(/dramatic gestures and heroic romantic intensity,?\s*/gi, 'dramatic romantic intensity, ')
                .replace(/heroic idealized figures in classical poses,?\s*/gi, '')
                .replace(/heroic idealized figures,?\s*/gi, '')
                // 다비드 - 영웅적 인물
                .replace(/heroic idealized figures in classical poses,?\s*/gi, '')
                // 밀레 - 농민
                .replace(/monumental peasant figures,?\s*/gi, '')
                .replace(/DIGNIFIED RURAL LABOR with monumental peasant figures,?\s*/gi, 'DIGNIFIED RURAL SCENE, ')
                // 마네 - 도시인물
                .replace(/sophisticated urban café society atmosphere,?\s*/gi, 'sophisticated urban atmosphere, ')
                .replace(/frank direct confrontational gaze,?\s*/gi, '')
                // 고야 - 시선/인물
                .replace(/penetrating gaze and inner truth revealed,?\s*/gi, '')
                .replace(/La Maja Vestida style Spanish elegance for portraits,?\s*/gi, '')
                .replace(/court painter sophistication with underlying tension,?\s*/gi, 'sophisticated composition with underlying tension, ')
                // 르누아르 - 살결
                .replace(/rosy pink flesh tones with pearly highlights,?\s*/gi, 'rosy pink tones with pearly highlights, ')
                .replace(/warm flesh tones,?\s*/gi, 'warm tones, ')
                // 로코코 - 귀족/인물
                .replace(/aristocratic.*?gathering,?\s*/gi, 'elegant gathering, ')
                .replace(/elegant figures in shimmering silk costumes,?\s*/gi, '')
                .replace(/theatrical graceful poses,?\s*/gi, 'theatrical graceful composition, ')
                // 인상주의 - 인물
                .replace(/elegant bourgeois figures in urban settings,?\s*/gi, 'elegant urban settings, ')
                .replace(/capturing movement and gesture,?\s*/gi, 'capturing movement, ')
                // 바로크 - 인물
                .replace(/intense emotional realism,?\s*/gi, 'intense emotional atmosphere, ')
                // 르네상스 - 인물
                .replace(/faces emerging from smoky darkness,?\s*/gi, 'forms emerging from smoky darkness, ')
                .replace(/idealized graceful figures,?\s*/gi, 'idealized graceful forms, ')
                .replace(/HEROIC SCULPTURAL FIGURES with powerful muscular anatomy,?\s*/gi, 'HEROIC SCULPTURAL FORMS, ')
                .replace(/elegant elongated figures,?\s*/gi, 'elegant elongated forms, ')
                // 야수파/표현주의 - 인물
                .replace(/simplified joyful forms,?\s*/gi, 'joyful forms, ')
                // 연속 쉼표/공백 정리
                .replace(/,\s*,/g, ',')
                .replace(/,\s*\./g, '.')
                .replace(/\s{2,}/g, ' ')
                .trim();
              
              // console.log(`🎨 [LANDSCAPE-FILTER] Removed human-related expressions: ${originalPromptLength} → ${finalPrompt.length} chars`);
            } else if (identityPrompt && identityPrompt.length > 0) {
              // Vision 분석 결과 사용 (더 상세함)
              genderPrefix = `ABSOLUTE REQUIREMENT: ${identityPrompt}. `;
              // console.log('🚨 Using Vision-based identity prompt');
            } else if (photoAnalysisFromAI.gender === 'male') {
              genderPrefix = 'ABSOLUTE REQUIREMENT: This is a MALE person - subject MUST have MASCULINE face with strong jaw, male bone structure, NO feminine features, DO NOT make female, DO NOT add makeup or feminine traits, DO NOT soften features, KEEP AS MAN. ';
              // console.log('🚨 Detected MALE - Added MASCULINE enforcement');
            } else if (photoAnalysisFromAI.gender === 'female') {
              genderPrefix = 'ABSOLUTE REQUIREMENT: This is a FEMALE person - subject MUST have FEMININE face with soft features, female bone structure, KEEP AS WOMAN. ';
              // console.log('🚨 Detected FEMALE - Added FEMININE enforcement');
            } else if (photoAnalysisFromAI.gender === 'both' || (visionAnalysis && visionAnalysis.gender === 'both')) {
              genderPrefix = 'ABSOLUTE REQUIREMENT: MIXED GENDER GROUP - MALE figures MUST remain MASCULINE with strong jaw and male bone structure, FEMALE figures MUST remain FEMININE with soft features, DO NOT swap genders, DO NOT feminize males, DO NOT masculinize females, PRESERVE EACH PERSON\'S ORIGINAL GENDER EXACTLY. ';
              // console.log('🚨 Detected BOTH genders - Added MIXED preservation rule');
            } else {
              // 성별 미감지 시에도 강력한 보존 규칙 적용
              genderPrefix = 'ABSOLUTE REQUIREMENT: STRICTLY PRESERVE ORIGINAL GENDER from photo - if subject appears MALE keep MASCULINE features with strong jaw and male bone structure DO NOT feminize DO NOT soften DO NOT add feminine traits, if subject appears FEMALE keep FEMININE features. ';
              // console.log('🚨 Gender unknown - Added STRONG preservation rule');
            }
            finalPrompt = genderPrefix + finalPrompt;
            logData.prompt.applied.gender = true;
            
            // ========================================
            // 🚫 환각 방지: 원본에 없는 요소 추가 금지
            // ========================================
            let antiHallucinationRule = ' STRICT ANTI-HALLUCINATION: DO NOT add ANY elements not present in the original photo. ';
            
            if (visionAnalysis) {
              const count = visionAnalysis.person_count;
              const subjectType = visionAnalysis.subject_type;
              
              if (subjectType === 'person' && count) {
                if (count === 1) {
                  antiHallucinationRule += 'Original has EXACTLY 1 PERSON - DO NOT add extra people or faces in background. ';
                } else if (count === 2) {
                  antiHallucinationRule += 'Original has EXACTLY 2 PEOPLE - DO NOT add extra people. ';
                } else {
                  antiHallucinationRule += `Original has EXACTLY ${count} PEOPLE - maintain same count. `;
                }
              } else if (subjectType === 'landscape') {
                antiHallucinationRule += 'This is LANDSCAPE - DO NOT add people or figures not in original. ';
              } else if (subjectType === 'animal') {
                antiHallucinationRule += 'This is ANIMAL photo - DO NOT add humans or extra animals not in original. ';
              } else if (subjectType === 'object') {
                antiHallucinationRule += 'This is OBJECT/STILL LIFE - DO NOT add people or extra objects not in original. ';
              }
              
              antiHallucinationRule += 'Keep composition faithful to original photo. NO hallucinated elements.';
            }
            
            finalPrompt = finalPrompt + antiHallucinationRule;
            // console.log('🚫 Anti-hallucination rule added:', antiHallucinationRule);
            
            // console.log(`✅ [WEIGHT-BASED] Final artist: ${selectedArtist}`);
          }
        }
        // ========================================
        // 끝: 가중치 기반 화가 재선택
        // ========================================
        
        // ========================================
        // v67: 대전제 - 스타일별 분기 (고대/중세는 유화 아님)
        // ========================================
        
        // 고대/중세 스타일 체크
        const isAncientStyle = categoryType === 'ancient' || 
          (selectedArtist && (selectedArtist.toUpperCase().includes('SCULPTURE') || 
           selectedArtist.toUpperCase().includes('CLASSICAL') || 
           selectedArtist.toUpperCase().includes('MOSAIC') ||
           selectedArtist.toUpperCase().includes('MARBLE')));
        
        const isMedievalStyle = categoryType === 'medieval' || 
          (selectedArtist && (selectedArtist.toUpperCase().includes('BYZANTINE') || 
           selectedArtist.toUpperCase().includes('GOTHIC') || 
           selectedArtist.toUpperCase().includes('ISLAMIC')));
        
        let coreRulesPrefix;
        
        if (isAncientStyle) {
          // 고대 그리스-로마: 붓터치 규칙 제외
          coreRulesPrefix = 
            'CRITICAL RULES: Preserve the original subject FACE and APPEARANCE exactly - same facial features, same face shape, same look. ' +
            'Preserve identity, age, gender and ethnicity exactly. ' +
            'Render people attractively. ' +
            'Do NOT add any people or elements not present in the original photo. ' +
            'Maintain correct anatomical proportions. ' +
            'NOT a photograph, NOT photorealistic, NOT 3D render, NOT digital art. ';
        } else if (isMedievalStyle) {
          // 중세: 붓터치 규칙 제외, 평면적 스타일
          coreRulesPrefix = 
            'CRITICAL RULES: Preserve the original subject FACE and APPEARANCE - same facial features, same face shape. ' +
            'Preserve identity, age, gender and ethnicity exactly. ' +
            'Do NOT add any people or elements not present in the original photo. ' +
            'Maintain correct anatomical proportions. ' +
            'NOT a photograph, NOT photorealistic, NOT 3D render, NOT digital art. ';
        } else {
          // 일반 유화: 붓터치 강제 + 나체 금지
          coreRulesPrefix = 
            'CRITICAL: NO nudity, NO naked bodies, NO exposed breasts - subjects must be FULLY CLOTHED. ' +
            'Transform this photo into an authentic TRADITIONAL OIL PAINTING with thick impasto technique. ' +
            'The entire image including the subject face, skin, hair and clothing MUST have very thick visible brushstrokes of 20mm or thicker that are clearly visible even without zooming in. ' +
            'Use palette knife marks and heavy textured brushwork throughout the canvas. ' +
            'This thick brushstroke texture on the subject is REQUIRED and NON-NEGOTIABLE - not fine lines, not subtle texture, not just on the background. ' +
            'CRITICAL RULES: Preserve the original subject FACE and APPEARANCE exactly - same facial features, same face shape, same look. Preserve identity, age, gender and ethnicity exactly. ' +
            'Render people attractively unless expressive distortion is part of the style. ' +
            'Do NOT add any people or elements not present in the original photo. ' +
            'Do NOT add any text, signatures, letters, writing or watermarks. ' +
            'Maintain correct anatomical proportions with no missing or extra limbs. ' +
            'Apply only the painting TECHNIQUE, never the painter physical appearance - no Van Gogh beard, no Frida unibrow. ' +
            'This must look like a real hand-painted oil painting, absolutely NOT a photograph, NOT photorealistic, NOT smooth, NOT 3D render, NOT digital art, NOT airbrushed. ';
        }
        
        finalPrompt = coreRulesPrefix + finalPrompt;
        logData.prompt.applied.coreRules = true;
        // console.log(`🎯 v62: Applied CORE RULES PREFIX (${isPicassoCubist ? '피카소: 분해 강제' : '일반'})`);
        
        // ========================================
        // v66: 성별 보존 프롬프트 (모든 카테고리 공통)
        // ========================================
        let genderPrefixCommon = '';
        
        // 풍경/정물/동물일 때는 성별 프롬프트 건너뛰기
        const isNonPersonSubject = visionAnalysis && (
          visionAnalysis.subject_type === 'landscape' || 
          visionAnalysis.subject_type === 'animal' || 
          visionAnalysis.subject_type === 'object'
        );
        
        if (isNonPersonSubject) {
          genderPrefixCommon = `CRITICAL: This is a ${visionAnalysis.subject_type.toUpperCase()} photo - DO NOT add any people or human figures. `;
        } else if (identityPrompt && identityPrompt.length > 0) {
          genderPrefixCommon = `ABSOLUTE REQUIREMENT: ${identityPrompt}. `;
        } else if (photoAnalysisFromAI.gender === 'male') {
          genderPrefixCommon = 'ABSOLUTE REQUIREMENT: This is a MALE person - subject MUST have MASCULINE face with strong jaw, male bone structure, NO feminine features, DO NOT feminize. ';
        } else if (photoAnalysisFromAI.gender === 'female') {
          genderPrefixCommon = 'ABSOLUTE REQUIREMENT: This is a FEMALE person - subject MUST have FEMININE face with soft features, female bone structure, KEEP AS WOMAN. ';
        } else if (photoAnalysisFromAI.gender === 'both' || (visionAnalysis && visionAnalysis.gender === 'both')) {
          genderPrefixCommon = 'ABSOLUTE REQUIREMENT: MIXED GENDER GROUP - preserve each person original gender exactly. ';
        } else {
          genderPrefixCommon = 'ABSOLUTE REQUIREMENT: STRICTLY PRESERVE ORIGINAL GENDER from photo. ';
        }
        
        finalPrompt = genderPrefixCommon + finalPrompt;
        logData.prompt.applied.gender = true;
        
        // ========================================
        // v62: 거장 대표작별 세부 프롬프트 적용
        // v64: 고흐/뭉크/마티스는 masterworks 사용
        // ========================================
        if (categoryType === 'masters' && selectedWork) {
          // console.log('🎨 [V62] Masters mode - applying masterwork enhancement');
          // console.log('   Artist:', selectedArtist);
          // console.log('   Work:', selectedWork);
          
          // 대표작 키 변환 (예: "KLIMT" + "The Kiss" → "klimt-kiss")
          const workKey = convertToWorkKey(selectedArtist, selectedWork);
          // console.log('   WorkKey:', workKey);
          
          if (workKey) {
            const artistKey = workKey.split('-')[0];
            
            // v66: 고흐/뭉크/클림트/마티스/피카소/프리다/워홀은 masterworks에서 가져오기
            if (['vangogh', 'munch', 'klimt', 'matisse', 'picasso', 'frida', 'warhol'].includes(artistKey)) {
              const movementMasterwork = getMovementMasterwork(workKey);
              if (movementMasterwork) {
                console.log('');
                console.log('🎨🎨🎨 거장 대표작 매칭 🎨🎨🎨');
                console.log('   👤 화가:', selectedArtist);
                console.log('   🖼️ 대표작:', movementMasterwork.name, `(${movementMasterwork.nameEn})`);
                console.log('   📝 특징:', movementMasterwork.feature);
                console.log('');
                
                // v66: 화가 프롬프트 먼저 (artistStyles.js)
                const artistStylePrompt1 = getArtistStyle(artistKey);
                if (artistStylePrompt1) {
                  finalPrompt = finalPrompt + ', ' + artistStylePrompt1;
                  logData.prompt.applied.artist = true;
                  // console.log('🎨 [v66] 화가 프롬프트 적용:', artistKey);
                }
                
                // 대표작 프롬프트 (우선)
                finalPrompt = finalPrompt + ', ' + movementMasterwork.prompt;
                logData.prompt.applied.masterwork = true;
                // console.log('🖼️ [v65] 대표작 프롬프트 적용:', movementMasterwork.nameEn);
                
                // expressionRule 적용 (뭉크 등)
                if (movementMasterwork.expressionRule) {
                  finalPrompt = finalPrompt + ', ' + movementMasterwork.expressionRule;
                  // console.log('🎭 [v65] Applied expressionRule:', movementMasterwork.expressionRule);
                }
              } else {
                console.log('⚠️ 대표작 매칭 실패:', workKey);
              }
            }
            
            // v66: artistEnhancements.js 삭제됨
            // 피카소/프리다/워홀 등은 대표작 매칭 없이 화풍만 적용 (artistStyles.js)
          }
        }
        
        // ========================================
        // v64: 사조 모드 대표작 매칭 시스템
        // ========================================
        if (categoryType !== 'masters' && categoryType !== 'oriental') {
          // 화가명 → artistKey 변환
          const artistNameToKey = {
            // 스타일
            'roman mosaic': 'roman-mosaic', 'mosaic': 'roman-mosaic',
            'gothic': 'gothic', 'stained glass': 'gothic',
            'byzantine': 'byzantine', '비잔틴': 'byzantine',
            'islamic miniature': 'islamic-miniature', 'islamic': 'islamic-miniature', '이슬람': 'islamic-miniature', '이슬람 세밀화': 'islamic-miniature',
            // 르네상스
            'botticelli': 'botticelli', 'sandro botticelli': 'botticelli',
            'leonardo': 'leonardo', 'leonardo da vinci': 'leonardo', 'da vinci': 'leonardo',
            'titian': 'titian', 'tiziano': 'titian',
            'michelangelo': 'michelangelo',
            'raphael': 'raphael', 'raffaello': 'raphael',
            // 바로크
            'caravaggio': 'caravaggio',
            'rubens': 'rubens', 'peter paul rubens': 'rubens',
            'rembrandt': 'rembrandt', 'rembrandt van rijn': 'rembrandt',
            'velázquez': 'velazquez', 'velazquez': 'velazquez', 'diego velázquez': 'velazquez',
            // 로코코
            'watteau': 'watteau', 'antoine watteau': 'watteau',
            'boucher': 'boucher', 'françois boucher': 'boucher',
            // 신고전/낭만/사실
            'david': 'david', 'jacques-louis david': 'david',
            'ingres': 'ingres',
            'turner': 'turner', 'j.m.w. turner': 'turner',
            'delacroix': 'delacroix', 'eugène delacroix': 'delacroix',
            'courbet': 'courbet', 'gustave courbet': 'courbet',
            'manet': 'manet', 'édouard manet': 'manet',
            // 인상주의
            'renoir': 'renoir', 'pierre-auguste renoir': 'renoir',
            'degas': 'degas', 'edgar degas': 'degas',
            'monet': 'monet', 'claude monet': 'monet',
            'caillebotte': 'caillebotte', 'gustave caillebotte': 'caillebotte',
            // 후기인상주의
            'van gogh': 'vangogh', 'vincent van gogh': 'vangogh', 'vangogh': 'vangogh',
            'gauguin': 'gauguin', 'paul gauguin': 'gauguin',
            'cézanne': 'cezanne', 'cezanne': 'cezanne', 'paul cézanne': 'cezanne',
            'signac': 'signac', 'paul signac': 'signac',
            // 야수파
            'matisse': 'matisse', 'henri matisse': 'matisse',
            'derain': 'derain', 'andré derain': 'derain',
            'vlaminck': 'vlaminck', 'maurice de vlaminck': 'vlaminck',
            // 표현주의
            'munch': 'munch', 'edvard munch': 'munch',
            'kokoschka': 'kokoschka', 'oskar kokoschka': 'kokoschka',
            'kirchner': 'kirchner', 'ernst ludwig kirchner': 'kirchner',
            // 모더니즘 (피카소/프리다/워홀 포함)
            'picasso': 'picasso', 'pablo picasso': 'picasso',
            'frida': 'frida', 'frida kahlo': 'frida',
            'warhol': 'warhol', 'andy warhol': 'warhol',
            'magritte': 'magritte', 'rené magritte': 'magritte', 'rene magritte': 'magritte',
            'miro': 'miro', 'miró': 'miro', 'joan miro': 'miro', 'joan miró': 'miro',
            'chagall': 'chagall', 'marc chagall': 'chagall',
            'lichtenstein': 'lichtenstein', 'roy lichtenstein': 'lichtenstein',
            'haring': 'haring', 'keith haring': 'haring', 'keith-haring': 'haring'
          };
          
          const artistLower = selectedArtist.toLowerCase().trim();
          const artistKey = artistNameToKey[artistLower];
          
          if (artistKey) {
            const masterworkList = getArtistMasterworkList(artistKey);
            if (masterworkList && masterworkList.length > 0) {
              // v67: AI가 선택한 대표작 사용 (랜덤 대신)
              let selectedMasterworkKey = null;
              let masterwork = null;
              
              // AI가 대표작을 선택했으면 그것 사용
              if (selectedWork) {
                selectedMasterworkKey = convertToWorkKey(selectedArtist, selectedWork);
                if (selectedMasterworkKey) {
                  masterwork = getMovementMasterwork(selectedMasterworkKey);
                }
              }
              
              // AI 선택이 없거나 찾을 수 없으면 fallback으로 랜덤 선택
              if (!masterwork) {
                const randomIndex = Math.floor(Math.random() * masterworkList.length);
                selectedMasterworkKey = masterworkList[randomIndex];
                masterwork = getMovementMasterwork(selectedMasterworkKey);
                console.log('⚠️ AI 대표작 선택 없음, 랜덤 fallback:', selectedMasterworkKey);
              }
              
              if (masterwork) {
                console.log('');
                console.log('🎨🎨🎨 사조 대표작 매칭 🎨🎨🎨');
                console.log('   👤 화가:', selectedArtist);
                console.log('   🤖 AI 선택:', selectedWork || '(없음 - 랜덤)');
                console.log('   🖼️ 적용 대표작:', masterwork.name, `(${masterwork.nameEn})`);
                console.log('   📝 특징:', masterwork.feature);
                console.log('');
                
                // v66: 화가 프롬프트 먼저 (artistStyles.js)
                const artistStylePrompt2 = getArtistStyle(artistKey);
                if (artistStylePrompt2) {
                  finalPrompt = finalPrompt + ', ' + artistStylePrompt2;
                  logData.prompt.applied.artist = true;
                  // console.log('🎨 [v66] 화가 프롬프트 적용:', artistKey);
                }
                
                // 대표작 프롬프트 (우선)
                finalPrompt = finalPrompt + ', ' + masterwork.prompt;
                logData.prompt.applied.masterwork = true;
                // console.log('🖼️ [v67] 대표작 프롬프트 적용:', masterwork.nameEn);
              }
            }
          }
        }
        
        // ========================================
        // 고대 그리스-로마 강화 프롬프트
        // ========================================
        
        // 고대 조각 선택시 대리석 강화
        if (selectedArtist.toUpperCase().trim().includes('SCULPTURE') || 
            selectedArtist.toUpperCase().trim().includes('CLASSICAL') ||
            selectedArtist.includes('조각')) {
          // console.log('🎯 Classical Sculpture detected');
          if (!finalPrompt.includes('CARRARA MARBLE')) {
            finalPrompt = finalPrompt + ', PURE WHITE CARRARA MARBLE ancient Greek-Roman sculpture: CRITICAL - ENTIRE IMAGE must be COMPLETELY STONE including ALL clothing transformed to carved marble drapery with realistic fabric folds in stone, ALL skin becomes smooth polished marble with subtle veining, MONOCHROMATIC white/cream/grey tones ONLY with NO other colors, heroic classical proportions like Discobolus or Augustus of Prima Porta, MUSEUM PEDESTAL DISPLAY with neutral grey background, dramatic sculptural lighting with soft shadows emphasizing carved forms, frozen dynamic moment captured in eternal marble, authentic ancient masterpiece quality, render subject ATTRACTIVELY and BEAUTIFULLY';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Classical Sculpture marble effect (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Marble effect already in prompt');
          }
        }
        
        // 로마 모자이크 선택시 테세라 강화
        if (selectedArtist.toUpperCase().trim().includes('MOSAIC') || 
            selectedArtist.toUpperCase().trim().includes('ROMAN') ||
            selectedArtist.includes('모자이크')) {
          // console.log('🎯 Roman Mosaic detected');
          if (!finalPrompt.includes('TESSERAE')) {
            finalPrompt = finalPrompt + ', Ancient Roman floor mosaic: CRITICAL - LARGE VISIBLE TESSERAE TILES (50mm each square/rectangular stone pieces), THICK DARK GROUT LINES clearly visible between EVERY tile creating grid pattern, LIMITED ANCIENT COLOR PALETTE (terracotta orange, ochre yellow, umber brown, ivory white, slate blue, olive green), Pompeii villa floor style like Alexander Mosaic or Cave Canem, each tile must be INDIVIDUALLY DISTINGUISHABLE as separate stone piece, authentic ancient Roman craftsmanship, render subject ATTRACTIVELY';
            controlStrength = 0.60;
            // console.log('✅ Enhanced Roman Mosaic tesserae effect (control_strength 0.60)');
          } else {
            // console.log('ℹ️ Mosaic effect already in prompt');
          }
        }
        
        // ========================================
        // 중세 미술 강화 프롬프트
        // ========================================
        
        // 비잔틴 선택시 금박 후광 강화
        if (selectedArtist.toUpperCase().trim().includes('BYZANTINE') || 
            selectedArtist.includes('비잔틴')) {
          // console.log('🎯 Byzantine detected');
          if (!finalPrompt.includes('HALO')) {
            finalPrompt = finalPrompt + ', Byzantine sacred icon painting: CRITICAL - CIRCULAR GOLDEN HALO (nimbus) behind head as bright radiating disc of divine light, ENTIRE BACKGROUND must be SHIMMERING GOLD LEAF mosaic with visible tiny square tesserae tiles, flat hieratic frontal pose with LARGE SOLEMN EYES gazing directly at viewer, simplified iconic facial features with spiritual transcendence, rich jewel colors (deep red, royal blue, purple) for robes, gold decorative patterns on clothing, sacred ethereal atmosphere, Eastern Orthodox icon style like Christ Pantocrator or Theotokos, PRESERVE subject face identity and age, divine holy masterpiece quality';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Byzantine GOLDEN HALO + gold background (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Byzantine halo already in prompt');
          }
        }
        
        // 고딕 선택시 스테인드글라스 강화
        if (selectedArtist.toUpperCase().trim().includes('GOTHIC') || 
            selectedArtist.includes('고딕')) {
          // console.log('🎯 Gothic detected');
          if (!finalPrompt.includes('STAINED GLASS')) {
            finalPrompt = finalPrompt + ', Gothic cathedral STAINED GLASS window style: CRITICAL - THICK BLACK LEAD LINES (cames) must divide ENTIRE image INCLUDING FACE AND SKIN into colored glass segments, face must have BLACK LINES crossing through like real stained glass NOT smooth realistic face, JEWEL-TONE TRANSLUCENT COLORS (ruby red, sapphire blue, emerald green, amber gold) on ALL areas including face, FLAT TWO-DIMENSIONAL medieval aesthetic, stylized simplified facial features, elongated vertical figure, Gothic pointed arch frame, divine holy light streaming through, NOT realistic portrait NOT smooth skin, sacred stained glass masterpiece quality';
            controlStrength = 0.50;
            // console.log('✅ Enhanced Gothic STAINED GLASS effect (control_strength 0.50, face lines emphasized)');
          } else {
            // console.log('ℹ️ Gothic stained glass already in prompt');
          }
        }
        
        // ========================================
        // 르네상스 ~ 바로크 강화 프롬프트
        // ========================================
        
        // 레오나르도 다 빈치 선택시 스푸마토 초강화 + 어두운 배경
        if (selectedArtist.toUpperCase().trim().includes('LEONARDO') || selectedArtist.toUpperCase().trim().includes('DA VINCI')) {
          // console.log('🎯 Leonardo da Vinci detected');
          if (!finalPrompt.includes('Mona Lisa-style')) {
            finalPrompt = finalPrompt + ', painting by Leonardo da Vinci: DARK MYSTERIOUS BACKGROUND with deep shadows, EXTREME SFUMATO technique - ALL EDGES SOFT AND BLURRED like smoke dissolving into darkness, faces emerging from smoky dark atmosphere, NO SHARP EDGES anywhere, warm golden-brown palette against dark background, Mona Lisa PAINTING TECHNIQUE ONLY (sfumato haze) - PRESERVE ORIGINAL FACE STRUCTURE do NOT transform face into Mona Lisa, PRESERVE original subject identity exactly';
            controlStrength = 0.50;
            // console.log('✅ Enhanced Leonardo sfumato + dark background (control_strength 0.50)');
          } else {
            // console.log('ℹ️ Leonardo sfumato already in prompt');
          }
        }
        
        // 카라바조 선택시 테네브리즘 강화
        if (selectedArtist.toUpperCase().trim().includes('CARAVAGGIO') ||
            selectedArtist.includes('카라바조')) {
          // console.log('🎯 Caravaggio detected');
          if (!finalPrompt.includes('TENEBRISM')) {
            finalPrompt = finalPrompt + ', Apply Caravaggio style with CRITICAL TENEBRISM technique. Create 70% of canvas in PURE BLACK darkness with DRAMATIC SPOTLIGHT from single source. Show figure emerging from void with EXTREME light-dark contrast on face. Use deep rich blacks NOT grey, theatrical stage lighting against pitch black background. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
            controlStrength = 0.60;
            // console.log('✅ Enhanced Caravaggio TENEBRISM (control_strength 0.60)');
          } else {
            // console.log('ℹ️ Caravaggio tenebrism already in prompt');
          }
        }
        
        // 루벤스 선택시 관능적 따뜻함 강화
        if (selectedArtist.toUpperCase().trim().includes('RUBENS') || 
            selectedArtist.includes('루벤스')) {
          // console.log('🎯 Rubens detected');
          if (!finalPrompt.includes('sensual flesh')) {
            finalPrompt = finalPrompt + ', Apply Rubens style with WARM SENSUAL FLESH tones and luminous glowing skin. Create dynamic swirling composition full of movement with rich warm palette of reds golds and creams. Show voluptuous graceful forms with romantic intimate atmosphere and VISIBLE THICK BRUSHSTROKES. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
            controlStrength = 0.65;
            // console.log('✅ Enhanced Rubens warmth added (control_strength 0.65)');
          } else {
            // console.log('ℹ️ Rubens warmth already in prompt');
          }
        }
        
        // 마티스 선택시 야수파 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('MATISSE') ||
            selectedArtist.includes('마티스')) {
          // console.log('🎯 Matisse detected');
          controlStrength = 0.65;
          // console.log('✅ Enhanced Matisse Fauvism (control_strength 0.65)');
        }
        
        // 렘브란트 선택시 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('REMBRANDT') ||
            selectedArtist.includes('렘브란트')) {
          // console.log('🎯 Rembrandt detected');
          if (!finalPrompt.includes('golden luminous light')) {
            finalPrompt = finalPrompt + ', Apply Rembrandt style with MASTERFUL golden luminous light emerging from darkness. Create warm glowing illumination with subtle gradations and psychological depth revealing inner soul. Use rich impasto texture with VISIBLE THICK BRUSHSTROKES against dark background. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
            controlStrength = 0.60;
            // console.log('✅ Enhanced Rembrandt lighting added (control_strength 0.60)');
          } else {
            // console.log('ℹ️ Rembrandt lighting already in prompt');
          }
        }
        
        // 티치아노 선택시 베네치아 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('TITIAN')) {
          // console.log('🎯 Titian detected');
          if (!finalPrompt.includes('Titian red')) {
            finalPrompt = finalPrompt + ', Apply Titian style with Venetian rich luminous colors and signature Titian red. Create warm golden atmosphere with glowing flesh tones. This must look like a real Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
            // console.log('✅ Enhanced Titian colors added');
          } else {
            // console.log('ℹ️ Titian colors already in prompt');
          }
        }
        
        // 보티첼리 선택시 흐르는 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('BOTTICELLI')) {
          // console.log('🎯 Botticelli detected');
          if (!finalPrompt.includes('Birth of Venus')) {
            finalPrompt = finalPrompt + ', Apply Botticelli Birth of Venus style with flowing graceful lines and wind-blown hair. Use soft pastel colors with ethereal lyrical beauty. This must look like a real Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
            // console.log('✅ Enhanced Botticelli grace added');
          } else {
            // console.log('ℹ️ Botticelli grace already in prompt');
          }
        }
        
        // 터너 선택시 안개 용해 강화
        if (selectedArtist.toUpperCase().trim().includes('TURNER')) {
          // console.log('🎯 Turner detected');
          if (!finalPrompt.includes('dissolving into mist')) {
            finalPrompt = finalPrompt + ', painting by J.M.W. Turner, atmospheric sublime landscape-style with all forms dissolving into golden luminous mist and haze, swirling turbulent skies with dramatic light effects, warm golden yellows fiery oranges and ethereal blues, forms barely visible through fog and melting into atmosphere, loose fluid brushstrokes creating dreamlike transcendent beauty';
            // console.log('✅ Enhanced Turner mist added');
          } else {
            // console.log('ℹ️ Turner mist already in prompt (AI included it)');
          }
        }
        
        // 들라크루아 선택시 혁명적 역동성 강화
        if (selectedArtist.toUpperCase().trim().includes('DELACROIX')) {
          // console.log('🎯 Delacroix detected');
          if (!finalPrompt.includes('Liberty Leading')) {
            finalPrompt = finalPrompt + ', painting by Eugène Delacroix, Liberty Leading the People-style passionate revolutionary energy, vivid dramatic colors with bold reds blues and warm golden tones at intense saturation, dynamic diagonal composition with turbulent movement, loose expressive brushstrokes full of emotion and action, dramatic gestures and heroic romantic intensity';
            // console.log('✅ Enhanced Delacroix energy added');
          } else {
            // console.log('ℹ️ Delacroix energy already in prompt (AI included it)');
          }
        }
        
        // 모네 선택시 수련/빛 포착 강화
        if (selectedArtist.toUpperCase().trim().includes('MONET')) {
          // console.log('🎯 Monet detected');
          if (!finalPrompt.includes('Water Lilies')) {
            finalPrompt = finalPrompt + ', painting by Claude Monet, Water Lilies-style capturing fleeting light effects with visible short impressionist brushstrokes, pure unmixed colors dabbed side by side, broken color technique with small distinct touches, shimmering luminous atmosphere with light reflecting on water, plein-air freshness with loose fluid brushwork';
            // console.log('✅ Enhanced Monet Water Lilies added');
          } else {
            // console.log('ℹ️ Monet Water Lilies already in prompt (AI included it)');
          }
        }
        
        // 드가 선택시 발레리나 움직임 강화
        if (selectedArtist.toUpperCase().trim().includes('DEGAS')) {
          // console.log('🎯 Degas detected');
          if (!finalPrompt.includes('Degas')) {
            finalPrompt = finalPrompt + ', painting by Edgar Degas: SOFT PASTEL and oil paint texture with VISIBLE CHALKY STROKES, pale muted colors (soft pink peach powder blue sage green), diagonal asymmetric composition with unusual cropped viewpoints, delicate precise drawing with gentle sfumato edges, warm intimate indoor lighting, VISIBLE CANVAS TEXTURE through thin paint layers, impressionist brushwork NOT smooth NOT digital, CRITICAL IDENTITY: PRESERVE original subject face identity age and ethnicity exactly - child must remain child Asian must remain Asian, DO NOT change clothing from original photo, DO NOT add ballet dancers or people not in original photo, apply Degas artistic style to EXISTING scene only, masterpiece quality';
            controlStrength = 0.60;
            // console.log('✅ Enhanced Degas pastel + identity preserve (control_strength 0.60)');
          } else {
            // console.log('ℹ️ Degas style already in prompt (AI included it)');
          }
        }
        
        // 세잔 선택시 기하학적 구조 강화
        if (selectedArtist.toUpperCase().trim().includes('CÉZANNE') || selectedArtist.toUpperCase().trim().includes('CEZANNE')) {
          // console.log('🎯 Cézanne detected');
          if (!finalPrompt.includes('Still Life with Apples')) {
            finalPrompt = finalPrompt + ', painting by Paul Cézanne, Still Life with Apples-style geometric analysis of forms into cylinders spheres and cones, multiple simultaneous viewpoints (proto-Cubism), constructive brushstrokes building architectural volumes, modulated colors creating solid sculptural forms, visible parallel brushstrokes creating structure and depth, geometric precision';
            // console.log('✅ Enhanced Cézanne geometry added');
          } else {
            // console.log('ℹ️ Cézanne geometry already in prompt (AI included it)');
          }
        }
        
        // 고갱 선택시 클루아조니즘 + 원시주의 강화 (v67)
        if (selectedArtist.toUpperCase().trim().includes('GAUGUIN')) {
          // console.log('🎯 Gauguin detected');
          if (!finalPrompt.includes('Gauguin')) {
            finalPrompt = finalPrompt + ', painting by Paul Gauguin Tahitian period: CLOISONNISM style with BOLD BLACK OUTLINES separating FLAT COLOR AREAS, SIMPLIFIED FORMS with REDUCED FINE DETAILS, PRIMITIVISM raw primitive power, pure unmixed saturated colors in simplified shapes, exotic tropical palette (deep orange, ochre yellow, turquoise, rich purple, vibrant green), warm golden-brown skin tones, Tahitian Women on the Beach style, lush tropical background with palm trees, decorative simplified forms, NOT photorealistic NOT hyper-detailed, VISIBLE THICK BRUSHSTROKES with oil paint texture, symbolic mysterious atmosphere, NOT mosaic NOT stained glass NOT geometric tiles, PRESERVE original subject face identity age and ethnicity, Gauguin Tahitian masterpiece quality';
            controlStrength = 0.60;
            // console.log('✅ Enhanced Gauguin cloisonnism + primitivism (control_strength 0.60)');
          } else {
            // console.log('ℹ️ Gauguin style already in prompt (AI included it)');
          }
        }
        
        // 시냐크 선택시 점묘법 강화 (v48 추가)
        if (selectedArtist.toUpperCase().trim().includes('SIGNAC') ||
            selectedArtist.includes('시냐크')) {
          // console.log('🎯 Signac detected');
          if (!finalPrompt.includes('pointillist') && !finalPrompt.includes('dots')) {
            finalPrompt = finalPrompt + ', painting by Paul Signac, POINTILLIST Neo-Impressionist style with LARGE VISIBLE DOTS 8mm each of pure unmixed color placed side by side, VISIBLE DOTS throughout entire image including sky water and all surfaces, The Port of Saint-Tropez and Portrait of Félix Fénéon style, vibrant luminous harbor and coastal scenes, brilliant Mediterranean sunlight effect, LARGE VISIBLE DOTS 8mm NOT tiles NOT mosaic, NO blended brushstrokes only separate dots, optical color mixing creates shimmering radiant atmosphere, SOFT PASTEL PALETTE pale pink light blue lavender mint green peach cream';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Signac pointillism added (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Signac pointillism already in prompt (AI included it)');
          }
        }
        
        // ========================================
        // v35 추가: 21명 화가 FLUX 최적화
        // ========================================
        
        // 다비드 선택시 신고전주의 명확성 강화
        if (selectedArtist.toUpperCase().trim().includes('DAVID') || 
            selectedArtist.toUpperCase().trim().includes('JACQUES-LOUIS')) {
          // console.log('🎯 David detected');
          if (!finalPrompt.includes('Neoclassical grandeur')) {
            finalPrompt = finalPrompt + ', painting by Jacques-Louis David, Oath of the Horatii-style Neoclassical grandeur with SHARP CLEAR OUTLINES and precise linear definition throughout every form, perfect symmetrical classical composition with strong geometric structure, cool refined color palette dominated by stone grays slate blues and muted earth tones, heroic dignified poses with noble gestures frozen in timeless moment, meticulous detailed rendering of drapery and anatomy, cold rational perfection with dramatic theatrical lighting, severe architectural clarity and moral grandeur';
            // console.log('✅ Enhanced David Neoclassical clarity added');
          } else {
            // console.log('ℹ️ David clarity already in prompt (AI included it)');
          }
        }
        
        // 앵그르 선택시 완벽한 윤곽선 강화
        if (selectedArtist.toUpperCase().trim().includes('INGRES')) {
          // console.log('🎯 Ingres detected');
          if (!finalPrompt.includes('La Grande Odalisque')) {
            finalPrompt = finalPrompt + ', painting by Jean-Auguste-Dominique Ingres, La Grande Odalisque-style with PERFECTLY SMOOTH FLOWING CONTOURS like polished marble surface, porcelain-smooth skin with not a single visible brushstroke anywhere, elegant sinuous curves and graceful elongated forms, idealized classical beauty with refined aristocratic elegance, meticulous precise detail in every element, cool serene color palette with subtle flesh tones, flawless enamel-like finish with absolute technical perfection, linear purity and smooth transitions';
            // console.log('✅ Enhanced Ingres smooth perfection added');
          } else {
            // console.log('ℹ️ Ingres perfection already in prompt (AI included it)');
          }
        }
        
        // 쿠르베 선택시 사실주의 강화
        if (selectedArtist.toUpperCase().trim().includes('COURBET') || 
            selectedArtist.toUpperCase().trim().includes('GUSTAVE')) {
          // console.log('🎯 Courbet detected');
          if (!finalPrompt.includes('Stone Breakers')) {
            finalPrompt = finalPrompt + ', painting by Gustave Courbet, Courbet art style. HONEST RURAL REALISM with UNVARNISHED TRUTH and ANTI-IDEALIZED portrayal. EARTHY palette of browns ochres and muted greens with SOLID WEIGHTY figures. THICK IMPASTO brushwork 20mm+ showing raw authentic reality. NOT romanticized, NOT idealized, NOT beautified';
            // console.log('✅ Enhanced Courbet realism added');
          } else {
            // console.log('ℹ️ Courbet realism already in prompt (AI included it)');
          }
        }
        
        // 마네 선택시 현대 파리 사실주의 강화
        if (selectedArtist.toUpperCase().trim().includes('MANET') || 
            selectedArtist.toUpperCase().trim().includes('EDOUARD') ||
            selectedArtist.toUpperCase().trim().includes('ÉDOUARD')) {
          // console.log('🎯 Manet detected');
          if (!finalPrompt.includes('Olympia-style')) {
            finalPrompt = finalPrompt + ', painting by Édouard Manet, Olympia-style MODERN PARIS REALISM with bold flat composition and striking contrasts, dramatic blacks and pure whites with minimal mid-tones creating graphic impact, sophisticated urban atmosphere of café society and contemporary life, frank direct confrontational gaze meeting viewer, loose confident brushwork with visible energetic strokes, elimination of traditional modeling through strong light-dark opposition, metropolitan elegance and modern audacity';
            // console.log('✅ Enhanced Manet modern realism added');
          } else {
            // console.log('ℹ️ Manet realism already in prompt (AI included it)');
          }
        }
        
        // 라파엘로 선택시 조화로운 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('RAPHAEL') || 
            selectedArtist.toUpperCase().trim().includes('RAFFAELLO')) {
          // console.log('🎯 Raphael detected');
          if (!finalPrompt.includes('Madonna')) {
            finalPrompt = finalPrompt + ', painting by Raphael: Madonna style with perfect harmonious composition, serene gentle beauty, soft rounded forms, warm glowing colors';
            // console.log('✅ Enhanced Raphael harmony added');
          } else {
            // console.log('ℹ️ Raphael harmony already in prompt');
          }
        }
        
        // 미켈란젤로 선택시 조각적 힘 강화
        if (selectedArtist.toUpperCase().trim().includes('MICHELANGELO') || 
            selectedArtist.toUpperCase().trim().includes('BUONARROTI')) {
          // console.log('🎯 Michelangelo detected');
          if (!finalPrompt.includes('Sistine')) {
            finalPrompt = finalPrompt + ', painting by Michelangelo: Sistine Chapel style with sculptural muscular anatomy, heroic monumental figures, dynamic twisting poses, powerful physical energy';
            // console.log('✅ Enhanced Michelangelo power added');
          } else {
            // console.log('ℹ️ Michelangelo power already in prompt');
          }
        }
        
        // 벨라스케스 선택시 궁정 품격 강화
        if (selectedArtist.toUpperCase().trim().includes('VELAZQUEZ') || 
            selectedArtist.toUpperCase().trim().includes('VELÁZQUEZ') ||
            selectedArtist.toUpperCase().trim().includes('DIEGO')) {
          // console.log('🎯 Velázquez detected');
          if (!finalPrompt.includes('Las Meninas')) {
            finalPrompt = finalPrompt + ', painting by Diego Velázquez, Las Meninas-style with MASTERFUL SPATIAL DEPTH and atmospheric perspective, courtly dignity and aristocratic refinement, subtle silvery-gray tonalities with sophisticated neutral palette, loose virtuoso brushwork with alla prima technique, mysterious ambiguous composition with multiple layers of reality, regal elegant bearing and Spanish formality, penetrating psychological insight with restrained nobility';
            // console.log('✅ Enhanced Velázquez courtly mastery added');
          } else {
            // console.log('ℹ️ Velázquez mastery already in prompt (AI included it)');
          }
        }
        
        // 와토 선택시 로코코 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('WATTEAU') || 
            selectedArtist.toUpperCase().trim().includes('JEAN-ANTOINE')) {
          // console.log('🎯 Watteau detected');
          if (!finalPrompt.includes('fêtes galantes')) {
            finalPrompt = finalPrompt + ', painting by Jean-Antoine Watteau, fêtes galantes-style with ELEGANT OUTDOOR LEISURE in dreamy romantic garden settings, aristocratic figures in graceful refined poses and delicate gestures, soft shimmering colors with pearly iridescent quality and silvery atmospheric haze, wistful melancholic mood beneath surface gaiety, feathery delicate brushwork with gossamer lightness, poetic nostalgia and fleeting beauty, enchanted parkland with theatrical artifice, VISIBLE THICK OIL PAINT BRUSHSTROKES (20mm+ throughout, painted canvas texture NOT photographic';
            controlStrength = 0.70;
            // console.log('✅ Enhanced Watteau elegance added (control_strength 0.70)');
          } else {
            // console.log('ℹ️ Watteau elegance already in prompt (AI included it)');
          }
        }
        
        // 부셰 선택시 로코코 관능미 강화
        if (selectedArtist.toUpperCase().trim().includes('BOUCHER') || 
            selectedArtist.toUpperCase().trim().includes('FRANÇOIS') ||
            selectedArtist.toUpperCase().trim().includes('FRANCOIS')) {
          // console.log('🎯 Boucher detected');
          if (!finalPrompt.includes('Rococo charm')) {
            finalPrompt = finalPrompt + ', painting by François Boucher, ROCOCO SENSUAL CHARM with playful frivolous eroticism and decorative prettiness, pastel colors of soft pinks delicate blues and creamy whites, voluptuous curvaceous forms with porcelain-like skin, whimsical ornamental details and elaborate accessories, frothy confectionery atmosphere with sugary sweetness, seductive coquettish mood and courtly flirtation, luxurious textures and sumptuous fabrics, VISIBLE THICK OIL PAINT BRUSHSTROKES (20mm+ throughout, painted canvas texture NOT photographic';
            controlStrength = 0.70;
            // console.log('✅ Enhanced Boucher Rococo charm added (control_strength 0.70)');
          } else {
            // console.log('ℹ️ Boucher charm already in prompt (AI included it)');
          }
        }
        
        // 르누아르 선택시 따뜻한 인물화 + 나뭇잎 햇살 필수!
        if (selectedArtist.toUpperCase().trim().includes('RENOIR') || 
            selectedArtist.toUpperCase().trim().includes('PIERRE-AUGUSTE')) {
          // console.log('🎯 Renoir detected');
          if (!finalPrompt.includes('Renoir')) {
            finalPrompt = finalPrompt + ', painting by Pierre-Auguste Renoir: MANDATORY DAPPLED SUNLIGHT ON FACE AND SUBJECT - golden light SPOTS and PATCHES filtering THROUGH LEAVES MUST appear on FACE (forehead cheeks) AND SUBJECT (skin hair clothing), this sunlight effect on face and subject is REQUIRED and NON-NEGOTIABLE for Renoir style, shimmering luminous atmosphere with dancing light, SOFT FEATHERY BRUSHSTROKES with VISIBLE oil paint texture, warm glowing skin tones with rosy pink cheeks, warm harmonious colors (peach pink golden coral), loose impressionist brushwork NOT smooth NOT digital, joyful warm intimate mood, PRESERVE original subject face identity, Renoir masterpiece quality';
            controlStrength = 0.50;
            // console.log('✅ Enhanced Renoir MANDATORY DAPPLED SUNLIGHT FACE+SUBJECT (control_strength 0.50)');
          } else {
            // console.log('ℹ️ Renoir warmth already in prompt (AI included it)');
          }
        }
        
        // 칼리보트 선택시 도시 풍경/원근법 강화
        if (selectedArtist.toUpperCase().trim().includes('CAILLEBOTTE') || 
            selectedArtist.toUpperCase().trim().includes('GUSTAVE')) {
          // console.log('🎯 Caillebotte detected');
          if (!finalPrompt.includes('urban perspective')) {
            finalPrompt = finalPrompt + ', painting by Gustave Caillebotte, MODERN URBAN REALISM with dramatic bird\'s-eye perspective, Paris Street Rainy Day style city scenes, SHARP PERSPECTIVE LINES converging dramatically, photographic clarity with impressionist color palette, elegant bourgeois figures in urban settings, wet pavement reflections, muted gray-blue urban tones with warm accents, GEOMETRIC COMPOSITION with strong diagonal lines, Floor Scrapers style working figures, Caillebotte masterpiece quality';
            // console.log('✅ Enhanced Caillebotte urban perspective added');
          } else {
            // console.log('ℹ️ Caillebotte perspective already in prompt (AI included it)');
          }
        }
        
        // 드랭 선택시 야수파 강렬함 강화
        if (selectedArtist.toUpperCase().trim().includes('DERAIN') || 
            selectedArtist.toUpperCase().trim().includes('ANDRÉ') ||
            selectedArtist.toUpperCase().trim().includes('ANDRE')) {
          // console.log('🎯 Derain detected');
          if (!finalPrompt.includes('Fauvist intensity')) {
            finalPrompt = finalPrompt + ', painting by André Derain, FAUVIST INTENSITY with vivid unmixed pure colors at maximum saturation, SIMPLIFIED FORMS with FLAT COLOR PLANES, bold arbitrary color choices liberated from reality with reds greens blues oranges, strong graphic contours outlining color zones, REDUCED FINE DETAILS, elimination of subtle modeling for pure chromatic impact, NOT photorealistic NOT smooth, vibrant energetic brushwork with spontaneous directness, landscape transformed into explosive color symphony';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Derain Fauvist intensity added (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Derain intensity already in prompt (AI included it)');
          }
        }
        
        // 블라맹크 선택시 폭발적 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('VLAMINCK') || 
            selectedArtist.toUpperCase().trim().includes('MAURICE')) {
          // console.log('🎯 Vlaminck detected');
          if (!finalPrompt.includes('explosive colors')) {
            finalPrompt = finalPrompt + ', painting by Maurice de Vlaminck, EXPLOSIVE VIOLENT COLORS with most intense Fauvist palette, SIMPLIFIED BOLD FORMS with REDUCED FINE DETAILS, thick aggressive brushstrokes applied with passionate fury, pure unmixed pigments squeezed directly from tube, FLAT COLOR AREAS, turbulent swirling compositions with dramatic movement, raw primitive energy and instinctive expression, NOT photorealistic NOT smooth, volcanic eruption of reds blues greens yellows, landscape convulsed with emotional intensity';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Vlaminck explosive colors added (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Vlaminck colors already in prompt (AI included it)');
          }
        }
        
        // 반 고흐 선택시 소용돌이 강화 (거장 + 후기인상주의)
        if (selectedArtist.toUpperCase().trim().includes('VAN GOGH') || 
            selectedArtist.toUpperCase().trim().includes('VINCENT') ||
            selectedArtist.toUpperCase().trim().includes('GOGH') ||
            selectedArtist.includes('반 고흐') ||
            selectedArtist.includes('고흐') ||
            selectedArtist.includes('빈센트')) {
          // console.log('🎯 Van Gogh detected');
          if (!finalPrompt.includes('SWIRLING') && !finalPrompt.includes('IMPASTO')) {
            finalPrompt = finalPrompt + ', painting by Vincent van Gogh: MANDATORY THICK BOLD BRUSHSTROKES ON FACE AND SUBJECT - CHUNKY WIDE BRUSH MARKS (30mm+ MUST cover ENTIRE FACE (forehead cheeks nose chin) AND ENTIRE SUBJECT (skin hair clothing), this THICK BOLD brushstroke texture on face and subject is REQUIRED and NON-NEGOTIABLE for Van Gogh style, face and body must NOT be smooth or realistic, EXTREMELY THICK IMPASTO 3D PAINT TEXTURE, VISIBLE RIDGES AND GROOVES, SWIRLING TURBULENT directional strokes everywhere, NOT fine lines NOT smooth NOT blended, intense saturated colors (cobalt blue cadmium yellow chrome orange), painterly NOT illustrative NOT digital, PRESERVE original person FACE IDENTITY, render subject ATTRACTIVELY';
            controlStrength = 0.50;
            // console.log('✅ Enhanced Van Gogh MANDATORY THICK BOLD BRUSHSTROKES FACE+SUBJECT (control_strength 0.50)');
          } else {
            // console.log('ℹ️ Van Gogh swirls already in prompt (AI included it)');
          }
        }
        
        // 뭉크 선택시 실존적 불안 강화 (거장 + 표현주의)
        if (selectedArtist.toUpperCase().trim().includes('MUNCH') || 
            selectedArtist.toUpperCase().trim().includes('EDVARD') ||
            selectedArtist.includes('뭉크') ||
            selectedArtist.includes('에드바르')) {
          controlStrength = 0.55;
          
          // Madonna는 부드러운 관능적 스타일
          if (selectedWork && selectedWork.toLowerCase().includes('madonna')) {
            finalPrompt = finalPrompt + ', Apply Edvard Munch style with SIMPLIFIED MASK-LIKE features and WAVY FLOWING LINES. Create pale luminous skin with RED AURA in SICKLY GREENS and BLACKS. Use THICK BRUSHSTROKES 20mm+. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
          } else {
            finalPrompt = finalPrompt + ', Apply Edvard Munch The Scream style with SIMPLIFIED DISTORTED FORMS and MASK-LIKE anguished features. Create WAVY UNDULATING backgrounds in BLOOD REDS and SICKLY YELLOWS. Show existential dread with THICK BRUSHSTROKES 20mm+. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
          }
        }
        
        // 키르히너 선택시 도시 표현주의 강화 (표현주의)
        if (selectedArtist.toUpperCase().trim().includes('KIRCHNER') || 
            selectedArtist.toUpperCase().trim().includes('ERNST') ||
            selectedArtist.includes('키르히너') ||
            selectedArtist.includes('에른스트')) {
          controlStrength = 0.50;
          finalPrompt = finalPrompt + ', Apply Ernst Ludwig Kirchner Die Brücke style with ANGULAR JAGGED DISTORTED forms and ELONGATED SHARP MASK-LIKE faces. Use ACID GREEN HOT PINK ELECTRIC BLUE HARSH ORANGE palette with HARSH ANGULAR BRUSHSTROKES. Create urban tension and psychological alienation. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
        }
        
        // 코코슈카 선택시 심리적 초상 강화 (표현주의)
        if (selectedArtist.toUpperCase().trim().includes('KOKOSCHKA') || 
            selectedArtist.toUpperCase().trim().includes('OSKAR') ||
            selectedArtist.includes('코코슈카') ||
            selectedArtist.includes('오스카')) {
          controlStrength = 0.55;
          finalPrompt = finalPrompt + ', Apply Oskar Kokoschka style with TURBULENT VISIBLE BRUSHSTROKES 30mm+ revealing VIOLENT psychological portrait. Create AGITATED NERVOUS energy with inner turmoil in WARM EARTH TONES and blue accents. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.';
        }
        
        // 마티스 선택시 순수 색채 강화 (거장 + 야수파)
        if (selectedArtist.toUpperCase().trim().includes('MATISSE') || 
            selectedArtist.includes('마티스')) {
          // console.log('🎯 Matisse detected');
          if (!finalPrompt.includes('The Dance')) {
            finalPrompt = finalPrompt + ', painting by Henri Matisse, The Dance-style with PURE UNMIXED VIBRANT COLORS at maximum intensity and saturation, SIMPLIFIED FLAT FORMS with REDUCED FINE DETAILS, flat decorative patterns with bold arabesques and flowing curves, elimination of all modeling and shading for FLAT COLOR PLANES, NOT photorealistic NOT smooth gradients, joyful rhythmic compositions celebrating life movement and vitality, daring color combinations of brilliant reds blues greens, complete liberation of color from reality, every area a pure saturated flat hue';
            controlStrength = 0.65;
            // console.log('✅ Enhanced Matisse pure color added (control_strength 0.65)');
          } else {
            // console.log('ℹ️ Matisse color already in prompt (AI included it)');
          }
        }
        
        // 클림트 선택시 황금 장식 강화 (거장)
        if (selectedArtist.toUpperCase().trim().includes('KLIMT') || 
            selectedArtist.toUpperCase().trim().includes('GUSTAV') ||
            selectedArtist.includes('클림트') ||
            selectedArtist.includes('구스타프')) {
          // console.log('🎯 Klimt detected');
          if (!finalPrompt.includes('The Kiss')) {
            finalPrompt = finalPrompt + ', painting by Gustav Klimt, The Kiss-style with ELABORATE GOLDEN PATTERNS and Byzantine mosaic decorative elements, flat ornamental backgrounds covered with geometric spirals circles and rectangular motifs in shimmering gold leaf, sensuous organic forms emerging from abstract decorative fields, Art Nouveau flowing curves combined with geometric precision, rich textures of gold silver and precious jewel-like colors, erotic intimate mood within sacred ornamental splendor';
            controlStrength = 0.65;
            // console.log('✅ Enhanced Klimt golden patterns added (control_strength 0.65)');
          } else {
            // console.log('ℹ️ Klimt patterns already in prompt (AI included it)');
          }
        }
        
        // 모네 선택시 인상주의 강화 (거장 + 인상주의)
        if (selectedArtist.toUpperCase().trim().includes('MONET') || 
            selectedArtist.toUpperCase().trim().includes('CLAUDE') ||
            selectedArtist.includes('모네') ||
            selectedArtist.includes('클로드')) {
          // console.log('🎯 Monet detected');
          if (!finalPrompt.includes('Water Lilies') && !finalPrompt.includes('Impressionist')) {
            finalPrompt = finalPrompt + ', painting by Claude Monet, IMPRESSIONIST style with VISIBLE BROKEN BRUSHSTROKES throughout entire composition, SOFT HAZY atmospheric effects like morning mist or fog, colors DISSOLVED and BLENDED into each other with NO sharp edges anywhere, capture fleeting moment of LIGHT and ATMOSPHERE, dappled sunlight filtering through air, Water Lilies and Impression Sunrise style dreamy blur, everything slightly out of focus and impressionistic, luminous color harmonies of blues purples pinks greens';
            controlStrength = 0.50;
            // console.log('✅ Enhanced Monet Impressionist brushstrokes added (control_strength 0.50 for hazy effect)');
          } else {
            // console.log('ℹ️ Monet Impressionism already in prompt (AI included it)');
          }
        }
        
        // 샤갈 선택시 몽환적 부유 강화 (거장 + 모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('CHAGALL') || 
            selectedArtist.toUpperCase().trim().includes('MARC') ||
            selectedArtist.includes('샤갈') ||
            selectedArtist.includes('마르크')) {
          // console.log('🎯 Chagall detected');
          if (!finalPrompt.includes('floating') && !finalPrompt.includes('FLOATING')) {
            finalPrompt = finalPrompt + ', painting by Marc Chagall, DREAMY FLOATING figures defying gravity, SOFT BLURRED EDGES with gentle transitions NO harsh outlines, MUTED PASTEL colors (dusty violet, faded rose pink, soft blue, sage green), I and the Village style OVERLAPPING DREAMLIKE images, whimsical tilted houses of Vitebsk village in background, symbolic animals and flowers floating softly, HAZY ATMOSPHERIC quality like looking through gauze, nostalgic poetic dreamscape, WATERCOLOR-LIKE transparency and softness';
            controlStrength = 0.40;
            // console.log('✅ Enhanced Chagall with SOFT dreamy atmosphere (control_strength 0.40 for softer effect)');
          } else {
            // console.log('ℹ️ Chagall dreaminess already in prompt (AI included it)');
          }
        }
        
        // 프리다 칼로 선택시 멕시코 상징 강화 (거장 전용)
        if (selectedArtist.toUpperCase().trim().includes('FRIDA') || 
            selectedArtist.toUpperCase().trim().includes('KAHLO') ||
            selectedArtist.includes('프리다') ||
            selectedArtist.includes('칼로')) {
          // console.log('🎯 Frida Kahlo detected');
          if (!finalPrompt.includes('Frida') && !finalPrompt.includes('unibrow')) {
            finalPrompt = finalPrompt + ', painting by Frida Kahlo, INTENSE DIRECT GAZE portrait style, vibrant MEXICAN FOLK ART colors (bright red, yellow, green, blue), symbolic personal imagery with THORNS, FLOWERS, ANIMALS (monkeys, hummingbirds, black cats), distinctive UNIBROW and bold features, Tehuana traditional Mexican dress with floral headpiece, lush tropical JUNGLE FOLIAGE background, autobiographical symbolic elements, exposed HEARTS or VEINS if emotional, raw vulnerability and strength';
            // console.log('✅ Enhanced Frida Kahlo Mexican symbolism added');
          } else {
            // console.log('ℹ️ Frida Kahlo style already in prompt (AI included it)');
          }
        }
        
        // 워홀 선택시 팝아트 그리드 강화 (거장 + 모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('WARHOL') || 
            selectedArtist.toUpperCase().trim().includes('ANDY') ||
            selectedArtist.includes('워홀') ||
            selectedArtist.includes('앤디')) {
          // console.log('🎯 Warhol detected');
          // 항상 강화 프롬프트로 교체 (4분할 보장 + 원본 얼굴 유지)
          const warholEnhancement = 'ABSOLUTE REQUIREMENT: CREATE EXACTLY 4 SEPARATE IMAGES arranged in 2x2 GRID with VISIBLE DIVIDING LINES between panels, TOP-LEFT panel + TOP-RIGHT panel + BOTTOM-LEFT panel + BOTTOM-RIGHT panel, CRITICAL: USE THE ORIGINAL SUBJECT FACE from the photo in ALL 4 panels - do NOT replace with Marilyn Monroe face - KEEP the original person identity and facial features exactly, EACH panel must have COMPLETELY DIFFERENT bold color scheme (panel 1: hot pink, panel 2: cyan blue, panel 3: yellow, panel 4: orange), Andy Warhol silkscreen style, FLAT graphic colors NO gradients, absolutely NOT Marilyn Monroe face, MUST be 4 SEPARATE PANELS not single image, ';
          finalPrompt = warholEnhancement + finalPrompt;
          controlStrength = 0.45;
          // console.log('✅ Enhanced Warhol 4-panel grid (FRONT position, control_strength 0.45 for face preservation)');
        }
        
        // 피카소 선택시 입체주의 강화 (거장 + 모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('PICASSO') || 
            selectedArtist.toUpperCase().trim().includes('PABLO') ||
            selectedArtist.includes('피카소') ||
            selectedArtist.includes('파블로')) {
          // console.log('🎯 Picasso detected');
          if (!finalPrompt.includes('Cubist')) {
            finalPrompt = finalPrompt + ', Cubist painting by Pablo Picasso: MANDATORY CUBIST FRAGMENTATION with GEOMETRIC SIMPLIFIED PLANES, face AND body MUST be broken into ANGULAR GEOMETRIC SHAPES showing MULTIPLE VIEWPOINTS simultaneously, NOSE from SIDE while BOTH EYES from FRONT in same face like fractured mirror, face divided into FLAT colored angular sections like faceted crystal, REDUCED TO ESSENTIAL GEOMETRIC FORMS, this fragmentation is REQUIRED and NON-NEGOTIABLE for Picasso style, NOT photorealistic NOT smooth NOT normal face, SINGLE UNIFIED IMAGE not panels, VISIBLE BRUSHSTROKES with thick oil paint, earth tone palette (ochre sienna brown olive grey), Analytical Cubism intersecting shapes';
            controlStrength = 0.40;
            // console.log('✅ Enhanced Picasso MANDATORY CUBIST FACE+SUBJECT (control_strength 0.40)');
          } else {
            // console.log('ℹ️ Picasso Cubism already in prompt (AI included it)');
            controlStrength = 0.40;
          }
          // 20세기 모더니즘에서 피카소 선택시 더 강한 분해
          if (categoryType === 'modernism') {
            controlStrength = 0.30;
            // console.log('✅ Modernism Picasso: control_strength 0.30 (stronger Cubist fragmentation)');
          }
        }
        
        // ========================================
        // v52 추가: 20세기 모더니즘 10명 화가 강화
        // ========================================
        
        // 브라크 - v59에서 제거됨 (피카소와 중복)
        
        // 만 레이 선택시 실험적 사진 기법 강화
        if (selectedArtist.toUpperCase().trim().includes('MAN RAY') || 
            selectedArtist.toUpperCase().trim().includes('MANRAY')) {
          // console.log('🎯 Man Ray detected');
          if (!finalPrompt.includes('solarization')) {
            finalPrompt = finalPrompt + ', experimental photography by Man Ray, SOLARIZATION EFFECT with inverted tones and glowing haloed edges, rayograph shadow silhouettes, dramatic high contrast black and white, surreal darkroom manipulation, Le Violon d\'Ingres style transformation of body, dreamlike photographic distortion with reversed light and shadow, avant-garde Dada experimentation';
            controlStrength = 0.60;
            // console.log('✅ Enhanced Man Ray solarization added (control_strength 0.60)');
          } else {
            // console.log('ℹ️ Man Ray effects already in prompt (AI included it)');
          }
        }
        
        // v66: 마그리트는 대표작 매칭 시스템으로 통일 (masterworks.js)
        // 키워드 분기 삭제 - 다른 44명 화가와 동일 방식
        
        // 미로 선택시 유기적 상징 강화 (모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('MIRÓ') || 
            selectedArtist.toUpperCase().trim().includes('MIRO') ||
            selectedArtist.toUpperCase().trim().includes('JOAN') ||
            selectedArtist.includes('미로') ||
            selectedArtist.includes('호안')) {
          // console.log('🎯 Miró detected');
          if (!finalPrompt.includes('biomorphic')) {
            finalPrompt = finalPrompt + ', painting by Joan Miró, BIOMORPHIC PLAYFUL SIMPLIFIED FORMS floating in space, REDUCED TO ESSENTIAL SHAPES, automatic drawing spontaneous symbols, bright primary colors (red yellow blue black) on light background, constellation of stars eyes crescents and organic shapes surrounding subject, FLAT COLOR AREAS NO gradients, childlike joyful energy, calligraphic black lines, NOT photorealistic NOT detailed, poetic surrealist abstraction with whimsical floating elements';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Miró biomorphic symbols added (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Miró symbolism already in prompt (AI included it)');
          }
        }
        
        // 키스 해링 선택시 그래피티 아트 스타일 강화 (모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('KEITH') || 
            selectedArtist.toUpperCase().trim().includes('HARING') ||
            selectedArtist.includes('키스') ||
            selectedArtist.includes('해링')) {
          // console.log('🎯 Keith Haring detected');
          if (!finalPrompt.includes('radiant')) {
            finalPrompt = finalPrompt + ', Transform like Keith Haring street art - CRITICAL: BOLD THICK BLACK OUTLINES around all figures, figures MAXIMALLY SIMPLIFIED into iconic dancing silhouettes, REDUCED TO ESSENTIAL SHAPES ONLY, bright PRIMARY COLORS filling shapes (red, yellow, blue, green, orange, pink), RADIANT LINES emanating from bodies showing energy and movement, FLAT GRAPHIC shapes NO gradients NO shading NO fine details, flat graphic subway graffiti style, NOT photorealistic NOT detailed, figures in DYNAMIC DANCING POSES with movement lines, barking dogs and crawling babies as motifs, joyful energetic street art aesthetic';
            controlStrength = 0.40;
            // console.log('✅ Enhanced Keith Haring with bold outlines and radiant lines (control_strength 0.40)');
          } else {
            // console.log('ℹ️ Keith Haring style already in prompt (AI included it)');
          }
        }
        
        // 리히텐슈타인 선택시 벤데이 도트/만화 강화 (모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('LICHTENSTEIN') || 
            selectedArtist.toUpperCase().trim().includes('ROY') ||
            selectedArtist.includes('리히텐슈타인') ||
            selectedArtist.includes('로이')) {
          // console.log('🎯 Lichtenstein detected');
          if (!finalPrompt.includes('Ben-Day dots')) {
            finalPrompt = finalPrompt + ', Transform like Roy Lichtenstein "Drowning Girl" and "Whaam!" - CRITICAL: cover ENTIRE image with visible BEN-DAY DOTS pattern (small colored circles), THICK BOLD BLACK OUTLINES around ALL forms, SIMPLIFIED GRAPHIC SHAPES with REDUCED FINE DETAILS, LIMITED flat colors ONLY (primary red yellow blue plus black white), FLAT COLOR AREAS NO gradients NO shading, comic book dramatic emotional style, NOT photorealistic NOT detailed, halftone printing aesthetic blown up to fine art scale';
            controlStrength = 0.55;
            // console.log('✅ Enhanced Lichtenstein with Drowning Girl reference (control_strength 0.55)');
          } else {
            // console.log('ℹ️ Lichtenstein dots already in prompt (AI included it)');
          }
        }
        
      } else {
        // AI 실패 → Fallback
        // console.log('⚠️ AI failed, using fallback');
        
        let fallbackKey = selectedStyle.category;
        
        if (selectedStyle.category === 'movements') {
          // 미술사조: id를 사용 (renaissance, baroque, impressionism 등)
          fallbackKey = selectedStyle.id;
          
          // v66: 누락된 fallback 키 매핑
          const fallbackKeyMap = {
            'neoclassicism': 'neoclassicism_vs_romanticism_vs_realism',
            'romanticism': 'neoclassicism_vs_romanticism_vs_realism',
            'realism': 'neoclassicism_vs_romanticism_vs_realism',
            'artNouveau': 'fauvism'  // 아르누보 → 야수파로 매핑 (유사한 장식적 스타일)
          };
          if (fallbackKeyMap[fallbackKey]) {
            fallbackKey = fallbackKeyMap[fallbackKey];
          }
        } else if (selectedStyle.category === 'masters') {
          fallbackKey = selectedStyle.id.replace('-master', '');
        } else if (selectedStyle.category === 'oriental') {
          fallbackKey = selectedStyle.id;
        }
        
        // console.log('Using fallback key:', fallbackKey);
        const fallback = fallbackPrompts[fallbackKey];
        
        if (!fallback) {
          console.error('ERROR: No fallback found for key:', fallbackKey);
          console.error('Available categories:', Object.keys(fallbackPrompts));
          throw new Error(`No fallback prompt for: ${fallbackKey}`);
        }
        
        finalPrompt = fallback.prompt;
        selectedArtist = fallback.name;
        selectedWork = fallback.defaultWork || null;  // 거장 기본 작품
        selectionMethod = 'fallback';
        selectionDetails = {
          ai_error: aiResult.error
        };
        
        // Renaissance fallback도 control_strength 0.65
        if (fallbackKey === 'renaissance') {
          controlStrength = 0.65;
          // console.log('✅ Renaissance fallback: control_strength 0.65');
        }
      }
    } else {
      // ANTHROPIC_API_KEY 없음 → Fallback
      // console.log('ℹ️ No AI key, using fallback');
      
      let fallbackKey = selectedStyle.category;
      
      if (selectedStyle.category === 'movements') {
        // 미술사조: id를 사용 (renaissance, baroque, impressionism 등)
        fallbackKey = selectedStyle.id;
        
        // v66: 누락된 fallback 키 매핑
        const fallbackKeyMap = {
          'neoclassicism': 'neoclassicism_vs_romanticism_vs_realism',
          'romanticism': 'neoclassicism_vs_romanticism_vs_realism',
          'realism': 'neoclassicism_vs_romanticism_vs_realism',
          'artNouveau': 'fauvism'  // 아르누보 → 야수파로 매핑 (유사한 장식적 스타일)
        };
        if (fallbackKeyMap[fallbackKey]) {
          fallbackKey = fallbackKeyMap[fallbackKey];
        }
      } else if (selectedStyle.category === 'masters') {
        fallbackKey = selectedStyle.id.replace('-master', '');
      } else if (selectedStyle.category === 'oriental') {
        fallbackKey = selectedStyle.id;
      }
      
      // console.log('Using fallback key:', fallbackKey);
      const fallback = fallbackPrompts[fallbackKey];
      
      if (!fallback) {
        console.error('ERROR: No fallback found for key:', fallbackKey);
        console.error('Available categories:', Object.keys(fallbackPrompts));
        throw new Error(`No fallback prompt for: ${fallbackKey}`);
      }
      
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectedWork = fallback.defaultWork || null;  // 거장 기본 작품
      selectionMethod = 'fallback_no_key';
      
      // Renaissance fallback (no key)도 control_strength 0.65
      if (fallbackKey === 'renaissance') {
        controlStrength = 0.65;
        // console.log('✅ Renaissance fallback (no key): control_strength 0.65');
      }
    }

    // console.log('Final prompt:', finalPrompt);
    
    // ========================================
    // PicoArt 핵심 원칙: Level 3 회화 강조 + 다시 그리기 + 얼굴 보존
    // ========================================
    
    // 동양 미술 체크 (한국/중국)
    const isOrientalArt = finalPrompt.toLowerCase().includes('korean') || 
                          finalPrompt.toLowerCase().includes('chinese') ||
                          categoryType === 'oriental';
    
    // 모자이크는 타일(tesserae)로 만드는 것이므로 brushstrokes 제외
    const isMosaic = finalPrompt.toLowerCase().includes('mosaic') || 
                     finalPrompt.toLowerCase().includes('tesserae');
    
    // 점묘법은 점(dots)으로 만드는 것이므로 brushstrokes 완전 금지
    const isPointillism = finalPrompt.toLowerCase().includes('signac') || 
                          finalPrompt.toLowerCase().includes('pointillist') ||
                          finalPrompt.toLowerCase().includes('pointillism');
    
    let paintingEnforcement;
    
    // 한국 민화 특별 처리
    const isKoreanMinhwa = finalPrompt.includes('Korean Minhwa') || finalPrompt.includes('Korean folk painting');
    const isKoreanPungsokdo = finalPrompt.includes('Korean Pungsokdo') || finalPrompt.includes('Kim Hong-do');
    // v60: 중국 공필화 특별 처리
    const isChineseGongbi = finalPrompt.includes('Chinese Gongbi') || finalPrompt.includes('Gongbi meticulous') || finalPrompt.includes('工筆');
    
    if (isKoreanMinhwa) {
      // v64: 한국 민화 - 자연어 문장형
      paintingEnforcement = ', Transform this into an authentic Joseon dynasty folk painting on thick rough hanji paper with prominent fiber texture throughout. Apply uneven patchy pigment absorption creating irregular color areas, with genuinely faded and weathered colors like a 200-year-old museum piece. Use trembling wobbly folk brushlines with amateur quality charm, thick black outlines but irregular. Let the colors pool naturally in the paper fibers. Preserve the original face identity and gender accurately. Transform the clothing to simple folk hanbok style. Create a primitive naive artifact feeling with visible thick brushstrokes of 20mm or thicker. This must look like an authentic Korean folk painting, NOT a photograph, NOT 3D, NOT digital.';
      // console.log('ℹ️ Korean Minhwa mode: thick hanji texture + wobbly folk brushwork');
    } else if (isKoreanPungsokdo) {
      // v64: 한국 풍속도 - 자연어 문장형
      paintingEnforcement = ', Transform this into an authentic Korean Pungsokdo genre painting on rough textured hanji with visible paper fibers. Black ink must dominate 70 to 80 percent of the image with confident spontaneous brushwork. Apply only minimal pale color washes for the remaining 20 to 30 percent, using exclusively earth tones such as pale brown, grey-green and faint ochre. Do not use bright or saturated colors. Capture the elegant restraint of Kim Hong-do style, making this distinctly different from colorful Chinese gongbi paintings. Preserve the original face identity and gender. Use simple everyday hanbok clothing. Create a historical painting feeling rather than an illustration, with visible thick brushstrokes of 20mm or thicker. This must look like an authentic Korean historical painting, NOT a photograph, NOT 3D, NOT digital.';
      // console.log('ℹ️ Korean Pungsokdo mode: 70% ink 30% pale color on textured hanji');
    } else if (isChineseGongbi) {
      // v64: 중국 공필화 - 자연어 문장형
      paintingEnforcement = ', Transform this into an authentic Chinese Gongbi meticulous painting on silk surface with visible silk texture throughout. Apply extremely fine hair-thin brush lines with rich mineral pigment colors including malachite green, azurite blue, cinnabar red and gold leaf accents. Create a traditional hand-painted feel rather than digital or smooth AI art, using delicate layered color washes. Achieve imperial court quality refinement. Preserve the original face identity and gender. Transform the clothing to Chinese court clothing style. Include visible thick brushstrokes of 20mm or thicker. This must look like an authentic Chinese traditional painting, NOT a photograph, NOT 3D, NOT digital.';
      // console.log('ℹ️ v60 Chinese Gongbi mode: silk texture + fine mineral pigments + traditional feel');
    } else if (isMosaic) {
      // v64: 모자이크 - 자연어 문장형 (brushstrokes 제외)
      paintingEnforcement = ', Transform this into authentic mosaic art made of small stone or glass tesserae tiles with a visible grid pattern of square tiles. Do not use brushstrokes or oil painting texture. Apply the mosaic style to the entire image including the person, who must also look like they are made of mosaic tiles rather than looking photographic. Preserve the original facial identity but render it entirely in mosaic tile style. Preserve gender accurately. Create a unified composition with all figures together. Do not add any text, signatures, letters or writing anywhere. This must look like authentic mosaic art, NOT a photograph, NOT digital.';
      // console.log('ℹ️ Mosaic mode: tesserae tiles WITHOUT brushstrokes, style applied to person too');
    } else if (isPointillism) {
      // v64: 점묘법 - 자연어 문장형 (brushstrokes 완전 금지)
      paintingEnforcement = ', Transform this into a Pointillist painting style composed entirely of large visible colored dots of 8mm each. Do not use any brushstrokes, brush texture or oil painting strokes. The entire image must be composed of large visible dots of pure unmixed color placed side by side, creating a visible dot pattern throughout like Signac or Seurat paintings. Apply the Pointillist dot style to the entire image including all people, who must also be rendered entirely in dots rather than looking photographic. Preserve the original facial identity but render entirely in soft pastel colored dots. Preserve gender accurately. Create a unified composition with all figures together. Do not add any text, signatures, letters or writing anywhere. This must look like authentic Pointillist art, NOT a photograph, NOT digital.';
      // console.log('ℹ️ Pointillism mode: tiny dots only, NO brushstrokes');
    } else if (isOrientalArt) {
      // v64: 동양 미술 - 자연어 문장형
      paintingEnforcement = ', Apply the traditional painting style to the entire image including all people, who must look painted rather than photographic. Use traditional brush painting techniques with visible brushstrokes. Preserve the original facial identity but render it in painting style. Preserve gender accurately where male stays male with masculine features and female stays female with feminine features. Create a unified composition with all figures together. Include visible thick brushstrokes of 20mm or thicker. This must look like an authentic traditional painting, NOT a photograph, NOT photo-realistic, NOT 3D, NOT digital.';
      // console.log('ℹ️ v60 Oriental art mode: text will be generated by A (Claude) and passed to F');
    } else {
      // v64: 일반 서양화 - 자연어 문장형
      paintingEnforcement = ', Apply the painting style to the entire image including all people, who must look painted rather than photographic. Create a fully realized oil painting with very thick visible brushstrokes of 20mm or thicker throughout, including on skin and clothing. Canvas texture and paint texture must be apparent. Preserve facial identity but render in painting style with visible brushwork on the face. Preserve gender accurately where male stays male with masculine features and female stays female with feminine features. Create a unified composition with all figures together. Do not add any text, signatures, letters, writing or watermarks anywhere in the image. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.';
    }
    
    // ========================================
    // 20세기 모더니즘: 대전제 적용 제외!
    // (얼굴 분해, 복제, 녹아내림 등 허용 위해)
    // ========================================
    
    // ========================================
    // 매력적 표현 대전제 (Attractive Enhancement)
    // 고통/왜곡이 핵심인 작품은 제외
    // ========================================
    const excludeAttractive = [
      'munch-scream',      // 절규 - 공포/불안 왜곡
      'munch-anxiety',     // 불안 - 군중 불안
      'picasso-guernica',  // 게르니카 - 전쟁 참상
      'picasso-weepingwoman', // 우는 여인 - 슬픔 왜곡
      'frida-brokencolumn' // 부러진 기둥 - 고통 시각화
    ];
    
    // v66: artistEnhancements.js 삭제됨 - excludeAttractive 리스트만 사용
    const workKey = categoryType === 'masters' && selectedWork ? 
      convertToWorkKey(selectedArtist, selectedWork) : null;
    const hasAttractiveException = excludeAttractive.includes(workKey);
    
    const shouldApplyAttractive = !hasAttractiveException;
    
    // 🎯 v64: Identity 보존 - 자연어 문장형
    // (이전 버전 호환성 위해 유지, 단 중복 체크)
    if (!finalPrompt.includes('IDENTITY PRESERVATION')) {
      const identityPreservation = ', Absolutely preserve the original subject face identity, age, gender and ethnicity exactly. Asian faces must remain Asian, Western faces must remain Western, children must remain children, adults must remain adults. For gender preservation, male subjects MUST remain male with masculine features, strong jaw and male bone structure without being feminized, softened or made delicate. Female subjects must remain female with feminine features. Do not change hair color or skin tone. Do not Westernize Asian faces or Asianize Western faces. Keep the original facial features and bone structure intact.';
      finalPrompt = finalPrompt + identityPreservation;
      logData.prompt.applied.identity = true;
      // console.log('🎯 Applied identity preservation rule (자연어 문장형)');
    }
    
    if (shouldApplyAttractive) {
      const attractiveEnhancement = ', Render all people attractively, beautifully and with appealing refined features. While strictly preserving the original gender, make male subjects look handsome, masculine and dignified, and make female subjects look pretty, feminine and elegant. Create an idealized flattering portrayal that enhances visual appeal.';
      finalPrompt = finalPrompt + attractiveEnhancement;
      logData.prompt.applied.attractive = true;
      // console.log('✨ Applied attractive enhancement (자연어 문장형)');
    } else {
      // console.log('🎭 Skipped attractive enhancement (expressive distortion allowed):', workKey || selectedWork);
    }
    
    if (categoryType === 'modernism') {
      // console.log('🎨 Modernism: Skipping paintingEnforcement (allows face distortion/fragmentation/multiplication)');
      // 대전제 적용 안 함 - 모더니즘은 프롬프트에서 직접 제어
    }
    // 이미 회화 강조가 없는 경우에만 추가 (소문자도 체크)
    else if (!finalPrompt.toLowerCase().includes('preserve facial') && 
        !finalPrompt.includes('brushstrokes') &&
        !finalPrompt.toLowerCase().includes('not photographic')) {
      finalPrompt = finalPrompt + paintingEnforcement;
      logData.prompt.applied.painting = true;
      // console.log('✅ Added Level 3+ painting enforcement (re-drawn with brush) + facial preservation');
    } else {
      // console.log('ℹ️ Skipped paintingEnforcement (already in fallback prompt)');
    }
    
    // ========================================
    // 공통 제외 조건: 워홀, 모자이크, 점묘법, 조각, 비잔틴, 고딕
    // ========================================
    const isWarhol = finalPrompt.toLowerCase().includes('warhol');
    const isMosaicStyle = finalPrompt.toLowerCase().includes('mosaic') || finalPrompt.toLowerCase().includes('tesserae');
    const isPointillismStyle = finalPrompt.toLowerCase().includes('pointillist') || finalPrompt.toLowerCase().includes('signac');
    const isSculpture = finalPrompt.toLowerCase().includes('sculpture') || finalPrompt.toLowerCase().includes('marble');
    const isByzantine = finalPrompt.toLowerCase().includes('byzantine');
    const isGothicGlass = finalPrompt.toLowerCase().includes('stained glass') || finalPrompt.toLowerCase().includes('gothic');
    const isPicasso = finalPrompt.toLowerCase().includes('picasso') || finalPrompt.toLowerCase().includes('cubist');
    
    const skipBrushstrokeRules = isWarhol || isMosaicStyle || isPointillismStyle || isSculpture || isByzantine || isGothicGlass || isPicasso;
    
    // ========================================
    // v64: 붓터치 규칙 - 자연어 문장형
    // ========================================
    if (!skipBrushstrokeRules) {
      const brushworkRule = ', Apply very thick bold brushstrokes throughout the subject including face, skin, hair and clothing. Use chunky wide brush marks of 20mm or thicker that are clearly visible even without zooming in. The brushwork should have impasto paint texture with visible brush direction, not fine lines, not subtle texture, not smooth digital rendering, not airbrushed, not photo-like skin. This thick brushwork on the subject is essential and required.';
      finalPrompt = finalPrompt + brushworkRule;
      logData.prompt.applied.brushwork = true;
      // console.log('🖌️ Applied brushwork rule (자연어 문장형)');
    } else {
      // console.log('🎨 Skipped brushwork rule (제외 대상)');
    }
    
    // ========================================
    // 🥪 샌드위치 방식 v2: 자연어 문장형 핵심 규칙
    // FLUX가 프롬프트 시작과 끝에서 핵심 규칙을 명확히 인식
    // ========================================
    if (!skipBrushstrokeRules) {
      const sandwichCore = 'This painting MUST preserve the original face identity, age, gender and ethnicity exactly while rendering the subject attractively. Very thick visible brushstrokes of 20mm or thicker MUST be clearly visible on the subject face, skin and clothing even without zooming in. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital. ';
      finalPrompt = sandwichCore + finalPrompt + ' ' + sandwichCore.trim();
      logData.prompt.applied.sandwich = true;
      // console.log('🥪 Applied SANDWICH rule (자연어 문장형)');
    } else {
      // console.log('🥪 Skipped SANDWICH rule (제외 대상)');
    }
    
    // ========================================
    // v66: 구조화된 콘솔 로그 출력
    // ========================================
    logData.prompt.wordCount = finalPrompt.split(/\s+/).length;
    logData.flux.control = controlStrength;
    
    // 사조 정보 추출 (movements 카테고리인 경우)
    if (selectedStyle.category === 'movements' && selectedStyle.id) {
      const movementMap = {
        'ancient': '고대', 
        'medieval': '중세', 
        'renaissance': '르네상스', 
        'baroque': '바로크',
        'rococo': '로코코', 
        'neoclassicism': '신고전주의', 
        'romanticism': '낭만주의', 
        'realism': '사실주의',
        'neoclassicism_vs_romanticism_vs_realism': '신고전 vs 낭만 vs 사실주의',
        'impressionism': '인상주의', 
        'postImpressionism': '후기인상주의', 
        'fauvism': '야수파',
        'expressionism': '표현주의', 
        'artNouveau': '아르누보',
        'modernism': '20세기 모더니즘'
      };
      logData.selection.movement = movementMap[selectedStyle.id] || selectedStyle.name || '';
    }
    
    const appliedList = Object.entries(logData.prompt.applied)
      .map(([key, val]) => val ? `${key}✓` : `${key}✗`)
      .join(' ');
    
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📍 FLUX Transfer v66');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('1️⃣ Vision 분석');
    console.log(`   👤 인물: ${logData.vision.count}명 (${logData.vision.gender || '?'}, ${logData.vision.age || '?'})`);
    console.log(`   📷 피사체: ${logData.vision.subjectType || 'unknown'}`);
    console.log('');
    console.log('2️⃣ AI 화가 선택');
    console.log(`   📂 카테고리: ${logData.selection.category}`);
    if (logData.selection.movement) console.log(`   🎨 사조: ${logData.selection.movement}`);
    console.log(`   👨‍🎨 화가: ${logData.selection.artist}`);
    if (logData.selection.masterwork) console.log(`   🖼️ 대표작: ${logData.selection.masterwork}`);
    if (logData.selection.reason) console.log(`   💬 선택 이유: ${logData.selection.reason}`);
    console.log('');
    console.log('3️⃣ 프롬프트 조립');
    console.log(`   📝 최종 길이: ${logData.prompt.wordCount} 단어`);
    console.log(`   ${appliedList}`);
    console.log('');
    console.log('4️⃣ FLUX API 호출');
    console.log(`   🔄 모델: ${logData.flux.model}`);
    console.log(`   ⚙️ Control: ${logData.flux.control}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    
    // FLUX Depth Dev 변환 (v63: Pro 테스트 포기, Dev 유지)
    // console.log('📦 [v63] black-forest-labs/flux-depth-dev');
    
    const response = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-depth-dev/predictions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait'
        },
        body: JSON.stringify({
          input: {
            control_image: image,
            prompt: finalPrompt,
            num_inference_steps: 24,
            guidance: 12,
            control_strength: controlStrength,
            output_format: 'jpg',
            output_quality: 90
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FLUX Depth error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `FLUX API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    
    // v66: 완료 로그
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ 완료 (${elapsedTime}초)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    
    // 결과에 선택 정보 포함
    res.status(200).json({
      ...data,
      selected_artist: selectedArtist,
      selected_work: selectedWork,  // 거장 모드: 선택된 대표작
      selection_method: selectionMethod,
      selection_details: selectionDetails,
      // v66: 프론트엔드 로그용 데이터
      _debug: {
        version: 'v66',
        elapsed: elapsedTime,
        vision: logData.vision,
        selection: logData.selection,
        prompt: {
          wordCount: logData.prompt.wordCount,
          applied: appliedList
        },
        flux: logData.flux
      }
    });
    
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
