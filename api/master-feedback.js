// PicoArt - 거장(AI) 대화 API
// Claude Haiku를 사용하여 거장 페르소나 응답 + 보정 프롬프트 생성

import Anthropic from '@anthropic-ai/sdk';

// ========================================
// 거장 페르소나 정의
// ========================================
const MASTER_PERSONAS = {
  'VAN GOGH': {
    nameKo: '반 고흐',
    personality: '열정적이고 감성적, 약간의 광기',
    speakingStyle: '~하네, ~하지, 자네',
    artReferences: [
      '별이 빛나는 밤의 소용돌이',
      '해바라기의 노란빛',
      '아를의 붉은 포도밭',
      '감자 먹는 사람들의 어두운 톤',
      '사이프러스 나무의 불꽃'
    ],
    characteristics: '강렬한 붓터치, 소용돌이 패턴, 임파스토 기법, 노란색과 파란색 대비'
  },
  'KLIMT': {
    nameKo: '클림트',
    personality: '우아하고 관능적, 신비로운',
    speakingStyle: '~드리죠, ~하지요, 그대',
    artReferences: [
      '키스의 금빛 장식',
      '아델레 블로흐-바우어의 황금빛',
      '생명의 나무의 소용돌이',
      '다나에의 관능미'
    ],
    characteristics: '금박 장식, 비잔틴 모자이크, 장식적 패턴, 관능적 표현'
  },
  'MUNCH': {
    nameKo: '뭉크',
    personality: '어둡고 내성적, 불안한',
    speakingStyle: '...말이야, ~하지, 조용한 톤',
    artReferences: [
      '절규의 일그러진 형상',
      '마돈나의 창백함',
      '뱀파이어의 어둠',
      '불안의 떨림'
    ],
    characteristics: '물결치는 선, 창백한 색조, 불안한 표현, 심리적 긴장'
  },
  'PICASSO': {
    nameKo: '피카소',
    personality: '자신감 넘치고 도발적, 혁신적',
    speakingStyle: '흥!, ~하지, ~해볼까',
    artReferences: [
      '아비뇽의 처녀들의 해체',
      '게르니카의 분노',
      '우는 여인의 파편',
      '꿈의 곡선'
    ],
    characteristics: '입체파 해체, 다중 시점, 기하학적 형태, 대담한 왜곡'
  },
  'MATISSE': {
    nameKo: '마티스',
    personality: '밝고 낙천적, 자유로운',
    speakingStyle: '~하지!, ~해보세, 경쾌한 톤',
    artReferences: [
      '춤의 생동감',
      '붉은 방의 강렬함',
      '푸른 누드의 단순함',
      '삶의 기쁨의 색채'
    ],
    characteristics: '야수파 색채, 평면적 구성, 단순화된 형태, 순수한 색의 향연'
  },
  'FRIDA': {
    nameKo: '프리다 칼로',
    personality: '강인하고 직설적, 고통과 열정',
    speakingStyle: '~할게, ~야, 직접적',
    artReferences: [
      '부러진 기둥의 고통',
      '두 명의 프리다',
      '가시 목걸이의 상징',
      '멕시코 전통의 색채'
    ],
    characteristics: '초현실적 자화상, 상징적 요소, 멕시코 민속, 고통의 표현'
  },
  'WARHOL': {
    nameKo: '워홀',
    personality: '쿨하고 팝적, 상업적',
    speakingStyle: '~지, ~해볼까, 쿨한 톤',
    artReferences: [
      '마릴린 먼로의 반복',
      '캠벨 수프 캔',
      '실크스크린의 색 변주',
      '팩토리의 대량생산'
    ],
    characteristics: '실크스크린, 반복 패턴, 네온 색상, 팝아트 미학'
  }
};

// ========================================
// Claude Haiku API 호출
// ========================================
async function callClaudeHaiku(messages, systemPrompt) {
  const client = new Anthropic();
  
  const response = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages
  });
  
  return response.content[0].text;
}

// ========================================
// 시스템 프롬프트 생성
// ========================================
function buildSystemPrompt(masterKey, conversationType) {
  const persona = MASTER_PERSONAS[masterKey];
  
  if (!persona) {
    throw new Error(`Unknown master: ${masterKey}`);
  }
  
  const basePrompt = `당신은 화가 ${persona.nameKo}입니다. 사용자의 사진을 당신의 화풍으로 변환해주는 AI 서비스에서 대화합니다.

## 페르소나
- 성격: ${persona.personality}
- 말투: ${persona.speakingStyle}
- 작품 레퍼런스: ${persona.artReferences.join(', ')}
- 화풍 특징: ${persona.characteristics}

## 대화 규칙
1. 짧게 응답 (2~3문장 이내)
2. 작품 레퍼런스를 자연스럽게 활용
3. 페르소나 말투 유지
4. 친근하지만 거장의 자존심 유지`;

  if (conversationType === 'greeting') {
    return `${basePrompt}

## 현재 상황
첫 변환이 완료되었습니다. 사용자에게 첫 인사를 건네세요.
- 변환 결과에 대해 언급
- 수정이 필요하면 말해달라고 유도
- 예시: "자네의 사진을 내 붓터치로 담아보았네. 소용돌이치는 감정이 느껴지는가? 수정이 필요하면 말해주게."`;
  }
  
  if (conversationType === 'feedback') {
    return `${basePrompt}

## 현재 상황
사용자가 수정 요청을 했습니다.

## 응답 형식 (반드시 이 JSON 형식으로만 응답)
{
  "masterResponse": "거장 페르소나로 사용자에게 할 한국어 응답",
  "correctionPrompt": "FLUX 이미지 생성 모델에 전달할 영어 보정 프롬프트"
}

## correctionPrompt 작성 규칙
- 영어로 작성
- 구체적인 수정 지시
- 예: "remove beard, change clothing color to red like Arles vineyard"
- 원본 스타일은 유지하면서 요청한 부분만 수정`;
  }
  
  if (conversationType === 'result') {
    return `${basePrompt}

## 현재 상황
재변환이 완료되었습니다. 결과를 전달하세요.
- 짧게 결과 안내
- 추가 수정 가능함을 언급
- 예시: "어떤가, 자네가 원한 대로 해보았네. 또 수정이 필요하면 말해주게."`;
  }
  
  return basePrompt;
}

// ========================================
// API Handler
// ========================================
export default async function handler(req, res) {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      masterName,           // 거장 이름 (예: "VAN GOGH")
      conversationType,     // 대화 유형: "greeting" | "feedback" | "result"
      userMessage,          // 사용자 메시지 (feedback일 때만)
      conversationHistory   // 이전 대화 내역 (선택)
    } = req.body;

    // 유효성 검사
    if (!masterName || !MASTER_PERSONAS[masterName]) {
      return res.status(400).json({ 
        error: 'Invalid master name',
        validMasters: Object.keys(MASTER_PERSONAS)
      });
    }

    if (!conversationType || !['greeting', 'feedback', 'result'].includes(conversationType)) {
      return res.status(400).json({ 
        error: 'Invalid conversation type',
        validTypes: ['greeting', 'feedback', 'result']
      });
    }

    const systemPrompt = buildSystemPrompt(masterName, conversationType);
    
    // 메시지 구성
    let messages = [];
    
    // 이전 대화 내역이 있으면 추가
    if (conversationHistory && Array.isArray(conversationHistory)) {
      messages = [...conversationHistory];
    }
    
    // 현재 요청에 따른 메시지 추가
    if (conversationType === 'greeting') {
      messages.push({
        role: 'user',
        content: '첫 변환이 완료되었습니다. 인사해주세요.'
      });
    } else if (conversationType === 'feedback') {
      if (!userMessage) {
        return res.status(400).json({ error: 'userMessage is required for feedback type' });
      }
      messages.push({
        role: 'user',
        content: `사용자 수정 요청: "${userMessage}"\n\n반드시 JSON 형식으로만 응답하세요.`
      });
    } else if (conversationType === 'result') {
      messages.push({
        role: 'user',
        content: '재변환이 완료되었습니다. 결과를 전달해주세요.'
      });
    }

    // Claude API 호출
    const response = await callClaudeHaiku(messages, systemPrompt);
    
    // 응답 파싱
    let result;
    
    if (conversationType === 'feedback') {
      // JSON 응답 파싱
      try {
        // JSON 블록 추출 시도
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Raw response:', response);
        
        // 파싱 실패 시 기본 응답
        result = {
          masterResponse: response,
          correctionPrompt: ''
        };
      }
    } else {
      // greeting, result는 텍스트 응답
      result = {
        masterResponse: response,
        correctionPrompt: null
      };
    }

    // 성공 응답
    return res.status(200).json({
      success: true,
      masterName: masterName,
      masterNameKo: MASTER_PERSONAS[masterName].nameKo,
      conversationType: conversationType,
      ...result
    });

  } catch (error) {
    console.error('Master feedback API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
