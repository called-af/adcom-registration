import { Camera, Code2, FileText, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IllustrationBoxProps {
    className?: string;
    caption?: string;
}

export function IllustrationBox({
    className,
    caption = 'Collaborative • Innovative • Creative',
}: IllustrationBoxProps) {
    return (
        <div
            className={cn(
                'relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#97B88D] bg-[#A9C6A0] p-5 text-[#14532D] shadow-inner select-none sm:p-6',
                className,
            )}
        >
            <div className="relative flex h-[190px] w-full max-w-[320px] items-center justify-center">
                <div className="absolute top-2 left-3 animate-bounce rounded-lg bg-white/90 p-1.5 text-[#14532D] shadow-sm duration-1000">
                    <MessageSquare className="size-4 stroke-[2.5]" />
                </div>
                <div className="absolute top-1 right-5 rounded-lg bg-white/90 p-1.5 text-[#14532D] shadow-sm">
                    <FileText className="size-4 stroke-[2.5]" />
                </div>
                <div className="absolute bottom-6 left-2 rounded-lg bg-white/90 p-1.5 text-[#14532D] shadow-sm">
                    <Camera className="size-4 stroke-[2.5]" />
                </div>
                <div className="absolute top-12 right-2 rounded-lg bg-white/90 p-1.5 text-[#14532D] shadow-sm">
                    <Code2 className="size-4 stroke-[2.5]" />
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-emerald-900/60">
                    <Sparkles className="size-5" />
                </div>

                <svg
                    viewBox="0 0 300 160"
                    className="h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <ellipse
                        cx="150"
                        cy="148"
                        rx="120"
                        ry="10"
                        fill="#91B287"
                    />

                    <g id="left-dev">
                        <ellipse
                            cx="80"
                            cy="120"
                            rx="18"
                            ry="24"
                            fill="#14532D"
                        />
                        <circle cx="80" cy="82" r="14" fill="#F8D7B8" />
                        <path
                            d="M66 80 C66 68 94 68 94 80 C88 74 74 74 66 80 Z"
                            fill="#2E1C14"
                        />
                        <path
                            d="M68 135 C68 145 100 145 102 138"
                            stroke="#14532D"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        <polygon
                            points="82,112 110,112 106,128 78,128"
                            fill="#E2E8F0"
                        />
                        <rect
                            x="88"
                            y="96"
                            width="22"
                            height="16"
                            rx="2"
                            fill="#CBD5E1"
                        />
                        <path
                            d="M85 105 L95 116"
                            stroke="#F8D7B8"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </g>

                    <g id="android-mascot">
                        <line
                            x1="140"
                            y1="62"
                            x2="134"
                            y2="52"
                            stroke="#14532D"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                        <line
                            x1="160"
                            y1="62"
                            x2="166"
                            y2="52"
                            stroke="#14532D"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M130 76 A20 20 0 0 1 170 76 Z"
                            fill="#14532D"
                        />
                        <circle cx="140" cy="69" r="2" fill="#FFFFFF" />
                        <circle cx="160" cy="69" r="2" fill="#FFFFFF" />
                        <rect
                            x="130"
                            y="80"
                            width="40"
                            height="34"
                            rx="6"
                            fill="#14532D"
                        />
                        <rect
                            x="121"
                            y="82"
                            width="6"
                            height="24"
                            rx="3"
                            fill="#14532D"
                        />
                        <rect
                            x="173"
                            y="82"
                            width="6"
                            height="24"
                            rx="3"
                            fill="#14532D"
                        />
                        <rect
                            x="137"
                            y="116"
                            width="7"
                            height="14"
                            rx="3.5"
                            fill="#14532D"
                        />
                        <rect
                            x="156"
                            y="116"
                            width="7"
                            height="14"
                            rx="3.5"
                            fill="#14532D"
                        />
                        <circle cx="150" cy="95" r="4" fill="#A9C6A0" />
                    </g>

                    <g id="right-dev">
                        <ellipse
                            cx="220"
                            cy="120"
                            rx="18"
                            ry="24"
                            fill="#14532D"
                        />
                        <circle cx="220" cy="82" r="14" fill="#F8D7B8" />
                        <path
                            d="M206 82 C206 66 234 66 234 82 C228 72 212 72 206 82 Z"
                            fill="#4B382A"
                        />
                        <path
                            d="M232 135 C232 145 200 145 198 138"
                            stroke="#14532D"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        <polygon
                            points="190,112 218,112 222,128 194,128"
                            fill="#E2E8F0"
                        />
                        <rect
                            x="190"
                            y="96"
                            width="22"
                            height="16"
                            rx="2"
                            fill="#CBD5E1"
                        />
                        <path
                            d="M215 105 L205 116"
                            stroke="#F8D7B8"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>

            {caption && (
                <p className="mt-2 text-center text-xs font-bold tracking-wide text-[#14532D]">
                    {caption}
                </p>
            )}
        </div>
    );
}
