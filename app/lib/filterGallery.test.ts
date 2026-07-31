import { describe, it, expect } from "vitest";
import { filterImages } from "./filterGallery";
import { GalleryItem } from "@/types/gallery";

const items: GalleryItem[] = [
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
    title: "Modern and Chic",
    subtitle: "Sleek lines with layered planting",
    beforeSrc: "/images/before_images/Sample_Before2.png",
    afterSrc: "/images/after_images/Sample_After2.png",
    cost: "500-1000",
    skill: "medium",
    maint: "low",
  },
  {
    title: "Low-Maintenance Greens",
    subtitle: "Easy-care native plants for busy households",
    beforeSrc: "/images/before_images/Sample_Before3.png",
    afterSrc: "/images/after_images/Sample_After3.png",
    cost: "Under 500",
    skill: "low",
    maint: "low",
  },
  {
    title: "Family Courtyard",
    subtitle: "Kid-friendly courtyard with seating nooks",
    beforeSrc: "/images/before_images/Sample_Before4.png",
    afterSrc: "/images/after_images/Sample_After4.png",
    cost: "Over 1000",
    skill: "high",
    maint: "medium",
  },
  {
    title: "Coastal Retreat",
    subtitle: "Salt-tolerant grasses and windbreak shrubs",
    beforeSrc: "/images/before_images/Sample_Before5.png",
    afterSrc: "/images/after_images/Sample_After5.png",
    cost: "500-1000",
    skill: "medium",
    maint: "low",
  },
  {
    title: "Tropical Escape",
    subtitle: "Bold foliage and palm-framed outdoor living",
    beforeSrc: "/images/before_images/Sample_Before6.png",
    afterSrc: "/images/after_images/Sample_After6.png",
    cost: "Over 1000",
    skill: "medium",
    maint: "high",
  },
  {
    title: "Cottage Bloom",
    subtitle: "Seasonal colour with soft cottage borders",
    beforeSrc: "/images/before_images/Sample_Before7.png",
    afterSrc: "/images/after_images/Sample_After7.png",
    cost: "500-1000",
    skill: "low",
    maint: "medium",
  },
  {
    title: "Alpine Sanctuary",
    subtitle: "Frost-hardy evergreens with winter texture",
    beforeSrc: "/images/before_images/Sample_Before1.png",
    afterSrc: "/images/after_images/alpine.png",
    cost: "500-1000",
    skill: "high",
    maint: "low",
  },
];

describe("filterImages", () => {
  it("returns all items when search and budget are empty", () => {
    expect(filterImages(items, "", "")).toHaveLength(8);
  });

  it("filters by title (case-insensitive)", () => {
    const result = filterImages(items, "", "lifestyle");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Lifestyle and BBQ");
  });

  it("filters by subtitle", () => {
    const result = filterImages(items, "", "native plants");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Low-Maintenance Greens");
  });

  it("filters by budget", () => {
    const result = filterImages(items, "Under 500", "");
    expect(result).toHaveLength(1);
    expect(result[0].cost).toBe("Under 500");
  });

  it("combines search and budget", () => {
    const result = filterImages(items, "Over 1000", "courtyard");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Family Courtyard");
  });

  it("returns empty when filters don’t match", () => {
    expect(filterImages(items,  "Under 500", "courtyard")).toHaveLength(0);
  });

});
