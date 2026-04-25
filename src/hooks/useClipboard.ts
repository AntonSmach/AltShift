import {useEffect, useRef, useState} from 'react';

export const useClipboard = () => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) clearTimeout(timerRef.current);
        };
    }, []);

    const copy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            if (timerRef.current !== null) clearTimeout(timerRef.current);
            setCopied(true);
            timerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Clipboard unavailable:', error);
        }
    };

    return {copy, copied};
};
