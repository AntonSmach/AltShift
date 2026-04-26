import {twMerge} from 'tailwind-merge';
import classNames, {type ArgumentArray} from 'classnames';

export function cn(...args: ArgumentArray): string {
    return twMerge(classNames(...args));
}
