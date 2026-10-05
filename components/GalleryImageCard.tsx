import styles from '@/components/GalleryImageCard.module.css';

import { GalleryImageCardType } from '@/types/gallery'; 

const showFlexDebugOutlines = false;
const flexDebugOutline = showFlexDebugOutlines
    ? "[&>*]:outline [&>*]:outline-1 [&>*]:outline-debug"
    : "";

function CardIcon({ children }: { children: React.ReactNode }) {
    return (
        <span className="icon h-4 w-4 text-main-nav">
            {children}
        </span>
    );
}

function CardLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode}) {
    return (
        <span className="inline-flex items-center gap-1.5 text-sm text-main-nav">
            {icon}
            <span className="label">{children}</span>
        </span>
    );
}

export function GalleryImageCard({ title, 
            subtitle, 
            beforeSrc, 
            afterSrc, 
            cost, 
            skill, 
            maint } : GalleryImageCardType ) {
    return (
        <div className="border-1 rounded-xl border-main-nav/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex gap-1">
                <div className="flex-1 aspect-4/3 overflow-hidden border-1 rounded-tl-xl">
                    <img
                        src={beforeSrc}
                        alt="Before"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex-1 aspect-4/3 overflow-hidden border-1 rounded-tr-xl">
                    <img
                        src={afterSrc}
                        alt="After"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            
            <div className={`bottom_info_wrapper px-2 ${flexDebugOutline}`}>
                <div className={`${styles["image-title"]} ${flexDebugOutline} mt-2`}>{title}</div>
                <div className={`${styles["image-subtitle"]} ${flexDebugOutline}`}>{subtitle}</div>
                <div className={`icons_labels_row flex items-center justify-between gap-3 py-2 ${flexDebugOutline}`}>
                    <div className={`flex  flex-wrap items-center gap-x-4 gap-y-1 ${flexDebugOutline}`}>
                        <CardLabel icon={<PriceTagIcon />}>{cost}</CardLabel>
                        <CardLabel icon={<DifficultyIcon />}>{skill}</CardLabel>
                        <CardLabel icon={<LeafIcon />}>{maint}</CardLabel>
                    </div>
                    <HeartIcon />
                </div>
            
            </div>
        </div>
    );
}

function PriceTagIcon() {
    return (
        <CardIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
            >
                <path d="M12 2 3 11v4l9 9 9-9v-4L12 2Z" />
                <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" stroke="none" />
            </svg>
        </CardIcon>
    );
}

function DifficultyIcon() {
    return (
        <CardIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
                className="h-4 w-4"
            >
                <line x1="5" y1="20" x2="5" y2="13" />
                <line x1="10" y1="20" x2="10" y2="9" />
                <line x1="15" y1="20" x2="15" y2="5" />
            </svg>
        </CardIcon>
    );
}

function LeafIcon() {
    return (
        <CardIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
            >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
        </CardIcon>
    );
}

function HeartIcon() {
    return (
        <CardIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </CardIcon>
    );
}

