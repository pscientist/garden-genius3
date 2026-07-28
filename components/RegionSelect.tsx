import { REGIONS } from "@/data/regions";

type RegionSelectProps = {
  siteRegion: string;
  onRegionChange: (value: string) => void;
};

export default function RegionSelect({ siteRegion, onRegionChange }: RegionSelectProps) {
  return (
    <div className="font-inter flex items-center gap-2">
      <div className="py-1 border-1 text-sm rounded-lg px-1 border-main-nav/20">
        <select value={siteRegion} onChange={(e) => onRegionChange(e.target.value)}>
          <option value="">Select a Climate</option>
          {REGIONS.map((region) => (
            <option key={region.id} value={region.id}>
              {region.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
