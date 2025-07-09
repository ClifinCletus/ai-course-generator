// To run this code you need to install the following dependencies:
// npm install @google/genai mime

import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('Gemini API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.');
}

export const GenerateCourse = new GoogleGenAI({
    apiKey,
});

const model = 'gemini-2.5-pro';
const config = {
    thinkingConfig: {
        thinkingBudget: -1,
    },
    responseMimeType: 'application/json',
};

// Default prompt for course generation
//const defaultPrompt = `Generate a Course Tutorial on The Following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hour,NoOfChapters:5, in JSON format`;

const defaultCoursePrompt = `Generate a course layout for the given topic. Always return the response in the following JSON format:

{
  "courseName": "Course title here",
  "description": "Course description here",
  "category": "Course category here",
  "topic": "Main topic here",
  "level": "Basic/Intermediate/Advanced",
  "duration": "Duration here",
  "noOfChapters": number,
  "chapters": [
    {
      "chapterName": "Chapter title",
      "about": "Chapter description",
      "duration": "Duration in minutes"
    }
  ]
}

Important: 
- Always respond with valid JSON only
- Include all required fields exactly as shown
- Duration should be realistic and add up to the total course duration
- Number of chapters should match the noOfChapters value
- Make sure the JSON is properly formatted and parseable

Topic: `;


/**
 * Generates a course layout using Gemini API.
 * @param {string} userPrompt - The user prompt or topic for course generation.
 * @returns {Promise<any>} - The generated course layout JSON.
*/
export async function getCourseLayout(userPrompt = defaultPrompt) {
    const enhancedPrompt = `${defaultCoursePrompt}${userPrompt}`
    const contents = [
        {
            role: 'user',
            parts: [{ text: enhancedPrompt }],
        },
    ];

    const result = await GenerateCourse.models.generateContent({
        model,
        config,
        contents,
    });

    // Extract JSON from the response (assuming response is in markdown code block)
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/```json\s*([\s\S]*?)```/);
    if (match) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
            // fallback: return raw text if JSON parsing fails
            return match[1];
        }
    }
    return text;
}

const defaultChapterPrompt = `Generate detailed chapter content for the given topic. Always return the response in the following JSON array format:

[
  {
    "title": "Chapter section title here",
    "explanation": "Detailed explanation of the concept. This should be comprehensive, clear, and educational. Include real-world examples, analogies, and context to help students understand the topic thoroughly.",
    "codeExample": "<pre><code>\n// Your code example here\n// Include comments explaining each part\n// Make sure the code is properly formatted\n// Use realistic, practical examples\n</code></pre>"
  }
]

Important Guidelines:
- Always respond with valid JSON array only
- Each object should have exactly 3 fields: "title", "explanation", and "codeExample"
- Add codeExample if needed as per the course and the chapter
- The explanation should be detailed, educational, and easy to understand
- Code examples should be wrapped in <pre><code> tags with proper formatting
- Include meaningful comments in code examples
- Make sure the JSON is properly formatted and parseable
- Cover the topic comprehensively with multiple sections if needed
- Use real-world analogies and examples in explanations

Topic: `;


export async function getChapterContent_AI(userPrompt) {
    const enhancedChapterPrompt = `${defaultChapterPrompt}${userPrompt}`
    const contents = [
        {
            role: 'user',
            parts: [{ text: enhancedChapterPrompt }],
        },
    ];

    const result = await GenerateCourse.models.generateContent({
        model,
        config,
        contents,
    });

    // Extract JSON from the response (assuming response is in markdown code block)
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/```json\s*([\s\S]*?)```/);
    if (match) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
            // fallback: return raw text if JSON parsing fails
            return match[1];
        }
    }
    return text;
}



// Export for use in other files/pages
// (No need to re-export getCourseLayout and getChapterContent_AI as they are already exported above)
