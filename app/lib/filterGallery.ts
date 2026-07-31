import { GalleryItem } from "@/types/gallery";

export function filterImages(images: GalleryItem[],  budget: string, searchTerm: string) {

    return images.filter( (galleryItem) => {

        const searchTermLower = searchTerm.toLowerCase().trim();

        const searchMatch = (
                !searchTermLower || 
                 galleryItem.title.toLowerCase().includes(searchTermLower) ||
                 galleryItem.subtitle.toLowerCase().includes(searchTermLower) 
                );

        const budgetMatch = !budget || galleryItem.cost === budget;        

        return searchMatch && budgetMatch;
    });
}