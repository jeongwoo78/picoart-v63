// ========================================
// 🎨 통합 화풍 프롬프트 (artistStyles.js) v2
// v2: 자연어 문장형 프롬프트 적용
//     - "by [Artist], [Artist] art style" 패턴 적용
//     - FLUX 효율적 전달 방식 (연구 결과 기반)
//     - 핵심 내용 유지하면서 더 명확한 전달
// 모든 화가의 화풍을 한 곳에서 관리
// ========================================

// 공통 상수 - v64: 자연어 문장형
export const GENDER_RULE = 'Preserve the original gender and ethnicity exactly. If the photo shows a male subject, the painting must have a masculine face with strong jaw and male bone structure without any feminine features - do not feminize, soften or make delicate, keep as a man. If the photo shows a female subject, the painting must have a feminine face with soft features and female bone structure without any masculine features - do not masculinize or make rough, keep as a woman. Preserve the original ethnicity and skin color exactly without changing race or lightening or darkening skin - Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';

export const PAINT_TEXTURE = ' This must look like a real hand-painted oil painting with very thick visible brushstrokes of 20mm or thicker throughout. It must NOT look like a photograph, NOT 3D render, NOT digital art, NOT photorealistic, NOT smooth, NOT AI-generated photo.';

// ========================================
// 📚 모든 화가 화풍 프롬프트
// ========================================
export const ARTIST_STYLES = {
  
  // ========================================
  // 🏛️ 고대 
  // ========================================
  'classical-sculpture': 'Transform this into an ancient Greek-Roman marble sculpture carved from pure white Carrara marble. The entire image should be in monochromatic white, cream and grey tones only. All skin must become smooth polished marble with subtle veining. The subject must wear a white draped toga with loose flowing white fabric wrapped around the body like a Roman senator or Greek philosopher, using off-white or cream colored cloth with elegant folds. Do not use modern clothing, dresses, gold, colorful fabric, bikini or swimsuit. Create realistic carved stone fabric folds and drapery with heroic classical proportions like Discobolus or Augustus of Prima Porta. Display on a museum pedestal with neutral grey background and dramatic sculptural lighting, capturing a frozen dynamic moment in eternal marble. This must NOT be colorful, NOT mosaic, NOT a photograph, NOT 3D render, NOT digital, masterpiece quality',
  
  'roman-mosaic': 'Transform this into an ancient Roman floor mosaic in authentic Pompeii villa style like the Alexander Mosaic. The entire person including face, skin and hair must be made of large visible square mosaic tesserae tiles of 50mm each with thick dark grout lines between every tile. The face must have this grid pattern even on the cheeks, forehead and nose - if the face looks smooth and realistic you are doing it wrong, the face must look like it is made of small stone tiles. Use a limited ancient color palette of terracotta orange, ochre yellow, umber brown, ivory white, slate blue and olive green. The clothing should be a white draped toga. This must look like authentic Roman mosaic craftsmanship',

  // ========================================
  // ⛪ 중세 
  // ========================================
  'byzantine': 'Transform this into a Byzantine sacred icon painting with a circular golden halo nimbus behind the head as a bright radiating disc. The entire background must be shimmering gold leaf mosaic with visible tiny square tesserae tiles. Use a flat hieratic frontal pose with large solemn eyes gazing directly at the viewer. Transform the clothing to Byzantine robes with rich jewel colors including deep red, royal blue, purple and gold decorative patterns. Create an Eastern Orthodox icon style like Christ Pantocrator. This must NOT be a photograph, NOT 3D, NOT digital, NOT Gothic, NOT Islamic, NOT photorealistic, NOT AI-generated, masterpiece quality',
  
  'gothic': 'Transform this into a Gothic cathedral stained glass window style with thick black lead lines dividing the entire image into glass-like segments. The black lead lines must cross through the face, dividing it into colored glass pieces like real stained glass windows. Use jewel-tone translucent colors of ruby red, sapphire blue, emerald green and amber gold as if light is shining through colored glass. Apply a flat two-dimensional medieval aesthetic with stylized simplified facial features. The stained glass segments must cover all parts including face, skin and hair, not just the background. Transform the clothing to medieval robes with elongated vertical figures and a Gothic pointed arch frame with divine holy light streaming through. This must NOT be a photograph, NOT 3D, NOT digital, NOT a smooth face, NOT a realistic portrait, masterpiece quality',
  
  'islamic-miniature': 'Transform this into a Persian or Ottoman court miniature painting with intricate delicate details and fine visible brushwork. Use vibrant jewel colors of ruby red, sapphire blue, emerald green and gold with flat decorative composition. Apply ornamental floral patterns and arabesques. Transform the clothing to Persian or Ottoman court style with courtly elegant aesthetic and richly decorated background. Create luxurious manuscript illumination quality with very thick visible brushstrokes of 20mm or thicker. This must NOT be a photograph, NOT 3D, NOT digital, NOT Byzantine, NOT Gothic, NOT geometric pattern, NOT photorealistic, NOT AI-generated, masterpiece quality',

  // ========================================
  // 🎨 르네상스 
  // ========================================
  'botticelli': GENDER_RULE + 'Transform this into an oil painting by Sandro Botticelli, Botticelli art style, with graceful flowing lines and elegant elongated figures. Capture the Birth of Venus and Primavera style ethereal beauty with delicate pale skin and soft rose tints. Create flowing golden hair with intricate wavy patterns and sheer diaphanous fabrics billowing in a gentle breeze. Apply sweet melancholic expressions with decorative floral backgrounds. Use visible tempera brushwork with Early Renaissance Florentine grace and mythological poetic atmosphere. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'leonardo': GENDER_RULE + 'Transform this into an oil painting by Leonardo da Vinci, Leonardo da Vinci art style, with extreme sfumato technique where all edges are completely soft and blurred like smoke or fog. There should be zero sharp lines anywhere, with every boundary dissolved into hazy atmospheric mist and faces emerging from smoky darkness. Apply the Mona Lisa painting technique only for the mysterious sfumato haze while preserving the original face structure - do not transform the face into Mona Lisa face, apply Leonardo sfumato style not Mona Lisa likeness. Capture the Virgin of the Rocks atmospheric depth with warm golden-brown Renaissance palette. Create soft focus throughout like looking through gauze with oil painting subtle glazing layers and very thick visible brushstrokes of 20mm or thicker in the background.' + PAINT_TEXTURE,
  
  'titian': GENDER_RULE + 'Transform this into an oil painting by Titian, Titian art style, Venetian Renaissance with rich warm colors and glowing golden flesh tones. Apply loose expressive brushwork especially visible in fabrics with dramatic atmospheric backgrounds. Create sensuous rendering of silk, velvet and skin textures in the Venetian colorito tradition with color over line. Capture the Portrait of a Man style dignified poses with deep reds, golds and earth tones using luminous glazing technique. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'michelangelo': GENDER_RULE + 'Transform this into an oil painting by Michelangelo, Michelangelo art style, with heroic sculptural figures showing powerful muscular anatomy. Capture the Sistine Chapel style monumental grandeur with dramatic foreshortening and dynamic poses. Apply strong modeling with clear light and shadow, creating idealized human form with classical proportions. Use rich saturated colors with an architectural sense of space. Include visible brushstrokes with fresco-like texture and very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'raphael': GENDER_RULE + 'Transform this into an oil painting by Raphael, Raphael art style, with perfect harmonious beauty and idealized graceful figures. Create serene balanced compositions with sweet gentle expressions and clear luminous colors. Apply elegant flowing drapery in the School of Athens style classical perfection with soft modeling and gentle transitions. Use visible soft brushwork with divine serenity and grace. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🎭 바로크 
  // ========================================
  'caravaggio': GENDER_RULE + 'Transform this into an oil painting by Caravaggio, Caravaggio art style, with dramatic tenebrism and extreme light-dark contrast. Use a single theatrical spotlight illuminating figures from darkness with deep black shadows engulfing most of the scene. Capture intense emotional realism with rich saturated colors emerging from darkness and dramatic diagonal composition. Apply visible brushwork with oil paint texture and raw powerful naturalism. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'rubens': GENDER_RULE + 'Transform this into an oil painting by Peter Paul Rubens, Rubens art style, with warm sensual flesh tones and luminous glowing skin. Create dynamic swirling composition full of movement and energy with a rich warm palette of reds, golds and creams. Apply voluptuous graceful forms with romantic intimate atmosphere in The Garden of Love style warmth and passion. Use visible energetic brushwork with fluid paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'rembrandt': GENDER_RULE + 'Transform this into an oil painting by Rembrandt, Rembrandt art style, with golden luminous light and warm glowing illumination. Apply subtle light gradations revealing form from shadow with rich impasto brushwork visible in highlights. Capture deep psychological introspection with intimate emotional depth using a warm brown and gold palette in The Night Watch style dramatic lighting. Include very thick visible brushstrokes of 20mm or thicker especially in light areas.' + PAINT_TEXTURE,
  
  'velazquez': GENDER_RULE + 'Transform this into an oil painting by Diego Velázquez, Velázquez art style, with sophisticated court elegance and dignified formal poses. Apply loose confident brushwork visible up close with a subtle silver-grey palette and rich blacks. Create atmospheric perspective for depth in Las Meninas style complex spatial arrangement with aristocratic refinement. Include very thick expressive brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌸 로코코 
  // ========================================
  'watteau': GENDER_RULE + 'Transform this into an oil painting by Antoine Watteau, Watteau art style, depicting a fête galante outdoor aristocratic gathering. Transform the clothing to Rococo aristocratic silk costumes set in a soft dreamy pastoral landscape. Apply delicate feathery brushwork visible throughout with romantic melancholic atmosphere in Pilgrimage to Cythera style poetic reverie. Use pale pastel colors with touches of rose and gold, creating theatrical graceful poses. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'boucher': GENDER_RULE + 'Transform this into an oil painting by François Boucher, Boucher art style, with decorative beauty and soft rosy flesh tones. Transform the clothing to Rococo aristocratic style with playful mythological or pastoral scenes. Apply a light pastel palette of pink, blue and cream with fluffy clouds and lush foliage. Use ornate Rococo decoration with sweet idealized figures and visible soft brushwork with delicate paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🏛️ 신고전주의 
  // ========================================
  'david': GENDER_RULE + 'Transform this into an oil painting by Jacques-Louis David, David art style, with Neoclassical perfection and clear crisp outlines. Create heroic idealized figures in classical poses with a cool restrained color palette. Apply dramatic moral narratives in Oath of the Horatii style civic virtue with sculptural modeling. Use balanced symmetrical compositions with visible brushwork and oil paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'ingres': GENDER_RULE + 'Transform this into an oil painting by Jean-Auguste-Dominique Ingres, Ingres art style, with perfectly smooth flowing contours and porcelain-smooth skin. Apply subtle brushwork visible in the background with elegant sinuous curves and graceful elongated forms. Create idealized beauty with a cool serene color palette and meticulous precise detail. Use visible oil paint texture despite the smooth finish. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌊 낭만주의 
  // ========================================
  'turner': GENDER_RULE + 'Transform this into an oil painting by J.M.W. Turner, Turner art style, with atmospheric sublime quality and swirling mist, light and color. Capture dramatic natural phenomena with luminous golden light dissolving forms. Create romantic awe-inspiring landscapes in The Fighting Temeraire style emotional power. Apply loose expressive brushwork with thick impasto and visible paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'friedrich': GENDER_RULE + 'Transform this into an oil painting by Caspar David Friedrich, Friedrich art style, in Wanderer above the Sea of Fog style with a sublime vast landscape stretching to the infinite horizon. Create mysterious atmospheric mist enveloping mountains and valleys with a solitary contemplative figure viewed from behind gazing into the immensity with back to the viewer. Capture a spiritual sense of awe and insignificance before nature with a cool somber palette of grays, blues and muted greens. Apply dramatic lighting breaking through clouds creating transcendent atmosphere with profound melancholic loneliness and romantic yearning. Evoke metaphysical depth and eternal silence. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'goya': GENDER_RULE + 'Transform this into an oil painting by Francisco Goya, Goya art style, with psychological intensity and penetrating gaze revealing inner truth. Apply dramatic chiaroscuro with deep shadows and stark contrasts in La Maja Vestida style Spanish elegance for portraits. Use a dark romantic palette with rich blacks and warm flesh tones, capturing unflinching honesty about human nature. Apply visible rough brushstrokes with expressive paint texture showing court painter sophistication with underlying tension. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'delacroix': GENDER_RULE + 'Transform this into an oil painting by Eugène Delacroix, Delacroix art style, with passionate revolutionary energy in Liberty Leading the People style dramatic action. Use vivid intense colors with bold reds, blues and warm golden tones. Create dynamic diagonal compositions with turbulent swirling movement. Apply loose expressive brushstrokes full of emotion with visible paint texture and dramatic gestures with heroic romantic intensity. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌾 사실주의 (Realism)
  // ========================================
  'millet': GENDER_RULE + 'Transform this into an oil painting by Jean-François Millet, Millet art style, depicting dignified rural labor with monumental peasant figures. Transform the clothing to 19th century peasant work clothes with a warm earthy palette of browns and ochres. Capture The Gleaners style quiet nobility with soft diffused light and serene contemplative mood. Apply visible brushwork with textured paint surface showing honest depiction of agricultural life. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'manet': GENDER_RULE + 'Transform this into an oil painting by Édouard Manet, Manet art style, with modern Paris realism in Olympia-style bold flat composition and striking contrasts. Transform the clothing to 19th century Parisian bourgeois fashion with dramatic blacks and pure whites using minimal mid-tones. Create sophisticated urban café society atmosphere with frank direct confrontational gaze. Apply loose confident brushwork with visible energetic strokes showing metropolitan elegance and modern audacity. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 🌅 인상주의 (Impressionism)
  // ========================================
  'renoir': GENDER_RULE + 'Transform this into an oil painting by Pierre-Auguste Renoir, Renoir art style, with soft feathery brushstrokes and warm luminous glow. Apply rosy pink flesh tones with pearly highlights and dappled sunlight filtering through creating a shimmering atmosphere. Create a joyful intimate mood with loose impressionist brushwork that is not smooth or digital. Use warm harmonious colors including peach, pink, coral and gold with visible oil paint texture. Include very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.',
  
  'monet': GENDER_RULE + 'Transform this into an oil painting by Claude Monet, Monet art style, with broken color brushstrokes capturing fleeting light effects. Apply soft hazy atmospheric effects like morning mist with colors blended and dissolved into each other. Use no sharp edges, creating dreamy blurred boundaries in Water Lilies style light dissolution. Apply a cool blue-green palette with warm accents where everything is slightly out of focus. Include visible paint texture with very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted Impressionist artwork, NOT a photograph, NOT 3D, NOT digital, NOT photorealistic, NOT AI-generated.',
  
  'degas': GENDER_RULE + 'Transform this into an oil painting by Edgar Degas, Degas art style, with unusual cropped angles and asymmetric compositions capturing movement and gesture. Apply soft pastel and oil texture with visible chalky strokes using pale muted colors including soft pink, peach and powder blue. Create intimate indoor scenes with delicate precise drawing. Include visible paint texture with very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital, NOT photorealistic, NOT AI-generated.',
  
  'caillebotte': GENDER_RULE + 'Transform this into an oil painting by Gustave Caillebotte, Caillebotte art style, with modern urban realism and dramatic bird\'s-eye perspective. Apply sharp perspective lines converging dramatically in Paris Street Rainy Day style city scenes with photographic clarity and impressionist color palette. Create elegant bourgeois figures in urban settings with wet pavement reflections using muted gray-blue urban tones with warm accents. Apply geometric composition with strong diagonal lines in Floor Scrapers style working figures with visible brushwork and oil paint texture. Include very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital, NOT photorealistic, NOT AI-generated.',

  // ========================================
  // 🌻 후기인상주의 (Post-Impressionism)
  // ========================================
  'vangogh': GENDER_RULE + 'Transform this into an oil painting by Vincent van Gogh, Van Gogh art style, with extremely thick impasto brushstrokes and heavy 3D paint texture like paint squeezed directly from the tube. The face and body must have visible thick impasto brushstrokes with directional swirling strokes following skin contours on cheeks, forehead, jaw, neck and arms. Do not create smooth skin or photorealistic face or body. Use chunky bold brush marks that are not smooth or blended with intense saturated colors including cobalt blue, cadmium yellow and chrome orange. Apply energetic expressive strokes throughout the entire figure with visible ridges and grooves of thick oil paint and canvas weave visible through the paint. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'gauguin': GENDER_RULE + 'Transform this into an oil painting by Paul Gauguin, Gauguin Tahitian art style, with cloisonnism technique using bold black outlines separating flat color areas. Apply pure unmixed saturated colors in simplified shapes with primitivism aesthetic and raw primitive power. Use an exotic tropical palette including deep orange, ochre yellow, turquoise, rich purple and vibrant green with warm golden-brown skin tones. Create a lush Tahitian tropical background with palm trees and exotic flowers in Tahitian Women on the Beach style decorative simplified forms. Apply visible brushstrokes with thick oil paint texture and symbolic mysterious atmosphere. Do not create any mosaic effect, tiles, geometric grid or stained glass look - use pure flat color planes with dark contour lines. Include very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted artwork, NOT photorealistic, NOT AI-generated, NOT a photograph, NOT 3D, NOT digital.',
  
  'cezanne': GENDER_RULE + 'Transform this into an oil painting by Paul Cézanne, Cézanne art style, with geometric structured forms built with parallel brushstrokes and analytical approach to underlying shapes. Capture Mont Sainte-Victoire style constructive vision with muted earth tones, blues and greens. Create solid volumes emerging from color planes with visible directional brushwork and paint texture in contemplative balanced compositions. Include very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted artwork, NOT photorealistic, NOT AI-generated, NOT a photograph, NOT 3D, NOT digital.' + PAINT_TEXTURE,
  
  'signac': GENDER_RULE + 'Transform this into a painting by Paul Signac, Signac Neo-Impressionist art style, with Pointillist technique using large visible dots of 8mm each. Apply a soft pastel color palette including pale pink, light blue, soft lavender, mint green, peach and cream yellow. The dots must not be tiny or small, and must cover the face, body and clothing. Create bright Mediterranean sunlight where dots blend optically when viewed from distance with luminous color vibration. Each dot must be individually visible. This must look like a real hand-painted Pointillist artwork, NOT a photograph, NOT 3D, NOT digital, NOT photorealistic, NOT AI-generated.',

  // ========================================
  // 🔥 야수파 (Fauvism)
  // ========================================
  'matisse': GENDER_RULE + 'Transform this into an oil painting by Henri Matisse, Matisse Fauvist art style. CRITICAL: The face and body MUST SHOW UNREALISTIC BOLD COLORS DIRECTLY ON THE SKIN - green patches on forehead, red on cheeks, purple on jaw, yellow highlights on nose or chin. Apply PURE UNMIXED PRIMARY COLORS that CLASH and VIBRATE against each other with COMPLETELY FLAT AREAS having ABSOLUTELY NO shadows, NO shading, NO depth, NO realistic skin tones. Use SIMPLIFIED FORMS with details REMOVED and BOLD DARK OUTLINES separating each color area. Apply ROUGH FAST Fauvist brushstrokes visible on face and body with brush direction clearly showing. DO NOT BLEND colors, DO NOT create smooth transitions, maintain a FLAT 2D DECORATIVE FEELING with NO volume, NO modeling, NO realistic rendering. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'derain': GENDER_RULE + 'Transform this into an oil painting by André Derain, Derain Fauvist art style, with bold Fauvist landscape colors using vivid unnatural hues. Capture Charing Cross Bridge style vibrant scenery with strong color contrasts and rough energetic brushwork clearly visible throughout. Apply liberated pure colors with dynamic compositions. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'vlaminck': GENDER_RULE + 'Transform this into an oil painting by Maurice de Vlaminck, Vlaminck Fauvist art style, with violent expressive colors and turbulent emotional intensity using the most aggressive Fauvist palette. Apply thick impulsive rough brushwork visible throughout with raw powerful energy and dramatic color explosions showing Van Gogh-influenced passion. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,

  // ========================================
  // 😱 표현주의 (Expressionism)
  // ========================================
  'munch': GENDER_RULE + 'Transform this into an oil painting by Edvard Munch, Munch Expressionist art style. CRITICAL: Background MUST have WAVY DISTORTED FLOWING LINES creating EXISTENTIAL ANXIETY atmosphere like The Scream. Apply HAUNTING SYMBOLIC COLORS - BLOOD RED sky or background, SICKLY YELLOWS, DEEP MELANCHOLIC BLUES creating PSYCHOLOGICAL UNEASE. Show SWIRLING ANXIOUS ENERGY with curved wavelike brushstrokes flowing through entire scene. Face should express RAW EMOTIONAL VULNERABILITY with features SLIGHTLY ELONGATED or DISTORTED showing inner psychological state. Background lines MUST CURVE and UNDULATE creating sense of COSMIC ANXIETY and EXISTENTIAL DREAD. Include very thick visible brushstrokes of 20mm or thicker with paint texture showing emotional turmoil.' + PAINT_TEXTURE,
  
  'kirchner': GENDER_RULE + 'Transform this into an oil painting by Ernst Ludwig Kirchner, Kirchner Expressionist art style, with angular jagged distorted forms where faces must be elongated and sharp with exaggerated angular features rather than realistic. Capture Berlin street scene style urban tension and alienation with bold clashing dissonant colors including acid green, hot pink, electric blue and harsh orange. Apply harsh angular brushstrokes visible throughout with Die Brücke German Expressionist raw primitive intensity and mask-like simplified facial features with psychological tension. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'kokoschka': GENDER_RULE + 'Transform this into an oil painting by Oskar Kokoschka, Kokoschka Expressionist art style. CRITICAL: DISTORT facial features with ANGULAR EXAGGERATED forms showing INTENSE PSYCHOLOGICAL TENSION. Apply VIOLENT TURBULENT BRUSHWORK with paint scraped and slashed in agitated directions revealing INNER EMOTIONAL TURMOIL. Use HARSH ACIDIC COLORS - sickly greens, bruised purples, feverish reds, unnatural yellows creating DISTURBING UNSETTLING atmosphere. Face MUST show PSYCHOLOGICAL EXCAVATION with features SLIGHTLY WARPED and eyes INTENSELY PROBING. Background MUST be CHURNING with NERVOUS ENERGY through chaotic brushstrokes. Include very thick visible brushstrokes of 20mm or thicker with paint texture showing emotional violence.' + PAINT_TEXTURE,
  
  

  // ========================================
  // 🎪 모더니즘 (Modernism)
  // ========================================
  'picasso': GENDER_RULE + 'Transform this into a Cubist oil painting by Pablo Picasso, Picasso Cubist art style, as a single unified image not divided into panels. Apply dramatic bold Cubist fragmentation where the face is shattered into angular geometric planes. The nose must be shown from side profile while both eyes remain visible from the front simultaneously. The jaw must be split into sharp triangular segments with thick black outlines separating each geometric section. Use bold contrasting colors including cobalt blue, terracotta, ochre, black and white that are not muted or dull. Apply African mask angularity with sharp geometric edges combining Analytical and Synthetic Cubism. Create rough visible brushstrokes with paint texture and canvas texture visible. Include very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted Cubist artwork, NOT smooth, NOT digital, NOT a photograph, NOT 3D.' + PAINT_TEXTURE,
  
  'magritte': GENDER_RULE + 'Transform this into a Surrealist oil painting by René Magritte, Magritte Surrealist art style, creating a philosophical visual paradox. Apply The Son of Man style with a mysterious object partially obscuring the face, or Golconda style multiplication of the same figure repeated in a grid pattern floating or falling through the sky. Use bowler hat gentleman aesthetic with smooth but visible oil painting technique showing subtle brushwork. Create dreamlike impossible scenarios with thought-provoking conceptual art as Belgian Surrealist. Include visible brushwork.' + PAINT_TEXTURE,
  
  'miro': GENDER_RULE + 'Transform this into an abstract oil painting by Joan Miró, Miró Surrealist art style, with playful biomorphic shapes floating on canvas. Apply childlike symbols including stars, moons, eyes and birds using primary colors of red, blue and yellow on a white or neutral background. Create spontaneous automatic drawing style with whimsical dreamlike universe and black calligraphic lines. Capture Catalan Surrealist fantasy with joyful cosmic abstraction. Include very thick visible brushstrokes of 20mm or thicker with visible paint texture. This must look like a real hand-painted artwork, NOT a photograph, NOT 3D, NOT digital.' + PAINT_TEXTURE,
  
  'chagall': GENDER_RULE + 'Transform this into a dreamlike oil painting by Marc Chagall, Chagall art style, with floating figures defying gravity in a romantic nocturnal sky. Apply soft muted pastel colors including lavender, pale blue and rose with nostalgic village scenes showing tilted houses. Create lovers embracing mid-air with symbolic imagery including violins, roosters and flowers. Capture poetic lyrical atmosphere with Jewish folklore dreamscape using visible brushwork with soft feathery strokes. Include very thick visible brushstrokes of 20mm or thicker. This must look like a real hand-painted romantic artwork, NOT a photograph, NOT 3D, NOT digital.' + PAINT_TEXTURE,
  
  'warhol': GENDER_RULE + 'Transform this into Pop Art by Andy Warhol, Warhol Pop Art style. Create a 2x2 four-panel grid layout where EACH PANEL must show the SAME person from the original photo with CRISP SHARP DETAILS, NOT blurred, NOT smudged. Each of the 4 panels MUST have different bold neon color schemes using hot pink, cyan, yellow, orange, electric blue, lime green or turquoise. Background MUST be filled with REPEATED SMALLER VERSIONS of the subject creating Warhol signature repetition pattern. Apply high contrast silkscreen printing effect with flat graphic colors, NO gradients, NO soft edges. Add visible ink texture and print imperfections. This must look like authentic Andy Warhol Pop Art silkscreen print, NOT a photograph, NOT 3D, NOT digital.',
  
  'lichtenstein': GENDER_RULE + 'Transform this into Pop Art by Roy Lichtenstein, Lichtenstein Pop Art style, with comic book style using visible Ben-Day dots pattern throughout the entire image. Apply thick black outlines around all forms using primary colors of red, yellow and blue with white. Create speech bubble aesthetic with dramatic comic panel composition and halftone printing effect. Apply bold graphic simplification with visible paint texture on dots. This must look like authentic Pop Art, NOT a photograph, NOT 3D, NOT digital.',
  
  'haring': GENDER_RULE + 'Transform this into street art by Keith Haring, Keith Haring art style, with bold continuous black outlines and simplified dancing human figures with radiant energy lines emanating from bodies. Apply flat bright colors including red, yellow, blue and green with dynamic movement and rhythm. Create subway graffiti aesthetic with joyful kinetic energy and interlocking figures. Use visible spray paint or marker texture. Include very thick visible brushstrokes of 20mm or thicker. This must look like authentic street art, NOT a photograph, NOT 3D, NOT digital.',

  // ========================================
  // ⭐ 거장 전용 (Masters Only)
  // ========================================
  'klimt': GENDER_RULE + 'Transform this into an oil painting by Gustav Klimt, Klimt Vienna Secession art style, with elaborate golden patterns and real gold leaf texture throughout. Apply Byzantine mosaic decorative elements with flat ornamental backgrounds covered in geometric spirals, circles and rectangular motifs in shimmering gold leaf. Create sensuous organic forms emerging from abstract decorative fields combining Art Nouveau flowing curves with geometric precision. Use rich textures of gold, silver and precious jewel-like colors including deep ruby red, sapphire blue and emerald green. Capture The Kiss style intimate embrace aesthetic and Judith style powerful female portraiture with erotic intimate mood within sacred ornamental splendor. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE,
  
  'frida': GENDER_RULE + 'Transform this into an oil painting by Frida Kahlo, Frida Kahlo Mexican Surrealist art style, with intense direct gaze portrait showing unflinching emotional honesty. Apply vibrant Mexican folk art colors including bright red, yellow, green, blue and pink. Create a lush tropical jungle foliage background with exotic plants and flowers. Include symbolic personal imagery such as thorns, ribbons, hearts and veins. Feature distinctive facial features with prominent connected eyebrows. Dress the subject in traditional Mexican Tehuana dress with floral headpiece and elaborate jewelry. Surround the figure with symbolic animals including monkeys, hummingbirds, black cats, deer or parrots. Incorporate autobiographical narrative elements with raw vulnerability combined with fierce strength and exposed anatomical elements if emotional. Create surreal juxtaposition of pain and beauty with visible brushwork and oil paint texture. Include very thick visible brushstrokes of 20mm or thicker.' + PAINT_TEXTURE
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
