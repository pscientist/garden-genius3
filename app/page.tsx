"use client";

import { LogoTitle } from "@/components/LogoTitle";
import { SiteBackground } from "@/components/SiteBackground";
import { TopNavbar } from "@/components/TopNavbar";
import { UserNav } from "@/components/UserNav";
import { SearchFilters } from "@/components/SearchFilters";
import { SubTitle } from "@/components/SubTitle";
import { GalleryImageCard, type GalleryImageCardProps } from "@/components/GalleryImageCard";
import { useState, useEffect } from "react";

const initialImages: GalleryImageCardProps[] = [
  {
    title: "Lifestyle and BBQ",
    subtitle: "Modern backyard for entertaining",
    beforeSrc: "/images/placeholder-before-1.png",
    afterSrc: "/images/placeholder-after-1.png",
    cost: "1000",
    skill: "low",
    maint: "low",
  },
  {
    title: "Cottage Garden Refresh",
    subtitle: "Soft borders and winding paths",
    beforeSrc: "/images/placeholder-before-2.png",
    afterSrc: "/images/placeholder-after-2.png",
    cost: "500",
    skill: "medium",
    maint: "medium",
  },
  {
    title: "Low-Maintenance Greens",
    subtitle: "Native plants with easy care beds",
    beforeSrc: "/images/placeholder-before-3.png",
    afterSrc: "/images/placeholder-after-3.png",
    cost: "800",
    skill: "low",
    maint: "low",
  },
  {
    title: "Family Courtyard",
    subtitle: "Play space with seating and shade",
    beforeSrc: "/images/placeholder-before-4.png",
    afterSrc: "/images/placeholder-after-4.png",
    cost: "2000",
    skill: "medium",
    maint: "low",
  },
  {
    title: "Urban Jungle Patio",
    subtitle: "Container planting on a small deck",
    beforeSrc: "/images/placeholder-before-5.png",
    afterSrc: "/images/placeholder-after-5.png",
    cost: "300",
    skill: "advanced",
    maint: "guru",
  },
  {
    title: "Weekend Warrior Yard",
    subtitle: "Quick wins with gravel and raised beds",
    beforeSrc: "/images/placeholder-before-6.png",
    afterSrc: "/images/placeholder-after-6.png",
    cost: "1500",
    skill: "advanced",
    maint: "medium",
  },
];

export default function Home() {
  const [galleryItems, setGalleryItems] = useState<GalleryImageCardProps[]>([]); 

  useEffect(() => {
    setGalleryItems(initialImages);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef4df] text-[#21351f]">
      <section className="relative isolate min-h-screen px-6 py-10 sm:px-10 lg:px-16">
        <SiteBackground />

        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:min-h-[calc(100vh-5rem)]">
          
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


          <div className="flex w-full gap-10 py-4 items-center">
            <div className="shrink-0 flex flex-col items-start">
              <SubTitle />
            </div>
            
            <div className="flex flex-1 items-start justify-end">
              <SearchFilters />
            </div>
          </div>

          <div id="gallery" className="grid gap-x-10 gap-y-10 grid-cols-2"> 
            {galleryItems.map((item, index) => (
                <GalleryImageCard key={index} {...item} />
            ))}
          </div>



          
        </div>
      </section>
    </main>
  );
}
