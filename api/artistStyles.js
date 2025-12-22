// ========================================
// 🎨 통합 화풍 프롬프트 (artistStyles.js)
// 모든 화가의 화풍을 한 곳에서 관리
// ========================================

// 공통 상수
export const GENDER_RULE = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';

export const PAINT_TEXTURE = ' MUST look like HAND-PAINTED oil painting with VISIBLE THICK BRUSHSTROKES (20mm or thicker on subject), NOT photograph, NOT digital, NOT photorealistic, NOT smooth, NOT AI-generated photo.';

// ========================================
// 📚 모든 화가 화풍 프롬프트
// ========================================
export const ARTIST_STYLES = {
  
  // ========================================
  // 🏛️ 고대 (Ancient)
  // ========================================
  'classical-sculpture': 'Ancient Greek-Roman MARBLE SCULPTURE: PURE WHITE CARRARA MARBLE throughout entire image, ALL skin becomes smooth polished marble with subtle veining, CRITICAL COSTUME: person MUST wear WHITE DRAPED TOGA - loose flowing WHITE FABRIC wrapped and draped around body like Roman senator or Greek philosopher, OFF-WHITE or CREAM colored cloth with elegant folds, absolutely NO modern clothing NO dress NO gold NO colorful fabric NO bikini NO swimsuit, realistic carved stone fabric folds and drapery, MONOCHROMATIC white/cream/grey tones ONLY, heroic classical proportions like Discobolus or Augustus of Prima Porta, MUSEUM PEDESTAL DISPLAY with neutral grey background, dramatic sculptural lighting, frozen dynamic moment in eternal marble, NOT colorful NOT mosaic, ancient sculpture masterpiece quality',
  
  'roman-mosaic': 'Ancient Roman floor MOSAIC: MOST CRITICAL - THE ENTIRE PERSON including FACE SKIN HAIR must be made of VISIBLE SQUARE MOSAIC TILES, NOT smooth skin. LARGE TESSERAE TILES (visible square stone pieces) covering EVERYTHING including the face and body, THICK DARK GROUT LINES between EVERY tile on face and skin creating grid pattern even on cheeks forehead and nose, LIMITED ANCIENT COLOR PALETTE (terracotta orange, ochre yellow, umber brown, ivory white, slate blue, olive green), COSTUME: WHITE DRAPED TOGA, Pompeii villa floor style like Alexander Mosaic, if the face looks smooth and realistic YOU ARE DOING IT WRONG - face must look like it is made of small stone tiles, authentic Roman mosaic craftsmanship',

  // ========================================
  // ⛪ 중세 (Medieval)
  // ========================================
  'byzantine': 'Byzantine sacred icon painting: CIRCULAR GOLDEN HALO (nimbus) behind head as bright radiating disc, ENTIRE BACKGROUND must be SHIMMERING GOLD LEAF mosaic with visible tiny square tesserae tiles, flat hieratic frontal pose with LARGE SOLEMN EYES gazing directly at viewer, transform clothing to Byzantine robes with rich jewel colors (deep red, royal blue, purple) and gold decorative patterns, Eastern Orthodox icon style like Christ Pantocrator, NOT photograph, NOT digital, NOT Gothic NOT Islamic, NOT photorealistic NOT AI-generated, Byzantine masterpiece quality',
  
  'gothic': 'Gothic cathedral STAINED GLASS window style: THICK BLACK LEAD LINES (cames) dividing ENTIRE image into glass-like segments, CRITICAL: BLACK LEAD LINES MUST CROSS THROUGH THE FACE - divide face into colored glass pieces like real stained glass windows, JEWEL-TONE TRANSLUCENT COLORS (ruby red, sapphire blue, emerald green, amber gold) as if light shining through colored glass, FLAT TWO-DIMENSIONAL medieval aesthetic with stylized simplified facial features, apply stained glass segments to ALL parts including face skin and hair NOT just background, transform clothing to medieval robes, elongated vertical figures, Gothic pointed arch frame, divine holy light streaming through, NOT photograph, NOT digital, NOT smooth face NOT realistic portrait, Gothic stained glass masterpiece quality',
  
  'islamic-miniature': 'Persian/Ottoman COURT MINIATURE painting: intricate delicate details with fine brushwork VISIBLE, vibrant jewel colors (ruby red, sapphire blue, emerald green, gold), flat decorative composition, ornamental floral patterns and arabesques, transform clothing to Persian/Ottoman court style, courtly elegant aesthetic, richly decorated background, luxurious manuscript illumination quality, VISIBLE THICK BRUSHSTROKES (20mm or thicker on subject), NOT photograph, NOT digital, NOT Byzantine NOT Gothic NOT geometric pattern, NOT photorealistic NOT AI-generated, Islamic miniature masterpiece quality',

  // ========================================
  // 🎨 르네상스 (Renaissance)
  // ========================================
  'botticelli': GENDER_RULE + 'painting by Sandro Botticelli: GRACEFUL FLOWING LINES with elegant elongated figures, Birth of Venus and Primavera style ethereal beauty, delicate pale skin with soft rose tints, FLOWING GOLDEN HAIR with intricate wavy patterns, sheer diaphanous fabrics billowing in gentle breeze, sweet melancholic expressions, decorative floral backgrounds, VISIBLE tempera brushwork, Early Renaissance Florentine grace, mythological poetic atmosphere, Botticelli masterpiece quality' + PAINT_TEXTURE,
  
  'leonardo': GENDER_RULE + 'painting by Leonardo da Vinci: EXTREME SFUMATO technique with ALL EDGES completely SOFT AND BLURRED like smoke or fog, ZERO SHARP LINES anywhere, every boundary DISSOLVED into hazy atmospheric mist, faces emerging from smoky darkness, Mona Lisa PAINTING TECHNIQUE ONLY (sfumato mysterious haze) - PRESERVE ORIGINAL FACE STRUCTURE do NOT transform into Mona Lisa face apply Leonardo sfumato STYLE not Mona Lisa LIKENESS, Virgin of the Rocks atmospheric depth, warm golden-brown Renaissance palette, SOFT FOCUS throughout like looking through gauze, oil painting with subtle glazing layers and visible brushwork in background, NOT sharp NOT digital, sfumato masterpiece quality' + PAINT_TEXTURE,
  
  'titian': GENDER_RULE + 'painting by Titian Venetian Renaissance: RICH WARM COLORS with glowing golden flesh tones, loose expressive brushwork visible especially in fabrics, dramatic atmospheric backgrounds, sensuous rendering of silk velvet and skin textures, Venetian colorito tradition with color over line, Portrait of a Man style dignified poses, deep reds golds and earth tones, luminous glazing technique, Titian masterpiece quality' + PAINT_TEXTURE,
  
  'michelangelo': GENDER_RULE + 'painting by Michelangelo: HEROIC SCULPTURAL FIGURES with powerful muscular anatomy, Sistine Chapel style monumental grandeur, dramatic foreshortening and dynamic poses, strong modeling with clear light and shadow, idealized human form with classical proportions, rich saturated colors, architectural sense of space, VISIBLE BRUSHSTROKES with fresco-like texture, Michelangelo masterpiece quality' + PAINT_TEXTURE,
  
  'raphael': GENDER_RULE + 'painting by Raphael: PERFECT HARMONIOUS BEAUTY with idealized graceful figures, serene balanced compositions, sweet gentle expressions, clear luminous colors, elegant flowing drapery, School of Athens style classical perfection, soft modeling with gentle transitions, VISIBLE soft brushwork, divine serenity and grace, Raphael masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🎭 바로크 (Baroque)
  // ========================================
  'caravaggio': GENDER_RULE + 'painting by Caravaggio: DRAMATIC TENEBRISM with extreme light-dark contrast, single theatrical spotlight illuminating figures from darkness, deep BLACK SHADOWS engulfing most of scene, intense emotional realism, rich saturated colors emerging from darkness, dramatic diagonal composition, VISIBLE BRUSHWORK with oil paint texture, raw powerful naturalism, Caravaggio masterpiece quality' + PAINT_TEXTURE,
  
  'rubens': GENDER_RULE + 'painting by Peter Paul Rubens: WARM SENSUAL FLESH TONES with luminous glowing skin, dynamic swirling composition full of movement and energy, rich warm palette of reds golds and creams, voluptuous graceful forms, romantic intimate atmosphere, The Garden of Love style warmth and passion, VISIBLE ENERGETIC BRUSHWORK with fluid paint texture, Rubens Baroque masterpiece quality' + PAINT_TEXTURE,
  
  'rembrandt': GENDER_RULE + 'painting by Rembrandt: GOLDEN LUMINOUS LIGHT with warm glowing illumination, subtle light gradations revealing form from shadow, rich impasto brushwork visible in highlights, deep psychological introspection, intimate emotional depth, warm brown and gold palette, The Night Watch style dramatic lighting, VERY THICK VISIBLE BRUSHSTROKES (20mm or thicker on subject) especially in light areas, Rembrandt masterpiece quality' + PAINT_TEXTURE,
  
  'velazquez': GENDER_RULE + 'painting by Diego Velázquez: SOPHISTICATED COURT ELEGANCE with dignified formal poses, loose confident brushwork visible up close, subtle silver-grey palette with rich blacks, atmospheric perspective creating depth, Las Meninas style complex spatial arrangement, aristocratic refinement, VISIBLE THICK EXPRESSIVE BRUSHSTROKES (20mm or thicker on subject), Velázquez masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🌸 로코코 (Rococo)
  // ========================================
  'watteau': GENDER_RULE + 'painting by Antoine Watteau: FÊTE GALANTE outdoor aristocratic gathering, transform clothing to Rococo aristocratic silk costumes, soft dreamy pastoral landscape, delicate feathery brushwork VISIBLE throughout, romantic melancholic atmosphere, Pilgrimage to Cythera style poetic reverie, pale pastel colors with touches of rose and gold, theatrical graceful poses, Watteau masterpiece quality' + PAINT_TEXTURE,
  
  'boucher': GENDER_RULE + 'painting by François Boucher: DECORATIVE BEAUTY with soft rosy flesh tones, transform clothing to Rococo aristocratic style, playful mythological or pastoral scenes, light pastel palette of pink blue and cream, fluffy clouds and lush foliage, ornate Rococo decoration, sweet idealized figures, VISIBLE SOFT BRUSHWORK with delicate paint texture, Boucher masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🏛️ 신고전주의 (Neoclassicism)
  // ========================================
  'david': GENDER_RULE + 'painting by Jacques-Louis David: NEOCLASSICAL PERFECTION with clear crisp outlines, heroic idealized figures in classical poses, cool restrained color palette, dramatic moral narratives, Oath of the Horatii style civic virtue, sculptural modeling, balanced symmetrical compositions, VISIBLE BRUSHWORK with oil paint texture, David Neoclassical masterpiece quality' + PAINT_TEXTURE,
  
  'ingres': GENDER_RULE + 'painting by Jean-Auguste-Dominique Ingres: PERFECTLY SMOOTH FLOWING CONTOURS, porcelain-smooth skin with subtle brushwork visible in background, elegant sinuous curves and graceful elongated forms, idealized beauty, cool serene color palette, meticulous precise detail, VISIBLE oil paint texture despite smooth finish, Ingres masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🌊 낭만주의 (Romanticism)
  // ========================================
  'turner': GENDER_RULE + 'painting by J.M.W. Turner: ATMOSPHERIC SUBLIME with swirling mist light and color, dramatic natural phenomena, luminous golden light dissolving forms, romantic awe-inspiring landscapes, The Fighting Temeraire style emotional power, LOOSE EXPRESSIVE BRUSHWORK with thick impasto, VISIBLE PAINT TEXTURE, Turner masterpiece quality' + PAINT_TEXTURE,
  
  'friedrich': GENDER_RULE + 'painting by Caspar David Friedrich: Wanderer above the Sea of Fog-style with SUBLIME VAST LANDSCAPE stretching to infinite horizon, mysterious atmospheric mist enveloping mountains and valleys, solitary contemplative figure viewed from behind gazing into immensity with back to viewer, spiritual sense of awe and insignificance before nature, cool somber palette of grays blues and muted greens, dramatic lighting breaking through clouds creating transcendent atmosphere, profound melancholic loneliness and romantic yearning, metaphysical depth and eternal silence, Friedrich Romantic masterpiece quality' + PAINT_TEXTURE,
  
  'goya': GENDER_RULE + 'painting by Francisco Goya: PSYCHOLOGICAL INTENSITY with penetrating gaze and inner truth revealed, dramatic chiaroscuro with deep shadows and stark contrasts, La Maja Vestida style Spanish elegance for portraits, dark romantic palette with rich blacks and warm flesh tones, unflinching honesty capturing human nature, VISIBLE ROUGH BRUSHSTROKES with expressive paint texture, court painter sophistication with underlying tension, Goya masterpiece quality' + PAINT_TEXTURE,
  
  'delacroix': GENDER_RULE + 'painting by Eugène Delacroix: PASSIONATE REVOLUTIONARY ENERGY with Liberty Leading the People style dramatic action, vivid intense colors with bold reds blues and warm golden tones, dynamic diagonal compositions with turbulent swirling movement, LOOSE EXPRESSIVE BRUSHSTROKES full of emotion with VISIBLE PAINT TEXTURE, dramatic gestures and heroic romantic intensity, Delacroix Romantic masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🌾 사실주의 (Realism)
  // ========================================
  'millet': GENDER_RULE + 'painting by Jean-François Millet: DIGNIFIED RURAL LABOR with monumental peasant figures, transform clothing to 19th century peasant work clothes, warm earthy palette of browns and ochres, The Gleaners style quiet nobility, soft diffused light, serene contemplative mood, VISIBLE BRUSHWORK with textured paint surface, honest depiction of agricultural life, Millet Realist masterpiece quality' + PAINT_TEXTURE,
  
  'manet': GENDER_RULE + 'painting by Édouard Manet: MODERN PARIS REALISM with Olympia-style bold flat composition and striking contrasts, transform clothing to 19th century Parisian bourgeois fashion, dramatic blacks and pure whites with minimal mid-tones, sophisticated urban café society atmosphere, frank direct confrontational gaze, LOOSE CONFIDENT BRUSHWORK with VISIBLE ENERGETIC STROKES, metropolitan elegance and modern audacity, Manet masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🌅 인상주의 (Impressionism)
  // ========================================
  'renoir': GENDER_RULE + 'painting by Pierre-Auguste Renoir: SOFT FEATHERY BRUSHSTROKES with warm luminous glow, rosy pink flesh tones with pearly highlights, DAPPLED SUNLIGHT filtering through creating shimmering atmosphere, joyful intimate mood, loose impressionist brushwork NOT smooth NOT digital, warm harmonious colors (peach pink coral gold), VISIBLE OIL PAINT TEXTURE, VISIBLE THICK BRUSHSTROKES (20mm or thicker on subject), NOT photograph, NOT digital, Renoir masterpiece quality',
  
  'monet': GENDER_RULE + 'painting by Claude Monet: BROKEN COLOR BRUSHSTROKES capturing fleeting light effects, SOFT HAZY ATMOSPHERIC effects like morning mist, colors BLENDED and DISSOLVED into each other, NO sharp edges, dreamy blurred boundaries, Water Lilies style light dissolution, cool blue-green palette with warm accents, everything slightly out of focus, VISIBLE PAINT TEXTURE, VISIBLE THICK BRUSHSTROKES (20mm or thicker on subject), NOT photograph, NOT digital, NOT photorealistic NOT AI-generated, Monet Impressionist masterpiece quality',
  
  'degas': GENDER_RULE + 'painting by Edgar Degas: UNUSUAL CROPPED ANGLES and asymmetric compositions, capturing movement and gesture, SOFT PASTEL and oil texture with VISIBLE CHALKY STROKES, pale muted colors (soft pink peach powder blue), intimate indoor scenes, delicate precise drawing, VISIBLE PAINT TEXTURE, VISIBLE THICK BRUSHSTROKES (20mm or thicker on subject), NOT photograph, NOT digital, NOT photorealistic NOT AI-generated, Degas masterpiece quality',
  
  'caillebotte': GENDER_RULE + 'painting by Gustave Caillebotte: MODERN URBAN REALISM with dramatic bird\'s-eye perspective, SHARP PERSPECTIVE LINES converging dramatically, Paris Street Rainy Day style city scenes, photographic clarity with impressionist color palette, elegant bourgeois figures in urban settings, wet pavement reflections, muted gray-blue urban tones with warm accents, GEOMETRIC COMPOSITION with strong diagonal lines, Floor Scrapers style working figures, VISIBLE BRUSHWORK with oil paint texture, VISIBLE THICK BRUSHSTROKES (20mm or thicker on subject), NOT photograph, NOT digital, NOT photorealistic NOT AI-generated, Caillebotte masterpiece quality',

  // ========================================
  // 🌻 후기인상주의 (Post-Impressionism)
  // ========================================
  'vangogh': GENDER_RULE + 'painting in Vincent van Gogh style: EXTREMELY THICK IMPASTO brushstrokes with HEAVY 3D PAINT TEXTURE like squeezed directly from tube, VISIBLE RIDGES AND GROOVES of thick oil paint, CRITICAL: FACE AND BODY MUST HAVE visible thick impasto brushstrokes - directional SWIRLING strokes following skin contours on cheeks forehead jaw neck arms, NO smooth skin NO photorealistic face or body, CHUNKY BOLD brush marks NOT smooth NOT blended, intense saturated colors (cobalt blue cadmium yellow chrome orange), ENERGETIC EXPRESSIVE strokes throughout entire figure, canvas weave visible through paint, Van Gogh masterpiece quality' + PAINT_TEXTURE,
  
  'gauguin': GENDER_RULE + 'painting by Paul Gauguin Tahitian period: CLOISONNISM style with BOLD BLACK OUTLINES separating FLAT COLOR AREAS, pure unmixed saturated colors in simplified shapes, PRIMITIVISM aesthetic with raw primitive power, exotic tropical palette (deep orange, ochre yellow, turquoise, rich purple, vibrant green), warm golden-brown skin tones, lush Tahitian tropical background with palm trees and exotic flowers, Tahitian Women on the Beach style, decorative simplified forms, VISIBLE BRUSHSTROKES with thick oil paint texture, symbolic mysterious atmosphere, ABSOLUTELY NO mosaic effect, NO tiles, NO geometric grid, NO stained glass look, pure FLAT COLOR PLANES with dark contour lines, NOT photorealistic NOT AI-generated, Gauguin Tahitian masterpiece quality',
  
  'cezanne': GENDER_RULE + 'painting by Paul Cézanne: GEOMETRIC STRUCTURED FORMS built with parallel brushstrokes, analytical approach to underlying shapes, Mont Sainte-Victoire style constructive vision, muted earth tones with blues and greens, solid volumes emerging from color planes, VISIBLE DIRECTIONAL BRUSHWORK with paint texture, contemplative balanced compositions, NOT photorealistic NOT AI-generated, Cézanne masterpiece quality' + PAINT_TEXTURE,
  
  'signac': GENDER_RULE + 'painting by Paul Signac: POINTILLIST technique with TINY DOTS of pure color placed side by side, bright Mediterranean sunlight and vibrant harbor scenes, dots blend optically when viewed from distance, luminous color vibration, The Port of Saint-Tropez style, scientific color division, VISIBLE paint dots texture, NOT photorealistic NOT AI-generated, Signac Neo-Impressionist masterpiece quality',

  // ========================================
  // 🔥 야수파 (Fauvism)
  // ========================================
  'matisse': GENDER_RULE + 'painting by Henri Matisse Fauvist period: CRITICAL - FACE AND BODY MUST HAVE UNREALISTIC BOLD COLORS directly on skin (GREEN on forehead, RED on cheeks, PURPLE on jaw, YELLOW highlights), pure unmixed PRIMARY COLORS that CLASH and VIBRATE against each other, completely FLAT with NO shadows NO shading NO depth, simplified forms with details removed, BOLD DARK OUTLINES separating color areas, ROUGH FAST FAUVIST BRUSHSTROKES visible on face and body with brush direction showing, NO blending NO smooth transitions, 2D decorative feeling, Matisse Fauvist masterpiece quality' + PAINT_TEXTURE,
  
  'derain': GENDER_RULE + 'painting by André Derain: BOLD FAUVIST LANDSCAPE colors with vivid unnatural hues, Charing Cross Bridge style vibrant scenery, strong color contrasts, ROUGH ENERGETIC BRUSHWORK clearly VISIBLE throughout, liberated pure colors, dynamic compositions, Derain Fauvist masterpiece quality' + PAINT_TEXTURE,
  
  'vlaminck': GENDER_RULE + 'painting by Maurice de Vlaminck: VIOLENT EXPRESSIVE COLORS with turbulent emotional intensity, most aggressive Fauvist palette, THICK IMPULSIVE ROUGH BRUSHWORK visible throughout, raw powerful energy, dramatic color explosions, Van Gogh-influenced passion, Vlaminck Fauvist masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 😱 표현주의 (Expressionism)
  // ========================================
  'munch': GENDER_RULE + 'painting by Edvard Munch: INTENSE PSYCHOLOGICAL emotional depth, The Scream style existential anxiety atmosphere, WAVY DISTORTED flowing lines in background, haunting symbolic colors (blood red sky, sickly yellows, deep blues), raw emotional vulnerability, swirling anxious energy, VISIBLE BRUSHWORK with paint texture, Munch Expressionist masterpiece quality' + PAINT_TEXTURE,
  
  'kirchner': GENDER_RULE + 'painting by Ernst Ludwig Kirchner: ANGULAR JAGGED DISTORTED FORMS - faces must be ELONGATED and SHARP with exaggerated angular features NOT realistic, Berlin street scene style urban tension and alienation, bold CLASHING DISSONANT colors (acid green, hot pink, electric blue, harsh orange), HARSH ANGULAR BRUSHSTROKES visible throughout, Die Brücke German Expressionist raw primitive intensity, mask-like simplified facial features with psychological tension, Kirchner masterpiece quality' + PAINT_TEXTURE,
  
  'kokoschka': GENDER_RULE + 'painting by Oskar Kokoschka: VIOLENT PSYCHOLOGICAL PORTRAITS with turbulent VISIBLE brushwork revealing inner turmoil, intense probing character study, THICK EXPRESSIVE paint application, agitated nervous energy, deep emotional excavation, Kokoschka Expressionist masterpiece quality' + PAINT_TEXTURE,
  
  'kandinsky': GENDER_RULE + 'painting by Wassily Kandinsky: ABSTRACT SPIRITUAL FORMS with floating geometric shapes, Composition series style non-representational expression, pure emotional color and form, musical visual harmonies, dynamic abstract energy, VISIBLE PAINT TEXTURE, Kandinsky Expressionist masterpiece quality' + PAINT_TEXTURE,
  
  'schiele': GENDER_RULE + 'painting by Egon Schiele: CONTORTED ANGULAR FIGURES with raw expressive line work, exposed vulnerability and psychological intensity, pale sickly flesh with sharp angular poses, bold outlines defining twisted forms, unflinching self-examination, Expressionist eroticism and death themes, VISIBLE BRUSHWORK, Schiele masterpiece quality' + PAINT_TEXTURE,

  // ========================================
  // 🎪 모더니즘 (Modernism)
  // ========================================
  'picasso': GENDER_RULE + 'Cubist painting by Pablo Picasso: SINGLE UNIFIED IMAGE not divided into panels, DRAMATIC BOLD CUBIST FRAGMENTATION - face SHATTERED into ANGULAR GEOMETRIC PLANES, NOSE shown from SIDE PROFILE while BOTH EYES visible from FRONT simultaneously, multiple viewpoints merged into ONE face, JAW split into sharp triangular segments, THICK BLACK OUTLINES separating each geometric section, BOLD CONTRASTING COLORS (cobalt BLUE + terracotta + ochre + black + white) NOT muted NOT dull, African mask angularity with sharp geometric edges, Analytical + Synthetic Cubism combined, ROUGH VISIBLE BRUSHSTROKES with paint texture, canvas texture visible, NOT smooth NOT digital, Picasso Cubist masterpiece quality' + PAINT_TEXTURE,
  
  'magritte': GENDER_RULE + 'Surrealist painting by René Magritte: philosophical visual paradox, The Son of Man style with mysterious object partially obscuring face, or Golconda style MULTIPLICATION of same figure repeated in grid pattern floating/falling through sky, bowler hat gentleman aesthetic, smooth but VISIBLE oil painting technique with subtle brushwork, dreamlike impossible scenarios, thought-provoking conceptual art, Belgian Surrealist masterpiece quality' + PAINT_TEXTURE,
  
  'miro': GENDER_RULE + 'Abstract painting by Joan Miró: playful BIOMORPHIC SHAPES floating on canvas, childlike symbols (stars moons eyes birds), PRIMARY COLORS (red blue yellow) on white or neutral background, spontaneous automatic drawing style, whimsical dreamlike universe, black calligraphic lines, Catalan Surrealist fantasy, joyful cosmic abstraction, VISIBLE BRUSHSTROKES and paint texture, Miró masterpiece quality' + PAINT_TEXTURE,
  
  'chagall': GENDER_RULE + 'Dreamlike painting by Marc Chagall: FLOATING FIGURES defying gravity in romantic nocturnal sky, soft MUTED PASTEL colors (lavender pale blue rose), nostalgic village scenes with tilted houses, lovers embracing mid-air, symbolic imagery (violins roosters flowers), poetic lyrical atmosphere, Jewish folklore dreamscape, VISIBLE BRUSHWORK with soft feathery strokes, Chagall romantic masterpiece quality' + PAINT_TEXTURE,
  
  'warhol': GENDER_RULE + 'Pop Art by Andy Warhol: MUST create 2x2 FOUR-PANEL GRID layout, the EXACT SAME PERSON or OBJECT from the ORIGINAL PHOTO repeated 4 times - once in each quadrant, each of the 4 panels with DIFFERENT BOLD NEON COLOR scheme (hot pink cyan yellow orange electric blue lime green turquoise), HIGH CONTRAST silkscreen printing effect, FLAT graphic colors with NO gradients, ABSOLUTELY DO NOT draw Marilyn Monroe - ONLY draw the person from the original photo, visible ink texture and print imperfections, Warhol Pop Art masterpiece quality',
  
  'lichtenstein': GENDER_RULE + 'Pop Art by Roy Lichtenstein: comic book style with VISIBLE BEN-DAY DOTS pattern throughout entire image, THICK BLACK OUTLINES around all forms, PRIMARY COLORS (red yellow blue) with white, speech bubble aesthetic, dramatic comic panel composition, halftone printing effect, bold graphic simplification, visible paint texture on dots, Lichtenstein Pop Art masterpiece quality',
  
  'haring': GENDER_RULE + 'Street art by Keith Haring: BOLD CONTINUOUS BLACK OUTLINES, simplified dancing human figures with RADIANT ENERGY LINES emanating from bodies, flat bright colors (red yellow blue green), dynamic movement and rhythm, subway graffiti aesthetic, joyful kinetic energy, interlocking figures, visible spray paint or marker texture, Keith Haring street art masterpiece quality',

  // ========================================
  // ⭐ 거장 전용 (Masters Only)
  // ========================================
  'klimt': GENDER_RULE + 'painting by Gustav Klimt: ELABORATE GOLDEN PATTERNS with REAL GOLD LEAF texture throughout, Byzantine mosaic decorative elements, flat ornamental backgrounds covered with geometric spirals circles and rectangular motifs in shimmering gold leaf, sensuous organic forms emerging from abstract decorative fields, Art Nouveau flowing curves combined with geometric precision, rich textures of gold silver and precious jewel-like colors (deep ruby red, sapphire blue, emerald green), The Kiss style intimate embrace aesthetic, Judith style powerful female portraiture, erotic intimate mood within sacred ornamental splendor, Vienna Secession masterpiece quality' + PAINT_TEXTURE,
  
  'frida': GENDER_RULE + 'painting by Frida Kahlo: INTENSE DIRECT GAZE portrait with unflinching emotional honesty, vibrant MEXICAN FOLK ART colors (bright red, yellow, green, blue, pink), lush TROPICAL JUNGLE FOLIAGE background with exotic plants and flowers, symbolic personal imagery (THORNS, RIBBONS, HEARTS, VEINS), distinctive facial features with PROMINENT CONNECTED EYEBROWS, traditional Mexican TEHUANA DRESS with floral headpiece and elaborate jewelry, symbolic animals surrounding figure (monkeys, hummingbirds, black cats, deer, parrots), autobiographical narrative elements, raw vulnerability combined with fierce strength, exposed anatomical elements if emotional, surreal juxtaposition of pain and beauty, VISIBLE BRUSHWORK with oil paint texture, Frida Kahlo Mexican Surrealist masterpiece quality' + PAINT_TEXTURE,
  
  'basquiat': GENDER_RULE + 'Neo-Expressionist painting by Jean-Michel Basquiat: EXPLOSIVE AGGRESSIVE VIOLENT street art energy with UNCONTROLLED FURY, THREE-POINTED CROWN symbol floating above head, SKULL FACE with exposed teeth and bone structure and X-ed out eyes or hollow eye sockets, SCRAWLED WORDS and ARROWS scattered throughout with CROSSED-OUT text and cancel lines, ROUGH TREMBLING THICK BLACK LINES deliberately CROOKED and UNEVEN like child drawing, CLASHING INTENSE PRIMARY COLORS (red/yellow/blue) + black + white + NEON ACCENTS (hot pink/fluorescent orange), MULTIPLE LAYERED OVERPAINT with underlayers showing through, SCRATCHES STAINS and DRIP marks, OIL STICK + ACRYLIC + SPRAY PAINT mixed texture, thick impasto areas next to scraped raw areas, anatomical diagrams and skeletal references, African tribal mask influence, rebellious raw primitive energy, NOT refined NOT polished NOT clean'
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
    'MOSAIC': 'roman-mosaic', 'ROMAN': 'roman-mosaic', '모자이크': 'roman-mosaic',
    
    // 중세
    'BYZANTINE': 'byzantine', '비잔틴': 'byzantine',
    'GOTHIC': 'gothic', '고딕': 'gothic',
    'ISLAMIC': 'islamic-miniature', 'MINIATURE': 'islamic-miniature', '이슬람': 'islamic-miniature',
    
    // 르네상스
    'BOTTICELLI': 'botticelli', '보티첼리': 'botticelli',
    'LEONARDO': 'leonardo', 'DA VINCI': 'leonardo', '다빈치': 'leonardo', '레오나르도': 'leonardo',
    'TITIAN': 'titian', '티치아노': 'titian',
    'MICHELANGELO': 'michelangelo', '미켈란젤로': 'michelangelo',
    'RAPHAEL': 'raphael', '라파엘로': 'raphael',
    
    // 바로크
    'CARAVAGGIO': 'caravaggio', '카라바조': 'caravaggio',
    'RUBENS': 'rubens', '루벤스': 'rubens',
    'REMBRANDT': 'rembrandt', '렘브란트': 'rembrandt',
    'VELÁZQUEZ': 'velazquez', 'VELAZQUEZ': 'velazquez', '벨라스케스': 'velazquez',
    
    // 로코코
    'WATTEAU': 'watteau', '와토': 'watteau',
    'BOUCHER': 'boucher', '부셰': 'boucher',
    
    // 신고전/낭만/사실
    'DAVID': 'david', '다비드': 'david',
    'INGRES': 'ingres', '앵그르': 'ingres',
    'TURNER': 'turner', '터너': 'turner',
    'FRIEDRICH': 'friedrich', '프리드리히': 'friedrich',
    'GOYA': 'goya', '고야': 'goya',
    'DELACROIX': 'delacroix', '들라크루아': 'delacroix',
    'MILLET': 'millet', '밀레': 'millet',
    'MANET': 'manet', '마네': 'manet',
    
    // 인상주의
    'RENOIR': 'renoir', '르누아르': 'renoir',
    'MONET': 'monet', '모네': 'monet',
    'DEGAS': 'degas', '드가': 'degas',
    'CAILLEBOTTE': 'caillebotte', '카유보트': 'caillebotte', '칼리보트': 'caillebotte',
    
    // 후기인상주의
    'VAN GOGH': 'vangogh', 'GOGH': 'vangogh', '반 고흐': 'vangogh', '고흐': 'vangogh', '빈센트': 'vangogh',
    'GAUGUIN': 'gauguin', '고갱': 'gauguin',
    'CÉZANNE': 'cezanne', 'CEZANNE': 'cezanne', '세잔': 'cezanne',
    'SIGNAC': 'signac', '시냐크': 'signac',
    
    // 야수파
    'MATISSE': 'matisse', '마티스': 'matisse',
    'DERAIN': 'derain', '드랭': 'derain',
    'VLAMINCK': 'vlaminck', '블라맹크': 'vlaminck',
    
    // 표현주의
    'MUNCH': 'munch', '뭉크': 'munch',
    'KIRCHNER': 'kirchner', '키르히너': 'kirchner',
    'KOKOSCHKA': 'kokoschka', '코코슈카': 'kokoschka',
    'KANDINSKY': 'kandinsky', '칸딘스키': 'kandinsky',
    'SCHIELE': 'schiele', '쉴레': 'schiele',
    
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
    'BASQUIAT': 'basquiat', '바스키아': 'basquiat'
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
