import { REGIONS } from '@/data/regions';

type RegionSelectProps = {
    siteRegion: string;
    onRegionSelect: (value: string) => void;
}

export default function RegionSelect({siteRegion, onRegionSelect} : RegionSelectProps) {
  return (
    <div className="font-inter flex items-center gap-2">
      <div className="py-1 border-1 text-sm rounded-lg px-1 border-main-nav/20">
        <select value={siteRegion} onChange={(e) => onRegionSelect(e.target.value)}>
            <option value=''>Region...</option>
            { REGIONS.map((r) => (
                <option key={r.id} value={r.id}> {r.label} </option>
            ))}
        </select>
      </div>
    </div>
  );
}
