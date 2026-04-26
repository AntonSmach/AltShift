import OpenAI from 'openai';

const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
    dangerouslyAllowBrowser: true,
});

interface IStreamCompletionParams {
    prompt: string;
    model?: string;
}

export async function streamCompletion({prompt, model = DEFAULT_MODEL}: IStreamCompletionParams): Promise<string> {
    const stream = await client.chat.completions.create({
        model,
        stream: true,
        messages: [{role: 'user', content: prompt}],
    });

    let result = '';

    for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content ?? '';
    }

    return result;
}
