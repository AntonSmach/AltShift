import {FC} from 'react';
import LogoSvg from '@assets/logo.svg?react';

interface IAltShiftLogoProps {
    size?: number;
    className?: string;
}

const AltShiftLogo: FC<IAltShiftLogoProps> = ({size = 32, className}) => (
    <LogoSvg aria-hidden='true' focusable='false' width={size} height={size} className={className} />
);

export default AltShiftLogo;
