"use client";

import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";
import { LogoTitle } from "@/components/LogoTitle";
import RegionSelect from "@/components/RegionSelect";
import { SiteBackground } from "@/components/SiteBackground";
import { TopNavbar } from "@/components/TopNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { UserNav } from "@/components/UserNav";

const SiteRegionContext = createContext("");

export function useSiteRegion() {
  return useContext(SiteRegionContext);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [siteRegion, setSiteRegion] = useState("");

  return (
    <SiteRegionContext.Provider value={siteRegion}>
      <main className="min-h-screen overflow-hidden bg-[#eef4df] text-[#21351f]">
        <section className="relative isolate flex min-h-screen flex-col px-6 pt-[2rem] pb-3 gap-2 sm:px-10 lg:px-16">
          <SiteBackground siteRegion={siteRegion} />

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
            <div className="flex w-full flex-col gap-4 border-b border-main-nav/20 pb-3 mb-6 xl:flex-row xl:items-center">
              <div className="flex w-full flex-1 justify-start">
                <Link href="/" aria-label="GardenViz home" className="no-underline">
                  <LogoTitle />
                </Link>
              </div>
              <div className="shrink-0 self-center xl:self-auto">
                <TopNavbar />
              </div>
              <div className="flex w-full flex-1 items-center justify-end gap-4">
                
                <RegionSelect
                  siteRegion={siteRegion}
                  onRegionSelect={setSiteRegion}
                />

                <UserNav />
              </div>
            </div>

            {children}
            <SiteFooter />
          </div>
        </section>
      </main>
    </SiteRegionContext.Provider>
  );
}
