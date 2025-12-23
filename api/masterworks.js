// ========================================
// PicoArt v65 - 프롬프트 효율화 (자연어 문장형 적용)
// v65: 일부 대표작 자연어 문장형으로 변환 (로마 모자이크, 고딕, 비잔틴, 이슬람, 보티첼리, 카라바조)
//      - "by [Artist], [Artist] art style" 패턴 적용
//      - FLUX 효율적 전달 방식 (연구 결과 기반)
// v64.1: 156개 전체 NOT photograph, NOT 3D, NOT digital 적용
// 매칭 프로젝트: AI가 대표작 기반 프롬프트 적용
// ========================================

// ========================================
// 1. 로마 모자이크 (6개 대표작)
// ========================================
export const romanMosaicMasterworks = {
  'mosaic-alexander': {
    name: '알렉산더 모자이크',
    nameEn: 'Alexander Mosaic',
    prompt: ', Apply Alexander Mosaic style from the House of the Faun in Pompeii with a dynamic battle scene and dramatic diagonal composition. Use large visible tesserae tiles of 50mm each with thick black grout lines. Apply an earth tone palette of terracotta, ochre, umber, ivory and black with intense warrior expressions and horses in motion, capturing dramatic action frozen in stone tiles. This must look like an authentic Roman mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '전투, 역동적'
  },
  'mosaic-cave-canem': {
    name: '카베 카넴',
    nameEn: 'Cave Canem',
    prompt: ', Apply Cave Canem mosaic style from Pompeii with a bold black dog silhouette on a light background. Use large visible tesserae tiles of 50mm each with thick black grout lines. Create strong graphic contrast with simple powerful composition using a terracotta, black and white palette in Roman threshold warning style. This must look like an authentic Roman mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '동물, 경고'
  },
  'mosaic-dionysus': {
    name: '디오니소스 모자이크',
    nameEn: 'Dionysus Mosaic',
    prompt: ', Apply Dionysus mosaic style with a mythological figure featuring grape vines and wine imagery. Use large visible tesserae tiles of 50mm each with thick black grout lines. Apply rich purple, green and gold accents on a terracotta base with celebratory divine atmosphere in Roman villa floor style. This must look like an authentic Roman mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '신화, 인물'
  },
  'mosaic-oceanus': {
    name: '오케아노스와 테티스',
    nameEn: 'Oceanus and Tethys',
    prompt: ', Apply Oceanus and Tethys mosaic style from Zeugma featuring sea god and goddess portrait busts. Use a dominant ocean blue and turquoise palette with large visible tesserae tiles of 50mm each and thick black grout lines. Create flowing water imagery with fish and sea creatures in divine aquatic atmosphere with majestic regal expressions and Roman mythological grandeur. This must look like an authentic Roman mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '바다신, 블루톤'
  },
  'mosaic-seasons': {
    name: '사계절 모자이크',
    nameEn: 'Four Seasons Mosaic',
    prompt: ', Apply Four Seasons mosaic style with a personified season as an elegant portrait bust in a circular medallion frame. Use large visible tesserae tiles of 50mm each with thick black grout lines. Include seasonal attributes such as flowers for spring, wheat for summer, grapes for autumn, or bare branches for winter. Apply warm earth tones with seasonal color accents in Roman villa decorative elegance. This must look like an authentic Roman mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '계절, 여성 얼굴'
  },
  'mosaic-nile': {
    name: '닐 모자이크',
    nameEn: 'Nile Mosaic',
    prompt: ', Apply Nile Mosaic of Palestrina style with a panoramic landscape and river scenes. Use large visible tesserae tiles of 50mm each with thick black grout lines. Include exotic Egyptian wildlife such as hippos, crocodiles and ibis birds with lush vegetation along riverbanks. Add architectural elements and boats using earth and water tones of ochre, terracotta and blue-green in Roman topographic mosaic grandeur. This must look like an authentic Roman mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경, 동물'
  }
};

// ========================================
// 2. 고딕 스테인드글라스 (3개 대표작)
// ========================================
export const gothicMasterworks = {
  'gothic-blue-virgin': {
    name: '샤르트르 푸른 성모',
    nameEn: 'Blue Virgin of Chartres',
    prompt: ', Apply Blue Virgin of Chartres cathedral style with dominant Chartres cobalt blue throughout. Create a Madonna and child central composition with thick black lead lines dividing colored glass segments. Use jewel-tone translucent colors in flat medieval style with divine radiant light and ruby red accents. This must look like authentic Gothic stained glass, NOT a photograph, NOT 3D, NOT digital.',
    feature: '성모자, 코발트'
  },
  'gothic-rose-window': {
    name: '노트르담 장미창',
    nameEn: 'Notre-Dame Rose Window',
    prompt: ', Apply Notre-Dame Rose Window style with radial circular composition and figure at center. Use thick black lead lines creating petal-like segments with jewel-tone translucent colors of ruby, sapphire, emerald and gold. Create kaleidoscopic symmetry with divine geometric harmony and Gothic cathedral grandeur. This must look like authentic Gothic stained glass, NOT a photograph, NOT 3D, NOT digital.',
    feature: '방사형, 화려'
  },
  'gothic-sainte-chapelle': {
    name: '생트샤펠',
    nameEn: 'Sainte-Chapelle',
    prompt: ', Apply Sainte-Chapelle stained glass style with tall vertical composition. Use dominant ruby red and deep blue with thick black lead lines dividing biblical narrative scenes. Create multiple figures in vertical registers with jewel-tone translucent luminosity and soaring Gothic splendor. This must look like authentic Gothic stained glass, NOT a photograph, NOT 3D, NOT digital.',
    feature: '성경, 붉은색'
  }
};

// ========================================
// 2-1. 비잔틴 모자이크 (4개 대표작)
// ========================================
export const byzantineMasterworks = {
  'byzantine-justinian': {
    name: '유스티니아누스 황제',
    nameEn: 'Emperor Justinian',
    prompt: ', Apply Emperor Justinian mosaic style from San Vitale Ravenna with an imperial court scene and emperor at center. Use shimmering gold leaf background with visible tiny square tesserae tiles and circular golden halo behind the head. Create royal purple robes with gold embroidery in frontal hieratic pose with solemn dignified expression. Include attendants and clergy flanking the emperor with Byzantine imperial majesty and divine authority. This must look like authentic Byzantine mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '황제, 위엄'
  },
  'byzantine-theodora': {
    name: '테오도라 황후',
    nameEn: 'Empress Theodora',
    prompt: ', Apply Empress Theodora mosaic style from San Vitale Ravenna with empress wearing elaborate jeweled crown and pearl collar. Use shimmering gold leaf background with visible tiny square tesserae tiles and circular golden halo. Create luxurious purple and gold imperial robes in frontal hieratic pose with regal bearing. Include attendant ladies in waiting with Byzantine feminine power and opulent splendor. This must look like authentic Byzantine mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '황후, 화려'
  },
  'byzantine-deesis': {
    name: '데이시스',
    nameEn: 'Deesis',
    prompt: ', Apply Deesis mosaic style from Hagia Sophia Constantinople with Christ Pantocrator at center featuring a large circular golden halo. Use shimmering gold leaf background with visible tiny square tesserae tiles. Create gentle compassionate expression with raised hand in blessing gesture wearing deep blue and burgundy robes. Include Virgin Mary and John the Baptist interceding with sublime divine presence as Byzantine theological masterpiece. This must look like authentic Byzantine mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그리스도, 성스러움'
  },
  'byzantine-pantocrator': {
    name: '판토크라토르',
    nameEn: 'Christ Pantocrator',
    prompt: ', Apply Christ Pantocrator mosaic style from Monreale Cathedral with monumental half-length Christ figure dominating the composition. Create a massive circular golden halo with cross pattern and shimmering gold leaf background with visible tiny square tesserae tiles. Apply intense penetrating gaze with one hand raised in blessing and other holding Gospel book wearing deep blue and gold robes. Capture overwhelming divine majesty and eternal judgment. This must look like authentic Byzantine mosaic, NOT a photograph, NOT 3D, NOT digital.',
    feature: '장엄, 정면'
  }
};

// ========================================
// 2-2. 이슬람 세밀화 (5개 대표작)
// ========================================
export const islamicMiniatureMasterworks = {
  'islamic-youth': {
    name: '꽃을 든 귀족',
    nameEn: 'Youth Holding a Flower',
    prompt: ', Apply Persian miniature painting style in Reza Abbasi Isfahan manner with an elegant youth holding a single flower. Create extremely graceful S-curved posture with flowing lines and delicate refined features with almond eyes. Include elaborate turban with feather and richly patterned silk robes in jewel tones of ruby, sapphire, emerald and gold. Use intricate floral borders with flat decorative gold background in Persian calligraphic elegance and Safavid court sophistication. This must look like authentic Persian miniature, NOT a photograph, NOT 3D, NOT digital.',
    feature: '개인 초상, 우아'
  },
  'islamic-miraj': {
    name: '미라지 (승천도)',
    nameEn: 'Miraj (Night Journey)',
    prompt: ', Apply Persian miniature painting style of Miraj celestial ascension with figure riding Buraq, a winged horse with human face, through swirling clouds and flames. Surround with angels with colorful wings and heavenly golden light radiating with stars and celestial bodies. Use vibrant jewel colors of gold, lapis blue, ruby red and emerald with intricate cloud patterns and divine mystical atmosphere in Timurid or Safavid manuscript illumination style. This must look like authentic Persian miniature, NOT a photograph, NOT 3D, NOT digital.',
    feature: '환상, 천상'
  },
  'islamic-simurgh': {
    name: '시무르그',
    nameEn: 'Simurgh',
    prompt: ', Apply Persian miniature painting style of Simurgh mythical phoenix as a magnificent giant bird with elaborate peacock-like plumage in iridescent colors. Create long flowing tail feathers perched on mountain or tree surrounded by smaller birds in lush garden paradise setting. Use vibrant jewel tones of turquoise, gold, ruby and emerald with intricate feather patterns in Conference of the Birds style and Safavid manuscript illumination. This must look like authentic Persian miniature, NOT a photograph, NOT 3D, NOT digital.',
    feature: '동물, 신화'
  },
  'islamic-lovers': {
    name: '정원의 연인',
    nameEn: 'Lovers in a Garden',
    prompt: ', Apply Persian miniature painting style of Layla and Majnun romantic scene with two lovers in moonlit paradise garden. Include flowering trees of cypress and blossoming cherry with intricate floral carpet ground and starry night sky. Add pavilion or tent with rich textiles using jewel colors of ruby, sapphire, gold and emerald. Create delicate refined features with longing romantic gazes in Nizami Khamsa manuscript style and Persian literary romance atmosphere. This must look like authentic Persian miniature, NOT a photograph, NOT 3D, NOT digital.',
    feature: '커플, 로맨틱'
  },
  'islamic-rustam': {
    name: '루스탐과 용',
    nameEn: 'Rustam Slaying the Dragon',
    prompt: ', Apply Persian miniature painting style of epic battle scene from Shahnameh with heroic warrior Rustam on rearing horse fighting fearsome dragon or div monster. Create dynamic diagonal composition with action and movement and swirling combat energy in rocky landscape. Use vibrant jewel colors of gold, vermillion, lapis and emerald with detailed armor and weapons in Ferdowsi epic illustration style and Tabriz or Shiraz manuscript tradition. This must look like authentic Persian miniature, NOT a photograph, NOT 3D, NOT digital.',
    feature: '액션, 전투'
  }
};

// ========================================
// 3. 보티첼리 (3개 대표작)
// 선택 기준: 젊은 여성 전신, 우아한 곡선
// ========================================
export const botticelliMasterworks = {
  'botticelli-venus': {
    name: '비너스의 탄생',
    nameEn: 'Birth of Venus',
    prompt: ', Apply Birth of Venus style by Sandro Botticelli with goddess emerging from shell on the sea. Create extremely long flowing golden hair blown by wind with pale porcelain skin and rose tints. Use elegant S-curve contrapposto pose with diaphanous sheer fabric billowing and shell and sea foam. Apply visible tempera brushwork with egg paint texture capturing mythological ethereal beauty and Early Renaissance Florentine grace. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 전신, 흐르는 머리'
  },
  'botticelli-primavera': {
    name: '프리마베라',
    nameEn: 'Primavera',
    prompt: ', Apply Primavera style by Sandro Botticelli with graceful dancing figures in an orange grove. Create flowing diaphanous gowns with delicate floral patterns and Three Graces dancing in a circle. Include flowers scattered throughout the meadow with pale ethereal skin and sweet melancholic expressions. Apply visible tempera egg paint texture with Early Renaissance Florentine grace. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 그룹, 우아'
  },
  'botticelli-venus-mars': {
    name: '비너스와 마르스',
    nameEn: 'Venus and Mars',
    prompt: ', Apply Venus and Mars style by Sandro Botticelli with reclining couple composition. Create Venus alert in white and Mars sleeping in armor with playful satyrs with weapons. Capture intimate romantic scene with elongated elegant figures and pale luminous skin with flowing drapery. Apply visible tempera brushwork texture as mythological love scene. This must look like a real Renaissance hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '커플'
  }
};

// ========================================
// 4. 카라바조 (3개 대표작)
// 선택 기준: 단독 초상 (70%), 드라마틱 조명
// ========================================
export const caravaggioMasterworks = {
  'caravaggio-david': {
    name: '골리앗의 머리를 든 다윗',
    nameEn: 'David with the Head of Goliath',
    prompt: ', Apply David with the Head of Goliath style by Caravaggio with single figure emerging from pure black darkness. Use extreme tenebrism with dramatic spotlight from upper left. Show young David holding severed head in an intense psychological moment with deep shadows engulfing 70 percent of scene. Apply visible thick oil impasto texture. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '단독, 극적 명암'
  },
  'caravaggio-bacchus': {
    name: '바쿠스',
    nameEn: 'Bacchus',
    prompt: ', Apply Bacchus style by Caravaggio with young figure wearing grape vine crown and direct frontal gaze at viewer. Use extreme tenebrism with figure emerging from darkness holding wine goblet in hand. Create sensual classical youth with rich fabric draped loosely against deep black background. Apply visible thick oil impasto brushwork. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '단독, 정면 응시'
  },
  'caravaggio-matthew': {
    name: '성 마태의 소명',
    nameEn: 'Calling of Saint Matthew',
    prompt: ', Apply Calling of Saint Matthew style by Caravaggio with dramatic beam of light cutting through darkness pointing at figure. Use extreme tenebrism with figures emerging from deep black shadows and theatrical spotlight effect. Create Baroque diagonal composition with visible thick oil brushwork. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '빛줄기, 드라마'
  }
};

// ========================================
// 5. 신고전/낭만/사실 (7명, 각 3개)
// ========================================

// 다비드 - 정적/격식
export const davidMasterworks = {
  'david-marat': {
    name: '마라의 죽음',
    nameEn: 'Death of Marat',
    prompt: ', Apply Death of Marat style by Jacques-Louis David with a single figure in a bathtub against a plain dark background. Use Neoclassical clarity with smooth precise brushwork and dramatic martyrdom pose. Create stark simplicity with a cool restrained palette and clear crisp outlines showing heroic idealized form. This must look like a real Neoclassical hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '단독 드라마'
  },
  'david-coronation': {
    name: '나폴레옹 대관식',
    nameEn: 'Coronation of Napoleon',
    prompt: ', Apply Coronation of Napoleon style by Jacques-Louis David with a grand ceremonial group scene in Neoclassical monumental composition. Use rich imperial reds and golds with elaborate court costumes in a cathedral setting. Apply precise detailed brushwork with formal balanced arrangement. This must look like a real Neoclassical hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹 격식'
  },
  'david-horatii': {
    name: '호라티우스 형제의 맹세',
    nameEn: 'Oath of the Horatii',
    prompt: ', Apply Oath of the Horatii style by Jacques-Louis David with three brothers raising their arms toward swords. Use Neoclassical Roman architecture with arches and stark geometric composition. Create a dramatic patriotic gesture with clear precise outlines, muted earth tones and heroic masculine determination. This must look like a real Neoclassical hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹 맹세'
  }
};

// 앵그르 - 정적/격식
export const ingresMasterworks = {
  'ingres-odalisque': {
    name: '그랑드 오달리스크',
    nameEn: 'Grande Odalisque',
    prompt: ', Apply Grande Odalisque style by Ingres with a reclining female nude viewed from behind showing impossibly elongated spine and arms. Create porcelain-smooth luminous skin in an exotic harem setting with peacock fan and silk. Use cool blue drapery with sinuous flowing contours and smooth precise brushwork. This must look like a real Neoclassical hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 누드'
  },
  'ingres-bather': {
    name: '발팽송의 목욕하는 여인',
    nameEn: 'Valpinçon Bather',
    prompt: ', Apply Valpinçon Bather style by Ingres with a seated female viewed from behind with turban-wrapped head. Create smooth ivory skin with perfect modeling in a simple composition against a plain background. Show an elegant curved spine with cool palette and invisible brushwork emphasizing purity of form. This must look like a real Neoclassical hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 뒷모습'
  },
  'ingres-broglie': {
    name: '드 브로이 공주',
    nameEn: 'Princesse de Broglie',
    prompt: ', Apply Princesse de Broglie style by Ingres with an aristocratic female portrait in a luxurious blue satin gown. Create porcelain-perfect skin with elaborate jewelry and lace in a formal three-quarter pose. Apply rich fabric textures precisely rendered with Neoclassical refinement and elegance. This must look like a real hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '격식 초상'
  }
};

// 터너 - 풍경 (75%)
export const turnerMasterworks = {
  'turner-rain-steam': {
    name: '비, 증기, 속도',
    nameEn: 'Rain, Steam and Speed',
    prompt: ', Apply Rain Steam and Speed style by J.M.W. Turner with dissolving forms in atmospheric mist and a train emerging from golden haze. Create a Romantic sublime atmosphere with swirling mist and rain where luminous golden yellows dominate. Use impressionistic loose brushwork showing speed and modernity dissolving into nature. This must look like a real Romantic hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경 속도'
  },
  'turner-temeraire': {
    name: '전함 테메레르',
    nameEn: 'Fighting Temeraire',
    prompt: ', Apply Fighting Temeraire style by Turner with a ghost ship being towed at sunset and luminous orange and gold sky reflected on water. Create a melancholic twilight atmosphere with Romantic sublime quality and the ship dissolving into ethereal mist. Use loose atmospheric brushwork. This must look like a real Romantic hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경 석양'
  },
  'turner-slave-ship': {
    name: '노예선',
    nameEn: 'Slave Ship',
    prompt: ', Apply Slave Ship style by Turner with a turbulent dramatic seascape, blood-red sunset sky and churning waves. Create Romantic sublime terror with swirling atmospheric chaos and intense emotional color. Use loose expressive impasto brushwork with apocalyptic atmosphere. This must look like a real Romantic hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '드라마틱 풍경'
  }
};

// 고야 - 드라마/감정
export const goyaMasterworks = {
  'goya-maja': {
    name: '옷 벗은 마하',
    nameEn: 'Nude Maja',
    prompt: ', Apply Nude Maja style by Francisco Goya with a reclining female on cushions and direct confrontational gaze at the viewer. Create luminous flesh tones against dark velvet with Romantic sensuality and bold composition. Use confident brushwork with visible texture. This must look like a real Romantic hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 도발'
  },
  'goya-third-may': {
    name: '1808년 5월 3일',
    nameEn: 'Third of May 1808',
    prompt: ', Apply Third of May 1808 style by Goya with a dramatic execution scene at night and a central figure with arms raised in a white shirt. Use a lantern casting harsh light on a firing squad in dark uniforms. Create Romantic political drama with intense emotion, a dark palette and a stark white focal point. This must look like a real Romantic hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '드라마 역사'
  },
  'goya-charles-iv': {
    name: '카를로스 4세 가족',
    nameEn: 'Charles IV Family',
    prompt: ', Apply Charles IV Family style by Goya with a formal royal group portrait in elaborate court costumes with medals and sashes. Create unflattering honest realism despite grandeur with rich fabrics and jewels showing subtle psychological insight as a Romantic-era court painting. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹 격식'
  }
};

// 들라크루아 - 역동/감정
export const delacroixMasterworks = {
  'delacroix-liberty': {
    name: '민중을 이끄는 자유의 여신',
    nameEn: 'Liberty Leading the People',
    prompt: ', Apply Liberty Leading the People style by Delacroix with an allegorical female holding a French tricolor flag in a dynamic diagonal composition. Show a revolutionary crowd surging forward with Romantic passionate energy, rich saturated colors and dramatic smoke and chaos. Use visible energetic brushwork. This must look like a real Romantic hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '역동 그룹'
  },
  'delacroix-sardanapalus': {
    name: '사르다나팔루스의 죽음',
    nameEn: 'Death of Sardanapalus',
    prompt: ', Apply Death of Sardanapalus style by Delacroix with a dramatic chaotic scene on a red bed with swirling figures and horses. Create Romantic excess and destruction with rich jewel colors and dynamic diagonal composition showing sensual bodies in turmoil. Use passionate brushwork. This must look like a real Romantic hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '드라마 혼돈'
  },
  'delacroix-algiers': {
    name: '알제의 여인들',
    nameEn: 'Women of Algiers',
    prompt: ', Apply Women of Algiers style by Delacroix with an exotic harem interior scene showing reclining women in colorful Oriental dress. Use rich patterns and textiles with warm intimate lighting capturing Romantic Orientalism. Apply jewel-tone colors with sensuous atmosphere. This must look like a real Romantic hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹 이국'
  }
};

// 밀레 - 시골/전원 (80%)
export const milletMasterworks = {
  'millet-gleaners': {
    name: '이삭 줍는 사람들',
    nameEn: 'The Gleaners',
    prompt: ', Apply The Gleaners style by Jean-François Millet with three peasant women bent over gleaning wheat in humble dignified labor. Create a warm golden harvest field with an earth-tone palette of ochre, umber and sienna. Show monumental peasant figures with Realist rural nobility under soft natural light. This must look like a real Realist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '노동/그룹'
  },
  'millet-angelus': {
    name: '만종',
    nameEn: 'The Angelus',
    prompt: ', Apply The Angelus style by Millet with a peasant couple standing in prayer at dusk with heads bowed in devotion. Create a potato field setting with warm sunset glow using an earth-tone Realist palette. Capture quiet spiritual dignity and humble rural piety. This must look like a real Realist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '커플/전원'
  },
  'millet-sower': {
    name: '씨 뿌리는 사람',
    nameEn: 'The Sower',
    prompt: ', Apply The Sower style by Millet with a single peasant striding across a hillside broadcasting seed in a dynamic diagonal pose. Create a monumental heroic worker as a dramatic twilight silhouette using an earth-tone Realist palette with dignified rural labor. This must look like a real Realist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '단독/노동'
  }
};

// 마네 - 도시/현대 (70%)
export const manetMasterworks = {
  'manet-olympia': {
    name: '올랭피아',
    nameEn: 'Olympia',
    prompt: ', Apply Olympia style by Édouard Manet with a reclining female nude on white sheets and direct confrontational gaze. Create stark contrast of pale skin against dark background with a black maid bringing flowers. Use bold flat areas capturing modern Paris realism with visible confident brushwork. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 도발'
  },
  'manet-folies': {
    name: '폴리베르제르의 바',
    nameEn: 'Bar at the Folies-Bergère',
    prompt: ', Apply Bar at the Folies-Bergère style by Manet with a barmaid facing the viewer behind a marble counter. Show a mirror reflection revealing the crowded café with bottles and oranges as still life. Capture modern urban Paris nightlife with bold blacks and bright accents and visible brushwork. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여성 도시'
  },
  'manet-dejeuner': {
    name: '풀밭 위의 점심',
    nameEn: 'Luncheon on the Grass',
    prompt: ', Apply Luncheon on the Grass style by Manet with a nude female alongside clothed men in a forest picnic with direct gaze at the viewer. Create bold tonal contrasts showing modern scandal in a classical setting with visible confident brushstrokes and revolutionary composition. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹 야외'
  }
};

// ========================================
// 6. 인상주의 (4명, 각 3개)
// ========================================

// 르누아르 - 인물 (35%), 여성/아동
export const renoirMasterworks = {
  'renoir-boating': {
    name: '보트 파티의 점심',
    nameEn: 'Luncheon of the Boating Party',
    prompt: ', Apply Luncheon of the Boating Party style by Renoir with a joyful group on a restaurant terrace under dappled sunlight through an awning. Create warm peachy flesh tones with rosy highlights in a festive social gathering. Use soft feathery Impressionist brushstrokes with sparkling light on glasses and skin. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹 햇빛'
  },
  'renoir-moulin': {
    name: '물랭 드 라 갈레트',
    nameEn: 'Bal du moulin de la Galette',
    prompt: ', Apply Bal du moulin de la Galette style by Renoir with an outdoor dance party showing dappled sunlight through trees. Create couples dancing and socializing in an Impressionist celebration of modern leisure with soft warm flesh tones. Use visible quick brushstrokes capturing movement and light. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '축제'
  },
  'renoir-piano': {
    name: '피아노 치는 소녀들',
    nameEn: 'Girls at the Piano',
    prompt: ', Apply Girls at the Piano style by Renoir with two young girls at a piano in a bourgeois interior. Create a warm intimate domestic scene with soft peachy skin and gentle modeling capturing Impressionist warmth. Use feathery brushwork showing a tender sibling moment. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '아동'
  }
};

// 드가 - 움직임/무용 (30%)
export const degasMasterworks = {
  'degas-dance-class': {
    name: '무용 수업',
    nameEn: 'The Dance Class',
    prompt: ', Apply The Dance Class style by Edgar Degas with ballet dancers in a rehearsal studio using unusual cropped asymmetric composition. Create soft pastel chalky texture with pale tutus against wooden floor. Show figures cut off by the frame edge with movement frozen in time and visible pastel strokes. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '무용'
  },
  'degas-star': {
    name: '무대 위의 무희',
    nameEn: 'The Star (L\'Étoile)',
    prompt: ', Apply The Star style by Degas with a prima ballerina on stage in a spotlight using dramatic diagonal composition from above. Create a tutu catching stage light with pastel chalky texture and theatrical atmosphere. Use a cropped unusual viewpoint with other dancers in shadows. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '무용 스포트라이트'
  },
  'degas-absinthe': {
    name: '압생트',
    nameEn: 'L\'Absinthe',
    prompt: ', Apply L\'Absinthe style by Degas with a melancholic café scene showing a woman with an absinthe glass in off-center asymmetric composition. Create pale muted colors conveying psychological distance and modern urban alienation. Use an unusual cropped angle with visible brushwork. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '각도/구도'
  }
};

// 모네 - 풍경/물 (25%)
export const monetMasterworks = {
  'monet-waterlilies': {
    name: '수련',
    nameEn: 'Water Lilies',
    prompt: ', Apply Water Lilies style by Claude Monet with pond surface filling the entire frame showing floating lily pads and flowers. Create shimmering water reflections with no horizon line in soft hazy Impressionist atmosphere. Use short visible dabbed brushstrokes with blue-green-pink color harmony. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '물/풍경'
  },
  'monet-impression': {
    name: '인상, 해돋이',
    nameEn: 'Impression, Sunrise',
    prompt: ', Apply Impression Sunrise style by Monet with a harbor at dawn showing an orange sun on blue water. Create atmospheric haze over boats with Impressionist sketch-like quality. Use visible quick brushstrokes with soft edges dissolving in mist and orange-blue complementary colors. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경 새벽'
  },
  'monet-parasol': {
    name: '양산을 든 여인',
    nameEn: 'Woman with a Parasol',
    prompt: ', Apply Woman with a Parasol style by Monet with a figure on hilltop against bright sky. Show a white dress billowing in the wind with a parasol creating shade in Impressionist outdoor light. Use quick visible brushstrokes with grass and clouds in motion creating fresh plein-air atmosphere. This must look like a real Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '야외 인물'
  }
};

// 카유보트 - 도시/남성 (80%)
export const caillebotteMasterworks = {
  'caillebotte-paris': {
    name: '파리 거리, 비 오는 날',
    nameEn: 'Paris Street, Rainy Day',
    prompt: ', Apply Paris Street Rainy Day style by Gustave Caillebotte with a modern urban scene showing umbrellas and dramatic one-point perspective. Create wet cobblestone reflections with a bourgeois couple in the foreground and Haussmann architecture. Use photographic realism with Impressionist light. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '도시'
  },
  'caillebotte-floor': {
    name: '마루 긁는 사람들',
    nameEn: 'The Floor Scrapers',
    prompt: ', Apply The Floor Scrapers style by Caillebotte with workers on hands and knees scraping a wooden floor in dramatic perspective from above. Show bare muscular backs with sunlight through a window capturing working-class realism. Use bold geometric composition with visible paint texture. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '남성 노동'
  },
  'caillebotte-window': {
    name: '창가의 남자',
    nameEn: 'Man at the Window',
    prompt: ', Apply Man at the Window style by Caillebotte with a male figure viewed from behind looking out a window at a Haussmann balcony view. Create a bourgeois interior with dramatic silhouette against bright Paris street capturing a contemplative urban moment in photographic composition. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '남성 단독'
  }
};

// ========================================
// 7. 후기인상주의 (4명)
// 반 고흐 4개 (거장 겸용)
// ========================================

// 반 고흐 - 초상/감정 (50%) - 4개 대표작
export const vangoghMasterworks = {
  'vangogh-starrynight': {
    name: '별이 빛나는 밤',
    nameEn: 'The Starry Night',
    prompt: ', Apply The Starry Night style by Vincent van Gogh with giant swirling spirals in the night sky using extremely thick impasto with paint ridges standing up from the canvas. Create cobalt blue and chrome yellow contrast with vertical cypress flame and stars with concentric halos. Apply swirling thick brushstrokes to everything including the subject. This must look like a real Post-Impressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '감정/소용돌이'
  },
  'vangogh-selfportrait': {
    name: '자화상',
    nameEn: 'Self-Portrait',
    prompt: ', Apply Self-Portrait style by Vincent van Gogh with a swirling turquoise background and directional thick impasto brushstrokes following face contours. Create an intense frontal gaze with orange-red beard against blue-green coat where every brushstroke is visible and directional with palette knife texture. This must look like a real Post-Impressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '초상'
  },
  'vangogh-sunflowers': {
    name: '해바라기',
    nameEn: 'Sunflowers',
    prompt: ', Apply Sunflowers style by Vincent van Gogh with thick 3D impasto petals like sculptures where chrome yellow dominates 80 percent of the palette. Create paint physically raised from the canvas with heavy palette knife marks and ochre and orange accents where every surface shows thick textured paint. This must look like a real Post-Impressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '색채'
  },
  'vangogh-cafe': {
    name: '밤의 카페 테라스',
    nameEn: 'Café Terrace at Night',
    prompt: ', Apply Café Terrace at Night style by Van Gogh with yellow gaslight against deep blue starry sky. Create a cobblestone street in perspective with warm café glow using thick impasto swirling brushstrokes. Show yellow-blue complementary contrast in a night scene with visible stars. This must look like a real Post-Impressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '야경'
  }
};

// 고갱 - 이국적 (35%)
export const gauguinMasterworks = {
  'gauguin-tahitian': {
    name: '타히티 여인들',
    nameEn: 'Tahitian Women',
    prompt: ', Apply Tahitian Women style by Paul Gauguin with exotic Polynesian figures in a tropical setting. Use flat bold areas of pure saturated color with warm golden-brown skin tones and decorative floral patterns. Create simplified forms with a rich tropical palette of orange, turquoise and pink using visible brushwork. This must look like a real Post-Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '이국 인물'
  },
  'gauguin-where': {
    name: '우리는 어디서 왔는가',
    nameEn: 'Where Do We Come From?',
    prompt: ', Apply Where Do We Come From style by Gauguin with a frieze-like composition showing multiple Tahitian figures in a philosophical narrative from birth to death. Use flat decorative color areas with deep blue and gold palette creating symbolic mysterious atmosphere in Post-Impressionist flatness. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '철학'
  },
  'gauguin-christ': {
    name: '황색 그리스도',
    nameEn: 'Yellow Christ',
    prompt: ', Apply Yellow Christ style by Gauguin with a bold yellow crucifix against autumn landscape and Breton peasant women praying. Use flat areas of pure unmixed color with cloisonnist dark outlines in a symbolic religious scene. Create simplified decorative forms. This must look like a real Post-Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '종교/색채'
  }
};

// 세잔 - 정물/풍경 ⚠️초상 금지
export const cezanneMasterworks = {
  'cezanne-apples': {
    name: '사과 바구니',
    nameEn: 'Basket of Apples',
    prompt: ', Apply Basket of Apples style by Paul Cézanne with a geometric structured still life showing tilted table perspective. Create apples as solid spherical forms with parallel constructive brushstrokes building volume. Show multiple viewpoints in a single image with warm earth tones and visible parallel brush marks. This must look like a real Post-Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '정물'
  },
  'cezanne-montagne': {
    name: '생트빅투아르 산',
    nameEn: 'Mont Sainte-Victoire',
    prompt: ', Apply Mont Sainte-Victoire style by Cézanne with a geometric landscape showing the mountain as structured patches of color building forms. Use parallel constructive brushstrokes with a blue-green-ochre palette showing multiple perspectives in an analytical approach to nature with visible modulated brush marks. This must look like a real Post-Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경'
  },
  'cezanne-cards': {
    name: '카드 놀이꾼',
    nameEn: 'The Card Players',
    prompt: ', Apply The Card Players style by Cézanne with peasant figures at a table playing cards as solid geometric forms. Use an earth-tone palette in a quiet concentrated atmosphere with parallel brushstrokes building volume. Create monumental dignity in a simple scene with structured composition. This must look like a real Post-Impressionist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹'
  }
};

// 시냐크 - 점묘/항구 (15%) - 큰 점 8mm + 파스텔 톤
export const signacMasterworks = {
  'signac-antibes': {
    name: '핑크 구름 앙티브',
    nameEn: 'Antibes the Pink Cloud',
    prompt: ', Apply Antibes the Pink Cloud style by Paul Signac 1916 with large visible Pointillist dots of 8mm each covering the face, body and clothing. Use a soft pastel color palette of pale pink, lavender, soft peach, cream yellow and light blue. Create a dramatic pink cloud over Mediterranean sea with a sailboat on calm water in dreamy luminous atmosphere. The dots must not be blended with each dot individually visible, not tiny, not small dots. This must look like authentic Pointillist art, NOT a photograph, NOT 3D, NOT digital.',
    feature: '하늘, 파스텔'
  },
  'signac-avignon': {
    name: '아비뇽 교황청',
    nameEn: 'The Papal Palace Avignon',
    prompt: ', Apply The Papal Palace Avignon style by Paul Signac 1909 with large visible Pointillist dots of 8mm each covering the face, body and clothing. Use soft pastel sunset colors of warm orange, soft purple, gold, amber and soft pink. Create a historic Gothic palace reflected in water with evening atmosphere and dramatic sky. The dots must not be blended with each dot individually visible, not tiny, not small dots. This must look like authentic Pointillist art, NOT a photograph, NOT 3D, NOT digital.',
    feature: '건축, 석양'
  },
  'signac-capo': {
    name: '카포 디 놀리',
    nameEn: 'Capo di Noli',
    prompt: ', Apply Capo di Noli style by Paul Signac 1898 with large visible Pointillist dots of 8mm each covering the face, body and clothing. Use soft pastel Mediterranean colors of turquoise blue, seafoam green, warm ochre and soft lavender. Create an Italian Riviera cliff coastline with bright sunlight on rocky shore. The dots must not be blended with each dot individually visible, not tiny, not small dots. This must look like authentic Pointillist art, NOT a photograph, NOT 3D, NOT digital.',
    feature: '해안, 절벽'
  }
};

// ========================================
// 8. 야수파 (3명, 각 3개)
// ========================================

// 마티스 - 인물/실내 (35%) - 거장 겸용
export const matisseMasterworks = {
  'matisse-greenstripe': {
    name: '초록 줄무늬',
    nameEn: 'The Green Stripe',
    prompt: ', Apply The Green Stripe (Portrait of Madame Matisse) style by Henri Matisse with a green stripe down the center of the face dividing it in half. Create the left side of the face with yellow-pink tones and the right side with green-purple tones. Use radical Fauvist color directly on the skin rather than realistic skin tones with bold dark outlines. Make the face completely flat with no shadows using rough visible brushstrokes with pure unmixed clashing colors. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '인물/색상해방'
  },
  'matisse-purplecoat': {
    name: '보라 코트를 입은 여인',
    nameEn: 'Woman in a Purple Coat',
    prompt: ', Apply Woman in a Purple Coat style by Henri Matisse with an elegant woman in a rich purple coat. Use bold black outlines around the figure and objects making them pop with a decorative patterned background in mature Matisse decorative style. Create strong contour lines separating color areas with flat color planes in luxurious and regal atmosphere. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '인물/우아함'
  },
  'matisse-dance': {
    name: '춤',
    nameEn: 'The Dance',
    prompt: ', Apply The Dance style by Henri Matisse with five dancing figures in a circle holding hands. Use a three-color only composition of red figures on blue sky and green ground with simplified nude forms showing joyful rhythmic energy. Create flat color areas with rough Fauvist brushstrokes visible. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹'
  },
  'matisse-red-room': {
    name: '붉은 방',
    nameEn: 'The Red Room',
    prompt: ', Apply The Red Room (Harmony in Red) style by Matisse with dominant red covering walls and table. Create decorative floral arabesque patterns with flat perspective showing a woman arranging fruit and a window revealing a green garden. Use pure color harmony with visible Fauvist brushwork. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '실내'
  }
};

// 드랭 - 풍경 (35%)
export const derainMasterworks = {
  'derain-collioure': {
    name: '콜리우르 항구',
    nameEn: 'Port of Collioure',
    prompt: ', Apply Port of Collioure style by André Derain as a Fauvist landscape with boats in a harbor. Use bold unmixed pure colors at maximum saturation capturing Mediterranean light with flat decorative color areas and strong outlines. Include visible energetic Fauvist brushstrokes. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경'
  },
  'derain-bridge': {
    name: '런던 다리',
    nameEn: 'Charing Cross Bridge',
    prompt: ', Apply Charing Cross Bridge style by Derain as a Fauvist urban landscape showing the Thames river in bold arbitrary colors with London skyline. Use pure intense hues liberated from reality with flat color zones and visible expressive brushwork. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경 도시'
  },
  'derain-matisse': {
    name: '마티스 초상',
    nameEn: 'Portrait of Matisse',
    prompt: ', Apply Portrait of Matisse style by Derain as a Fauvist portrait with bold non-naturalistic colors on the face and background. Show a fellow artist as subject with pure unmixed color areas and strong graphic presence using visible rough brushwork. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '인물'
  }
};

// 블라맹크 - 극적 감정 (30%)
export const vlaminckMasterworks = {
  'vlaminck-chatou': {
    name: '샤투의 집들',
    nameEn: 'Houses at Chatou',
    prompt: ', Apply Houses at Chatou style by Maurice de Vlaminck with violent Fauvist colors at maximum intensity showing houses in aggressive reds and blues. Use thick impulsive brushstrokes with pure paint squeezed from the tube creating an emotional color explosion in the most extreme Fauvist palette. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '격렬'
  },
  'vlaminck-red-trees': {
    name: '붉은 나무들',
    nameEn: 'Red Trees',
    prompt: ', Apply Red Trees style by Vlaminck with explosive red and orange trees in violent emotional color under a turbulent sky. Use an aggressive Fauvist palette with thick impasto applied with force where the landscape becomes emotional expression using visible energetic strokes. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '감정'
  },
  'vlaminck-bougival': {
    name: '부지발의 식당',
    nameEn: 'Restaurant at Bougival',
    prompt: ', Apply Restaurant at Bougival style by Vlaminck as a Fauvist scene with intense pure colors and bold contrasts. Use thick aggressive brushwork with emotional intensity and pure saturated hues in violent color combinations with visible impasto texture. This must look like a real Fauvist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '색채'
  }
};

// ========================================
// 클림트 3개 (거장 겸용)
// ========================================
export const klimtMasterworks = {
  'klimt-kiss': {
    name: '키스',
    nameEn: 'The Kiss',
    prompt: ', Apply The Kiss style by Gustav Klimt with two people embracing wrapped in gold leaf decorated robes. Use geometric patterns with rectangles on the male and circles on the female, kneeling on a flower meadow cliff edge. Create a Byzantine mosaic gold background with stylized floral patterns and Art Nouveau organic curves. Show ecstatic blissful expressions in luxurious gold, bronze and jewel tones. This must look like a real Art Nouveau hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '연인/황금',
    avoidFor: ['parent_child']
  },
  'klimt-judith': {
    name: '유디트',
    nameEn: 'Judith I',
    prompt: ', Apply Judith I style by Gustav Klimt with a wide gold choker necklace prominent, provocative seductive expression and bare shoulders visible. Include gold decorative elements with stylized floral patterns conveying power and danger. Show half-closed sensual eyes with Byzantine gold patterns in Art Nouveau style. This must look like a real Art Nouveau hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '팜므파탈'
  },
  'klimt-treeoflife': {
    name: '생명의 나무',
    nameEn: 'The Tree of Life',
    prompt: ', Apply The Tree of Life style by Gustav Klimt with spiral branches swirling outward in gold and bronze decorative swirls. Create elaborate curving patterns filling the background with stylized floral patterns and Art Nouveau organic curves. Use elegant sinuous lines with gold leaf texture in Stoclet Frieze style. This must look like a real Art Nouveau hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '장식/생명'
  }
};

// ========================================
// 9. 표현주의 (3명) - 칸딘스키/쉴레 제외
// 뭉크 4개 (거장 겸용)
// ========================================

// 뭉크 - 감정적 초상 (40%) - 4개 대표작
export const munchMasterworks = {
  'munch-scream': {
    name: '절규',
    nameEn: 'The Scream',
    prompt: ', Apply The Scream style by Edvard Munch with SKULL-LIKE figure holding hands on face. Create WAVY DISTORTED SWIRLING lines throughout sky and water with BLOOD RED ORANGE sunset on bridge. Show extreme existential terror with THICK BRUSHSTROKES 20mm+. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '불안',
    expressionRule: 'fear/anxiety allowed, NO bright, NO smiling'
  },
  'munch-madonna': {
    name: '마돈나',
    nameEn: 'Madonna',
    prompt: ', Apply Madonna style by Edvard Munch with SENSUAL female figure whose FLOWING DARK HAIR spreads like halo. Create RED AURA glowing around pale luminous skin with mysterious ecstatic half-closed eyes. Use WAVY FLOWING LINES with THICK BRUSHSTROKES 20mm+. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '신비/관능',
    expressionRule: 'ecstatic/mysterious allowed, NO bright, NO smiling'
  },
  'munch-jealousy': {
    name: '질투',
    nameEn: 'Jealousy',
    prompt: ', Apply Jealousy style by Edvard Munch with PALE GREEN SICKLY face in foreground showing intense haunted stare. Create psychological tension with couple in background where GREEN symbolizes jealousy. Use WAVY DISTORTED LINES showing emotional turmoil with THICK BRUSHSTROKES 20mm+. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '심리'
  },
  'munch-anxiety': {
    name: '불안',
    nameEn: 'Anxiety',
    prompt: ', Apply Anxiety style by Edvard Munch with GROUP of figures showing PALE ANXIOUS faces staring forward. Create WAVY UNDULATING lines in sky and landscape with BLOOD RED sunset. Show collective existential dread on path with THICK BRUSHSTROKES 20mm+. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '군중/불안',
    expressionRule: 'anxiety/worry allowed, NO bright, NO smiling'
  }
};

// 코코슈카 - 심리적 초상 (35%)
export const kokoschkaMasterworks = {
  'kokoschka-bride': {
    name: '바람의 신부',
    nameEn: 'Bride of the Wind',
    prompt: ', Apply Bride of the Wind style by Oskar Kokoschka with two lovers embracing in TURBULENT COSMIC SWIRLING clouds and waves. Create VIOLENT THICK BRUSHSTROKES 30mm+ with AGITATED NERVOUS energy. Show intense psychological portraiture with emotional turmoil visible in paint texture. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '격정, 폭풍'
  },
  'kokoschka-degenerate': {
    name: '퇴폐 미술가의 자화상',
    nameEn: 'Self-Portrait of a Degenerate Artist',
    prompt: ', Apply Self-Portrait of a Degenerate Artist style by Oskar Kokoschka (1937) with INTENSE DEFIANT self-portrait. Create TURBULENT THICK BRUSHSTROKES 30mm+ revealing inner resistance with BLUE GREEN OCHRE flesh tones. Show psychological vulnerability and artistic pride. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '저항, 자화상'
  },
  'kokoschka-double': {
    name: '2인 초상',
    nameEn: 'Double Portrait',
    prompt: ', Apply Double Portrait style by Oskar Kokoschka with TWO FIGURES in intimate psychological portrait. Create TURBULENT VISIBLE BRUSHSTROKES 30mm+ with WARM EARTH TONES and blue accents. Show AGITATED NERVOUS brushwork revealing inner connection between subjects. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '2인, 심리'
  }
};

// 키르히너 - 도시/각진 (25%)
export const kirchnerMasterworks = {
  'kirchner-berlin': {
    name: '베를린 거리 풍경',
    nameEn: 'Berlin Street Scene',
    prompt: ', Apply Berlin Street Scene style by Ernst Ludwig Kirchner with ANGULAR JAGGED urban figures. Use ACID GREEN HOT PINK ELECTRIC BLUE palette with MASK-LIKE SIMPLIFIED faces. Create city prostitutes in feathered hats with HARSH ANGULAR BRUSHSTROKES and urban tension. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '도시'
  },
  'kirchner-soldier': {
    name: '군인으로서의 자화상',
    nameEn: 'Self-Portrait as a Soldier',
    prompt: ', Apply Self-Portrait as a Soldier style by Ernst Ludwig Kirchner with ANGULAR figure in military uniform. Create SEVERED BLOODY STUMP where hand should be holding cigarette. Use ACID GREEN HOT PINK ELECTRIC BLUE palette with MASK-LIKE face showing psychological trauma. Show nude figure in background with war horror atmosphere. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '군복, 트라우마'
  },
  'kirchner-oldwomen': {
    name: '세 명의 노부인들',
    nameEn: 'Three Old Women',
    prompt: ', Apply Three Old Women style by Ernst Ludwig Kirchner with THREE ANGULAR figures in BLACK CLOTHING. Create green mountainous landscape with dark cypress trees. Use MASK-LIKE SIMPLIFIED faces in BLUE PINK flesh tones with HARSH ANGULAR BRUSHSTROKES. This must look like a real Expressionist hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '검은 옷, 풍경'
  }
};

// ========================================
// 10. 르네상스 추가 (4명, 각 3개)
// ========================================

// 레오나르도 다 빈치
export const leonardoMasterworks = {
  'leonardo-monalisa': {
    name: '모나리자',
    nameEn: 'Mona Lisa',
    prompt: ', Apply Mona Lisa style by Leonardo da Vinci with extreme sfumato where edges dissolve like smoke. Create an enigmatic subtle smile that is barely perceptible with hands folded serenely. Use a dark atmospheric landscape background with warm golden-brown Renaissance palette showing mysterious psychological depth. Apply soft hazy transitions with oil glazing layers as a sfumato masterpiece. This must look like a real Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '미소, 스푸마토'
  },
  'leonardo-lastsupper': {
    name: '최후의 만찬',
    nameEn: 'The Last Supper',
    prompt: ', Apply The Last Supper style by Leonardo da Vinci with a dramatic group composition centered on a main figure. Show gesturing disciples in emotional reactions with symmetrical architectural perspective in Renaissance fresco style. Use muted earth tones capturing psychological drama in gestures as a monumental religious scene. This must look like a real Renaissance fresco masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹, 드라마'
  },
  'leonardo-virginrocks': {
    name: '암굴의 성모',
    nameEn: 'Virgin of the Rocks',
    prompt: ', Apply Virgin of the Rocks style by Leonardo da Vinci with a mysterious grotto setting and rocky cave. Create Madonna with infants in pyramidal composition using extreme sfumato dissolving all edges. Capture an eerie underwater-like atmosphere with chiaroscuro emerging from darkness and pointing gestures in mystical religious mood. This must look like a real Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '동굴, 신비'
  }
};

// 티치아노
export const titianMasterworks = {
  'titian-venusurbino': {
    name: '우르비노의 비너스',
    nameEn: 'Venus of Urbino',
    prompt: ', Apply Venus of Urbino style by Titian with a reclining figure gazing directly and sensually at the viewer from a bed. Create warm glowing Venetian flesh tones with rich red and gold fabrics in a domestic interior background. Use loose expressive brushwork showing colorito mastery with intimate boudoir atmosphere. This must look like a real Venetian Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '누드, 관능'
  },
  'titian-bacchus': {
    name: '바쿠스와 아리아드네',
    nameEn: 'Bacchus and Ariadne',
    prompt: ', Apply Bacchus and Ariadne style by Titian with a dynamic mythological scene of Bacchus leaping from his chariot toward Ariadne. Create swirling drapery and a wild procession with leopards and satyrs under a brilliant ultramarine blue sky. Use rich warm Venetian colors with energetic diagonal composition. This must look like a real Venetian Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '역동, 신화'
  },
  'titian-assumption': {
    name: '성모 승천',
    nameEn: 'Assumption of the Virgin',
    prompt: ', Apply Assumption of the Virgin style by Titian with Madonna ascending in a brilliant red robe into heavenly golden light. Create apostles below gesturing in amazement with monumental altarpiece composition. Use warm Venetian palette with dynamic upward movement and divine radiance. This must look like a real Venetian Renaissance hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '종교, 상승'
  }
};

// 미켈란젤로
export const michelangeloMasterworks = {
  'michelangelo-adam': {
    name: '아담의 창조',
    nameEn: 'Creation of Adam',
    prompt: ', Apply Creation of Adam style by Michelangelo with the iconic reaching hands nearly touching between God and Adam. Create God floating in a billowing cloak surrounded by angels while Adam reclines on earth. Use Sistine Chapel ceiling fresco style with heroic muscular anatomy and monumental sculptural figures capturing the divine spark between fingers. This must look like a real Renaissance fresco masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '손, 창조'
  },
  'michelangelo-lastjudgment': {
    name: '최후의 심판',
    nameEn: 'The Last Judgment',
    prompt: ', Apply The Last Judgment style by Michelangelo with a monumental apocalyptic scene showing Christ central in judgment. Create swirling masses of ascending and descending souls with powerful muscular bodies in dynamic poses. Use dramatic foreshortening in Sistine Chapel wall fresco style with intense saturated colors and terribilità grandeur. This must look like a real Renaissance fresco masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '심판, 군중'
  },
  'michelangelo-pieta': {
    name: '피에타',
    nameEn: 'Pietà',
    prompt: ', Apply Pietà style by Michelangelo with Madonna holding dead Christ across her lap in a pyramidal composition. Create serene sorrowful beauty with marble sculpture aesthetic showing smooth idealized forms and graceful drapery folds. Capture Renaissance religious pathos with quiet grief and sculptural monumentality. This must look like a real Renaissance masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '비애, 조각적'
  }
};

// 라파엘로
export const raphaelMasterworks = {
  'raphael-athens': {
    name: '아테네 학당',
    nameEn: 'School of Athens',
    prompt: ', Apply School of Athens style by Raphael with grand architectural perspective featuring vaulted Roman arches. Create philosophers gathered in animated discussion with Plato and Aristotle at the center. Use balanced harmonious composition with classical Renaissance ideal showing clear luminous colors, intellectual grandeur and perfect symmetry. This must look like a real Renaissance fresco masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '건축, 철학'
  },
  'raphael-sistinamadonna': {
    name: '시스티나 마돈나',
    nameEn: 'Sistine Madonna',
    prompt: ', Apply Sistine Madonna style by Raphael with Madonna descending from clouds while holding the infant Christ. Create dramatically parted green curtains with saints kneeling below and the famous cherubs at the bottom. Use divine ethereal light with sweet graceful expressions in harmonious Renaissance beauty. This must look like a real Renaissance masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '성모, 천상'
  },
  'raphael-galatea': {
    name: '갈라테아의 승리',
    nameEn: 'Triumph of Galatea',
    prompt: ', Apply Triumph of Galatea style by Raphael with a sea nymph riding a shell chariot pulled by dolphins. Create swirling cupids above with tritons and nereids around in a dynamic spiraling composition. Use joyful mythological celebration with clear bright Mediterranean colors and graceful idealized figures. This must look like a real Renaissance fresco masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '신화, 바다'
  }
};

// ========================================
// 11. 바로크 추가 (3명, 각 3개)
// ========================================

// 루벤스
export const rubensMasterworks = {
  'rubens-threegraces': {
    name: '삼미신',
    nameEn: 'The Three Graces',
    prompt: ', Apply The Three Graces style by Rubens with three voluptuous figures dancing in a circle in a garden setting. Create warm luminous pearly flesh tones with soft sensual curves and flowing golden hair. Use a rich warm palette of pinks and golds with visible fluid brushwork showing Baroque exuberance. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '누드, 삼미신'
  },
  'rubens-descent': {
    name: '십자가에서 내려지심',
    nameEn: 'Descent from the Cross',
    prompt: ', Apply Descent from the Cross style by Rubens with a dramatic diagonal composition showing Christ\'s pale body being lowered by multiple figures. Create rich red and white drapery contrast with emotional religious drama. Use warm flesh against dark background with dynamic Baroque movement and theatrical lighting. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '종교, 드라마'
  },
  'rubens-leucippus': {
    name: '레우키포스 딸들의 납치',
    nameEn: 'Rape of the Daughters of Leucippus',
    prompt: ', Apply Rape of the Daughters of Leucippus style by Rubens with a dynamic swirling composition of muscular men on rearing horses. Create voluptuous struggling figures with dramatic diagonal energy. Use a rich warm Baroque palette with powerful movement frozen in time, sensual flesh tones and theatrical drama. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '역동, 납치'
  }
};

// 렘브란트
export const rembrandtMasterworks = {
  'rembrandt-nightwatch': {
    name: '야경',
    nameEn: 'The Night Watch',
    prompt: ', Apply The Night Watch style by Rembrandt with a dramatic group portrait emerging from darkness showing a militia company in dynamic motion. Create a golden spotlight illuminating central figures with deep chiaroscuro and rich blacks. Use military costumes with gleaming weapons in theatrical Baroque drama with visible impasto brushwork. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹, 빛'
  },
  'rembrandt-selfportrait': {
    name: '자화상',
    nameEn: 'Self-Portrait',
    prompt: ', Apply Self-Portrait style by Rembrandt with a penetrating psychological gaze and warm golden light on face emerging from darkness. Create thick impasto visible in highlights with honest unflinching self-examination. Use a rich brown and gold palette showing emotional depth, intimate introspection and masterful chiaroscuro. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '자화상, 심리'
  },
  'rembrandt-prodigal': {
    name: '돌아온 탕자',
    nameEn: 'Return of the Prodigal Son',
    prompt: ', Apply Return of the Prodigal Son style by Rembrandt with a kneeling son embraced by his elderly father in warm golden light against deep darkness. Create a tender emotional reunion with rich impasto in lit areas. Use profound spiritual compassion in intimate Baroque drama with glowing reds and golds. This must look like a real Baroque hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '용서, 감동'
  }
};

// 벨라스케스
export const velazquezMasterworks = {
  'velazquez-meninas': {
    name: '시녀들',
    nameEn: 'Las Meninas',
    prompt: ', Apply Las Meninas style by Velázquez with a complex spatial arrangement featuring Infanta Margarita at center with maids of honor attending. Create the artist\'s self-portrait at an easel with mirror reflection of the king and queen visible. Use a sophisticated silver-grey palette with loose confident brushwork showing aristocratic Spanish court elegance. This must look like a real Spanish Golden Age hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '궁정, 공간'
  },
  'velazquez-pope': {
    name: '교황 인노켄티우스 10세',
    nameEn: 'Portrait of Pope Innocent X',
    prompt: ', Apply Portrait of Pope Innocent X style by Velázquez with an intense penetrating gaze from a figure in crimson papal robes and cap. Create loose bravura brushwork visible up close with psychological intensity. Use rich reds against a muted background showing powerful authoritative presence and masterful fabric rendering. This must look like a real Spanish Golden Age hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '초상, 위엄'
  },
  'velazquez-breda': {
    name: '브레다의 항복',
    nameEn: 'Surrender of Breda',
    prompt: ', Apply Surrender of Breda style by Velázquez with a gracious surrender scene showing the victor receiving keys with magnanimity. Create a forest of lances behind troops with a dignified defeated general. Use an atmospheric landscape background with subtle silver-grey palette capturing this noble historical moment with Spanish Golden Age grandeur. This must look like a real Spanish Golden Age hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '역사, 항복'
  }
};

// ========================================
// 12. 로코코 추가 (2명, 각 3개)
// ========================================

// 와토
export const watteauMasterworks = {
  'watteau-cythera': {
    name: '키테라 섬으로의 순례',
    nameEn: 'Pilgrimage to Cythera',
    prompt: ', Apply Pilgrimage to Cythera style by Watteau with a fête galante scene of aristocratic couples departing for the island of love. Create a dreamy pastoral landscape with soft feathery brushwork and melancholic romantic atmosphere. Use shimmering silk costumes in pale pastel colors with rose and gold showing poetic theatrical grace. This must look like a real Rococo hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '연인, 출발'
  },
  'watteau-pierrot': {
    name: '피에로 (질)',
    nameEn: 'Pierrot (Gilles)',
    prompt: ', Apply Pierrot style by Watteau with a solitary clown in white satin costume standing frontally with a melancholic dreamy expression. Create commedia dell\'arte figures behind with soft silvery light and wistful poetic mood. Use delicate feathery brushwork showing theatrical isolation with Rococo grace and an undertone of sadness. This must look like a real Rococo hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '광대, 고독'
  },
  'watteau-fete': {
    name: '사랑의 축제',
    nameEn: 'The Pleasures of the Ball',
    prompt: ', Apply Fête Galante style by Watteau with an elegant outdoor gathering of aristocrats in shimmering silk with musicians and dancers. Create a dreamy parkland setting with soft dappled light in pale pastel palette. Use delicate feathery brushwork with romantic melancholic atmosphere showing theatrical Rococo elegance. This must look like a real Rococo hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '축제, 우아'
  }
};

// 부셰
export const boucherMasterworks = {
  'boucher-diana': {
    name: '목욕하는 디아나',
    nameEn: 'Diana Leaving the Bath',
    prompt: ', Apply Diana Leaving the Bath style by Boucher with a goddess figure showing rosy porcelain skin with hunting dogs and quiver nearby. Create a soft pastel palette of pink blue and cream with fluffy clouds and foliage. Use idealized decorative beauty in a playful mythological scene with visible soft Rococo brushwork. This must look like a real Rococo hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '누드, 신화'
  },
  'boucher-pompadour': {
    name: '퐁파두르 부인',
    nameEn: 'Madame de Pompadour',
    prompt: ', Apply Madame de Pompadour style by Boucher with an aristocratic portrait in a luxurious setting featuring an elaborate silk gown with roses surrounded by books and artistic objects. Create soft rosy flesh tones with ornate Rococo decoration in powder blue and pink palette. Capture refined French court elegance with delicate decorative beauty. This must look like a real Rococo hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '초상, 귀족'
  },
  'boucher-odalisque': {
    name: '금발의 오달리스크',
    nameEn: 'Blonde Odalisque',
    prompt: ', Apply Blonde Odalisque style by Boucher with a reclining figure from behind showing soft rosy peach skin with blue ribbon in blonde hair. Create luxurious cushions and drapery in an intimate boudoir setting. Use playful sensual atmosphere in pastel Rococo palette with decorative charm. This must look like a real Rococo hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '누드, 관능'
  }
};

// ========================================
// 13. 낭만주의/표현주의 추가 (2명, 각 3개)
// ========================================

// 프리드리히
export const friedrichMasterworks = {
  'friedrich-wanderer': {
    name: '안개 바다 위의 방랑자',
    nameEn: 'Wanderer Above the Sea of Fog',
    prompt: ', Apply Wanderer Above the Sea of Fog style by Caspar David Friedrich with a solitary figure seen from behind standing on a rocky peak gazing over a swirling sea of mist. Create a sublime Romantic landscape with contemplative isolation and dramatic mountainous vista. Use a cool blue-grey atmospheric palette capturing spiritual transcendence with man dwarfed by nature. This must look like a real Romantic hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '뒷모습, 숭고'
  },
  'friedrich-seaice': {
    name: '빙해',
    nameEn: 'The Sea of Ice',
    prompt: ', Apply The Sea of Ice style by Friedrich with jagged ice slabs crushing a shipwreck in frozen arctic desolation. Create terrifying sublime power of nature with a cold blue-white palette and sharp angular ice formations. Capture Romantic catastrophe showing a tiny human vessel destroyed by elemental force with existential terror. This must look like a real Romantic hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '빙하, 파멸'
  },
  'friedrich-abbey': {
    name: '떡갈나무 숲의 수도원',
    nameEn: 'Abbey in the Oakwood',
    prompt: ', Apply Abbey in the Oakwood style by Friedrich with a ruined Gothic abbey in winter surrounded by bare twisted oak trees and a funeral procession of monks. Create misty melancholic atmosphere evoking death and spiritual transcendence. Use a pale cold palette showing Romantic sublime decay with haunting desolate beauty. This must look like a real Romantic hand-painted masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '폐허, 죽음'
  }
};

// ========================================
// 20세기 모더니즘 (8명) - 피카소/프리다/워홀 포함
// ========================================

// 피카소 (4개 대표작) - 우는 여인 제외 고통 왜곡
export const picassoMasterworks = {
  'picasso-demoiselles': {
    name: '아비뇽의 처녀들',
    nameEn: 'Les Demoiselles d\'Avignon',
    prompt: ', Apply Les Demoiselles d\'Avignon style by Pablo Picasso (1907) with five angular fragmented figures showing faces with African mask influence using geometric planes and sharp angles. Create fractured geometric body shapes in Cubist deconstruction with revolutionary angular brushwork breaking traditional perspective. Use pink flesh tones with ochre and blue for this proto-Cubist masterpiece. This must look like a real Cubist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹, 마스크'
  },
  'picasso-guernica': {
    name: '게르니카',
    nameEn: 'Guernica',
    prompt: ', Apply Guernica style by Pablo Picasso (1937) using CRITICAL BLACK WHITE AND GREY ONLY monochrome palette. Create a dramatic war scene with anguished fragmented figures featuring a screaming horse at center, bull figure, broken sword and light bulb as sun. Show dismembered bodies and chaos with powerful anti-war imagery using Cubist distortion expressing horror. This must look like a real monochrome Cubist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '흑백, 전쟁'
  }
};

// 프리다 (4개 대표작) - 부러진 기둥/두 명의 프리다 제외 고통 금지
export const fridaMasterworks = {
  'frida-parrots': {
    name: '나와 앵무새들',
    nameEn: 'Me and My Parrots',
    prompt: ', Apply Me and My Parrots style by Frida Kahlo (1941) with colorful parrots perched on shoulders and around the figure against lush green tropical foliage background. Create a direct confident gaze with vibrant jewel-tone colors including emerald green, parrot red and tropical blue. Use traditional Mexican clothing and jewelry in detailed realistic style with symbolic elements. This must look like a real Mexican hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '앵무새, 정글'
  },
  'frida-thornnecklace': {
    name: '가시 목걸이 자화상',
    nameEn: 'Self-Portrait with Thorn Necklace and Hummingbird',
    prompt: ', Apply Self-Portrait with Thorn Necklace style by Frida Kahlo (1940) with a thorny vine necklace around the neck featuring a dead hummingbird pendant. Create a black cat on one shoulder and monkey on the other with large tropical leaves as background. Use symbolic butterflies in hair with intense direct gaze in detailed surrealist Mexican folk art style. This must look like a real Mexican hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '벌새, 고양이'
  },
  'frida-monkeys': {
    name: '원숭이와 자화상',
    nameEn: 'Self-Portrait with Monkeys',
    prompt: ', Apply Self-Portrait with Monkeys style by Frida Kahlo (1943) with monkeys embracing from behind the shoulders in warm protective intimate atmosphere. Create dense green tropical leaves filling the background with braided hair and traditional Mexican dress. Use tender loving expression in earthy warm palette with detailed realistic portraiture in symbolic jungle setting. This must look like a real Mexican hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '원숭이, 포옹'
  },
  'frida-diegoandi': {
    name: '디에고와 나',
    nameEn: 'Diego and I',
    prompt: ', Apply Diego and I style by Frida Kahlo (1949) with Diego Rivera painted on the forehead as a third eye with loose flowing dark hair framing the face. Create tears streaming from eyes with intense emotional gaze showing psychological intimacy. Use muted earth-tone background for this raw emotional self-portrait showing deep love. This must look like a real Mexican hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '이마, 눈물'
  }
};

// 워홀 (2개 대표작)
export const warholMasterworks = {
  'warhol-marilyn': {
    name: '마릴린 시리즈',
    nameEn: 'Marilyn Series',
    prompt: ', Apply Andy Warhol Marilyn Series style (1962) creating a 2x2 four-panel grid layout with the subject face repeated 4 times once in each quadrant while preserving subject identity in all panels. Each panel must have different bold neon color scheme including hot pink, cyan, yellow and orange. Use high contrast silkscreen printing effect with flat graphic colors and no gradients showing visible ink texture and slight misregistration. This is a Pop Art masterpiece using the ORIGINAL SUBJECT face, NOT a photograph, NOT 3D, NOT digital.',
    feature: '4분할, 네온'
  },
  'warhol-soup': {
    name: '캠벨 수프 캔',
    nameEn: 'Campbell\'s Soup Cans',
    prompt: ', Apply Campbell\'s Soup Cans style by Andy Warhol (1962) with grid repetition of the same image in rows and columns. Each panel should have different bold Pop color variations including red, blue, green, orange and pink. Create commercial product aesthetic with flat graphic silkscreen style and visible print texture. Use mechanical reproduction aesthetic showing everyday object as fine art. This must look like a Pop Art silkscreen, NOT a photograph, NOT 3D, NOT digital.',
    feature: '반복, 상업'
  }
};

// 마그리트 (5개 대표작)
export const magritteMasterworks = {
  'magritte-sonofman': {
    name: '사람의 아들',
    nameEn: 'The Son of Man',
    prompt: ', Apply The Son of Man style by René Magritte (1964) by placing ONE small green apple floating at nose level covering only 25-30% of face. The eyes must be clearly visible above the apple and mouth and chin clearly visible below. Dress the subject in dark formal suit with white collar and black bowler hat against overcast cloudy grey sky with low stone wall. Create hyperrealistic precise Belgian surrealist oil painting showing mysterious hidden identity. This must look like a real Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '정장, 사과'
  },
  'magritte-golconda': {
    name: '골콩드',
    nameEn: 'Golconda',
    prompt: ', Apply Golconda style by René Magritte (1953) by transforming the main subject into formal stiff rigid pose wearing dark suit with black bowler hat. Convert the background into a painted Belgian townscape with buildings and cloudy sky. Fill the entire background with dozens of small identical copies of the same formally-dressed figure floating or falling in rigid stiff upright posture like mannequins creating the raining men effect. This must look like a real Belgian surrealist oil painting, NOT a photograph, NOT 3D, NOT digital.',
    feature: '반복, 부유'
  },
  'magritte-bowlerhat': {
    name: '중절모를 쓴 남자',
    nameEn: 'Man in a Bowler Hat',
    prompt: ', Apply Man in a Bowler Hat style by René Magritte (1964) by placing one white dove bird flying in front of the face with wings spread covering most of the face. Dress the subject in dark formal suit with black bowler hat against overcast cloudy grey sky background. Create hyperrealistic precise Belgian surrealist oil painting showing mysterious concealment by innocent creature. This must look like a real Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '비둘기, 은폐'
  },
  'magritte-humancondition': {
    name: '인간의 조건',
    nameEn: 'The Human Condition',
    prompt: ', Apply The Human Condition style by René Magritte (1933) showing an easel with canvas in the foreground where the painting on canvas shows the exact same view as the scene behind it creating a seamless illusion where the canvas edge is invisible. Include window frame or curtains on sides with landscape continuing perfectly from canvas to reality. Create this philosophical painting-within-painting paradox in hyperrealistic Belgian surrealist oil painting style. This must look like a real Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '캔버스, 착시'
  },
  'magritte-empireoflight': {
    name: '빛의 제국',
    nameEn: 'The Empire of Light',
    prompt: ', Apply The Empire of Light style by René Magritte (1954) creating the critical paradox of bright blue daytime sky with white fluffy clouds above combined with dark nighttime street scene below. Show glowing yellow lamplight from street lamps with dark silhouetted trees and buildings creating the impossible coexistence of day and night in the same image. Capture mysterious twilight atmosphere in hyperrealistic Belgian surrealist oil painting style. This must look like a real Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '낮밤 공존'
  }
};

// 미로 (3개 대표작)
export const miroMasterworks = {
  'miro-catalan': {
    name: '카탈루냐 풍경',
    nameEn: 'The Catalan Landscape (The Hunter)',
    prompt: ', Apply The Catalan Landscape style by Joan Miró with playful biomorphic shapes floating on bright yellow and orange background. Create an abstract hunter figure with geometric head and stick body using primary colors red blue yellow and black with childlike spontaneity. Add whimsical floating symbols like sun, eye and heart connected by thin black calligraphic lines in joyful cosmic abstraction. This must look like a real Catalan Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '풍경, 사냥꾼'
  },
  'miro-constellation': {
    name: '별자리 시리즈',
    nameEn: 'Constellations Series',
    prompt: ', Apply Constellations style by Joan Miró with a dense network of biomorphic shapes against a muted background. Create a constellation of stars, moons, eyes and organic forms connected by thin black lines. Use primary colors red blue and yellow as accents with automatic drawing and spontaneous symbols creating cosmic poetry as a nocturnal dreamscape with celestial bodies. This must look like a real Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '별, 우주'
  },
  'miro-bluestar': {
    name: '푸른 별 앞의 여인',
    nameEn: 'Woman in Front of the Sun',
    prompt: ', Apply Woman Before the Sun style by Joan Miró with a simplified biomorphic figure with exaggerated curves. Create a large radiating sun or star shape in the background using bold primary colors red blue yellow and black on light ground. Use spontaneous gestural brushwork with primal feminine energy and childlike cosmic joy with thick black outlines defining organic shapes. This must look like a real Surrealist hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '여인, 태양'
  }
};

// 샤갈 (3개 대표작)
export const chagallMasterworks = {
  'chagall-birthday': {
    name: '생일',
    nameEn: 'Birthday',
    prompt: ', Apply Birthday style by Marc Chagall (1915) with floating lovers defying gravity where a man bends impossibly backward to kiss a woman. Create soft muted pastel colors including dusty rose, pale blue and sage green with a tilted room interior and flower bouquet. Use dreamlike weightlessness with poetic romantic atmosphere and nostalgic warmth with visible soft feathery brushstrokes. This must look like a real hand-painted Chagall artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '부유, 키스'
  },
  'chagall-overtown': {
    name: '마을 위에서',
    nameEn: 'Over the Town',
    prompt: ', Apply Over the Town style by Marc Chagall with a couple floating high above a village as embracing lovers soar over tilted colorful houses. Create muted dreamy pastels including lavender, pale blue, rose and green with nostalgic rooftops below. Capture poetic gravity-defying romance as a folklore dreamscape with soft atmospheric brushwork. This must look like a real hand-painted Chagall artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '마을, 비행'
  },
  'chagall-iandvillage': {
    name: '나와 마을',
    nameEn: 'I and the Village',
    prompt: ', Apply I and the Village style by Marc Chagall (1911) with overlapping dreamlike images of a green-faced man and cow gazing at each other. Create circular composition with transparent overlays and tiny village scenes within larger forms. Use jewel-tone colors including emerald green, ruby red and deep blue in Cubist-influenced fragmented space with mystical symbolism and nostalgic village memories. This must look like a real hand-painted Chagall artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '동물, 얼굴'
  }
};

// 리히텐슈타인 (3개 대표작)
export const lichtensteinMasterworks = {
  'lichtenstein-drowninggirl': {
    name: '익사하는 소녀',
    nameEn: 'Drowning Girl',
    prompt: ', Apply Drowning Girl style by Roy Lichtenstein (1963) with a dramatic close-up of a woman face with a tear. Create visible Ben-Day dots pattern throughout the entire image with thick bold black outlines around all forms. Use primary colors only including red yellow blue and white with a thought bubble in comic book emotional melodrama style. This halftone printing effect must look like a real Pop Art masterpiece, NOT a photograph, NOT 3D, NOT digital.',
    feature: '눈물, 클로즈업'
  },
  'lichtenstein-whaam': {
    name: '휩!',
    nameEn: 'Whaam!',
    prompt: ', Apply Whaam! style by Roy Lichtenstein (1963) with a two-panel comic book composition showing a fighter jet shooting a missile on the left panel and a dramatic explosion on the right panel. Create visible Ben-Day dots throughout with thick black outlines using primary colors red yellow and blue. Capture comic book action onomatopoeia in war comic aesthetic as a Pop Art diptych. This must look like a real Pop Art artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '전투기, 폭발'
  },
  'lichtenstein-hopeless': {
    name: '절망적',
    nameEn: 'Hopeless',
    prompt: ', Apply Hopeless style by Roy Lichtenstein with a blonde woman crying with hands near face. Create visible Ben-Day dots pattern forming skin tone and shadows with thick bold black outlines defining hair and features. Use primary colors with yellow hair, blue eyes and red lips in dramatic comic book emotion with speech bubble in romance comic aesthetic. This must look like a real Pop Art artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '금발, 울음'
  }
};

// 키스 해링 (3개 대표작)
export const haringMasterworks = {
  'haring-radiantbaby': {
    name: '빛나는 아기',
    nameEn: 'Radiant Baby',
    prompt: ', Apply Radiant Baby style by Keith Haring with a crawling baby figure in profile defined by bold thick black outline as a simple silhouette. Create radiant lines emanating from the body showing energy and light with flat bright primary color fill in red or yellow. Use minimal iconic street art style with dynamic movement implied in subway graffiti aesthetic. This must look like a real street art artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '아기, 빛'
  },
  'haring-barkingdog': {
    name: '짖는 개',
    nameEn: 'Barking Dog',
    prompt: ', Apply Barking Dog style by Keith Haring with a simplified dog silhouette with open barking mouth and bold thick black outline. Create radiant lines emanating from the dog showing sound and energy with flat bright primary color background in red yellow or blue. Use aggressive angular pose as iconic street art symbol with dynamic movement lines in subway graffiti energy. This must look like a real street art artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '개, 에너지'
  },
  'haring-dancing': {
    name: '춤추는 사람들',
    nameEn: 'Untitled (Dancing Figures)',
    prompt: ', Apply Dancing Figures style by Keith Haring with multiple simplified human figures dancing in dynamic poses using bold continuous black outlines connecting the figures. Create radiant energy lines emanating from bodies with flat bright primary colors filling shapes in red yellow blue and green. Capture rhythmic interlocking movement with joyful kinetic energy in subway graffiti street art aesthetic. This must look like a real street art artwork, NOT a photograph, NOT 3D, NOT digital.',
    feature: '그룹, 춤'
  }
};

// ========================================
// 통합 조회 함수
// ========================================

// 모든 사조별 대표작 통합
export const allMovementMasterworks = {
  // 스타일
  ...romanMosaicMasterworks,
  ...gothicMasterworks,
  ...byzantineMasterworks,
  ...islamicMiniatureMasterworks,
  // 르네상스
  ...botticelliMasterworks,
  ...leonardoMasterworks,
  ...titianMasterworks,
  ...michelangeloMasterworks,
  ...raphaelMasterworks,
  // 바로크
  ...caravaggioMasterworks,
  ...rubensMasterworks,
  ...rembrandtMasterworks,
  ...velazquezMasterworks,
  // 로코코
  ...watteauMasterworks,
  ...boucherMasterworks,
  // 신고전/낭만/사실
  ...davidMasterworks,
  ...ingresMasterworks,
  ...turnerMasterworks,
  ...friedrichMasterworks,
  ...goyaMasterworks,
  ...delacroixMasterworks,
  ...milletMasterworks,
  ...manetMasterworks,
  // 인상주의
  ...renoirMasterworks,
  ...degasMasterworks,
  ...monetMasterworks,
  ...caillebotteMasterworks,
  // 후기인상주의
  ...vangoghMasterworks,
  ...gauguinMasterworks,
  ...cezanneMasterworks,
  ...signacMasterworks,
  // 야수파
  ...matisseMasterworks,
  ...derainMasterworks,
  ...vlaminckMasterworks,
  // 클림트 (거장)
  ...klimtMasterworks,
  // 표현주의
  ...munchMasterworks,
  ...kokoschkaMasterworks,
  ...kirchnerMasterworks,
  // 모더니즘 피카소/프리다 워홀 포함
  ...picassoMasterworks,
  ...fridaMasterworks,
  ...warholMasterworks,
  ...magritteMasterworks,
  ...miroMasterworks,
  ...chagallMasterworks,
  ...lichtensteinMasterworks,
  ...haringMasterworks
};

/**
 * 사조별 대표작 프롬프트 가져오기
 * @param {string} workKey - 대표작 키 (예: 'vangogh-starrynight')
 * @returns {object|null} 대표작 프롬프트 객체
 */
export function getMovementMasterwork(workKey) {
  const normalized = workKey.toLowerCase().trim().replace(/\s+/g, '-');
  return allMovementMasterworks[normalized] || null;
}

/**
 * 화가별 대표작 목록 가져오기 (AI 가이드용)
 * @param {string} artistKey - 화가 키 (예: 'vangogh', 'monet')
 * @returns {array} 대표작 목록
 */
export function getArtistMasterworkList(artistKey) {
  const normalized = artistKey.toLowerCase().trim();
  
  const artistMasterworks = {
    // 스타일
    'roman-mosaic': ['mosaic-alexander', 'mosaic-cave-canem', 'mosaic-dionysus', 'mosaic-oceanus', 'mosaic-seasons', 'mosaic-nile'],
    'gothic': ['gothic-blue-virgin', 'gothic-rose-window', 'gothic-sainte-chapelle'],
    'byzantine': ['byzantine-justinian', 'byzantine-theodora', 'byzantine-deesis', 'byzantine-pantocrator'],
    'islamic-miniature': ['islamic-youth', 'islamic-miraj', 'islamic-simurgh', 'islamic-lovers', 'islamic-rustam'],
    // 르네상스
    'botticelli': ['botticelli-venus', 'botticelli-primavera', 'botticelli-venus-mars'],
    'leonardo': ['leonardo-monalisa', 'leonardo-lastsupper', 'leonardo-virginrocks'],
    'titian': ['titian-venusurbino', 'titian-bacchus', 'titian-assumption'],
    'michelangelo': ['michelangelo-adam', 'michelangelo-lastjudgment', 'michelangelo-pieta'],
    'raphael': ['raphael-athens', 'raphael-sistinamadonna', 'raphael-galatea'],
    // 바로크
    'caravaggio': ['caravaggio-david', 'caravaggio-bacchus', 'caravaggio-matthew'],
    'rubens': ['rubens-threegraces', 'rubens-descent', 'rubens-leucippus'],
    'rembrandt': ['rembrandt-nightwatch', 'rembrandt-selfportrait', 'rembrandt-prodigal'],
    'velazquez': ['velazquez-meninas', 'velazquez-pope', 'velazquez-breda'],
    // 로코코
    'watteau': ['watteau-cythera', 'watteau-pierrot', 'watteau-fete'],
    'boucher': ['boucher-diana', 'boucher-pompadour', 'boucher-odalisque'],
    // 신고전/낭만/사실
    'david': ['david-marat', 'david-coronation', 'david-horatii'],
    'ingres': ['ingres-odalisque', 'ingres-bather', 'ingres-broglie'],
    'turner': ['turner-rain-steam', 'turner-temeraire', 'turner-slave-ship'],
    'friedrich': ['friedrich-wanderer', 'friedrich-seaice', 'friedrich-abbey'],
    'goya': ['goya-maja', 'goya-third-may', 'goya-charles-iv'],
    'delacroix': ['delacroix-liberty', 'delacroix-sardanapalus', 'delacroix-algiers'],
    'millet': ['millet-gleaners', 'millet-angelus', 'millet-sower'],
    'manet': ['manet-olympia', 'manet-folies', 'manet-dejeuner'],
    // 인상주의
    'renoir': ['renoir-boating', 'renoir-moulin', 'renoir-piano'],
    'degas': ['degas-dance-class', 'degas-star', 'degas-absinthe'],
    'monet': ['monet-waterlilies', 'monet-impression', 'monet-parasol'],
    'caillebotte': ['caillebotte-paris', 'caillebotte-floor', 'caillebotte-window'],
    // 후기인상주의
    'vangogh': ['vangogh-starrynight', 'vangogh-selfportrait', 'vangogh-sunflowers', 'vangogh-cafe'],
    'gauguin': ['gauguin-tahitian', 'gauguin-where', 'gauguin-christ'],
    'cezanne': ['cezanne-apples', 'cezanne-montagne', 'cezanne-cards'],
    'signac': ['signac-antibes', 'signac-avignon', 'signac-capo'],
    // 야수파
    'matisse': ['matisse-greenstripe', 'matisse-purplecoat', 'matisse-dance', 'matisse-red-room'],
    'derain': ['derain-collioure', 'derain-bridge', 'derain-matisse'],
    'vlaminck': ['vlaminck-chatou', 'vlaminck-red-trees', 'vlaminck-bougival'],
    // 클림트 (거장)
    'klimt': ['klimt-kiss', 'klimt-judith', 'klimt-treeoflife'],
    // 표현주의
    'munch': ['munch-scream', 'munch-madonna', 'munch-jealousy', 'munch-anxiety'],
    'kokoschka': ['kokoschka-bride', 'kokoschka-degenerate', 'kokoschka-double'],
    'kirchner': ['kirchner-berlin', 'kirchner-soldier', 'kirchner-oldwomen'],
    // 모더니즘 피카소/프리다 워홀 포함
    'picasso': ['picasso-demoiselles', 'picasso-guernica'],
    'frida': ['frida-parrots', 'frida-thornnecklace', 'frida-monkeys', 'frida-diegoandi'],
    'warhol': ['warhol-marilyn', 'warhol-soup'],
    'magritte': ['magritte-sonofman', 'magritte-golconda', 'magritte-bowlerhat', 'magritte-humancondition', 'magritte-empireoflight'],
    'miro': ['miro-catalan', 'miro-constellation', 'miro-bluestar'],
    'chagall': ['chagall-birthday', 'chagall-overtown', 'chagall-iandvillage'],
    'lichtenstein': ['lichtenstein-drowninggirl', 'lichtenstein-whaam', 'lichtenstein-hopeless'],
    'haring': ['haring-radiantbaby', 'haring-barkingdog', 'haring-dancing']
  };
  
  return artistMasterworks[normalized] || [];
}

/**
 * AI 가이드용 대표작 정보 문자열 생성
 * @param {string} artistKey - 화가 키
 * @returns {string} 대표작 가이드 문자열
 */
export function getMasterworkGuideForAI(artistKey) {
  const masterworkKeys = getArtistMasterworkList(artistKey);
  if (masterworkKeys.length === 0) return '';
  
  let guide = `\n🎨 MASTERWORK OPTIONS for ${artistKey.toUpperCase()}:\n`;
  
  masterworkKeys.forEach((key, index) => {
    const work = allMovementMasterworks[key];
    if (work) {
      guide += `   ${index + 1}. ${work.name} (${work.nameEn}) - ${work.feature}\n`;
    }
  });
  
  guide += `\n   Select the masterwork that BEST matches the photo's mood/composition!\n`;
  guide += `   Return your choice as, MASTERWORK, ${masterworkKeys[0].split('-')[0]}-[workname]\n`;
  
  return guide;
}

/**
 * 사조별 화가 목록 정의
 */
const MOVEMENT_ARTISTS = {
  // 고대 & 중세 (스타일 기반)
  'ancient': ['roman-mosaic'],  // Classical Sculpture는 대표작 없음
  'medieval': ['gothic', 'byzantine', 'islamic-miniature'],  // 전체 대표작 완료
  // 근대 이후 (화가 기반)
  'impressionism': ['renoir', 'degas', 'monet', 'caillebotte'],
  'postImpressionism': ['vangogh', 'gauguin', 'cezanne', 'signac'],
  'fauvism': ['matisse', 'derain', 'vlaminck'],
  'expressionism': ['munch', 'kokoschka', 'kirchner'],
  'modernism': ['picasso', 'frida', 'warhol', 'magritte', 'miro', 'chagall', 'lichtenstein', 'haring'],
  'renaissance': ['botticelli', 'leonardo', 'titian', 'michelangelo', 'raphael'],
  'baroque': ['caravaggio', 'rubens', 'rembrandt', 'velazquez'],
  'rococo': ['watteau', 'boucher'],
  'neoclassicism_vs_romanticism_vs_realism': ['david', 'ingres', 'turner', 'friedrich', 'goya', 'delacroix', 'millet', 'manet']
};

/**
 * 사조별 전체 대표작 가이드 생성 (AI 프롬프트용)
 * @param {string} movementKey - 사조 키 (예: 'impressionism', 'expressionism')
 * @returns {string} 사조 전체 대표작 가이드
 */
export function getMovementMasterworkGuide(movementKey) {
  const artists = MOVEMENT_ARTISTS[movementKey];
  if (!artists || artists.length === 0) return '';
  
  let guide = `\n📚 MASTERWORKS BY ARTIST (Select artist AND their best masterwork for this photo):\n`;
  
  artists.forEach(artistKey => {
    const masterworkKeys = getArtistMasterworkList(artistKey);
    if (masterworkKeys.length > 0) {
      guide += `\n🎨 ${artistKey.toUpperCase()}:\n`;
      masterworkKeys.forEach((key, index) => {
        const work = allMovementMasterworks[key];
        if (work) {
          guide += `   ${index + 1}. "${work.nameEn}" (${work.name}) - ${work.feature}\n`;
        }
      });
    }
  });
  
  guide += `\n⚠️ You MUST select both an ARTIST and their MASTERWORK that best matches this photo!\n`;
  
  return guide;
}

// 콘솔 로그용: 전체 대표작 수 확인
console.log('📚 Movement Masterworks loaded:');
console.log(`   - Roman Mosaic, ${Object.keys(romanMosaicMasterworks).length} works`);
console.log(`   - Gothic, ${Object.keys(gothicMasterworks).length} works`);
console.log(`   ── 르네상스 ──`);
console.log(`   - Botticelli, ${Object.keys(botticelliMasterworks).length} works`);
console.log(`   - Leonardo, ${Object.keys(leonardoMasterworks).length} works 🆕`);
console.log(`   - Titian, ${Object.keys(titianMasterworks).length} works 🆕`);
console.log(`   - Michelangelo, ${Object.keys(michelangeloMasterworks).length} works 🆕`);
console.log(`   - Raphael, ${Object.keys(raphaelMasterworks).length} works 🆕`);
console.log(`   ── 바로크 ──`);
console.log(`   - Caravaggio, ${Object.keys(caravaggioMasterworks).length} works`);
console.log(`   - Rubens, ${Object.keys(rubensMasterworks).length} works 🆕`);
console.log(`   - Rembrandt, ${Object.keys(rembrandtMasterworks).length} works 🆕`);
console.log(`   - Velázquez, ${Object.keys(velazquezMasterworks).length} works 🆕`);
console.log(`   ── 로코코 ──`);
console.log(`   - Watteau, ${Object.keys(watteauMasterworks).length} works 🆕`);
console.log(`   - Boucher, ${Object.keys(boucherMasterworks).length} works 🆕`);
console.log`   ── 신고전/낭만 사실 ──`;
console.log(`   - David, ${Object.keys(davidMasterworks).length} works`);
console.log(`   - Ingres, ${Object.keys(ingresMasterworks).length} works`);
console.log(`   - Turner, ${Object.keys(turnerMasterworks).length} works`);
console.log(`   - Friedrich, ${Object.keys(friedrichMasterworks).length} works 🆕`);
console.log(`   - Goya, ${Object.keys(goyaMasterworks).length} works`);
console.log(`   - Delacroix, ${Object.keys(delacroixMasterworks).length} works`);
console.log(`   - Millet, ${Object.keys(milletMasterworks).length} works`);
console.log(`   - Manet, ${Object.keys(manetMasterworks).length} works`);
console.log(`   ── 인상주의 ──`);
console.log(`   - Renoir, ${Object.keys(renoirMasterworks).length} works`);
console.log(`   - Degas, ${Object.keys(degasMasterworks).length} works`);
console.log(`   - Monet, ${Object.keys(monetMasterworks).length} works`);
console.log(`   - Caillebotte, ${Object.keys(caillebotteMasterworks).length} works`);
console.log(`   ── 후기인상주의 ──`);
console.log(`   - Van Gogh, ${Object.keys(vangoghMasterworks).length} works ⭐`);
console.log(`   - Gauguin, ${Object.keys(gauguinMasterworks).length} works`);
console.log(`   - Cézanne, ${Object.keys(cezanneMasterworks).length} works`);
console.log(`   - Signac, ${Object.keys(signacMasterworks).length} works`);
console.log(`   ── 야수파 ──`);
console.log(`   - Matisse, ${Object.keys(matisseMasterworks).length} works ⭐`);
console.log(`   - Derain, ${Object.keys(derainMasterworks).length} works`);
console.log(`   - Vlaminck, ${Object.keys(vlaminckMasterworks).length} works`);
console.log(`   ── 표현주의 ──`);
console.log(`   - Munch, ${Object.keys(munchMasterworks).length} works ⭐`);
console.log(`   - Kokoschka, ${Object.keys(kokoschkaMasterworks).length} works`);
console.log(`   - Kirchner, ${Object.keys(kirchnerMasterworks).length} works`);
console.log(`   ── 모더니즘 (거장 포함) ──`);
console.log(`   - Picasso, ${Object.keys(picassoMasterworks).length} works ⭐🆕`);
console.log(`   - Frida, ${Object.keys(fridaMasterworks).length} works ⭐🆕`);
console.log(`   - Warhol, ${Object.keys(warholMasterworks).length} works ⭐🆕`);
console.log(`   ════════════════════════════════`);
console.log(`   📊 TOTAL, ${Object.keys(allMovementMasterworks).length} masterworks (40 artists)`);

export default {
  allMovementMasterworks,
  getMovementMasterwork,
  getArtistMasterworkList,
  getMasterworkGuideForAI,
  getMovementMasterworkGuide
};
