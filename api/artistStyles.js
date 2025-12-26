// ========================================
// 🎨 통합 화풍 프롬프트 (artistStyles.js) v2
// v2: 자연어 문장형 프롬프트 적용
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
  'classical-sculpture': 'Transform into ancient Greek-Roman MARBLE SCULPTURE. PURE WHITE CARRARA MARBLE with smooth polished surface and subtle veining. Subject wears WHITE DRAPED TOGA with elegant stone fabric folds. MONOCHROMATIC white, cream, grey tones ONLY. Heroic classical proportions like Discobolus or Augustus. Museum pedestal display with neutral grey background and dramatic sculptural lighting. Frozen dynamic moment in eternal marble. NOT colorful, NOT mosaic, NOT photograph, NOT 3D render',
  
  'roman-mosaic': 'Transform into ancient ROMAN FLOOR MOSAIC in Pompeii villa style. LARGE VISIBLE SQUARE TESSERAE TILES of 50mm with THICK DARK GROUT LINES between every tile. Face and body made of stone tiles with grid pattern. LIMITED ANCIENT COLORS: terracotta orange, ochre yellow, umber brown, ivory white, slate blue, olive green. White draped toga clothing. Authentic Roman mosaic craftsmanship like Alexander Mosaic',

  // ========================================
  // ⛪ 중세 
  // ========================================
  'byzantine': 'Transform into BYZANTINE SACRED ICON painting. CIRCULAR GOLDEN HALO behind head. GOLD LEAF MOSAIC background with visible tiny tesserae tiles. Flat hieratic frontal pose with large solemn eyes. Byzantine robes in deep red, royal blue, purple with gold patterns. Eastern Orthodox icon style like Christ Pantocrator. NOT photograph, NOT 3D, NOT digital',
  
  'gothic': 'Transform into GOTHIC STAINED GLASS WINDOW style. THICK BLACK LEAD LINES dividing entire image into colored glass segments crossing through face, body, hair, clothing, background. JEWEL-TONE TRANSLUCENT COLORS: ruby red, sapphire blue, emerald green, amber gold, deep purple. FLAT TWO-DIMENSIONAL medieval aesthetic. Gothic pointed arch elements. NOT photograph, NOT 3D, NOT digital',
  
  'islamic-miniature': 'Transform into PERSIAN OTTOMAN COURT MINIATURE painting. Intricate delicate details with fine brushwork. Vibrant jewel colors: ruby red, sapphire blue, emerald green, gold. Flat decorative composition with ornamental floral patterns and arabesques. Persian or Ottoman court clothing. Luxurious manuscript illumination quality. NOT photograph, NOT 3D, NOT digital',

  // ========================================
  // 🎨 르네상스 
  // ========================================
  'botticelli': 'Transform into an oil painting by Sandro Botticelli, Botticelli art style. CRITICAL: Apply GRACEFUL FLOWING LINES with ELEGANT ELONGATED figures. Create ETHEREAL PALE SKIN with soft rose tints. Hair must have FLOWING GOLDEN WAVES with intricate patterns. Apply SHEER DIAPHANOUS FABRICS billowing gently - flowing robes and drapery like Birth of Venus. SWEET MELANCHOLIC expressions with delicate features. Decorative FLORAL backgrounds. Early Renaissance Florentine grace with mythological atmosphere. Classical poses with elegant gestures. Include visible tempera brushwork of 25mm or thicker.' + PAINT_TEXTURE,
  
  'leonardo': 'Transform this into an oil painting by Leonardo da Vinci, Leonardo da Vinci art style, with extreme sfumato technique where all edges are completely soft and blurred like smoke or fog. There should be zero sharp lines anywhere, with every boundary dissolved into hazy atmospheric mist and faces emerging from smoky darkness. Apply the Mona Lisa painting technique only for the mysterious sfumato haze while preserving the original face structure - do not transform the face into Mona Lisa face, apply Leonardo sfumato style not Mona Lisa likeness. Capture the Virgin of the Rocks atmospheric depth with warm golden-brown Renaissance palette. Create soft focus throughout like looking through gauze with oil painting subtle glazing layers and very thick visible brushstrokes of 20mm or thicker in the background.' + PAINT_TEXTURE,
  
  'titian': 'Transform this into an oil painting by Titian, Titian art style, Venetian Renaissance with rich warm colors and glowing golden flesh tones. Apply loose expressive brushwork especially visible in fabrics with dramatic atmospheric backgrounds. Create sensuous rendering of silk, velvet and skin textures in the Venetian colorito tradition with color over line. Capture the Portrait of a Man style dignified poses with deep reds, golds and earth tones using luminous glazing technique. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'michelangelo': 'Transform this into an oil painting by Michelangelo, Michelangelo art style, with heroic sculptural figures showing powerful muscular anatomy. Capture the Sistine Chapel style monumental grandeur with dramatic foreshortening and dynamic poses. Apply strong modeling with clear light and shadow, creating idealized human form with classical proportions. Use rich saturated colors with an architectural sense of space. Include visible brushstrokes with fresco-like texture and very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'raphael': 'Transform this into an oil painting by Raphael, Raphael art style, with perfect harmonious beauty and idealized graceful figures. Create serene balanced compositions with sweet gentle expressions and clear luminous colors. Apply elegant flowing drapery in the School of Athens style classical perfection with soft modeling and gentle transitions. Use visible soft brushwork with divine serenity and grace. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🎭 바로크 
  // ========================================
  'caravaggio': 'Transform this into an oil painting by Caravaggio, Caravaggio art style, with dramatic tenebrism and extreme light-dark contrast. Use a single theatrical spotlight illuminating figures from darkness with deep black shadows engulfing most of the scene. Capture intense emotional realism with rich saturated colors emerging from darkness and dramatic diagonal composition. CRITICAL: Apply THICK VISIBLE BRUSHSTROKES on FACE and SKIN with rough impasto texture showing individual brush marks on cheeks, forehead, and nose. The skin must NOT look smooth or photographic - it must show paint texture and brushwork like a real 17th century oil painting. Include very thick visible brushstrokes of 25mm or thicker throughout especially on illuminated flesh areas.' + PAINT_TEXTURE,
  
  'rubens': 'Transform this into an oil painting by Peter Paul Rubens, Rubens art style, with warm sensual flesh tones and luminous glowing skin. Create dynamic swirling composition full of movement and energy with a rich warm palette of reds, golds and creams. Apply voluptuous graceful forms with romantic intimate atmosphere in The Garden of Love style warmth and passion. Use visible energetic brushwork with fluid paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'rembrandt': 'Transform this into an oil painting by Rembrandt, Rembrandt art style, with golden luminous light and warm glowing illumination. Apply subtle light gradations revealing form from shadow with rich impasto brushwork visible in highlights. Capture deep psychological introspection with intimate emotional depth using a warm brown and gold palette in The Night Watch style dramatic lighting. Include very thick visible brushstrokes of 20mm or thicker especially in light areas.' + PAINT_TEXTURE,
  
  'velazquez': 'Transform this into an oil painting by Diego Velázquez, Velázquez art style, with sophisticated court elegance and dignified formal poses. Apply loose confident brushwork visible up close with a subtle silver-grey palette and rich blacks. Create atmospheric perspective for depth in Las Meninas style complex spatial arrangement with aristocratic refinement. Include very thick expressive brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌸 로코코 
  // ========================================
  'watteau': 'Transform this into an oil painting by Antoine Watteau, Watteau art style, depicting a fête galante outdoor aristocratic gathering. Transform the clothing to Rococo aristocratic silk costumes set in a soft dreamy pastoral landscape. Apply delicate feathery brushwork visible throughout with romantic melancholic atmosphere in Pilgrimage to Cythera style poetic reverie. Use pale pastel colors with touches of rose and gold, creating theatrical graceful poses. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'boucher': 'Transform this into an oil painting by François Boucher, Boucher art style, with decorative beauty and soft rosy flesh tones. Transform the clothing to Rococo aristocratic style with playful mythological or pastoral scenes. Apply a light pastel palette of pink, blue and cream with fluffy clouds and lush foliage. Use ornate Rococo decoration with sweet idealized figures and visible soft brushwork with delicate paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🏛️ 신고전주의 
  // ========================================
  'david': 'Transform this into an oil painting by Jacques-Louis David, David art style, with Neoclassical perfection and clear crisp outlines. Create heroic idealized figures in classical poses with a cool restrained color palette. Apply dramatic moral narratives in Oath of the Horatii style civic virtue with sculptural modeling. CRITICAL: This must show VISIBLE OIL PAINT TEXTURE with THICK BRUSHSTROKES on face, skin, and clothing - the surface must NOT look smooth or photographic. Apply rough canvas texture and visible brush marks throughout especially on flesh areas. Use balanced symmetrical compositions. Include very thick visible brushstrokes of 25mm or thicker on ALL surfaces including skin.' + PAINT_TEXTURE,
  
  'ingres': 'Transform this into an oil painting by Jean-Auguste-Dominique Ingres, Ingres art style, with perfectly smooth flowing contours and porcelain-smooth skin. Apply subtle brushwork visible in the background with elegant sinuous curves and graceful elongated forms. Create idealized beauty with a cool serene color palette and meticulous precise detail. CRITICAL: Despite smooth style, must show VISIBLE OIL PAINT TEXTURE - this is a painting NOT a photograph. Include canvas texture and subtle brush marks especially in background and clothing. Include very thick visible brushstrokes of 20mm or thicker in background areas.' + PAINT_TEXTURE,

  // ========================================
  // 🌊 낭만주의 
  // ========================================
  'turner': 'Transform this into an oil painting by J.M.W. Turner, Turner art style, with atmospheric sublime quality and swirling mist, light and color. Capture dramatic natural phenomena with luminous golden light dissolving forms. Create romantic awe-inspiring landscapes in The Fighting Temeraire style emotional power. CRITICAL: Apply THICK IMPASTO brushstrokes with heavy paint texture visible throughout - faces and figures must show rough painted surface NOT smooth skin. Include very thick visible brushstrokes of 25mm or thicker on ALL surfaces.' + PAINT_TEXTURE,
  
  'friedrich': 'Transform this into an oil painting by Caspar David Friedrich, Friedrich art style, in Wanderer above the Sea of Fog style with a sublime vast landscape stretching to the infinite horizon. Create mysterious atmospheric mist enveloping mountains and valleys with a solitary contemplative figure viewed from behind gazing into the immensity. Capture spiritual sense of awe with a cool somber palette of grays, blues and muted greens. CRITICAL: Apply VISIBLE BRUSHSTROKES throughout with oil paint texture - this must NOT look like a photograph. Include thick visible brushstrokes of 25mm or thicker especially on clothing and landscape.' + PAINT_TEXTURE,
  
  'goya': 'Transform this into an oil painting by Francisco Goya, Goya art style, with psychological intensity and penetrating gaze revealing inner truth. Apply dramatic chiaroscuro with deep shadows and stark contrasts in La Maja Vestida style Spanish elegance. Use a dark romantic palette with rich blacks and warm flesh tones. CRITICAL: Apply THICK VISIBLE BRUSHSTROKES on face, skin, and clothing with rough impasto texture - the surface must NOT look smooth or photographic. Include very thick visible brushstrokes of 25mm or thicker on ALL surfaces.' + PAINT_TEXTURE,
  
  'delacroix': 'Transform this into an oil painting by Eugène Delacroix, Delacroix art style, with passionate revolutionary energy in Liberty Leading the People style dramatic action. Use vivid intense colors with bold reds, blues and warm golden tones. Create dynamic diagonal compositions with turbulent swirling movement. CRITICAL: Apply THICK EXPRESSIVE BRUSHSTROKES full of emotion with heavy paint texture visible on face, skin, and figures - NOT smooth or photographic. Include very thick visible brushstrokes of 25mm or thicker throughout.' + PAINT_TEXTURE,

  // ========================================
  // 🌾 사실주의 (Realism)
  // ========================================
  'millet': 'Transform this into an oil painting by Jean-François Millet, Millet art style, depicting dignified rural labor with monumental peasant figures. Transform the clothing to 19th century peasant work clothes with a warm earthy palette of browns and ochres. Capture The Gleaners style quiet nobility with soft diffused light. CRITICAL: Apply VISIBLE BRUSHSTROKES with textured paint surface on face, skin, and clothing - this must NOT look like a photograph. Include very thick visible brushstrokes of 25mm or thicker on ALL surfaces.' + PAINT_TEXTURE,
  
  'manet': 'Transform this into an oil painting by Édouard Manet, Manet art style, with modern Paris realism in Olympia-style bold flat composition and striking contrasts. Transform the clothing to 19th century Parisian bourgeois fashion with dramatic blacks and pure whites using minimal mid-tones. Create sophisticated urban café society atmosphere with frank direct confrontational gaze. CRITICAL: Apply THICK VISIBLE BRUSHSTROKES with loose confident paint texture on face, skin, and clothing - NOT smooth or photographic. Include very thick visible brushstrokes of 25mm or thicker throughout.' + PAINT_TEXTURE,

  // ========================================
  // 🌅 인상주의 (Impressionism)
  // ========================================
  'renoir': 'Transform into an oil painting by Pierre-Auguste Renoir, Renoir art style. CRITICAL: Apply SOFT FEATHERY BRUSHSTROKES with WARM LUMINOUS GLOW. Skin must have ROSY PINK flesh tones with PEARLY WHITE highlights and soft DAPPLED SUNLIGHT. Use warm harmonious colors - PEACH, PINK, CORAL, GOLD. Hair should have GOLDEN COPPER tones with light catching strands. Background must have SOFT IMPRESSIONIST foliage with broken color. Create JOYFUL INTIMATE atmosphere. Visible brushwork throughout - NOT smooth, NOT photographic. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'monet': 'Transform into an oil painting by Claude Monet, Monet art style. CRITICAL: Apply BROKEN COLOR brushstrokes capturing FLEETING LIGHT. Create SOFT HAZY ATMOSPHERIC effects like morning mist. Colors must BLEND and DISSOLVE into each other. NO sharp edges - everything slightly BLURRED and DREAMY. Use COOL BLUE-GREEN palette with warm accents. Water Lilies style light dissolution throughout. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'degas': 'Transform into an oil painting by Edgar Degas, Degas art style. CRITICAL: Apply UNUSUAL CROPPED ANGLES and ASYMMETRIC composition. Use SOFT PASTEL texture with visible CHALKY strokes. Pale muted colors - soft PINK, PEACH, POWDER BLUE. Capture MOVEMENT and GESTURE with delicate precise drawing. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'caillebotte': 'Transform into an oil painting by Gustave Caillebotte, Caillebotte art style. CRITICAL: Apply DRAMATIC PERSPECTIVE with strong converging lines. Paris Street Rainy Day style urban scenes. Muted GRAY-BLUE tones with warm accents. Elegant bourgeois figures with wet pavement reflections. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌻 후기인상주의 (Post-Impressionism)
  // ========================================
  'vangogh': 'Transform into an oil painting by Vincent van Gogh, Van Gogh art style. CRITICAL: Apply SWIRLING SPIRAL DIRECTIONAL BRUSHSTROKES throughout ENTIRE image - sky, background, clothing, hair, AND SKIN must ALL have visible curved brushstrokes following contours. Use COBALT BLUE and CHROME YELLOW and ORANGE as dominant colors. Sky must have SWIRLING CIRCULAR patterns like Starry Night. Include CYPRESS TREES or swirling vegetation in background. Face and skin must show THICK IMPASTO brushstrokes with paint ridges visible - NOT smooth, NOT photographic. Every surface must have DIRECTIONAL CURVED brush marks. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'gauguin': 'Transform this into an oil painting by Paul Gauguin, Gauguin Tahitian art style, with cloisonnism technique using bold black outlines separating flat color areas. Apply pure unmixed saturated colors in simplified shapes with primitivism aesthetic and raw primitive power. Use an exotic tropical palette including deep orange, ochre yellow, turquoise, rich purple and vibrant green with warm golden-brown skin tones. Create a lush Tahitian tropical background with palm trees and exotic flowers in Tahitian Women on the Beach style decorative simplified forms. Apply visible brushstrokes with thick oil paint texture and symbolic mysterious atmosphere. Do not create any mosaic effect, tiles, geometric grid or stained glass look - use pure flat color planes with dark contour lines. Include very thick visible brushstrokes of 25mm or thicker. This must look like a real hand-painted artwork, NOT photorealistic, NOT AI-generated, NOT a photograph, NOT 3D, NOT digital.',
  
  'cezanne': 'Transform into an oil painting by Paul Cézanne, Cézanne art style. CRITICAL: Build forms with GEOMETRIC COLOR PLANES and PARALLEL DIRECTIONAL BRUSHSTROKES. Simplify shapes into basic geometric forms. Use MUTED EARTH TONES - ochres, greens, blues, warm browns. Apply FLAT COLOR PATCHES that construct volume through color relationships NOT shading. Brushstrokes must be VISIBLE and follow consistent DIRECTIONAL patterns. Background and figure must integrate with same brushstroke treatment. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'signac': 'Transform this into a painting by Paul Signac, Signac Neo-Impressionist art style, with Pointillist technique using large visible dots of 8mm each. Apply a soft pastel color palette including pale pink, light blue, soft lavender, mint green, peach and cream yellow. The dots must not be tiny or small, and must cover the face, body and clothing. Create bright Mediterranean sunlight where dots blend optically when viewed from distance with luminous color vibration. Each dot must be individually visible. This must look like a real hand-painted Pointillist artwork, NOT a photograph, NOT 3D, NOT digital, NOT photorealistic, NOT AI-generated.',

  // ========================================
  // 🔥 야수파 (Fauvism)
  // ========================================
  'matisse': 'Transform into an oil painting by Henri Matisse, Matisse Fauvist art style. CRITICAL: Apply BOLD FLAT COLOR AREAS with STRONG DARK OUTLINES. Face must have UNREALISTIC COLORS - bright RED or ORANGE patches on cheeks, GREEN or BLUE shadows. Use PURE SATURATED PRIMARY COLORS - vivid reds, yellows, blues, greens that CLASH and VIBRATE. FLAT 2D DECORATIVE style with NO realistic shading, NO gradients. Background must have BOLD DECORATIVE PATTERNS or flat color blocks. Simplify forms with CURVED FLOWING LINES. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'derain': 'Transform into an oil painting by André Derain, Derain Fauvist art style. CRITICAL: Use WILD UNNATURAL COLORS - orange sky, blue trees, green faces, purple shadows. Apply BOLD FLAT COLOR PATCHES with visible brushstrokes. Strong color contrasts with pure unmixed pigments. Energetic rough brushwork throughout. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'vlaminck': 'Transform into an oil painting by Maurice de Vlaminck, Vlaminck Fauvist art style. CRITICAL: Apply VIOLENT EXPLOSIVE COLORS with AGGRESSIVE brushwork. Use the most INTENSE saturated colors - fiery reds, electric blues, acid greens. THICK IMPULSIVE brushstrokes showing raw emotional energy. Van Gogh-influenced passionate intensity. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 😱 표현주의 (Expressionism)
  // ========================================
  'munch': 'Expressionist oil painting by Edvard Munch, Munch Expressionist art style: intense psychological emotion, wavy distorted swirling lines throughout, apply distortion to figures too, blood red dramatic sky, anxiety and existential dread, vivid emotional colors, distorted forms, visible thick expressive brushwork, emotional impact' + PAINT_TEXTURE,
  
  'kirchner': 'Transform into an oil painting by Ernst Ludwig Kirchner, Kirchner Expressionist art style. CRITICAL: Apply ANGULAR JAGGED forms with ELONGATED SHARP features. Faces must be MASK-LIKE and SIMPLIFIED with exaggerated angular shapes. Use BOLD CLASHING COLORS - acid GREEN, hot PINK, electric BLUE, harsh ORANGE, deep RED. Apply GEOMETRIC COLOR BLOCKS with BLACK OUTLINES separating areas. Die Brücke German Expressionist raw primitive intensity. FLAT COLOR PLANES with angular brushstrokes. Urban tension and psychological alienation. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'kokoschka': 'Transform into an oil painting by Oskar Kokoschka, Kokoschka Expressionist art style. CRITICAL: DISTORT facial features with ANGULAR EXAGGERATED forms. Apply VIOLENT TURBULENT BRUSHWORK with paint scraped and slashed. Use HARSH ACIDIC COLORS - sickly greens, bruised purples, feverish reds. Face must show PSYCHOLOGICAL TENSION with warped features. Background CHURNING with NERVOUS ENERGY. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  

  // ========================================
  // 🎪 모더니즘 (Modernism)
  // ========================================
  'picasso': 'Transform into a Cubist OIL PAINTING by Pablo Picasso, Picasso Cubist art style. CRITICAL CUBIST FRAGMENTATION: Face must be SHATTERED into ANGULAR GEOMETRIC PLANES showing MULTIPLE VIEWPOINTS simultaneously - nose from SIDE while BOTH EYES visible from FRONT. Apply THICK BLACK OUTLINES separating each geometric section. Use MONOCHROMATIC palette - BLACK, WHITE, GRAYS for Guernica style, OR bold colors (cobalt blue, terracotta, ochre) for colorful Cubism. FLAT ANGULAR PLANES like fractured mirror. Background must also be FRAGMENTED into geometric shapes. African mask angularity with sharp edges. This must be a PAINTED artwork with visible brushstrokes - NOT a photo collage, NOT digital manipulation, NOT photographic composite. Include very thick visible brushstrokes of 25mm or thicker.' + PAINT_TEXTURE,
  
  'magritte': 'Transform this into a Surrealist oil painting by René Magritte, Magritte Surrealist art style, creating a philosophical visual paradox. Apply The Son of Man style with a mysterious object partially obscuring the face, or Golconda style multiplication of the same figure repeated in a grid pattern floating or falling through the sky. Use bowler hat gentleman aesthetic with smooth but visible oil painting technique showing subtle brushwork. Create dreamlike impossible scenarios with thought-provoking conceptual art as Belgian Surrealist. Include visible brushwork.' + PAINT_TEXTURE,
  
  'miro': 'Transform this into an abstract oil painting by Joan Miró, Miró Surrealist art style, with playful biomorphic shapes floating on canvas. Apply childlike symbols including stars, moons, eyes and birds using primary colors of red, blue and yellow on a white or neutral background. Create spontaneous automatic drawing style with whimsical dreamlike universe and black calligraphic lines. Capture Catalan Surrealist fantasy with joyful cosmic abstraction. Include very thick visible brushstrokes of 20mm or thicker with visible paint texture. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.' + PAINT_TEXTURE,
  
  'chagall': 'Transform into a dreamlike painting by Marc Chagall, Chagall art style. CRITICAL: Apply SOFT PASTEL COLORS - lavender, pale blue, rose pink, soft yellow. Create DREAMY FLOATING atmosphere with tilted village houses in background. Figures should have ROUNDED SOFT FACES with CLOSED or DREAMY EYES. Use GENTLE CURVED LINES throughout. NOSTALGIC ROMANTIC mood with poetic lyrical quality. Soft feathery brushstrokes. Jewish folklore dreamscape elements. Everything should feel GENTLE, SOFT, DREAMLIKE. Include visible brushwork of 25mm or thicker.' + PAINT_TEXTURE,
  
  'warhol': 'Pop art artwork by Andy Warhol, Warhol pop art style: 2x2 FOUR-PANEL GRID mandatory with same person repeated 4 times, DIFFERENT BOLD NEON COLOR in each panel (hot pink/cyan/yellow/orange/electric blue/lime green), high contrast silkscreen print effect with ink imperfections and halftone, flat graphic pop art style, bold colors mass culture theme, comic book style outlines, DO NOT draw Marilyn Monroe herself',
  
  'lichtenstein': 'Transform this into Pop Art by Roy Lichtenstein, Lichtenstein Pop Art style, with comic book style using visible Ben-Day dots pattern throughout the entire image. Apply thick black outlines around all forms using primary colors of red, yellow and blue with white. Create speech bubble aesthetic with dramatic comic panel composition and halftone printing effect. Apply bold graphic simplification with visible paint texture on dots. This must look like authentic Pop Art, NOT a photograph, NOT 3D, NOT digital.',
  
  'haring': 'Transform this into street art by Keith Haring, Keith Haring art style, with bold continuous black outlines and simplified dancing human figures with radiant energy lines emanating from bodies. Apply flat bright colors including red, yellow, blue and green with dynamic movement and rhythm. Create subway graffiti aesthetic with joyful kinetic energy and interlocking figures. Use visible spray paint or marker texture. Include very thick visible brushstrokes of 20mm or thicker. This must look like authentic street art, NOT a photograph, NOT 3D, NOT digital.',

  // ========================================
  // ⭐ 거장 전용 (Masters Only)
  // ========================================
  'klimt': 'Transform this into an oil painting by Gustav Klimt, Klimt Vienna Secession art style, with elaborate golden patterns and real gold leaf texture throughout. Apply Byzantine mosaic decorative elements with flat ornamental backgrounds covered in geometric spirals, circles and rectangular motifs in shimmering gold leaf. Create sensuous organic forms emerging from abstract decorative fields combining Art Nouveau flowing curves with geometric precision. Use rich textures of gold, silver and precious jewel-like colors including deep ruby red, sapphire blue and emerald green. Capture The Kiss style intimate embrace aesthetic and Judith style powerful female portraiture with erotic intimate mood within sacred ornamental splendor. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'frida': 'Transform this into an oil painting by Frida Kahlo, Frida Kahlo Mexican Surrealist art style, with intense direct gaze portrait showing unflinching emotional honesty. Apply vibrant Mexican folk art colors including bright red, yellow, green, blue and pink. Create a lush tropical jungle foliage background with exotic plants and flowers. Include symbolic personal imagery such as thorns, ribbons, hearts and veins. Feature distinctive facial features with prominent connected eyebrows. Dress the subject in traditional Mexican Tehuana dress with floral headpiece and elaborate jewelry. Surround the figure with symbolic animals including monkeys, hummingbirds, black cats, deer or parrots. Incorporate autobiographical narrative elements with raw vulnerability combined with fierce strength and exposed anatomical elements if emotional. Create surreal juxtaposition of pain and beauty with visible brushwork and oil paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE
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
    'TURNER': 'turner', '터너': 'turner', 'J.M.W. TURNER': 'turner', 'WILLIAM TURNER': 'turner',
    'FRIEDRICH': 'friedrich', '프리드리히': 'friedrich', 'CASPAR DAVID FRIEDRICH': 'friedrich',
    'GOYA': 'goya', '고야': 'goya', 'FRANCISCO GOYA': 'goya',
    'DELACROIX': 'delacroix', '들라크루아': 'delacroix', 'EUGÈNE DELACROIX': 'delacroix', 'EUGENE DELACROIX': 'delacroix',
    'MILLET': 'millet', '밀레': 'millet', 'JEAN-FRANÇOIS MILLET': 'millet', 'JEAN-FRANCOIS MILLET': 'millet',
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
    'FRIDA': 'frida', 'KAHLO': 'frida', '프리다': 'frida', '칼로': 'frida'
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
