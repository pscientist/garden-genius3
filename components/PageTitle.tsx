import { REGIONS } from "@/data/regions";

type PageTitleProps = {
  siteRegion: string;
};

export function PageTitle({ siteRegion }: PageTitleProps) {
  const region = REGIONS.find((r) => r.id === siteRegion);

  return (
    <div className="min-w-0 w-full">
      <div className="page-title">Garden Makeover Ideas</div>
      <div className="text-sm leading-relaxed wrap-break-word">
        {region
          ? region.description
          : "Real transformations, real results, see what's possible"}
      </div>
    </div>
  );
}
