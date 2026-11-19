"use client";

import { PageTitle } from "@/components/PageTitle";
import { GalleryImageCard } from "@/components/GalleryImageCard";
import { useSiteRegion } from "@/components/SiteShell";
import { GalleryImageCardType } from "@/types/gallery";

const initialImages: GalleryImageCardType[] = [
  {
    id: 1,
    title: "Lifestyle and BBQ",
    subtitle: "Modern backyard for entertaining",
    beforeSrc: "/images/before_images/Sample_Before1.png",
    afterSrc: "/images/after_images/Sample_After1.png",
    cost: "500-1000",
    skill: "low",
    maint: "low",
  },
  {
    id: 2,
    title: "Cottage Garden Refresh",
    subtitle: "Soft borders and winding paths",
    beforeSrc: "/images/before_images/Sample_Before2.png",
    afterSrc: "/images/after_images/Sample_After2.png",
    cost: "500-1000",
    skill: "medium",
    maint: "medium",
  },
  {
    id: 3,
    title: "Low-Maintenance Greens",
    subtitle: "Native plants with easy care beds",
    beforeSrc: "/images/before_images/Sample_Before3.png",
    afterSrc: "/images/after_images/Sample_After3.png",
    cost: "Under 500",
    skill: "low",
    maint: "low",
  },
  {
    id: 4,
    title: "Family Courtyard",
    subtitle: "Play space with seating and shade",
    beforeSrc: "/images/before_images/Sample_Before4.png",
    afterSrc: "/images/after_images/Sample_After4.png",
    cost: "Over 1000",
    skill: "medium",
    maint: "low",
  },
  {
    id: 5,
    title: "Urban Jungle Patio",
    subtitle: "Container planting on a small deck",
    beforeSrc: "/images/before_images/Sample_Before5.png",
    afterSrc: "/images/after_images/Sample_After5.png",
    cost: "Under 500",
    skill: "advanced",
    maint: "guru",
  },
  {
    id: 6,
    title: "Weekend Warrior Yard",
    subtitle: "Quick wins with gravel and raised beds",
    beforeSrc: "/images/before_images/Sample_Before6.png",
    afterSrc: "/images/after_images/Sample_After6.png",
    cost: "Under 500",
    skill: "advanced",
    maint: "medium",
  },
];

export default function Home() {
  const siteRegion = useSiteRegion();

  return (
    <>
      <div className="w-full py-4">
        <PageTitle siteRegion={siteRegion} />
      </div>

      <div id="gallery" className="grid grid-cols-2 gap-x-10 gap-y-10">
        {initialImages.map((item) => (
          <GalleryImageCard key={item.title} {...item} />
        ))}
      </div>
    </>
  );
}
