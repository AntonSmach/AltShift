export function extractLetterBody(letter: string): string {
    return letter.replace(/^Dear .+\n\n/, '').trim();
}

export function extractLetterGreeting(letter: string): string {
    return letter.split('\n')[0] ?? '';
}
