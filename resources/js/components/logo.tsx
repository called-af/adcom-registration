import { cn } from '@/lib/utils';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-10 sm:h-11',
    xl: 'h-12 sm:h-14',
};

export function Logo({ size = 'md', className }: LogoProps) {
    return (
        <img
            src="/newlogo.jpeg"
            alt="UKM Android Developer Community"
            className={cn(
                'w-auto rounded-lg object-contain shadow-xs select-none',
                sizeClasses[size],
                className,
            )}
        />
    );
}

export default Logo;
