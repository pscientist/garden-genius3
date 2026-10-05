"use client";

import { SearchFilters } from "@/components/SearchFilters";
import { SearchBox } from "@/components/SearchBox";
import { PageTitle } from "@/components/PageTitle";
import { GalleryImageCard } from "@/components/GalleryImageCard";
import { useSiteRegion } from "@/components/SiteShell";
import { useState } from "react";
import { GalleryImageCardType } from "@/types/gallery";
import { filterGallery } from "./lib/filterGallery";

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

  const [budgetFilter, setBudgetFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const siteRegion = useSiteRegion();

  const showFlexDebugOutlines = false;
  const flexDebugOutline = showFlexDebugOutlines
    ? "[&>*]:outline [&>*]:outline-1 [&>*]:outline-debug"
    : "";

  return (
    <>
          <div className={`flex w-full gap-10 py-4 items-start ${flexDebugOutline}`}>
            <div className="min-w-0 flex-1 flex flex-col items-start">
              <PageTitle siteRegion={siteRegion}/>
            </div>

            <div className="flex shrink-0 items-start justify-end">
              <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>

            <div className="flex shrink-0 items-start justify-end">
              <SearchFilters budgetFilter={budgetFilter} onBudgetChange={setBudgetFilter}/>
            </div>
          </div>

          <div id="gallery" className="grid gap-x-10 gap-y-10 grid-cols-2"> 
            { filterGallery(initialImages, searchTerm, budgetFilter)
              .map((item) => <GalleryImageCard 
                  key={item.title} {...item} />)}
          </div>
    </>
  );
}
