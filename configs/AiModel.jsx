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
const defaultPrompt = `Generate a Course Tutorial on The Following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hour,NoOfChapters:5, in JSON format`;

/**
 * Generates a course layout using Gemini API.
 * @param {string} userPrompt - The user prompt or topic for course generation.
 * @returns {Promise<any>} - The generated course layout JSON.
 */
export async function getChapterContent_AI(userPrompt) {
    const contents = [
        {
            role: 'user',
            parts: [{ text: userPrompt }],
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

export async function getCourseLayout(userPrompt = defaultPrompt) {
    const contents = [
        {
            role: 'user',
            parts: [{ text: userPrompt }],
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
