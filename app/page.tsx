import { LogoTitle } from "@/components/LogoTitle";
import { SiteBackground } from "@/components/SiteBackground";
import { TopNavbar } from "@/components/TopNavbar";
import { UserNav } from "@/components/UserNav";
import { SearchFilters } from "@/components/SearchFilters";
import { SubTitle } from "@/components/SubTitle";
import { GalleryImageCard } from "@/components/GalleryImageCard";

export default function Home() {

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
            <GalleryImageCard
                title="Lifestyle and BBQ"
                subtitle="Modern backyard for entertaining"
                beforeSrc="/images/before_images/messy8.png" 
                afterSrc="/images/after_images/messy8_cleaned.png"/>
          
            <GalleryImageCard
                title="Cottage Garden Refresh"
                subtitle="Soft borders and winding paths"
                beforeSrc="/images/before_images/messy9.png"
                afterSrc="/images/after_images/messy9_after.png"
            />

            <GalleryImageCard
                title="Low-Maintenance Greens"
                subtitle="Native plants with easy care beds"
                beforeSrc="/images/before_images/messy7.png"
                afterSrc="/images/after_images/messy7_cleaned.png"
            />

            <GalleryImageCard
                title="Family Courtyard"
                subtitle="Play space with seating and shade"
                beforeSrc="/images/before_images/messy8.png"
                afterSrc="/images/after_images/messy8_cleaned.png"
            />
              
          </div>

        </div>
      </section>
    </main>
  );
}
