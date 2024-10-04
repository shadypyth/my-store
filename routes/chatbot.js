const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// إعداد مكتبة OpenAI باستخدام مفتاح API الخاص بك
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // تأكد من إضافة هذا المفتاح في ملف .env
});
const openai = new OpenAIApi(configuration);

// API للتفاعل مع الذكاء الاصطناعي
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'gpt-4',
      prompt: message,
      max_tokens: 100,
    });

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error interacting with OpenAI:', error);
    res.status(500).json({ error: 'Error processing AI request' });
  }
});

module.exports = router;
