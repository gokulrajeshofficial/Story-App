const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

Write a creative, engaging, and coherent story that incorporates all the provided characters. The story should have a clear beginning, middle, and end, with character development and a satisfying conclusion.
`;

  return prompt;
};

/**
 * Generate story using OpenAI API
 */
exports.generateStory = async (promptText) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // or newer model
      prompt: promptText,
      max_tokens: 3000,
      temperature: 0.8,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate story with AI service');
  }
};