import {useCallback, useEffect, useRef, useState} from 'react';

export function useClipboard(resetDelay = 2000) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) clearTimeout(timerRef.current);
        };
    }, []);

    const copy = useCallback(
        (value: string) => {
            navigator.clipboard
                .writeText(value)
                .then(() => {
                    if (timerRef.current !== null) clearTimeout(timerRef.current);
                    setCopied(true);
                    timerRef.current = setTimeout(() => setCopied(false), resetDelay);
                })
                .catch(() => {});
        },
        [resetDelay],
    );

    return {copy, copied};
}
