export function generateLetter(jobTitle: string, company: string, skills: string, additionalDetails: string): string {
    const body = additionalDetails.trim();

    return [
        `Dear ${company} Team,`,
        `I am writing to express my interest in the ${jobTitle} position.`,
        skills.trim() ? `My background and skills in ${skills.trim()} make me a strong candidate for this role.` : null,
        body,
        `I am confident that my enthusiasm and experience would translate into meaningful contributions to your team.`,
        `Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.`,
    ]
        .filter(Boolean)
        .join('\n\n');
}

export function generateLetterWithDelay(
    jobTitle: string,
    company: string,
    skills: string,
    additionalDetails: string,
    delayMs = 2500,
): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateLetter(jobTitle, company, skills, additionalDetails));
        }, delayMs);
    });
}
