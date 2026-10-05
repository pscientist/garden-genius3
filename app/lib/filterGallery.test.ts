import { describe, it, expect } from "vitest";
import { filterGallery } from "./filterGallery";
import { GalleryImageCardType } from "@/types/gallery";

const items: GalleryImageCardType[] = [
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
    title: "Low-Maintenance Greens",
    subtitle: "Easy-care native plants for busy households",
    beforeSrc: "/images/before_images/Sample_Before3.png",
    afterSrc: "/images/after_images/Sample_After3.png",
    cost: "Under 500",
    skill: "low",
    maint: "low",
  },
  {
    id: 3,
    title: "Family Courtyard",
    subtitle: "Kid-friendly courtyard with seating nooks",
    beforeSrc: "/images/before_images/Sample_Before4.png",
    afterSrc: "/images/after_images/Sample_After4.png",
    cost: "Over 1000",
    skill: "high",
    maint: "medium",
  },
];



describe("", () => {
  it("returns all items when budget and search are empty", () => {
    expect(filterGallery(items, "", "")).toHaveLength(3);
  });

  it("returns 1 items when the budget is 500-1000", () => {
    expect(filterGallery(items, "", "500-1000")).toHaveLength(1);
  });

  it("returns 1 items when the search term is BBQ", () =>  {
    expect(filterGallery(items, "bbq", "")).toHaveLength(1);

    const result = filterGallery(items, "bbq", "");
    expect(result[0].title).toBe("Lifestyle and BBQ");
  });

  it("returns 1 item when the search term is bbq and the budget is 500-1000", () => {
        const result = filterGallery(items, "bbq", "500-1000");
        expect(result[0].title).toBe("Lifestyle and BBQ");
      }
  );

  // check search term in the subtitle
  it("returns 1 item when the search term is Kid friendly", () => {
    const result = filterGallery(items, "kid-friendly", "");
    expect(result[0].subtitle).toBe("Kid-friendly courtyard with seating nooks");
  }

);

});
