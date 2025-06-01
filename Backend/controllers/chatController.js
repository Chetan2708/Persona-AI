import { generateResponse } from '../utils/generativeAI.js';
import { system_prompt } from '../utils/systemPrompt.js';
export const handleChat = async (req, res) => {
  try {
    const { user_message, history } = req.body;

    const safeHistory = history.map(msg => ({
      role: msg.role,
      content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
    }));

    const messages = [
      { role: 'user', content: JSON.stringify(system_prompt) },
      ...safeHistory,
      { role: 'user', content: typeof user_message === 'string' ? user_message : JSON.stringify(user_message) }
    ];
    
    const reply = await generateResponse(messages);
    res.json({ response: reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
