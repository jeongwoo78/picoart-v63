// ========================================
// PicoArt v64 - 사조별 화가 대표작 매칭 시스템
// 매칭 프로젝트: AI가 대표작 기반 프롬프트 적용
// ========================================

// ========================================
// 1. 로마 모자이크 (3개 대표작)
// ========================================
export const romanMosaicMasterworks = {
  'mosaic-alexander': {
    name: '알렉산더 모자이크',
    nameEn: 'Alexander Mosaic',
    prompt: ', Alexander Mosaic style from House of the Faun Pompeii: DYNAMIC BATTLE SCENE with dramatic diagonal composition, LARGE VISIBLE TESSERAE TILES 20-30mm each with THICK BLACK GROUT LINES, earth tone palette (terracotta/ochre/umber/ivory/black), intense warrior expressions, horses in motion, dramatic action frozen in stone tiles',
    feature: '전투, 역동적'
  },
  'mosaic-cave-canem': {
    name: '카베 카넴',
    nameEn: 'Cave Canem',
    prompt: ', Cave Canem mosaic style from Pompeii: BOLD BLACK DOG silhouette on light background, LARGE VISIBLE TESSERAE TILES 20-30mm with THICK BLACK GROUT LINES, strong graphic contrast, simple powerful composition, terracotta/black/white palette, Roman threshold warning style',
    feature: '동물, 경고'
  },
  'mosaic-dionysus': {
    name: '디오니소스 모자이크',
    nameEn: 'Dionysus Mosaic',
    prompt: ', Dionysus mosaic style: mythological figure with GRAPE VINES and WINE imagery, LARGE VISIBLE TESSERAE TILES 20-30mm with THICK BLACK GROUT LINES, rich purple/green/gold accents on terracotta base, celebratory divine atmosphere, Roman villa floor style',
    feature: '신화, 인물'
  }
};

// ========================================
// 2. 고딕 스테인드글라스 (3개 대표작)
// ========================================
export const gothicMasterworks = {
  'gothic-blue-virgin': {
    name: '샤르트르 푸른 성모',
    nameEn: 'Blue Virgin of Chartres',
    prompt: ', Blue Virgin of Chartres cathedral style: DOMINANT CHARTRES COBALT BLUE throughout, Madonna and child central composition, THICK BLACK LEAD LINES (cames) dividing colored glass segments, JEWEL-TONE TRANSLUCENT COLORS, flat medieval style, divine radiant light, ruby red accents',
    feature: '성모자, 코발트'
  },
  'gothic-rose-window': {
    name: '노트르담 장미창',
    nameEn: 'Notre-Dame Rose Window',
    prompt: ', Notre-Dame Rose Window style: RADIAL CIRCULAR COMPOSITION with figure at center, THICK BLACK LEAD LINES creating petal-like segments, JEWEL-TONE TRANSLUCENT COLORS (ruby/sapphire/emerald/gold), kaleidoscopic symmetry, divine geometric harmony, Gothic cathedral grandeur',
    feature: '방사형, 화려'
  },
  'gothic-sainte-chapelle': {
    name: '생트샤펠',
    nameEn: 'Sainte-Chapelle',
    prompt: ', Sainte-Chapelle stained glass style: TALL VERTICAL COMPOSITION, DOMINANT RUBY RED and deep blue, THICK BLACK LEAD LINES dividing biblical narrative scenes, multiple figures in vertical registers, JEWEL-TONE TRANSLUCENT luminosity, soaring Gothic splendor',
    feature: '성경, 붉은색'
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
    prompt: ', Birth of Venus by Sandro Botticelli: GODDESS EMERGING FROM SHELL on sea, EXTREMELY LONG FLOWING GOLDEN HAIR blown by wind covering body modestly, pale porcelain skin with rose tints, elegant S-curve contrapposto pose, DIAPHANOUS SHEER FABRIC billowing, shell and sea foam, mythological ethereal beauty, tempera egg paint texture with visible brushwork',
    feature: '여성 전신, 흐르는 머리'
  },
  'botticelli-primavera': {
    name: '프리마베라',
    nameEn: 'Primavera',
    prompt: ', Primavera by Sandro Botticelli: GRACEFUL DANCING FIGURES in orange grove, FLOWING DIAPHANOUS GOWNS with delicate floral patterns, THREE GRACES dancing in circle, flowers scattered throughout meadow, pale ethereal skin, sweet melancholic expressions, Early Renaissance Florentine grace, tempera texture',
    feature: '여성 그룹, 우아'
  },
  'botticelli-venus-mars': {
    name: '비너스와 마르스',
    nameEn: 'Venus and Mars',
    prompt: ', Venus and Mars by Sandro Botticelli: RECLINING COUPLE composition, Venus alert and clothed in white, Mars sleeping in armor, playful satyrs with weapons, intimate romantic scene, elongated elegant figures, pale luminous skin, flowing drapery, mythological love scene, tempera brushwork visible',
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
    prompt: ', David with the Head of Goliath by Caravaggio: SINGLE FIGURE emerging from pure BLACK DARKNESS, EXTREME TENEBRISM with single dramatic spotlight from upper left, young David holding severed head, intense psychological moment, deep shadows engulfing 70% of scene, rich oil paint impasto texture',
    feature: '단독, 극적 명암'
  },
  'caravaggio-bacchus': {
    name: '바쿠스',
    nameEn: 'Bacchus',
    prompt: ', Bacchus by Caravaggio: YOUNG FIGURE with grape vine crown, direct frontal gaze at viewer, EXTREME TENEBRISM with figure emerging from darkness, wine goblet in hand, sensual classical youth, rich fabric draped loosely, deep black background, dramatic single light source, visible oil impasto',
    feature: '단독, 정면 응시'
  },
  'caravaggio-matthew': {
    name: '성 마태의 소명',
    nameEn: 'Calling of Saint Matthew',
    prompt: ', Calling of Saint Matthew by Caravaggio: DRAMATIC BEAM OF LIGHT cutting through darkness pointing at figure, EXTREME TENEBRISM, figures emerging from deep black shadows, theatrical spotlight effect, Baroque diagonal composition, tavern scene with contemporary dress, visible thick oil brushwork',
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
    prompt: ', Death of Marat by Jacques-Louis David: SINGLE FIGURE in bathtub against plain dark background, Neoclassical clarity with smooth precise brushwork, dramatic martyrdom pose, stark simplicity, cool restrained palette, clear crisp outlines, heroic idealized form even in death',
    feature: '단독 드라마'
  },
  'david-coronation': {
    name: '나폴레옹 대관식',
    nameEn: 'Coronation of Napoleon',
    prompt: ', Coronation of Napoleon by Jacques-Louis David: GRAND CEREMONIAL GROUP scene, Neoclassical monumental composition, rich imperial reds and golds, elaborate court costumes, cathedral setting, formal balanced arrangement, precise detailed brushwork',
    feature: '그룹 격식'
  },
  'david-horatii': {
    name: '호라티우스 형제의 맹세',
    nameEn: 'Oath of the Horatii',
    prompt: ', Oath of the Horatii by Jacques-Louis David: THREE BROTHERS with raised arms toward swords, Neoclassical Roman architecture with arches, stark geometric composition, dramatic patriotic gesture, clear outlines, muted earth tones, heroic masculine determination',
    feature: '그룹 맹세'
  }
};

// 앵그르 - 정적/격식
export const ingresMasterworks = {
  'ingres-odalisque': {
    name: '그랑드 오달리스크',
    nameEn: 'Grande Odalisque',
    prompt: ', Grande Odalisque by Ingres: RECLINING FEMALE NUDE from behind, impossibly elongated spine and arms, porcelain-smooth luminous skin, exotic harem setting with peacock fan and silk, cool blue drapery, sinuous flowing contours, Neoclassical precision',
    feature: '여성 누드'
  },
  'ingres-bather': {
    name: '발팽송의 목욕하는 여인',
    nameEn: 'Valpinçon Bather',
    prompt: ', Valpinçon Bather by Ingres: SEATED FEMALE from behind, turban-wrapped head, smooth ivory skin with perfect modeling, simple composition against plain background, elegant curved spine, cool palette, Neoclassical purity of form',
    feature: '여성 뒷모습'
  },
  'ingres-broglie': {
    name: '드 브로이 공주',
    nameEn: 'Princesse de Broglie',
    prompt: ', Princesse de Broglie by Ingres: ARISTOCRATIC FEMALE PORTRAIT in luxurious blue satin gown, porcelain-perfect skin, elaborate jewelry and lace, formal three-quarter pose, rich fabric textures precisely rendered, Neoclassical refinement and elegance',
    feature: '격식 초상'
  }
};

// 터너 - 풍경 (75%)
export const turnerMasterworks = {
  'turner-rain-steam': {
    name: '비, 증기, 속도',
    nameEn: 'Rain, Steam and Speed',
    prompt: ', Rain Steam and Speed by J.M.W. Turner: DISSOLVING FORMS in atmospheric mist, train emerging from golden haze, Romantic sublime atmosphere, swirling mist and rain, luminous golden yellows dominating, impressionistic loose brushwork, speed and modernity dissolving into nature',
    feature: '풍경 속도'
  },
  'turner-temeraire': {
    name: '전함 테메레르',
    nameEn: 'Fighting Temeraire',
    prompt: ', Fighting Temeraire by Turner: GHOST SHIP being towed at sunset, luminous orange and gold sky reflected on water, melancholic twilight atmosphere, Romantic sublime, ship dissolving into ethereal mist, loose atmospheric brushwork',
    feature: '풍경 석양'
  },
  'turner-slave-ship': {
    name: '노예선',
    nameEn: 'Slave Ship',
    prompt: ', Slave Ship by Turner: TURBULENT DRAMATIC SEASCAPE, blood-red sunset sky, churning waves, Romantic sublime terror, swirling atmospheric chaos, intense emotional color, loose expressive impasto brushwork, apocalyptic atmosphere',
    feature: '드라마틱 풍경'
  }
};

// 고야 - 드라마/감정
export const goyaMasterworks = {
  'goya-maja': {
    name: '옷 벗은 마하',
    nameEn: 'Nude Maja',
    prompt: ', Nude Maja by Francisco Goya: RECLINING FEMALE on cushions, direct confrontational gaze at viewer, luminous flesh tones against dark velvet, Romantic sensuality, bold composition, confident brushwork with visible texture',
    feature: '여성 도발'
  },
  'goya-third-may': {
    name: '1808년 5월 3일',
    nameEn: 'Third of May 1808',
    prompt: ', Third of May 1808 by Goya: DRAMATIC EXECUTION SCENE at night, central figure with arms raised in white shirt, lantern casting harsh light, firing squad in dark uniforms, Romantic political drama, intense emotion, dark palette with stark white focal point',
    feature: '드라마 역사'
  },
  'goya-charles-iv': {
    name: '카를로스 4세 가족',
    nameEn: 'Charles IV Family',
    prompt: ', Charles IV Family by Goya: FORMAL ROYAL GROUP PORTRAIT, elaborate court costumes with medals and sashes, unflattering honest realism despite grandeur, rich fabrics and jewels, subtle psychological insight, Romantic-era court painting',
    feature: '그룹 격식'
  }
};

// 들라크루아 - 역동/감정
export const delacroixMasterworks = {
  'delacroix-liberty': {
    name: '민중을 이끄는 자유의 여신',
    nameEn: 'Liberty Leading the People',
    prompt: ', Liberty Leading the People by Delacroix: ALLEGORICAL FEMALE with French tricolor flag, dynamic diagonal composition, revolutionary crowd surging forward, Romantic passionate energy, rich saturated colors, dramatic smoke and chaos, visible energetic brushwork',
    feature: '역동 그룹'
  },
  'delacroix-sardanapalus': {
    name: '사르다나팔루스의 죽음',
    nameEn: 'Death of Sardanapalus',
    prompt: ', Death of Sardanapalus by Delacroix: DRAMATIC CHAOTIC SCENE on red bed, swirling figures and horses, Romantic excess and destruction, rich jewel colors, dynamic diagonal composition, sensual bodies in turmoil, passionate brushwork',
    feature: '드라마 혼돈'
  },
  'delacroix-algiers': {
    name: '알제의 여인들',
    nameEn: 'Women of Algiers',
    prompt: ', Women of Algiers by Delacroix: EXOTIC HAREM INTERIOR scene, reclining women in colorful Oriental dress, rich patterns and textiles, warm intimate lighting, Romantic Orientalism, jewel-tone colors, sensuous atmosphere',
    feature: '그룹 이국'
  }
};

// 밀레 - 시골/전원 (80%)
export const milletMasterworks = {
  'millet-gleaners': {
    name: '이삭 줍는 사람들',
    nameEn: 'The Gleaners',
    prompt: ', The Gleaners by Jean-François Millet: THREE PEASANT WOMEN bent over gleaning wheat, humble dignified labor, warm golden harvest field, earth-tone palette (ochre/umber/sienna), monumental peasant figures, Realist rural nobility, soft natural light',
    feature: '노동/그룹'
  },
  'millet-angelus': {
    name: '만종',
    nameEn: 'The Angelus',
    prompt: ', The Angelus by Millet: PEASANT COUPLE standing in prayer at dusk, heads bowed in devotion, potato field setting, warm sunset glow, earth-tone Realist palette, quiet spiritual dignity, humble rural piety',
    feature: '커플/전원'
  },
  'millet-sower': {
    name: '씨 뿌리는 사람',
    nameEn: 'The Sower',
    prompt: ', The Sower by Millet: SINGLE PEASANT striding across hillside broadcasting seed, dynamic diagonal pose, monumental heroic worker, dramatic twilight silhouette, earth-tone Realist palette, dignified rural labor',
    feature: '단독/노동'
  }
};

// 마네 - 도시/현대 (70%)
export const manetMasterworks = {
  'manet-olympia': {
    name: '올랭피아',
    nameEn: 'Olympia',
    prompt: ', Olympia by Édouard Manet: RECLINING FEMALE NUDE on white sheets, direct confrontational gaze, stark contrast of pale skin against dark background, black maid with flowers, bold flat areas, modern Paris realism, visible confident brushwork',
    feature: '여성 도발'
  },
  'manet-folies': {
    name: '폴리베르제르의 바',
    nameEn: 'Bar at the Folies-Bergère',
    prompt: ', Bar at the Folies-Bergère by Manet: BARMAID facing viewer behind marble counter, mirror reflection showing crowded café, bottles and oranges as still life, modern urban Paris nightlife, bold blacks and bright accents, visible brushwork',
    feature: '여성 도시'
  },
  'manet-dejeuner': {
    name: '풀밭 위의 점심',
    nameEn: 'Luncheon on the Grass',
    prompt: ', Luncheon on the Grass by Manet: NUDE FEMALE with clothed men in forest picnic, direct gaze at viewer, bold tonal contrasts, modern scandal in classical setting, visible confident brushstrokes, revolutionary composition',
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
    prompt: ', Luncheon of the Boating Party by Renoir: JOYFUL GROUP on restaurant terrace, dappled sunlight through awning, warm peachy flesh tones with rosy highlights, festive social gathering, SOFT FEATHERY IMPRESSIONIST BRUSHSTROKES, sparkling light on glasses and skin',
    feature: '그룹 햇빛'
  },
  'renoir-moulin': {
    name: '물랭 드 라 갈레트',
    nameEn: 'Bal du moulin de la Galette',
    prompt: ', Bal du moulin de la Galette by Renoir: OUTDOOR DANCE PARTY with dappled sunlight through trees, couples dancing and socializing, Impressionist celebration of modern leisure, soft warm flesh tones, visible quick brushstrokes capturing movement and light',
    feature: '축제'
  },
  'renoir-piano': {
    name: '피아노 치는 소녀들',
    nameEn: 'Girls at the Piano',
    prompt: ', Girls at the Piano by Renoir: TWO YOUNG GIRLS at piano in bourgeois interior, warm intimate domestic scene, soft peachy skin with gentle modeling, Impressionist warmth, feathery brushwork, tender sibling moment',
    feature: '아동'
  }
};

// 드가 - 움직임/무용 (30%)
export const degasMasterworks = {
  'degas-dance-class': {
    name: '무용 수업',
    nameEn: 'The Dance Class',
    prompt: ', The Dance Class by Edgar Degas: BALLET DANCERS in rehearsal studio, unusual cropped asymmetric composition, SOFT PASTEL CHALKY TEXTURE, pale tutus against wooden floor, figures cut off by frame edge, movement frozen in time, visible pastel strokes',
    feature: '무용'
  },
  'degas-star': {
    name: '무대 위의 무희',
    nameEn: 'The Star (L\'Étoile)',
    prompt: ', The Star by Degas: PRIMA BALLERINA on stage in spotlight, dramatic diagonal composition from above, tutu catching stage light, PASTEL CHALKY TEXTURE, theatrical atmosphere, cropped unusual viewpoint, other dancers in shadows',
    feature: '무용 스포트라이트'
  },
  'degas-absinthe': {
    name: '압생트',
    nameEn: 'L\'Absinthe',
    prompt: ', L\'Absinthe by Degas: MELANCHOLIC CAFÉ SCENE, woman with absinthe glass, off-center asymmetric composition, pale muted colors, psychological distance, modern urban alienation, unusual cropped angle, visible brushwork',
    feature: '각도/구도'
  }
};

// 모네 - 풍경/물 (25%)
export const monetMasterworks = {
  'monet-waterlilies': {
    name: '수련',
    nameEn: 'Water Lilies',
    prompt: ', Water Lilies by Claude Monet: POND SURFACE filling entire frame, floating lily pads and flowers, shimmering water reflections, NO HORIZON LINE, soft hazy Impressionist atmosphere, SHORT VISIBLE DABBED BRUSHSTROKES, blue-green-pink color harmony',
    feature: '물/풍경'
  },
  'monet-impression': {
    name: '인상, 해돋이',
    nameEn: 'Impression, Sunrise',
    prompt: ', Impression Sunrise by Monet: HARBOR AT DAWN with orange sun on blue water, atmospheric haze over boats, Impressionist sketch-like quality, visible quick brushstrokes, soft edges dissolving in mist, orange-blue complementary colors',
    feature: '풍경 새벽'
  },
  'monet-parasol': {
    name: '양산을 든 여인',
    nameEn: 'Woman with a Parasol',
    prompt: ', Woman with a Parasol by Monet: FIGURE ON HILLTOP against bright sky, white dress billowing in wind, parasol creating shade, Impressionist outdoor light, quick visible brushstrokes, grass and clouds in motion, fresh plein-air atmosphere',
    feature: '야외 인물'
  }
};

// 카유보트 - 도시/남성 (80%)
export const caillebotteMasterworks = {
  'caillebotte-paris': {
    name: '파리 거리, 비 오는 날',
    nameEn: 'Paris Street, Rainy Day',
    prompt: ', Paris Street Rainy Day by Gustave Caillebotte: MODERN URBAN SCENE with umbrellas, dramatic one-point perspective, wet cobblestone reflections, bourgeois couple in foreground, Haussmann architecture, photographic realism with Impressionist light',
    feature: '도시'
  },
  'caillebotte-floor': {
    name: '마루 긁는 사람들',
    nameEn: 'The Floor Scrapers',
    prompt: ', The Floor Scrapers by Caillebotte: WORKERS ON HANDS AND KNEES scraping wooden floor, dramatic perspective from above, bare muscular backs, sunlight through window, working-class realism, bold geometric composition, visible paint texture',
    feature: '남성 노동'
  },
  'caillebotte-window': {
    name: '창가의 남자',
    nameEn: 'Man at the Window',
    prompt: ', Man at the Window by Caillebotte: MALE FIGURE from behind looking out window, Haussmann balcony view, bourgeois interior, dramatic silhouette against bright Paris street, contemplative urban moment, photographic composition',
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
    prompt: ', The Starry Night by Vincent van Gogh: GIANT SWIRLING SPIRALS in night sky, EXTREMELY THICK IMPASTO with paint ridges standing up from canvas, cobalt blue and chrome yellow contrast, vertical cypress flame, stars with concentric halos, apply swirling thick brushstrokes to EVERYTHING including subject',
    feature: '감정/소용돌이'
  },
  'vangogh-selfportrait': {
    name: '자화상',
    nameEn: 'Self-Portrait',
    prompt: ', Self-Portrait by Vincent van Gogh: SWIRLING TURQUOISE BACKGROUND, directional thick impasto brushstrokes following face contours, intense frontal gaze, orange-red beard against blue-green coat, EVERY brushstroke visible and directional, palette knife texture',
    feature: '초상'
  },
  'vangogh-sunflowers': {
    name: '해바라기',
    nameEn: 'Sunflowers',
    prompt: ', Sunflowers by Vincent van Gogh: THICK 3D IMPASTO petals like sculptures, chrome yellow dominating 80% of palette, paint physically raised from canvas, heavy palette knife marks, ochre and orange accents, every surface shows thick textured paint',
    feature: '색채'
  },
  'vangogh-cafe': {
    name: '밤의 카페 테라스',
    nameEn: 'Café Terrace at Night',
    prompt: ', Café Terrace at Night by Van Gogh: YELLOW GASLIGHT against deep blue starry sky, cobblestone street in perspective, warm café glow, thick impasto swirling brushstrokes, yellow-blue complementary contrast, night scene with visible stars',
    feature: '야경'
  }
};

// 고갱 - 이국적 (35%)
export const gauguinMasterworks = {
  'gauguin-tahitian': {
    name: '타히티 여인들',
    nameEn: 'Tahitian Women',
    prompt: ', Tahitian Women by Paul Gauguin: EXOTIC POLYNESIAN FIGURES in tropical setting, FLAT BOLD AREAS of pure saturated color, warm golden-brown skin tones, decorative floral patterns, simplified forms, rich tropical palette (orange/turquoise/pink), visible brushwork',
    feature: '이국 인물'
  },
  'gauguin-where': {
    name: '우리는 어디서 왔는가',
    nameEn: 'Where Do We Come From?',
    prompt: ', Where Do We Come From by Gauguin: FRIEZE-LIKE COMPOSITION with multiple Tahitian figures, philosophical narrative from birth to death, flat decorative color areas, deep blue and gold palette, symbolic mysterious atmosphere, Post-Impressionist flatness',
    feature: '철학'
  },
  'gauguin-christ': {
    name: '황색 그리스도',
    nameEn: 'Yellow Christ',
    prompt: ', Yellow Christ by Gauguin: BOLD YELLOW CRUCIFIX against autumn landscape, Breton peasant women praying, flat areas of pure unmixed color, cloisonnist dark outlines, symbolic religious scene, simplified decorative forms',
    feature: '종교/색채'
  }
};

// 세잔 - 정물/풍경 ⚠️초상 금지
export const cezanneMasterworks = {
  'cezanne-apples': {
    name: '사과 바구니',
    nameEn: 'Basket of Apples',
    prompt: ', Basket of Apples by Paul Cézanne: GEOMETRIC STRUCTURED still life, tilted table perspective, apples as solid spherical forms, parallel constructive brushstrokes building volume, multiple viewpoints in single image, warm earth tones, visible parallel brush marks',
    feature: '정물'
  },
  'cezanne-montagne': {
    name: '생트빅투아르 산',
    nameEn: 'Mont Sainte-Victoire',
    prompt: ', Mont Sainte-Victoire by Cézanne: GEOMETRIC LANDSCAPE with mountain, structured patches of color building forms, parallel constructive brushstrokes, blue-green-ochre palette, multiple perspectives, analytical approach to nature, visible modulated brush marks',
    feature: '풍경'
  },
  'cezanne-cards': {
    name: '카드 놀이꾼',
    nameEn: 'The Card Players',
    prompt: ', The Card Players by Cézanne: PEASANT FIGURES at table playing cards, solid geometric forms, earth-tone palette, quiet concentrated atmosphere, parallel brushstrokes building volume, monumental dignity in simple scene, structured composition',
    feature: '그룹'
  }
};

// 시냐크 - 점묘/항구 (15%)
export const signacMasterworks = {
  'signac-port': {
    name: '생트로페 항구',
    nameEn: 'Port of Saint-Tropez',
    prompt: ', Port of Saint-Tropez by Paul Signac: POINTILLIST tiny distinct DOTS of pure color, Mediterranean harbor with boats, bright luminous sunlight, dots blend optically from distance, vibrant blue water and colorful sails, NO blended strokes only separate dots',
    feature: '항구'
  },
  'signac-feneon': {
    name: '펠릭스 페네옹 초상',
    nameEn: 'Portrait of Félix Fénéon',
    prompt: ', Portrait of Félix Fénéon by Signac: POINTILLIST PORTRAIT with decorative swirling background, tiny dots of pure color, profile view of elegant figure, dynamic spiral patterns, optical color mixing, Neo-Impressionist technique',
    feature: '점묘 초상'
  },
  'signac-harmony': {
    name: '조화의 시대',
    nameEn: 'In the Time of Harmony',
    prompt: ', In the Time of Harmony by Signac: UTOPIAN LANDSCAPE with figures, Pointillist dots creating idyllic scene, bright Mediterranean light, figures in peaceful leisure, optimistic social vision, pure color dots throughout',
    feature: '풍경'
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
    prompt: ', The Green Stripe (Portrait of Madame Matisse) by Henri Matisse: CRITICAL - GREEN STRIPE down CENTER of face dividing it in half, LEFT side of face YELLOW-PINK tones, RIGHT side of face GREEN-PURPLE tones, RADICAL FAUVIST COLOR directly on skin NOT realistic skin tone, BOLD DARK OUTLINES, completely FLAT NO shadows, ROUGH VISIBLE BRUSHSTROKES, pure unmixed clashing colors',
    feature: '인물/색상해방'
  },
  'matisse-purplecoat': {
    name: '보라 코트를 입은 여인',
    nameEn: 'Woman in a Purple Coat',
    prompt: ', Woman in a Purple Coat by Henri Matisse: elegant woman in RICH PURPLE COAT, BOLD BLACK OUTLINES around figure and objects making them pop, decorative patterned background, mature Matisse decorative style, strong contour lines separating color areas, flat color planes, luxurious and regal atmosphere',
    feature: '인물/우아함'
  },
  'matisse-dance': {
    name: '춤',
    nameEn: 'The Dance',
    prompt: ', The Dance by Henri Matisse: FIVE DANCING FIGURES in circle holding hands, THREE-COLOR ONLY composition (RED figures on BLUE sky and GREEN ground), simplified nude forms, joyful rhythmic energy, flat color areas, ROUGH FAUVIST BRUSHSTROKES visible',
    feature: '그룹'
  },
  'matisse-red-room': {
    name: '붉은 방',
    nameEn: 'The Red Room',
    prompt: ', The Red Room (Harmony in Red) by Matisse: DOMINANT RED covering walls and table, decorative floral arabesque patterns, flat perspective, woman arranging fruit, window showing green garden, pure color harmony, visible Fauvist brushwork',
    feature: '실내'
  }
};

// 드랭 - 풍경 (35%)
export const derainMasterworks = {
  'derain-collioure': {
    name: '콜리우르 항구',
    nameEn: 'Port of Collioure',
    prompt: ', Port of Collioure by André Derain: FAUVIST LANDSCAPE with boats in harbor, BOLD UNMIXED PURE COLORS at maximum saturation, Mediterranean light, flat decorative color areas, strong outlines, visible energetic Fauvist brushstrokes',
    feature: '풍경'
  },
  'derain-bridge': {
    name: '런던 다리',
    nameEn: 'Charing Cross Bridge',
    prompt: ', Charing Cross Bridge by Derain: FAUVIST URBAN LANDSCAPE, Thames river in bold arbitrary colors, London skyline, pure intense hues liberated from reality, flat color zones, visible expressive brushwork',
    feature: '풍경 도시'
  },
  'derain-matisse': {
    name: '마티스 초상',
    nameEn: 'Portrait of Matisse',
    prompt: ', Portrait of Matisse by Derain: FAUVIST PORTRAIT with bold non-naturalistic colors on face and background, fellow artist as subject, pure unmixed color areas, strong graphic presence, visible rough brushwork',
    feature: '인물'
  }
};

// 블라맹크 - 극적 감정 (30%)
export const vlaminckMasterworks = {
  'vlaminck-chatou': {
    name: '샤투의 집들',
    nameEn: 'Houses at Chatou',
    prompt: ', Houses at Chatou by Maurice de Vlaminck: VIOLENT FAUVIST COLORS at maximum intensity, houses in aggressive reds and blues, thick impulsive brushstrokes, pure paint squeezed from tube, emotional color explosion, most extreme Fauvist palette',
    feature: '격렬'
  },
  'vlaminck-red-trees': {
    name: '붉은 나무들',
    nameEn: 'Red Trees',
    prompt: ', Red Trees by Vlaminck: EXPLOSIVE RED AND ORANGE trees, violent emotional color, turbulent sky, aggressive Fauvist palette, thick impasto applied with force, landscape as emotional expression, visible energetic strokes',
    feature: '감정'
  },
  'vlaminck-bougival': {
    name: '부지발의 식당',
    nameEn: 'Restaurant at Bougival',
    prompt: ', Restaurant at Bougival by Vlaminck: FAUVIST SCENE with intense pure colors, bold contrasts, thick aggressive brushwork, emotional intensity, pure saturated hues, violent color combinations, visible impasto texture',
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
    prompt: ', The Kiss by Gustav Klimt: two people embracing wrapped in GOLD LEAF decorated robes, geometric patterns (rectangles on male/circles on female), kneeling on flower meadow cliff edge, Byzantine mosaic GOLD BACKGROUND, stylized floral patterns, Art Nouveau organic curves, ecstatic blissful expressions, luxurious gold/bronze/jewel tones',
    feature: '연인/황금',
    avoidFor: ['parent_child']
  },
  'klimt-judith': {
    name: '유디트',
    nameEn: 'Judith I',
    prompt: ', Judith I by Gustav Klimt: wide GOLD CHOKER necklace prominent, provocative seductive expression, bare shoulders visible, gold decorative elements, stylized floral patterns, power and danger, half-closed sensual eyes, Byzantine gold patterns, Art Nouveau style',
    feature: '팜므파탈'
  },
  'klimt-treeoflife': {
    name: '생명의 나무',
    nameEn: 'The Tree of Life',
    prompt: ', The Tree of Life by Gustav Klimt: SPIRAL BRANCHES swirling outward, gold and bronze decorative swirls, elaborate curving patterns filling background, stylized floral patterns, Art Nouveau organic curves, elegant sinuous lines, gold leaf texture, Stoclet Frieze style',
    feature: '장식/생명'
  }
};

// ========================================
// 9. 표현주의 (4명)
// 뭉크 4개 (거장 겸용)
// ========================================

// 뭉크 - 감정적 초상 (30%) - 4개 대표작
export const munchMasterworks = {
  'munch-scream': {
    name: '절규',
    nameEn: 'The Scream',
    prompt: ', The Scream by Edvard Munch: SKULL-LIKE FIGURE with hands on face, WAVY DISTORTED SWIRLING LINES throughout entire scene including sky and water, BLOOD RED and orange dramatic sunset, bridge/railing setting, extreme existential terror, apply wavy distortion to background, NO smiling, expression of FEAR allowed',
    feature: '불안',
    expressionRule: 'fear/anxiety allowed, NO bright, NO smiling'
  },
  'munch-madonna': {
    name: '마돈나',
    nameEn: 'Madonna',
    prompt: ', Madonna by Edvard Munch: SENSUAL FEMALE with flowing dark hair spreading like HALO, RED AURA glowing around nude body, pale luminous skin, mysterious ecstatic expression with half-closed eyes, wavy flowing lines, mystical seduction, NOT bright smile, femme fatale power',
    feature: '신비/관능',
    expressionRule: 'ecstatic/mysterious allowed, NO bright, NO smiling'
  },
  'munch-jealousy': {
    name: '질투',
    nameEn: 'Jealousy',
    prompt: ', Jealousy by Edvard Munch: PALE GREEN SICKLY face in foreground, intense haunted stare, psychological tension, couple in background, green symbolizing jealousy, wavy distorted lines, emotional turmoil, visible thick Expressionist brushstrokes',
    feature: '심리'
  },
  'munch-anxiety': {
    name: '불안',
    nameEn: 'Anxiety',
    prompt: ', Anxiety by Edvard Munch: GROUP OF FIGURES with pale anxious faces staring forward, wavy undulating lines in sky and landscape, BLOOD RED sunset sky like The Scream, crowd walking on path/bridge, collective existential dread, Expressionist thick brushwork, NO smiling',
    feature: '군중/불안',
    expressionRule: 'anxiety/worry allowed, NO bright, NO smiling'
  }
};

// 코코슈카 - 심리적 초상 (30%)
export const kokoschkaMasterworks = {
  'kokoschka-bride': {
    name: '바람의 신부',
    nameEn: 'Bride of the Wind',
    prompt: ', Bride of the Wind by Oskar Kokoschka: COUPLE in turbulent cosmic landscape, swirling clouds and waves, intense psychological portraiture, VIOLENT THICK BRUSHSTROKES 30mm or thicker, inner emotional turmoil made visible, lovers in stormy universe',
    feature: '격정'
  },
  'kokoschka-alma': {
    name: '알마 말러 초상',
    nameEn: 'Portrait of Alma Mahler',
    prompt: ', Portrait by Kokoschka: INTENSE PSYCHOLOGICAL PORTRAIT, penetrating inner vision, agitated nervous brushwork, turbulent emotional energy, VERY THICK VISIBLE BRUSHSTROKES revealing psyche, soul-revealing depth, Expressionist intensity',
    feature: '심리'
  },
  'kokoschka-self': {
    name: '자화상',
    nameEn: 'Self-Portrait',
    prompt: ', Self-Portrait by Kokoschka: HAUNTED INTENSE SELF-EXAMINATION, violent thick brushwork revealing inner turmoil, psychological vulnerability exposed, VISIBLE AGITATED BRUSHSTROKES 30mm or thicker, Expressionist raw honesty',
    feature: '내면'
  }
};

// 키르히너 - 도시/각진 (25%)
export const kirchnerMasterworks = {
  'kirchner-berlin': {
    name: '베를린 거리 풍경',
    nameEn: 'Berlin Street Scene',
    prompt: ', Berlin Street Scene by Ernst Ludwig Kirchner: ANGULAR JAGGED URBAN FIGURES, acid green and hot pink palette, harsh geometric forms, city prostitutes in feathered hats, anxious urban tension, SHARP ANGULAR OUTLINES, electric blue accents, aggressive Expressionist brushwork',
    feature: '도시'
  },
  'kirchner-potsdamer': {
    name: '포츠담 광장',
    nameEn: 'Potsdamer Platz',
    prompt: ', Potsdamer Platz by Kirchner: ANGULAR FIGURES in urban square, jagged geometric forms, harsh Expressionist palette (acid green/hot pink/electric blue), city alienation, sharp outlines fragmenting forms, visible aggressive brushstrokes',
    feature: '도시 광장'
  },
  'kirchner-mirror': {
    name: '거울 앞 자화상',
    nameEn: 'Self-Portrait in Front of Mirror',
    prompt: ', Self-Portrait by Kirchner: ANGULAR SELF-PORTRAIT with harsh geometric forms, bold Expressionist colors, jagged outlines, psychological intensity, mirror doubling, visible aggressive brushwork, Die Brücke aesthetic',
    feature: '각진 자화상'
  }
};

// 칸딘스키 - 추상 (15%)
export const kandinskyMasterworks = {
  'kandinsky-composition8': {
    name: '구성 VIII',
    nameEn: 'Composition VIII',
    prompt: ', Composition VIII by Wassily Kandinsky: ABSTRACT GEOMETRIC FORMS floating on light background, circles triangles lines in dynamic arrangement, primary colors plus black, musical visual rhythm, spiritual abstract expression, visible paint texture',
    feature: '추상'
  },
  'kandinsky-yellow-red-blue': {
    name: '노랑-빨강-파랑',
    nameEn: 'Yellow-Red-Blue',
    prompt: ', Yellow-Red-Blue by Kandinsky: ABSTRACT COLOR COMPOSITION divided into warm yellow and cool blue zones, geometric and biomorphic forms interacting, pure emotional color expression, musical harmony in paint, visible brushwork',
    feature: '추상 색채'
  },
  'kandinsky-circles': {
    name: '여러 개의 원',
    nameEn: 'Several Circles',
    prompt: ', Several Circles by Kandinsky: FLOATING CIRCLES of various sizes on dark background, cosmic abstract composition, overlapping transparent color circles, spiritual geometric harmony, meditative abstract expression',
    feature: '추상 원'
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
    prompt: ', Mona Lisa by Leonardo da Vinci: EXTREME SFUMATO with edges dissolving like smoke, ENIGMATIC SUBTLE SMILE barely perceptible, hands folded serenely, dark atmospheric landscape background, warm golden-brown Renaissance palette, mysterious psychological depth, soft hazy transitions, oil glazing layers, sfumato masterpiece',
    feature: '미소, 스푸마토'
  },
  'leonardo-lastsupper': {
    name: '최후의 만찬',
    nameEn: 'The Last Supper',
    prompt: ', The Last Supper by Leonardo da Vinci: DRAMATIC GROUP COMPOSITION with central figure, gesturing disciples in emotional reactions, symmetrical architectural perspective, Renaissance fresco style, muted earth tones, psychological drama captured in gestures, monumental religious scene',
    feature: '그룹, 드라마'
  },
  'leonardo-virginrocks': {
    name: '암굴의 성모',
    nameEn: 'Virgin of the Rocks',
    prompt: ', Virgin of the Rocks by Leonardo da Vinci: MYSTERIOUS GROTTO SETTING with rocky cave, Madonna with infants in pyramidal composition, EXTREME SFUMATO dissolving all edges, eerie underwater-like atmosphere, chiaroscuro emerging from darkness, pointing gestures, mystical religious mood',
    feature: '동굴, 신비'
  }
};

// 티치아노
export const titianMasterworks = {
  'titian-venusurbino': {
    name: '우르비노의 비너스',
    nameEn: 'Venus of Urbino',
    prompt: ', Venus of Urbino by Titian: RECLINING FEMALE NUDE on bed, direct sensual gaze at viewer, warm glowing Venetian flesh tones, rich red and gold fabrics, domestic interior background with servants, loose expressive brushwork, intimate boudoir atmosphere, Venetian colorito mastery',
    feature: '누드, 관능'
  },
  'titian-bacchus': {
    name: '바쿠스와 아리아드네',
    nameEn: 'Bacchus and Ariadne',
    prompt: ', Bacchus and Ariadne by Titian: DYNAMIC MYTHOLOGICAL SCENE, Bacchus leaping from chariot, swirling drapery and wild procession, BRILLIANT ULTRAMARINE BLUE sky, rich warm Venetian colors, energetic diagonal composition, leopards and satyrs, passionate romantic encounter',
    feature: '역동, 신화'
  },
  'titian-assumption': {
    name: '성모 승천',
    nameEn: 'Assumption of the Virgin',
    prompt: ', Assumption of the Virgin by Titian: ASCENDING MADONNA in brilliant red robe, heavenly golden light above, apostles gesturing below in amazement, monumental altarpiece composition, warm Venetian palette, dynamic upward movement, divine radiance, Venetian Renaissance grandeur',
    feature: '종교, 상승'
  }
};

// 미켈란젤로
export const michelangeloMasterworks = {
  'michelangelo-adam': {
    name: '아담의 창조',
    nameEn: 'Creation of Adam',
    prompt: ', Creation of Adam by Michelangelo: ICONIC REACHING HANDS nearly touching, God floating in billowing cloak with angels, Adam reclining on earth, Sistine Chapel ceiling fresco style, HEROIC MUSCULAR ANATOMY, monumental sculptural figures, divine spark between fingers, Renaissance fresco palette',
    feature: '손, 창조'
  },
  'michelangelo-lastjudgment': {
    name: '최후의 심판',
    nameEn: 'The Last Judgment',
    prompt: ', The Last Judgment by Michelangelo: MONUMENTAL APOCALYPTIC SCENE, Christ central in judgment, swirling masses of ascending and descending souls, POWERFUL MUSCULAR BODIES in dynamic poses, dramatic foreshortening, Sistine Chapel wall fresco, intense saturated colors, terribilità grandeur',
    feature: '심판, 군중'
  },
  'michelangelo-pieta': {
    name: '피에타',
    nameEn: 'Pietà',
    prompt: ', Pietà by Michelangelo: MADONNA holding dead Christ across lap, pyramidal composition, serene sorrowful beauty, MARBLE SCULPTURE AESTHETIC - smooth idealized forms, graceful drapery folds, Renaissance religious pathos, quiet grief, sculptural monumentality translated to painting',
    feature: '비애, 조각적'
  }
};

// 라파엘로
export const raphaelMasterworks = {
  'raphael-athens': {
    name: '아테네 학당',
    nameEn: 'School of Athens',
    prompt: ', School of Athens by Raphael: GRAND ARCHITECTURAL PERSPECTIVE with vaulted Roman arches, philosophers gathered in animated discussion, Plato and Aristotle central, balanced harmonious composition, classical Renaissance ideal, clear luminous colors, intellectual grandeur, perfect symmetry',
    feature: '건축, 철학'
  },
  'raphael-sistinamadonna': {
    name: '시스티나 마돈나',
    nameEn: 'Sistine Madonna',
    prompt: ', Sistine Madonna by Raphael: MADONNA descending from clouds holding infant, green curtains parted dramatically, saints kneeling below, famous cherubs at bottom, divine ethereal light, sweet graceful expressions, harmonious Renaissance beauty, heavenly vision',
    feature: '성모, 천상'
  },
  'raphael-galatea': {
    name: '갈라테아의 승리',
    nameEn: 'Triumph of Galatea',
    prompt: ', Triumph of Galatea by Raphael: SEA NYMPH on shell chariot pulled by dolphins, swirling cupids above, tritons and nereids around, dynamic spiraling composition, joyful mythological celebration, clear bright Mediterranean colors, graceful idealized figures, Renaissance fresco style',
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
    prompt: ', The Three Graces by Rubens: THREE VOLUPTUOUS FEMALE NUDES dancing in circle, warm luminous pearly flesh tones, soft sensual curves, flowing golden hair, garden setting, rich warm palette of pinks and golds, Baroque exuberance, visible fluid brushwork',
    feature: '누드, 삼미신'
  },
  'rubens-descent': {
    name: '십자가에서 내려지심',
    nameEn: 'Descent from the Cross',
    prompt: ', Descent from the Cross by Rubens: DRAMATIC DIAGONAL COMPOSITION, Christ\'s pale body lowered by multiple figures, rich red and white drapery contrast, emotional religious drama, warm flesh against dark background, dynamic Baroque movement, theatrical lighting',
    feature: '종교, 드라마'
  },
  'rubens-leucippus': {
    name: '레우키포스 딸들의 납치',
    nameEn: 'Rape of the Daughters of Leucippus',
    prompt: ', Rape of the Daughters of Leucippus by Rubens: DYNAMIC SWIRLING COMPOSITION, muscular men on rearing horses, voluptuous struggling women, dramatic diagonal energy, rich warm Baroque palette, powerful movement frozen in time, sensual flesh tones, theatrical drama',
    feature: '역동, 납치'
  }
};

// 렘브란트
export const rembrandtMasterworks = {
  'rembrandt-nightwatch': {
    name: '야경',
    nameEn: 'The Night Watch',
    prompt: ', The Night Watch by Rembrandt: DRAMATIC GROUP PORTRAIT emerging from darkness, militia company in dynamic motion, GOLDEN SPOTLIGHT illuminating central figures, deep chiaroscuro with rich blacks, military costumes with gleaming weapons, theatrical Baroque drama, visible impasto brushwork',
    feature: '그룹, 빛'
  },
  'rembrandt-selfportrait': {
    name: '자화상',
    nameEn: 'Self-Portrait',
    prompt: ', Self-Portrait by Rembrandt: PENETRATING PSYCHOLOGICAL GAZE, warm golden light on face emerging from darkness, THICK IMPASTO visible in highlights, honest unflinching self-examination, rich brown and gold palette, emotional depth, intimate introspection, masterful chiaroscuro',
    feature: '자화상, 심리'
  },
  'rembrandt-prodigal': {
    name: '돌아온 탕자',
    nameEn: 'Return of the Prodigal Son',
    prompt: ', Return of the Prodigal Son by Rembrandt: KNEELING SON embraced by elderly father, warm golden light on figures against deep darkness, tender emotional reunion, rich impasto in lit areas, profound spiritual compassion, intimate Baroque drama, glowing reds and golds',
    feature: '용서, 감동'
  }
};

// 벨라스케스
export const velazquezMasterworks = {
  'velazquez-meninas': {
    name: '시녀들',
    nameEn: 'Las Meninas',
    prompt: ', Las Meninas by Velázquez: COMPLEX SPATIAL ARRANGEMENT with Infanta Margarita center, maids of honor attending, artist self-portrait at easel, mirror reflection of king and queen, sophisticated silver-grey palette, loose confident brushwork, aristocratic Spanish court elegance',
    feature: '궁정, 공간'
  },
  'velazquez-pope': {
    name: '교황 인노켄티우스 10세',
    nameEn: 'Portrait of Pope Innocent X',
    prompt: ', Portrait of Pope Innocent X by Velázquez: INTENSE PENETRATING GAZE, crimson papal robes and cap, LOOSE BRAVURA BRUSHWORK visible up close, psychological intensity, rich reds against muted background, powerful authoritative presence, masterful fabric rendering',
    feature: '초상, 위엄'
  },
  'velazquez-breda': {
    name: '브레다의 항복',
    nameEn: 'Surrender of Breda',
    prompt: ', Surrender of Breda by Velázquez: GRACIOUS SURRENDER SCENE, victor receiving keys with magnanimity, forest of lances behind troops, dignified defeated general, atmospheric landscape background, subtle silver-grey palette, noble historical moment, Spanish Golden Age grandeur',
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
    prompt: ', Pilgrimage to Cythera by Watteau: FÊTE GALANTE with aristocratic couples departing for island of love, dreamy pastoral landscape, soft feathery brushwork, melancholic romantic atmosphere, shimmering silk costumes, pale pastel colors with rose and gold, poetic theatrical grace',
    feature: '연인, 출발'
  },
  'watteau-pierrot': {
    name: '피에로 (질)',
    nameEn: 'Pierrot (Gilles)',
    prompt: ', Pierrot by Watteau: SOLITARY CLOWN in white satin costume standing frontally, melancholic dreamy expression, commedia dell\'arte figures behind, soft silvery light, wistful poetic mood, delicate feathery brushwork, theatrical isolation, Rococo grace with undertone of sadness',
    feature: '광대, 고독'
  },
  'watteau-fete': {
    name: '사랑의 축제',
    nameEn: 'The Pleasures of the Ball',
    prompt: ', Fête Galante by Watteau: ELEGANT OUTDOOR GATHERING, aristocrats in shimmering silk, musicians and dancers, dreamy parkland setting, soft dappled light, pale pastel palette, delicate feathery brushwork, romantic melancholic atmosphere, theatrical Rococo elegance',
    feature: '축제, 우아'
  }
};

// 부셰
export const boucherMasterworks = {
  'boucher-diana': {
    name: '목욕하는 디아나',
    nameEn: 'Diana Leaving the Bath',
    prompt: ', Diana Leaving the Bath by Boucher: NUDE GODDESS with rosy porcelain skin, hunting dogs and quiver nearby, soft pastel palette of pink blue cream, fluffy clouds and foliage, idealized decorative beauty, playful mythological scene, visible soft Rococo brushwork',
    feature: '누드, 신화'
  },
  'boucher-pompadour': {
    name: '퐁파두르 부인',
    nameEn: 'Madame de Pompadour',
    prompt: ', Madame de Pompadour by Boucher: ARISTOCRATIC PORTRAIT in luxurious setting, elaborate silk gown with roses, books and artistic objects, soft rosy flesh tones, ornate Rococo decoration, powder blue and pink palette, refined French court elegance, delicate decorative beauty',
    feature: '초상, 귀족'
  },
  'boucher-odalisque': {
    name: '금발의 오달리스크',
    nameEn: 'Blonde Odalisque',
    prompt: ', Blonde Odalisque by Boucher: RECLINING FEMALE NUDE from behind, soft rosy peach skin, blue ribbon in blonde hair, luxurious cushions and drapery, intimate boudoir setting, playful sensual atmosphere, pastel Rococo palette, decorative erotic charm',
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
    prompt: ', Wanderer Above the Sea of Fog by Caspar David Friedrich: SOLITARY FIGURE from behind on rocky peak, gazing over swirling sea of mist, sublime Romantic landscape, contemplative isolation, dramatic mountainous vista, cool blue-grey atmospheric palette, spiritual transcendence, man dwarfed by nature',
    feature: '뒷모습, 숭고'
  },
  'friedrich-seaice': {
    name: '빙해',
    nameEn: 'The Sea of Ice',
    prompt: ', The Sea of Ice by Friedrich: JAGGED ICE SLABS crushing shipwreck, frozen arctic desolation, terrifying sublime power of nature, cold blue-white palette, sharp angular ice formations, Romantic catastrophe, tiny human vessel destroyed by elemental force, existential terror',
    feature: '빙하, 파멸'
  },
  'friedrich-abbey': {
    name: '떡갈나무 숲의 수도원',
    nameEn: 'Abbey in the Oakwood',
    prompt: ', Abbey in the Oakwood by Friedrich: RUINED GOTHIC ABBEY in winter, bare twisted oak trees, funeral procession of monks, misty melancholic atmosphere, death and spiritual transcendence, pale cold palette, Romantic sublime decay, haunting desolate beauty',
    feature: '폐허, 죽음'
  }
};

// 쉴레
export const schieleMasterworks = {
  'schiele-selfportrait': {
    name: '자화상',
    nameEn: 'Self-Portrait',
    prompt: ', Self-Portrait by Egon Schiele: CONTORTED ANGULAR POSE with twisted limbs, SHARP WIRY CONTOUR LINES, raw psychological intensity, exposed vulnerable body, earthy muted colors with areas of bare canvas, expressive distortion, confrontational direct gaze, Expressionist anguish',
    feature: '자화상, 왜곡'
  },
  'schiele-embrace': {
    name: '포옹',
    nameEn: 'The Embrace',
    prompt: ', The Embrace by Egon Schiele: INTERTWINED ANGULAR BODIES, lovers in desperate embrace, sharp contour lines defining twisted forms, raw erotic tension, pale flesh with red accents, psychological intensity, visible bare canvas, Expressionist passion and vulnerability',
    feature: '포옹, 에로틱'
  },
  'schiele-deathandmaiden': {
    name: '죽음과 소녀',
    nameEn: 'Death and the Maiden',
    prompt: ', Death and the Maiden by Schiele: COUPLE EMBRACING with death figure, angular distorted bodies, existential terror and desire, dark earth tones with pale flesh, sharp expressive contours, psychological drama, Expressionist confrontation with mortality, raw emotional power',
    feature: '죽음, 비극'
  }
};

// ========================================
// 20세기 모더니즘 (5명) - 피카소/워홀 제외
// ========================================

// 마그리트 (5개 대표작)
export const magritteMasterworks = {
  'magritte-sonofman': {
    name: '사람의 아들',
    nameEn: 'The Son of Man',
    prompt: ', The Son of Man by René Magritte (1964): CRITICAL - place ONE small GREEN APPLE floating at NOSE LEVEL covering only 25-30% of face, EYES must be CLEARLY VISIBLE above apple, MOUTH and CHIN must be CLEARLY VISIBLE below apple, subject wearing DARK FORMAL SUIT with white collar and BLACK BOWLER HAT, background is overcast cloudy grey sky with low stone wall, hyperrealistic precise Belgian surrealist oil painting, mysterious hidden identity',
    feature: '정장, 사과'
  },
  'magritte-golconda': {
    name: '골콩드',
    nameEn: 'Golconda',
    prompt: ', Golconda by René Magritte (1953): CRITICAL - transform main subject into FORMAL STIFF RIGID pose wearing dark suit with BLACK BOWLER HAT, CONVERT background into PAINTED Belgian townscape with buildings and cloudy sky, FILL entire background with DOZENS of small identical copies of the same formally-dressed figure floating/falling in RIGID STIFF upright posture like mannequins, hyperrealistic Belgian surrealist oil painting, raining men effect',
    feature: '반복, 부유'
  },
  'magritte-bowlerhat': {
    name: '중절모를 쓴 남자',
    nameEn: 'Man in a Bowler Hat',
    prompt: ', Man in a Bowler Hat by René Magritte (1964): CRITICAL - place ONE WHITE DOVE bird flying in front of face with wings spread covering most of face, subject wearing DARK FORMAL SUIT with BLACK BOWLER HAT, background is overcast cloudy grey sky, hyperrealistic precise Belgian surrealist oil painting, mysterious concealment by innocent creature',
    feature: '비둘기, 은폐'
  },
  'magritte-humancondition': {
    name: '인간의 조건',
    nameEn: 'The Human Condition',
    prompt: ', The Human Condition by René Magritte (1933): CRITICAL - show EASEL with CANVAS in foreground, the painting on canvas shows EXACT SAME VIEW as the scene behind it creating seamless illusion where canvas edge is invisible, window frame or curtains on sides, landscape continues perfectly from canvas to reality, philosophical painting-within-painting paradox, hyperrealistic Belgian surrealist oil painting',
    feature: '캔버스, 착시'
  },
  'magritte-empireoflight': {
    name: '빛의 제국',
    nameEn: 'The Empire of Light',
    prompt: ', The Empire of Light by René Magritte (1954): CRITICAL PARADOX - bright BLUE DAYTIME SKY with white fluffy clouds ABOVE, but DARK NIGHTTIME street scene BELOW with glowing yellow lamplight from street lamps and dark silhouetted trees and buildings, impossible coexistence of day and night in same image, mysterious twilight atmosphere, hyperrealistic Belgian surrealist oil painting',
    feature: '낮밤 공존'
  }
};

// 미로 (3개 대표작)
export const miroMasterworks = {
  'miro-catalan': {
    name: '카탈루냐 풍경',
    nameEn: 'The Catalan Landscape (The Hunter)',
    prompt: ', The Catalan Landscape by Joan Miró: playful BIOMORPHIC SHAPES floating on bright yellow/orange background, abstract hunter figure with geometric head and stick body, PRIMARY COLORS (red blue yellow black) with childlike spontaneity, whimsical floating symbols (sun eye heart), thin BLACK CALLIGRAPHIC LINES connecting elements, Catalan Surrealist fantasy landscape, joyful cosmic abstraction',
    feature: '풍경, 사냥꾼'
  },
  'miro-constellation': {
    name: '별자리 시리즈',
    nameEn: 'Constellations Series',
    prompt: ', Constellations by Joan Miró: dense network of BIOMORPHIC SHAPES against muted background, constellation of STARS MOONS EYES and organic forms connected by thin black lines, PRIMARY COLORS (red blue yellow) as accents, automatic drawing spontaneous symbols, cosmic poetry, nocturnal dreamscape with celestial bodies, intricate web of surrealist symbols',
    feature: '별, 우주'
  },
  'miro-bluestar': {
    name: '푸른 별 앞의 여인',
    nameEn: 'Woman in Front of the Sun',
    prompt: ', Woman Before the Sun by Joan Miró: simplified BIOMORPHIC FEMALE FIGURE with exaggerated curves, LARGE RADIATING SUN or star shape in background, bold PRIMARY COLORS (red blue yellow black) on light ground, spontaneous gestural brushwork, primal feminine energy, childlike cosmic joy, thick black outlines defining organic shapes',
    feature: '여인, 태양'
  }
};

// 샤갈 (3개 대표작)
export const chagallMasterworks = {
  'chagall-birthday': {
    name: '생일',
    nameEn: 'Birthday',
    prompt: ', Birthday by Marc Chagall (1915): FLOATING LOVERS defying gravity, man bending impossibly backward to kiss woman, SOFT MUTED PASTEL colors (dusty rose, pale blue, sage green), tilted room interior with flowers bouquet, dreamlike weightlessness, poetic romantic atmosphere, nostalgic Russian-Jewish warmth, visible soft feathery brushstrokes',
    feature: '부유, 키스'
  },
  'chagall-overtown': {
    name: '마을 위에서',
    nameEn: 'Over the Town',
    prompt: ', Over the Town by Marc Chagall: COUPLE FLOATING high above Vitebsk village, embracing lovers soaring over tilted colorful houses, MUTED DREAMY PASTELS (lavender, pale blue, rose, green), nostalgic shtetl rooftops below, poetic gravity-defying romance, Jewish folklore dreamscape, soft atmospheric brushwork',
    feature: '마을, 비행'
  },
  'chagall-iandvillage': {
    name: '나와 마을',
    nameEn: 'I and the Village',
    prompt: ', I and the Village by Marc Chagall (1911): OVERLAPPING DREAMLIKE images of green-faced man and cow gazing at each other, circular composition with transparent overlays, tiny village scenes within larger forms, JEWEL-TONE colors (emerald green, ruby red, deep blue), Cubist-influenced fragmented space, Russian-Jewish mystical symbolism, nostalgic village memories',
    feature: '동물, 얼굴'
  }
};

// 리히텐슈타인 (3개 대표작)
export const lichtensteinMasterworks = {
  'lichtenstein-drowninggirl': {
    name: '익사하는 소녀',
    nameEn: 'Drowning Girl',
    prompt: ', Drowning Girl by Roy Lichtenstein (1963): dramatic CLOSE-UP of woman face with tear, VISIBLE BEN-DAY DOTS pattern throughout entire image, THICK BOLD BLACK OUTLINES around all forms, PRIMARY COLORS ONLY (red yellow blue white), thought bubble with dramatic text, comic book emotional melodrama, halftone printing effect blown up to fine art scale, Pop Art masterpiece',
    feature: '눈물, 클로즈업'
  },
  'lichtenstein-whaam': {
    name: '휩!',
    nameEn: 'Whaam!',
    prompt: ', Whaam! by Roy Lichtenstein (1963): TWO-PANEL comic book composition, fighter jet shooting missile on left panel, dramatic EXPLOSION on right panel, VISIBLE BEN-DAY DOTS throughout, THICK BLACK OUTLINES, PRIMARY COLORS (red yellow blue), comic book action onomatopoeia, war comic aesthetic, Pop Art diptych',
    feature: '전투기, 폭발'
  },
  'lichtenstein-hopeless': {
    name: '절망적',
    nameEn: 'Hopeless',
    prompt: ', Hopeless by Roy Lichtenstein: blonde woman crying with hands near face, VISIBLE BEN-DAY DOTS creating skin tone and shadows, THICK BOLD BLACK OUTLINES defining hair and features, PRIMARY COLORS (yellow hair, blue eyes, red lips), dramatic comic book emotion, speech bubble with melancholic text, romance comic aesthetic, Pop Art melodrama',
    feature: '금발, 울음'
  }
};

// 키스 해링 (3개 대표작)
export const haringMasterworks = {
  'haring-radiantbaby': {
    name: '빛나는 아기',
    nameEn: 'Radiant Baby',
    prompt: ', Radiant Baby by Keith Haring: CRAWLING BABY figure in profile, BOLD THICK BLACK OUTLINE defining simple silhouette, RADIANT LINES emanating from body showing energy and light, flat bright PRIMARY COLOR fill (red or yellow), minimal iconic street art style, dynamic movement implied, subway graffiti aesthetic, symbol of innocence and hope',
    feature: '아기, 빛'
  },
  'haring-barkingdog': {
    name: '짖는 개',
    nameEn: 'Barking Dog',
    prompt: ', Barking Dog by Keith Haring: simplified DOG silhouette with open barking mouth, BOLD THICK BLACK OUTLINE, RADIANT LINES emanating from dog showing sound/energy, flat bright PRIMARY COLOR background (red yellow blue), aggressive angular pose, iconic street art symbol, dynamic movement lines, subway graffiti energy',
    feature: '개, 에너지'
  },
  'haring-dancing': {
    name: '춤추는 사람들',
    nameEn: 'Untitled (Dancing Figures)',
    prompt: ', Dancing Figures by Keith Haring: multiple SIMPLIFIED HUMAN FIGURES dancing in dynamic poses, BOLD CONTINUOUS BLACK OUTLINES connecting figures, RADIANT ENERGY LINES emanating from bodies, flat bright PRIMARY COLORS filling shapes (red yellow blue green), rhythmic interlocking movement, joyful kinetic energy, subway graffiti street art aesthetic',
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
  ...kandinskyMasterworks,
  ...schieleMasterworks,
  // 모더니즘 (피카소/워홀 제외)
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
    'roman-mosaic': ['mosaic-alexander', 'mosaic-cave-canem', 'mosaic-dionysus'],
    'gothic': ['gothic-blue-virgin', 'gothic-rose-window', 'gothic-sainte-chapelle'],
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
    'signac': ['signac-port', 'signac-feneon', 'signac-harmony'],
    // 야수파
    'matisse': ['matisse-greenstripe', 'matisse-purplecoat', 'matisse-dance', 'matisse-red-room'],
    'derain': ['derain-collioure', 'derain-bridge', 'derain-matisse'],
    'vlaminck': ['vlaminck-chatou', 'vlaminck-red-trees', 'vlaminck-bougival'],
    // 클림트 (거장)
    'klimt': ['klimt-kiss', 'klimt-judith', 'klimt-treeoflife'],
    // 표현주의
    'munch': ['munch-scream', 'munch-madonna', 'munch-jealousy', 'munch-anxiety'],
    'kokoschka': ['kokoschka-bride', 'kokoschka-alma', 'kokoschka-self'],
    'kirchner': ['kirchner-berlin', 'kirchner-potsdamer', 'kirchner-mirror'],
    'kandinsky': ['kandinsky-composition8', 'kandinsky-yellow-red-blue', 'kandinsky-circles'],
    'schiele': ['schiele-selfportrait', 'schiele-embrace', 'schiele-deathandmaiden'],
    // 모더니즘 (피카소/워홀 제외)
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
  guide += `   Return your choice as: MASTERWORK: ${masterworkKeys[0].split('-')[0]}-[workname]\n`;
  
  return guide;
}

// 콘솔 로그용: 전체 대표작 수 확인
console.log('📚 Movement Masterworks loaded:');
console.log(`   - Roman Mosaic: ${Object.keys(romanMosaicMasterworks).length} works`);
console.log(`   - Gothic: ${Object.keys(gothicMasterworks).length} works`);
console.log(`   ── 르네상스 ──`);
console.log(`   - Botticelli: ${Object.keys(botticelliMasterworks).length} works`);
console.log(`   - Leonardo: ${Object.keys(leonardoMasterworks).length} works 🆕`);
console.log(`   - Titian: ${Object.keys(titianMasterworks).length} works 🆕`);
console.log(`   - Michelangelo: ${Object.keys(michelangeloMasterworks).length} works 🆕`);
console.log(`   - Raphael: ${Object.keys(raphaelMasterworks).length} works 🆕`);
console.log(`   ── 바로크 ──`);
console.log(`   - Caravaggio: ${Object.keys(caravaggioMasterworks).length} works`);
console.log(`   - Rubens: ${Object.keys(rubensMasterworks).length} works 🆕`);
console.log(`   - Rembrandt: ${Object.keys(rembrandtMasterworks).length} works 🆕`);
console.log(`   - Velázquez: ${Object.keys(velazquezMasterworks).length} works 🆕`);
console.log(`   ── 로코코 ──`);
console.log(`   - Watteau: ${Object.keys(watteauMasterworks).length} works 🆕`);
console.log(`   - Boucher: ${Object.keys(boucherMasterworks).length} works 🆕`);
console.log(`   ── 신고전/낭만/사실 ──`);
console.log(`   - David: ${Object.keys(davidMasterworks).length} works`);
console.log(`   - Ingres: ${Object.keys(ingresMasterworks).length} works`);
console.log(`   - Turner: ${Object.keys(turnerMasterworks).length} works`);
console.log(`   - Friedrich: ${Object.keys(friedrichMasterworks).length} works 🆕`);
console.log(`   - Goya: ${Object.keys(goyaMasterworks).length} works`);
console.log(`   - Delacroix: ${Object.keys(delacroixMasterworks).length} works`);
console.log(`   - Millet: ${Object.keys(milletMasterworks).length} works`);
console.log(`   - Manet: ${Object.keys(manetMasterworks).length} works`);
console.log(`   ── 인상주의 ──`);
console.log(`   - Renoir: ${Object.keys(renoirMasterworks).length} works`);
console.log(`   - Degas: ${Object.keys(degasMasterworks).length} works`);
console.log(`   - Monet: ${Object.keys(monetMasterworks).length} works`);
console.log(`   - Caillebotte: ${Object.keys(caillebotteMasterworks).length} works`);
console.log(`   ── 후기인상주의 ──`);
console.log(`   - Van Gogh: ${Object.keys(vangoghMasterworks).length} works ⭐`);
console.log(`   - Gauguin: ${Object.keys(gauguinMasterworks).length} works`);
console.log(`   - Cézanne: ${Object.keys(cezanneMasterworks).length} works`);
console.log(`   - Signac: ${Object.keys(signacMasterworks).length} works`);
console.log(`   ── 야수파 ──`);
console.log(`   - Matisse: ${Object.keys(matisseMasterworks).length} works ⭐`);
console.log(`   - Derain: ${Object.keys(derainMasterworks).length} works`);
console.log(`   - Vlaminck: ${Object.keys(vlaminckMasterworks).length} works`);
console.log(`   ── 표현주의 ──`);
console.log(`   - Munch: ${Object.keys(munchMasterworks).length} works ⭐`);
console.log(`   - Kokoschka: ${Object.keys(kokoschkaMasterworks).length} works`);
console.log(`   - Kirchner: ${Object.keys(kirchnerMasterworks).length} works`);
console.log(`   - Kandinsky: ${Object.keys(kandinskyMasterworks).length} works`);
console.log(`   - Schiele: ${Object.keys(schieleMasterworks).length} works 🆕`);
console.log(`   ════════════════════════════════`);
console.log(`   📊 TOTAL: ${Object.keys(allMovementMasterworks).length} masterworks (37 artists)`);

export default {
  allMovementMasterworks,
  getMovementMasterwork,
  getArtistMasterworkList,
  getMasterworkGuideForAI
};
