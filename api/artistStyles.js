// ========================================
// 🎨 통합 화풍 프롬프트 (artistStyles.js) v67
// v67: v61 프롬프트로 통일 (간결화)
//      동양화 7개 추가 (minhwa, pungsokdo, jingyeong, shuimohua, gongbi, huaniaohua, ukiyoe)
//      Courbet 추가 (사실주의)
//     - "by [Artist], [Artist] art style" 패턴 적용
//     - FLUX 효율적 전달 방식 (연구 결과 기반)
//     - 핵심 내용 유지하면서 더 명확한 전달
// 모든 화가의 화풍을 한 곳에서 관리
// ========================================

// 공통 상수 - v64: 자연어 문장형
export const GENDER_RULE = 'CRITICAL: NO nudity, NO naked bodies, NO exposed breasts, NO sexual content - subjects must be FULLY CLOTHED at all times. Preserve the original gender and ethnicity exactly. If the photo shows a male subject, the painting must have a masculine face with strong jaw and male bone structure without any feminine features - do not feminize, soften or make delicate, keep as a man. If the photo shows a female subject, the painting must have a feminine face with soft features and female bone structure without any masculine features - do not masculinize or make rough, keep as a woman. Preserve the original ethnicity and skin color exactly without changing race or lightening or darkening skin - Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';

export const PAINT_TEXTURE = ' This must look like a real hand-painted oil painting with very thick visible brushstrokes of 20mm or thicker throughout. It must NOT look like a photograph, NOT 3D render, NOT digital art, NOT photorealistic, NOT smooth, NOT AI-generated photo. CRITICAL: NO nudity, NO naked bodies, NO exposed breasts - must be FULLY CLOTHED.';

// ========================================
// 📚 모든 화가 화풍 프롬프트
// ========================================
export const ARTIST_STYLES = {
  
  // ========================================
  // 🏛️ 고대 
  // ========================================
  'classical-sculpture': 'Ancient Greek-Roman marble sculpture style, classical sculpture aesthetic: PURE WHITE CARRARA MARBLE, polished marble surface with subtle veining, pure white/cream/grey tones ONLY, transform clothing to carved marble toga/tunic with realistic stone fabric folds, ALL skin becomes smooth polished marble, heroic classical proportions, museum pedestal display, dramatic sculptural lighting, apply marble effect to SUBJECT not just background',
  
  'roman-mosaic': 'Ancient Roman floor mosaic style, Roman mosaic aesthetic: LARGE VISIBLE TESSERAE TILES 50mm each, THICK BLACK GROUT LINES clearly visible between every tile, terracotta/ochre/umber/ivory/slate color palette, Pompeii villa floor style, transform clothing to toga/tunic, apply mosaic tiles to SUBJECT including face and body not just background',

  // ========================================
  // ⛪ 중세 
  // ========================================
  'byzantine': 'Byzantine sacred icon painting style, Byzantine art aesthetic: CIRCULAR GOLDEN HALO behind head, GOLD LEAF mosaic background with visible tiny tesserae, flat hieratic frontal pose, LARGE SOLEMN EYES gazing at viewer, rich jewel colors (deep red/royal blue/purple) for robes, transform clothing to Byzantine robes with gold decorations and jewels, Eastern Orthodox icon style, visible paint and gold texture',
  
  'gothic': 'Gothic cathedral STAINED GLASS window style: MANDATORY THICK BLACK LEAD LINES (cames) dividing ENTIRE image into distinct glass segments - face/body/clothing/background ALL separated by bold black outlines, JEWEL-TONE TRANSLUCENT COLORS (ruby red/sapphire blue/emerald green/amber gold) filling each segment, FLAT TWO-DIMENSIONAL medieval style with NO realistic shading, every area must look like colored glass piece outlined in BLACK LEAD, pointed arch frame, divine light streaming through, transform clothing to medieval style, NOT oil painting NOT realistic',
  
  'islamic-miniature': 'Persian Ottoman court miniature painting style: intricate delicate details with fine brushwork, vibrant jewel colors (ruby red/sapphire blue/emerald green/gold), flat decorative composition, ornamental floral patterns and arabesques, Persian or Ottoman court clothing, luxurious manuscript illumination quality, richly decorated background',

  // ========================================
  // 🎨 르네상스 
  // ========================================
  'botticelli': 'Transform into an oil painting by Sandro Botticelli, Botticelli art style. GRACEFUL FLOWING LINES with ELEGANT ELONGATED figures. ETHEREAL PALE SKIN with soft rose tints. Hair with FLOWING GOLDEN WAVES. SHEER DIAPHANOUS FABRICS billowing gently. SWEET MELANCHOLIC expressions. Decorative FLORAL backgrounds. Early Renaissance Florentine grace. Include visible tempera brushwork of 25mm or thicker.' + PAINT_TEXTURE,
  
  'leonardo': 'Transform into an oil painting by Leonardo da Vinci, Leonardo da Vinci art style. Extreme sfumato technique where all edges are soft and blurred like smoke. Zero sharp lines, every boundary dissolved into hazy atmospheric mist. Faces emerging from smoky darkness. Warm golden-brown Renaissance palette. Soft focus throughout like looking through gauze. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'titian': 'Transform into an oil painting by Titian, Titian art style. Venetian Renaissance with rich warm colors and glowing golden flesh tones. Loose expressive brushwork visible in fabrics. Dramatic atmospheric backgrounds. Sensuous rendering of silk, velvet and skin textures. Venetian colorito tradition. Deep reds, golds and earth tones. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'michelangelo': 'Transform into an oil painting by Michelangelo, Michelangelo art style. Heroic sculptural figures with powerful muscular anatomy. Sistine Chapel style monumental grandeur. Dramatic foreshortening and dynamic poses. Strong modeling with clear light and shadow. Idealized human form with classical proportions. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'raphael': 'Transform into an oil painting by Raphael, Raphael art style. Perfect harmonious beauty and idealized graceful figures. Serene balanced compositions. Sweet gentle expressions. Clear luminous colors. Elegant flowing drapery. School of Athens style classical perfection. Soft modeling and gentle transitions. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🎭 바로크 
  // ========================================
  'caravaggio': 'Transform into an oil painting by Caravaggio, Caravaggio art style. Dramatic tenebrism with extreme light-dark contrast. Single theatrical spotlight illuminating figures from darkness. Deep black shadows engulfing most of the scene. Intense emotional realism. Rich saturated colors emerging from darkness. THICK VISIBLE BRUSHSTROKES on FACE and SKIN with rough impasto texture. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'rubens': 'Transform into an oil painting by Peter Paul Rubens, Rubens art style. Warm sensual flesh tones and luminous glowing skin. Dynamic swirling composition full of movement and energy. Rich warm palette of reds, golds and creams. Voluptuous graceful forms. Romantic intimate atmosphere. Visible energetic brushwork. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'rembrandt': 'Transform into an oil painting by Rembrandt, Rembrandt art style. Golden luminous light and warm glowing illumination. Subtle light gradations revealing form from shadow. Rich impasto brushwork visible in highlights. Deep psychological introspection. Warm brown and gold palette. The Night Watch style dramatic lighting. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'velazquez': 'Transform into an oil painting by Diego Velázquez, Velázquez art style. Sophisticated court elegance and dignified formal poses. Loose confident brushwork visible up close. Subtle silver-grey palette with rich blacks. Atmospheric perspective for depth. Las Meninas style complex spatial arrangement. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌸 로코코 
  // ========================================
  'watteau': 'Transform into an oil painting by Antoine Watteau, Watteau art style. Fête galante outdoor aristocratic gathering. Transform clothing to Rococo aristocratic silk costumes. Soft dreamy pastoral landscape. Delicate feathery brushwork. Romantic melancholic atmosphere. Pale pastel colors with touches of rose and gold. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'boucher': 'Transform into an oil painting by François Boucher, Boucher art style. Decorative beauty with soft rosy flesh tones. Rococo aristocratic style. Playful mythological or pastoral scenes. Light pastel palette of pink, blue and cream. Fluffy clouds and lush foliage. Ornate Rococo decoration. Sweet idealized figures. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🏛️ 신고전주의 
  // ========================================
  'david': 'Transform into an oil painting by Jacques-Louis David, David art style. Neoclassical perfection with clear crisp outlines. Heroic idealized figures in classical poses. Cool restrained color palette. Dramatic moral narratives. Oath of the Horatii style civic virtue. Sculptural modeling. VISIBLE OIL PAINT TEXTURE with THICK BRUSHSTROKES on face, skin, and clothing. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'ingres': 'Transform into an oil painting by Jean-Auguste-Dominique Ingres, Ingres art style. Perfectly smooth flowing contours. Porcelain-smooth skin. Elegant sinuous curves and graceful elongated forms. Cool serene color palette. Meticulous precise detail. VISIBLE OIL PAINT TEXTURE - this is a painting NOT a photograph. Include visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌊 낭만주의 
  // ========================================
  'turner': 'Transform into an oil painting by J.M.W. Turner, Turner art style. Atmospheric sublime quality with swirling mist, light and color. Dramatic natural phenomena. Luminous golden light dissolving forms. Romantic awe-inspiring landscapes. THICK IMPASTO brushstrokes with heavy paint texture visible throughout. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'delacroix': 'Transform into an oil painting by Eugène Delacroix, Delacroix art style. Passionate revolutionary energy in Liberty Leading the People style. Vivid intense colors with bold reds, blues and warm golden tones. Dynamic diagonal compositions with turbulent swirling movement. THICK EXPRESSIVE BRUSHSTROKES full of emotion. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌾 사실주의 (Realism)
  // ========================================
  'courbet': 'Transform into an oil painting by Gustave Courbet, Courbet art style. Raw unidealized realism depicting subjects as they are. Bold palette knife technique with thick impasto paint. Dark earthy palette with rich browns, greens and ochres. Powerful social realism. The Stone Breakers style working class dignity. THICK VISIBLE BRUSHSTROKES and palette knife marks throughout. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'manet': 'Transform into an oil painting by Édouard Manet, Manet art style. Modern Paris realism in Olympia-style bold flat composition. Transform clothing to 19th century Parisian bourgeois fashion. Dramatic blacks and pure whites with minimal mid-tones. Sophisticated urban café society atmosphere. Frank direct confrontational gaze. THICK VISIBLE BRUSHSTROKES. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌅 인상주의 (Impressionism)
  // ========================================
  'renoir': 'Transform into an oil painting by Pierre-Auguste Renoir, Renoir art style. SOFT FEATHERY BRUSHSTROKES with WARM LUMINOUS GLOW. Skin with ROSY PINK flesh tones and PEARLY WHITE highlights. DAPPLED SUNLIGHT effect. Warm harmonious colors - PEACH, PINK, CORAL, GOLD. Hair with GOLDEN COPPER tones. SOFT IMPRESSIONIST foliage background. JOYFUL INTIMATE atmosphere. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'monet': 'Transform into an oil painting by Claude Monet, Monet art style. BROKEN COLOR brushstrokes capturing FLEETING LIGHT. SOFT HAZY ATMOSPHERIC effects like morning mist. Colors BLEND and DISSOLVE into each other. NO sharp edges - everything slightly BLURRED and DREAMY. COOL BLUE-GREEN palette with warm accents. Water Lilies style light dissolution. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'degas': 'Transform into an oil painting by Edgar Degas, Degas art style. UNUSUAL CROPPED ANGLES and ASYMMETRIC composition. SOFT PASTEL texture with visible CHALKY strokes. Pale muted colors - soft PINK, PEACH, POWDER BLUE. MOVEMENT and GESTURE with delicate precise drawing. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'caillebotte': 'Transform into an oil painting by Gustave Caillebotte, Caillebotte art style. DRAMATIC PERSPECTIVE with strong converging lines. Paris Street Rainy Day style urban scenes. Muted GRAY-BLUE tones with warm accents. Elegant bourgeois figures. Wet pavement reflections. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌻 후기인상주의 (Post-Impressionism)
  // ========================================
  'vangogh': 'Transform into an oil painting by Vincent van Gogh, Van Gogh art style. SWIRLING SPIRAL DIRECTIONAL BRUSHSTROKES throughout ENTIRE image - sky, background, clothing, hair, AND SKIN must ALL have visible curved brushstrokes. COBALT BLUE and CHROME YELLOW and ORANGE as dominant colors. Sky with SWIRLING CIRCULAR patterns like Starry Night. CYPRESS TREES or swirling vegetation in background. Face and skin with THICK IMPASTO brushstrokes. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'gauguin': 'Transform into an oil painting by Paul Gauguin, Gauguin Tahitian art style. Cloisonnism technique with bold black outlines separating flat color areas. Pure unmixed saturated colors in simplified shapes. Primitivism aesthetic with raw primitive power. Exotic tropical palette - deep orange, ochre yellow, turquoise, rich purple, vibrant green. Warm golden-brown skin tones. Lush Tahitian tropical background with palm trees and exotic flowers. Do not create mosaic effect or stained glass look. Include very thick visible brushstrokes of 25mm or thicker.',
  
  'cezanne': 'Transform into an oil painting by Paul Cézanne, Cézanne art style. Build forms with GEOMETRIC COLOR PLANES and PARALLEL DIRECTIONAL BRUSHSTROKES. Simplify shapes into basic geometric forms. MUTED EARTH TONES - ochres, greens, blues, warm browns. FLAT COLOR PATCHES that construct volume through color relationships NOT shading. Brushstrokes follow consistent DIRECTIONAL patterns. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'signac': 'Transform into a painting by Paul Signac, Signac Neo-Impressionist art style. Pointillist technique with large visible dots of 8mm each. Soft pastel color palette - pale pink, light blue, soft lavender, mint green, peach, cream yellow. Dots cover face, body and clothing. Bright Mediterranean sunlight. Dots blend optically when viewed from distance. Each dot individually visible.',

  // ========================================
  // 🔥 야수파 (Fauvism)
  // ========================================
  'matisse': 'Transform into an oil painting by Henri Matisse, Matisse Fauvist art style. BOLD FLAT COLOR AREAS with STRONG DARK OUTLINES. Face with UNREALISTIC COLORS - bright RED or ORANGE patches on cheeks, GREEN or BLUE shadows. PURE SATURATED PRIMARY COLORS - vivid reds, yellows, blues, greens that CLASH and VIBRATE. FLAT 2D DECORATIVE style with NO realistic shading. Background with BOLD DECORATIVE PATTERNS. Simplify forms with CURVED FLOWING LINES. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'derain': 'Transform into an oil painting by André Derain, Derain Fauvist art style. WILD UNNATURAL COLORS - orange sky, blue trees, green faces, purple shadows. BOLD FLAT COLOR PATCHES with visible brushstrokes. Strong color contrasts with pure unmixed pigments. Energetic rough brushwork throughout. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'vlaminck': 'Transform into an oil painting by Maurice de Vlaminck, Vlaminck Fauvist art style. VIOLENT EXPLOSIVE COLORS with AGGRESSIVE brushwork. Most INTENSE saturated colors - fiery reds, electric blues, acid greens. THICK IMPULSIVE brushstrokes showing raw emotional energy. Van Gogh-influenced passionate intensity. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 😱 표현주의 (Expressionism)
  // ========================================
  'munch': 'Expressionist oil painting by Edvard Munch, Munch Expressionist art style. Intense psychological emotion. Wavy distorted swirling lines throughout. Apply distortion to figures too. Blood red dramatic sky. Anxiety and existential dread. Vivid emotional colors. Distorted forms. Visible thick expressive brushwork. Emotional impact.' + PAINT_TEXTURE,
  
  'kirchner': 'Transform into an oil painting by Ernst Ludwig Kirchner, Kirchner Expressionist art style. ANGULAR JAGGED forms with ELONGATED SHARP features. Faces MASK-LIKE and SIMPLIFIED with exaggerated angular shapes. BOLD CLASHING COLORS - acid GREEN, hot PINK, electric BLUE, harsh ORANGE, deep RED. GEOMETRIC COLOR BLOCKS with BLACK OUTLINES. Die Brücke German Expressionist raw primitive intensity. FLAT COLOR PLANES. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'kokoschka': 'Transform into an oil painting by Oskar Kokoschka, Kokoschka Expressionist art style. DISTORT facial features with ANGULAR EXAGGERATED forms. VIOLENT TURBULENT BRUSHWORK with paint scraped and slashed. HARSH ACIDIC COLORS - sickly greens, bruised purples, feverish reds. Face with PSYCHOLOGICAL TENSION and warped features. Background CHURNING with NERVOUS ENERGY. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🎪 모더니즘 (Modernism)
  // ========================================
  'picasso': 'Transform into a Cubist OIL PAINTING by Pablo Picasso, Picasso Cubist art style. CUBIST FRAGMENTATION: Face SHATTERED into ANGULAR GEOMETRIC PLANES showing MULTIPLE VIEWPOINTS simultaneously - nose from SIDE while BOTH EYES visible from FRONT. THICK BLACK OUTLINES separating each geometric section. MONOCHROMATIC palette - BLACK, WHITE, GRAYS for Guernica style, OR bold colors (cobalt blue, terracotta, ochre). FLAT ANGULAR PLANES like fractured mirror. Background also FRAGMENTED. African mask angularity. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'magritte': 'Transform into a Surrealist oil painting by René Magritte, Magritte Surrealist art style. Philosophical visual paradox. The Son of Man style with mysterious object partially obscuring face, or Golconda style multiplication of same figure repeated floating through sky. Bowler hat gentleman aesthetic. Smooth but visible oil painting technique. Dreamlike impossible scenarios. Belgian Surrealist thought-provoking conceptual art. Include visible brushwork.' + PAINT_TEXTURE,
  
  'miro': 'Transform into an abstract oil painting by Joan Miró, Miró Surrealist art style. Playful biomorphic shapes floating on canvas. Childlike symbols including stars, moons, eyes and birds. Primary colors - red, blue, yellow on white or neutral background. Spontaneous automatic drawing style. Whimsical dreamlike universe. Black calligraphic lines. Catalan Surrealist fantasy. Joyful cosmic abstraction. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'chagall': 'Transform into a dreamlike painting by Marc Chagall, Chagall art style. SOFT PASTEL COLORS - lavender, pale blue, rose pink, soft yellow. DREAMY FLOATING atmosphere with tilted village houses. Figures with ROUNDED SOFT FACES and CLOSED or DREAMY EYES. GENTLE CURVED LINES throughout. NOSTALGIC ROMANTIC mood with poetic lyrical quality. Soft feathery brushstrokes. Jewish folklore dreamscape elements. GENTLE, SOFT, DREAMLIKE feel. Include visible brushwork of 25mm or thicker.' + PAINT_TEXTURE,
  
  'warhol': 'Pop art artwork by Andy Warhol, Warhol pop art style: 2x2 FOUR-PANEL GRID mandatory with same person repeated 4 times, DIFFERENT BOLD NEON COLOR in each panel (hot pink/cyan/yellow/orange/electric blue/lime green), high contrast silkscreen print effect with ink imperfections and halftone, flat graphic pop art style, bold colors mass culture theme, comic book style outlines, DO NOT draw Marilyn Monroe herself',
  
  'lichtenstein': 'Transform into Pop Art by Roy Lichtenstein, Lichtenstein Pop Art style. Comic book style with visible Ben-Day dots pattern throughout entire image. Thick black outlines around all forms. Primary colors - red, yellow, blue with white. Speech bubble aesthetic. Dramatic comic panel composition. Halftone printing effect. Bold graphic simplification. Visible paint texture on dots.',
  
  'haring': 'Transform into street art by Keith Haring, Keith Haring art style. Bold continuous black outlines. Simplified dancing human figures with radiant energy lines emanating from bodies. Flat bright colors - red, yellow, blue, green. Dynamic movement and rhythm. Subway graffiti aesthetic. Joyful kinetic energy. Interlocking figures. Visible spray paint or marker texture. Include very thick visible brushstrokes of 20mm or thicker.',

  // ========================================
  // ⭐ 거장 전용 (Masters Only)
  // ========================================
  'klimt': 'Transform into an oil painting by Gustav Klimt, Klimt Vienna Secession art style. Elaborate golden patterns and real gold leaf texture throughout. Byzantine mosaic decorative elements. Flat ornamental backgrounds covered in geometric spirals, circles and rectangular motifs in shimmering gold leaf. Sensuous organic forms emerging from abstract decorative fields. Art Nouveau flowing curves with geometric precision. Rich textures of gold, silver and precious jewel-like colors - deep ruby red, sapphire blue, emerald green. The Kiss style intimate embrace aesthetic. Erotic intimate mood within sacred ornamental splendor. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'frida': 'Transform into an oil painting by Frida Kahlo, Frida Kahlo Mexican Surrealist art style. Intense direct gaze portrait with unflinching emotional honesty. Vibrant Mexican folk art colors - bright red, yellow, green, blue, pink. Lush tropical jungle foliage background. Symbolic personal imagery - thorns, ribbons, hearts, veins. Distinctive facial features with prominent connected eyebrows. Traditional Mexican Tehuana dress with floral headpiece and elaborate jewelry. Symbolic animals - monkeys, hummingbirds, black cats, deer, parrots. Raw vulnerability combined with fierce strength. Surreal juxtaposition of pain and beauty. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🎎 동양화 (Oriental Art) - v67 추가
  // ========================================
  'minhwa': 'Korean folk painting (Minhwa) style from late Joseon Dynasty. MINERAL PIGMENTS on AGED YELLOWED HANJI PAPER with visible paper texture. OLD FADED WEATHERED colors like antique painting 200+ years old. Muted earthy tones - faded ochre, dusty red, weathered green, pale greyish blue. ROUGH FOLK ART brush strokes with uneven pigment. Visible hanji paper texture throughout. Slightly yellowed aged background. Primitive naive quality. Museum artifact quality with aged patina. NO bright saturated colors, NO digital rendering, NO smooth surfaces, NO animation style, NO Japanese elements.',
  
  'pungsokdo': 'Korean genre painting (Pungsokdo) style by master Kim Hongdo. SOFT WATERCOLOR WASHES on traditional Korean paper. DELICATE FLOWING BRUSH LINES for figures. Everyday life scenes of Joseon Dynasty Korea. Limited subtle color palette - soft browns, muted greens, pale blues. EMPTY SPACE as compositional element. Light loose brushwork. Traditional Korean clothing (hanbok). Gentle humorous narrative quality. NO heavy oil textures, NO Western perspective, NO Japanese ukiyo-e style.',
  
  'jingyeong': 'Korean true-view landscape painting (Jingyeong Sansu) style by master Jeong Seon. BOLD EXPRESSIVE BRUSH STROKES for mountains. Korean mountain scenery with distinctive granite peaks. Strong ink work with dynamic energy. Traditional Korean landscape composition. Misty atmospheric perspective. Pine trees with characteristic Korean style. NO Chinese painting style, NO Japanese style.',
  
  'shuimohua': 'Chinese ink wash painting (Shuimohua/水墨画) style. BLACK INK on RICE PAPER with VISIBLE PAPER GRAIN texture. MONOCHROME ink with subtle grey gradations. EMPTY NEGATIVE SPACE as key compositional element. SPONTANEOUS EXPRESSIVE brush strokes. Soft atmospheric perspective. Traditional Chinese clothing (hanfu). Misty mountain backgrounds. Poetry and philosophy in visual form. NO color, NO Western oil painting technique.',
  
  'gongbi': 'Chinese meticulous court painting (Gongbi/工筆) style. FINE DETAILED BRUSHWORK with precise outlines. MINERAL PIGMENTS on silk with subtle sheen. Rich vivid colors - vermillion, malachite green, azurite blue, gold. Tang/Song Dynasty court elegance. Elaborate patterns on robes. Idealized graceful figures. Imperial court aesthetic. Highly refined technique with no visible brushstrokes.',
  
  'huaniaohua': 'Chinese flower and bird painting (Huaniaohua/花鳥画) style. DELICATE PRECISE BRUSHWORK for petals and feathers. Natural subjects with botanical accuracy. Subtle color gradations. Silk or paper with visible texture. Elegant composition with empty space. Traditional Chinese aesthetic. Poetic naturalism.',
  
  'ukiyoe': 'Japanese Ukiyo-e woodblock print style. FLAT COLOR AREAS with BOLD BLACK OUTLINES. LIMITED COLOR PALETTE of traditional woodblock inks. WOODGRAIN TEXTURE visible in color areas. Stylized Japanese figures with distinctive features. Dramatic compositions. Floating world aesthetic. Kabuki drama or courtesan elegance. NO photography, NO 3D rendering, NO gradients.'
};

// ========================================
// 🔍 화풍 조회 함수
// ========================================

/**
 * 화가 키로 화풍 프롬프트 가져오기
 * @param {string} artistKey - 화가 키 (예: 'vangogh', 'monet', 'picasso')
 * @returns {string|null} 화풍 프롬프트
 */
export function getArtistStyle(artistKey) {
  const normalized = artistKey.toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/é/g, 'e')
    .replace(/ó/g, 'o');
  
  return ARTIST_STYLES[normalized] || null;
}

/**
 * 화가 이름으로 화풍 프롬프트 가져오기 (다양한 표기 지원)
 * @param {string} artistName - 화가 이름 (영문, 한글, 풀네임 등)
 * @returns {string|null} 화풍 프롬프트
 */
export function getArtistStyleByName(artistName) {
  const normalized = artistName.toUpperCase().trim();
  
  // 이름 매핑
  const nameToKey = {
    // 고대
    'CLASSICAL': 'classical-sculpture', 'SCULPTURE': 'classical-sculpture', '조각': 'classical-sculpture',
    'CLASSICAL SCULPTURE': 'classical-sculpture', 'GREEK SCULPTURE': 'classical-sculpture', 'ROMAN SCULPTURE': 'classical-sculpture',
    'MARBLE': 'classical-sculpture', 'MARBLE SCULPTURE': 'classical-sculpture',
    'MOSAIC': 'roman-mosaic', 'ROMAN': 'roman-mosaic', '모자이크': 'roman-mosaic',
    'ROMAN MOSAIC': 'roman-mosaic', 'ANCIENT MOSAIC': 'roman-mosaic',
    
    // 중세
    'BYZANTINE': 'byzantine', '비잔틴': 'byzantine', 'BYZANTINE ICON': 'byzantine', 'BYZANTINE MOSAIC': 'byzantine',
    'GOTHIC': 'gothic', '고딕': 'gothic', 'GOTHIC STAINED GLASS': 'gothic', 'STAINED GLASS': 'gothic',
    'ISLAMIC': 'islamic-miniature', 'MINIATURE': 'islamic-miniature', '이슬람': 'islamic-miniature',
    'ISLAMIC MINIATURE': 'islamic-miniature', 'PERSIAN MINIATURE': 'islamic-miniature', 'OTTOMAN MINIATURE': 'islamic-miniature',
    
    // 르네상스
    'BOTTICELLI': 'botticelli', '보티첼리': 'botticelli', 'SANDRO BOTTICELLI': 'botticelli',
    'LEONARDO': 'leonardo', 'DA VINCI': 'leonardo', '다빈치': 'leonardo', '레오나르도': 'leonardo', 'LEONARDO DA VINCI': 'leonardo',
    'TITIAN': 'titian', '티치아노': 'titian', 'TIZIANO': 'titian',
    'MICHELANGELO': 'michelangelo', '미켈란젤로': 'michelangelo', 'MICHELANGELO BUONARROTI': 'michelangelo',
    'RAPHAEL': 'raphael', '라파엘로': 'raphael', 'RAFFAELLO': 'raphael', 'RAFFAELLO SANZIO': 'raphael',
    
    // 바로크
    'CARAVAGGIO': 'caravaggio', '카라바조': 'caravaggio', 'MICHELANGELO MERISI DA CARAVAGGIO': 'caravaggio',
    'RUBENS': 'rubens', '루벤스': 'rubens', 'PETER PAUL RUBENS': 'rubens',
    'REMBRANDT': 'rembrandt', '렘브란트': 'rembrandt', 'REMBRANDT VAN RIJN': 'rembrandt',
    'VELÁZQUEZ': 'velazquez', 'VELAZQUEZ': 'velazquez', '벨라스케스': 'velazquez', 'DIEGO VELÁZQUEZ': 'velazquez', 'DIEGO VELAZQUEZ': 'velazquez',
    
    // 로코코
    'WATTEAU': 'watteau', '와토': 'watteau', 'ANTOINE WATTEAU': 'watteau', 'JEAN-ANTOINE WATTEAU': 'watteau',
    'BOUCHER': 'boucher', '부셰': 'boucher', 'FRANÇOIS BOUCHER': 'boucher', 'FRANCOIS BOUCHER': 'boucher',
    
    // 신고전/낭만/사실
    'DAVID': 'david', '다비드': 'david', 'JACQUES-LOUIS DAVID': 'david',
    'INGRES': 'ingres', '앵그르': 'ingres', 'JEAN-AUGUSTE-DOMINIQUE INGRES': 'ingres',
    'DELACROIX': 'delacroix', '들라크루아': 'delacroix', 'EUGÈNE DELACROIX': 'delacroix', 'EUGENE DELACROIX': 'delacroix',
    'COURBET': 'courbet', '쿠르베': 'courbet', 'GUSTAVE COURBET': 'courbet',
    'MANET': 'manet', '마네': 'manet', 'ÉDOUARD MANET': 'manet', 'EDOUARD MANET': 'manet',
    
    // 인상주의
    'RENOIR': 'renoir', '르누아르': 'renoir', 'PIERRE-AUGUSTE RENOIR': 'renoir',
    'MONET': 'monet', '모네': 'monet', 'CLAUDE MONET': 'monet',
    'DEGAS': 'degas', '드가': 'degas', 'EDGAR DEGAS': 'degas',
    'CAILLEBOTTE': 'caillebotte', '카유보트': 'caillebotte', '칼리보트': 'caillebotte', 'GUSTAVE CAILLEBOTTE': 'caillebotte',
    
    // 후기인상주의
    'VAN GOGH': 'vangogh', 'GOGH': 'vangogh', '반 고흐': 'vangogh', '고흐': 'vangogh', '빈센트': 'vangogh', 'VINCENT VAN GOGH': 'vangogh',
    'GAUGUIN': 'gauguin', '고갱': 'gauguin', 'PAUL GAUGUIN': 'gauguin',
    'CÉZANNE': 'cezanne', 'CEZANNE': 'cezanne', '세잔': 'cezanne', 'PAUL CÉZANNE': 'cezanne', 'PAUL CEZANNE': 'cezanne',
    'SIGNAC': 'signac', '시냐크': 'signac', 'PAUL SIGNAC': 'signac',
    
    // 야수파
    'MATISSE': 'matisse', '마티스': 'matisse', 'HENRI MATISSE': 'matisse',
    'DERAIN': 'derain', '드랭': 'derain', 'ANDRÉ DERAIN': 'derain', 'ANDRE DERAIN': 'derain',
    'VLAMINCK': 'vlaminck', '블라맹크': 'vlaminck', 'MAURICE DE VLAMINCK': 'vlaminck',
    
    // 표현주의
    'MUNCH': 'munch', '뭉크': 'munch', 'EDVARD MUNCH': 'munch',
    'KIRCHNER': 'kirchner', '키르히너': 'kirchner', 'ERNST LUDWIG KIRCHNER': 'kirchner',
    'KOKOSCHKA': 'kokoschka', '코코슈카': 'kokoschka', 'OSKAR KOKOSCHKA': 'kokoschka',
    
    // 모더니즘
    'PICASSO': 'picasso', '피카소': 'picasso',
    'MAGRITTE': 'magritte', '마그리트': 'magritte',
    'MIRÓ': 'miro', 'MIRO': 'miro', '미로': 'miro',
    'CHAGALL': 'chagall', '샤갈': 'chagall',
    'WARHOL': 'warhol', '워홀': 'warhol',
    'LICHTENSTEIN': 'lichtenstein', '리히텐슈타인': 'lichtenstein',
    'HARING': 'haring', 'KEITH HARING': 'haring', '해링': 'haring', '키스 해링': 'haring',
    
    // 거장 전용
    'KLIMT': 'klimt', '클림트': 'klimt',
    'FRIDA': 'frida', 'KAHLO': 'frida', '프리다': 'frida', '칼로': 'frida',
    
    // 동양화
    'MINHWA': 'minhwa', '민화': 'minhwa', 'KOREAN FOLK': 'minhwa',
    'PUNGSOKDO': 'pungsokdo', '풍속도': 'pungsokdo', 'GENRE PAINTING': 'pungsokdo',
    'JINGYEONG': 'jingyeong', '진경산수': 'jingyeong', 'TRUE VIEW': 'jingyeong',
    'SHUIMOHUA': 'shuimohua', '수묵화': 'shuimohua', 'INK WASH': 'shuimohua',
    'GONGBI': 'gongbi', '공필화': 'gongbi', 'METICULOUS': 'gongbi',
    'HUANIAOHUA': 'huaniaohua', '화조화': 'huaniaohua', 'FLOWER BIRD': 'huaniaohua',
    'UKIYOE': 'ukiyoe', '우키요에': 'ukiyoe', 'WOODBLOCK': 'ukiyoe'
  };
  
  // 직접 매칭
  for (const [name, key] of Object.entries(nameToKey)) {
    if (normalized.includes(name)) {
      return ARTIST_STYLES[key];
    }
  }
  
  return null;
}

// 콘솔 로그
console.log('📚 Artist Styles loaded:', Object.keys(ARTIST_STYLES).length, 'artists');
