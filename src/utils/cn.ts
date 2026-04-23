import {twMerge} from 'tailwind-merge';
import classNames from 'classnames';

export function cn(...args: Parameters<typeof classNames>): string {
    return twMerge(classNames(...args));
}
