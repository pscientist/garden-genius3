import { GalleryImageCardType } from "@/types/gallery";

export function filterGallery(images: GalleryImageCardType[], searchTerm: string,
                                budgetFilter: string) 
{
    return images.filter((item) => {

        const term = searchTerm.toLowerCase().trim();
        const searchMatch =  !term || item.title.toLowerCase().includes(term) || 
                              item.subtitle.toLowerCase().includes(term);

        const budgetMatch = !budgetFilter || item.cost === budgetFilter;
                            
        return searchMatch && budgetMatch;

      });
}