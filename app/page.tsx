"use client";

import { LogoTitle } from "@/components/LogoTitle";
import { SiteBackground } from "@/components/SiteBackground";
import { TopNavbar } from "@/components/TopNavbar";
import { UserNav } from "@/components/UserNav";
import { SearchFilters } from "@/components/SearchFilters";
import { SearchBox } from "@/components/SearchBox";
import { PageTitle } from "@/components/PageTitle";
import { GalleryImageCard, type GalleryImageCardProps } from "@/components/GalleryImageCard";
import { useState } from "react";
import RegionSelect from "@/components/RegionSelect";

const initialImages: GalleryImageCardProps[] = [
  {
    title: "Lifestyle and BBQ",
    subtitle: "Modern backyard for entertaining",
    beforeSrc: "/images/before_images/Sample_Before1.png",
    afterSrc: "/images/after_images/Sample_After1.png",
    cost: "500-1000",
    skill: "low",
    maint: "low",
  },
  {
    title: "Cottage Garden Refresh",
    subtitle: "Soft borders and winding paths",
    beforeSrc: "/images/before_images/Sample_Before2.png",
    afterSrc: "/images/after_images/Sample_After2.png",
    cost: "500-1000",
    skill: "medium",
    maint: "medium",
  },
  {
    title: "Low-Maintenance Greens",
    subtitle: "Native plants with easy care beds",
    beforeSrc: "/images/before_images/Sample_Before3.png",
    afterSrc: "/images/after_images/Sample_After3.png",
    cost: "Under 500",
    skill: "low",
    maint: "low",
  },
  {
    title: "Family Courtyard",
    subtitle: "Play space with seating and shade",
    beforeSrc: "/images/before_images/Sample_Before4.png",
    afterSrc: "/images/after_images/Sample_After4.png",
    cost: "Over 1000",
    skill: "medium",
    maint: "low",
  },
  {
    title: "Urban Jungle Patio",
    subtitle: "Container planting on a small deck",
    beforeSrc: "/images/before_images/Sample_Before5.png",
    afterSrc: "/images/after_images/Sample_After5.png",
    cost: "Under 500",
    skill: "advanced",
    maint: "guru",
  },
  {
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
  const [siteRegion, setSiteRegion] = useState('');

  const showFlexDebugOutlines = false;
  const flexDebugOutline = showFlexDebugOutlines
    ? "[&>*]:outline [&>*]:outline-1 [&>*]:outline-debug"
    : "";

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef4df] text-[#21351f]">
      <section className="relative isolate min-h-screen px-6 py-10 sm:px-10 lg:px-16">
        <SiteBackground />

        <div className="mx-auto flex max-w-7xl flex-col gap-6]">

          <div className="flex items-start justify-end h-10">
              <RegionSelect siteRegion={siteRegion} onRegionChange={setSiteRegion} />
          </div>

          <div className="flex w-full gap-4 border-b pb-6 border-main-nav/20 md:flex-row md:items-center flex-col">
            <div className="flex w-full flex-1 justify-start">
              <LogoTitle /> 
            </div>
            <div className="shrink-0 self-center md:self-auto">
              <TopNavbar />
            </div>
            <div className="flex w-full flex-1 justify-end">
              <UserNav />
            </div>
          </div>

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
            {initialImages.filter((item) => {
              const term = searchTerm.toLowerCase();

              return (item.title.toLowerCase().includes(term) 
                      || item.subtitle.toLowerCase().includes(term))
            }).map((item) => <GalleryImageCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
