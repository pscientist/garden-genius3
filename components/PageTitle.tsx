import { REGIONS } from '@/data/regions';

type PageTitleProps = {
    siteRegion: string;
}

export function PageTitle({siteRegion} : PageTitleProps ) {
  
  const region = REGIONS.find((r) => r.id === siteRegion);

  const regionLabel = region?.label ?? '';


  return (
    <div className="min-w-0 w-full">
      <div className="page-title">Garden Makeover Ideas
        {regionLabel ? ` - ${regionLabel} ` : ""}
        <div className="flex gap-2 text-sm">
            { region?.chips?.map((chip) => 
            <span key={chip} className="border-1 px-2 rounded-lg">{chip}</span>)}
        </div>
      </div>
    </div>
  );
}
