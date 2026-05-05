import OpenAI from 'openai';

const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
    throw new Error('VITE_GROQ_API_KEY is not set. Add it to your .env.local file.');
}

const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
    dangerouslyAllowBrowser: true,
});

interface IStreamCompletionParams {
    prompt: string;
    model?: string;
}

export async function streamCompletion({prompt, model = DEFAULT_MODEL}: IStreamCompletionParams): Promise<string> {
    let result: string | null = '';
    const stream = client.chat.completions.stream({
        model,
        messages: [{role: 'user', content: prompt}],
    });

    try {
        result = await stream.finalContent();
    } catch (error) {
        console.error('Something went wrong:', error);
    }

    return result || '';
}
