import { REGIONS } from '@/data/regions';

type RegionSelectProps = {
    siteRegion: string;
    onRegionSelect: (value: string) => void;
}

const optionType = "font-menu text-[10.08px] uppercase";

export default function RegionSelect({siteRegion, onRegionSelect} : RegionSelectProps) {
  return (
    <div className="flex items-center">
      <select
        value={siteRegion}
        onChange={(e) => onRegionSelect(e.target.value)}
        className={`bg-[#fbf5e8] px-[8.4px] py-[4.2px] text-brand ${optionType}`}
      >
            <option className={optionType} value=''>Region...</option>
            { REGIONS.map((r) => (
                <option className={optionType} key={r.id} value={r.id}> {r.label} </option>
            ))}
    </select>
    </div>
  );
}
