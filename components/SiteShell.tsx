"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { LogoTitle } from "@/components/LogoTitle";
import RegionSelect from "@/components/RegionSelect";
import { SiteBackground } from "@/components/SiteBackground";
import { TopNavbar } from "@/components/TopNavbar";
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
        <section className="relative isolate min-h-screen px-6 py-3 gap-2 sm:px-10 lg:px-16">
          <SiteBackground siteRegion={siteRegion} />

          <div className="mx-auto flex max-w-7xl flex-col">
            <div className="flex h-10 items-start justify-end">
              <RegionSelect
                siteRegion={siteRegion}
                onRegionSelect={setSiteRegion}
              />
            </div>

            <div className="flex w-full flex-col gap-4 border-b border-main-nav/20 pb-3 mb-6 md:flex-row md:items-center">
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

            {children}
          </div>
        </section>
      </main>
    </SiteRegionContext.Provider>
  );
}
