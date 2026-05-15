const OpenAI = require('openai');
const supabase = require('../lib/supabase');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sentimentLabelMap = {
  positive: "긍정",
  negative: "부정",
  neutral: "중립"
};

async function analyzeSentiment(req, res) {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "분석할 텍스트를 입력해주세요."
      });
    }

    if (text.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "텍스트는 최대 1,000자까지 입력할 수 있습니다."
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using mini for fast/cheap response. Change to gpt-4o if needed.
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `당신은 한국어 텍스트의 감성을 분석하는 AI입니다.
입력 문장을 positive, negative, neutral 중 하나로 분류하세요.
반드시 JSON 형식으로만 응답하세요.
confidence는 0부터 100 사이의 정수입니다.
reason은 한국어 2~3문장으로 작성하세요.`
        },
        {
          role: "user",
          content: `다음 텍스트의 감성을 분석하세요.

텍스트:
${text}

응답 형식:
{
  "sentiment": "positive | negative | neutral",
  "confidence": 0-100,
  "reason": "분석 이유 2~3문장"
}`
        }
      ]
    });

    const aiResponseText = completion.choices[0].message.content;
    let aiResponse;
    try {
      aiResponse = JSON.parse(aiResponseText);
    } catch (parseError) {
      console.error("AI Response Parsing Error:", parseError);
      return res.status(500).json({
        success: false,
        message: "AI 응답을 처리하는 중 문제가 발생했습니다."
      });
    }

    const { sentiment, confidence, reason } = aiResponse;
    const sentimentLabel = sentimentLabelMap[sentiment] || "중립";

    // Save to Supabase (without blocking the response)
    if (supabase) {
      supabase.from('sentiment_analyses').insert([
        {
          input_text: text,
          sentiment: sentiment,
          sentiment_label: sentimentLabel,
          confidence: confidence,
          reason: reason
        }
      ]).then(({ error }) => {
        if (error) {
          console.error("Supabase Save Error:", error.message);
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        sentiment,
        sentimentLabel,
        confidence,
        reason
      }
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({
      success: false,
      message: "감성 분석 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
    });
  }
}

module.exports = analyzeSentiment;
