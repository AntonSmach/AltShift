export const useClipboard = () => {
    const copy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
        } catch (error) {
            console.error('Clipboard unavailable:', error);
        }
    };

    return {copy};
};
