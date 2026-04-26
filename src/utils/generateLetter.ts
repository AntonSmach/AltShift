export function generateLetter(jobTitle: string, company: string, skills: string, additionalDetails: string): string {
    const letter = [`Dear ${company} Team,\n\nI am writing to express my interest in the ${jobTitle} position.`];

    if (skills.trim()) {
        letter.push(`My background and skills in ${skills.trim()} make me a strong candidate for this role.`);
    }

    if (additionalDetails.trim()) {
        letter.push(additionalDetails.trim());
    }

    letter.push(
        `I am confident that my enthusiasm and experience would translate into meaningful contributions to your team.`,
        `Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.`,
    );

    return letter.join('\n');
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
