import {streamCompletion} from '@helpers/groq.helper.ts';

interface IGenerateLetterParams {
    jobTitle: string;
    company: string;
    skills: string;
    additionalDetails: string;
}

export async function generateLetter(params: IGenerateLetterParams): Promise<string> {
    const {jobTitle, company, skills, additionalDetails} = params;

    const promptParts = [`Write a professional cover letter for a ${jobTitle} position at ${company}.`];

    if (skills.trim()) {
        promptParts.push(`The candidate's key skills: ${skills.trim()}.`);
    }

    if (additionalDetails.trim()) {
        promptParts.push(`Additional context: ${additionalDetails.trim()}.`);
    }

    promptParts.push(
        `Keep it concise (3-4 paragraphs), confident and specific to the company. Plain text only, no placeholders.`,
    );

    const prompt = promptParts.join(' ');

    return streamCompletion({prompt});
}
