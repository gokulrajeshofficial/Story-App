const OpenAI = require("openai") // ✅ Fix: Use .default for CommonJS
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


/**
 * Construct a prompt for story generation
 */
exports.constructStoryPrompt = async (title, characters, storyType, additionalPrompt = '') => {
  // Format character details
  const characterDetails = characters.map(char => {
    return `Character: ${char.name}
Description: ${char.description}
Traits: ${char.traits.join(', ')}
Backstory: ${char.backstory || 'None provided'}
`;
  }).join('\n');

  // Construct the prompt
  const prompt = `
Generate a ${storyType} story with the title: "${title}".

Character Information:
${characterDetails}

${additionalPrompt ? `Additional instructions: ${additionalPrompt}` : ''}

Write a creative, engaging, and coherent story that features all the provided characters in main roles, along with many fictional ones. The story should have a clear beginning, middle, and end, with strong character development and a satisfying conclusion.
`;

  return prompt;
};

/**
 * Generate story using OpenAI API
 */
exports.generateStory = async (promptText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use GPT-4 for better responses (or fallback to gpt-3.5-turbo)
      messages: [{ role: "user", content: promptText }],
      max_tokens: 3000,
      temperature: 0.8,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate story with AI service');
  }
};