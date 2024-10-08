// routes/chatbot.js
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// إعداد OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// مسار لتقديم الدعم الفوري للمستخدمين باستخدام الذكاء الاصطناعي
router.post('/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const chatbotResponse = response.data.choices[0].message.content;
    res.status(200).json({ response: chatbotResponse });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الحصول على رد من الذكاء الاصطناعي' });
  }
});

module.exports = router;

