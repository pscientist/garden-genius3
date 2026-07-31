type SiteBackgroundProps = {
  siteRegion: string;
};

const BACKGROUND_MOODS: Record<
  string,
  {
    gradient: string;
    blob1: string;
    blob2: string;
    blob3: string;
    blob4: string;
  }
> = {
  default: {
    gradient:
      "radial-gradient(circle at top left, rgba(90,126,71,0.34), transparent 32%), radial-gradient(circle at bottom right, rgba(138,93,53,0.22), transparent 30%), linear-gradient(135deg, #eef4df 0%, #f7efe2 48%, #d9c5a6 100%)",
    blob1: "bg-[#78935b]/24",
    blob2: "bg-[#9dbb7a]/24",
    blob3: "bg-[#6f8a55]/20",
    blob4: "bg-[#8a5d35]/18",
  },
  tropical: {
    gradient:
      "radial-gradient(circle at top left, rgba(38,102,70,0.38), transparent 34%), radial-gradient(circle at bottom right, rgba(31,83,64,0.24), transparent 32%), linear-gradient(135deg, #e4f3e1 0%, #e9f7ef 48%, #c6dfc7 100%)",
    blob1: "bg-[#2f7a4f]/26",
    blob2: "bg-[#59a46b]/24",
    blob3: "bg-[#2f8a6d]/22",
    blob4: "bg-[#2b6e56]/20",
  },
  temperate: {
    gradient:
      "radial-gradient(circle at top left, rgba(90,126,71,0.34), transparent 32%), radial-gradient(circle at bottom right, rgba(138,93,53,0.22), transparent 30%), linear-gradient(135deg, #eef4df 0%, #f7efe2 48%, #d9c5a6 100%)",
    blob1: "bg-[#78935b]/24",
    blob2: "bg-[#9dbb7a]/24",
    blob3: "bg-[#6f8a55]/20",
    blob4: "bg-[#8a5d35]/18",
  },
  mediterranean: {
    gradient:
      "radial-gradient(circle at top left, rgba(198,170,112,0.34), transparent 34%), radial-gradient(circle at bottom right, rgba(128,132,156,0.24), transparent 32%), linear-gradient(135deg, #f4edd8 0%, #f6efe4 46%, #d8d2bc 100%)",
    blob1: "bg-[#b89d63]/24",
    blob2: "bg-[#9ea37b]/22",
    blob3: "bg-[#9b9276]/20",
    blob4: "bg-[#7f7f95]/20",
  },
  coastal: {
    gradient:
      "radial-gradient(circle at top left, rgba(99,134,146,0.34), transparent 34%), radial-gradient(circle at bottom right, rgba(120,153,170,0.24), transparent 32%), linear-gradient(135deg, #e6f0ef 0%, #eef3f4 44%, #d2dfdf 100%)",
    blob1: "bg-[#6f9ca6]/24",
    blob2: "bg-[#9ab9c2]/24",
    blob3: "bg-[#7f9ca6]/20",
    blob4: "bg-[#8ca3b3]/20",
  },
  "alpine-cold": {
    gradient:
      "radial-gradient(circle at top left, rgba(106,130,145,0.32), transparent 34%), radial-gradient(circle at bottom right, rgba(118,145,134,0.22), transparent 30%), linear-gradient(135deg, #e5ebef 0%, #edf2f4 46%, #d4dde1 100%)",
    blob1: "bg-[#70889e]/24",
    blob2: "bg-[#96aabd]/22",
    blob3: "bg-[#7f968f]/20",
    blob4: "bg-[#8f9cab]/20",
  },
};

export function SiteBackground({ siteRegion }: SiteBackgroundProps) {
  const mood = BACKGROUND_MOODS[siteRegion] ?? BACKGROUND_MOODS.default;

  return (
    <>
      {/* Background garden-themed color shapes */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-700"
        style={{ backgroundImage: mood.gradient }}
      />
      <div
        className={`absolute left-8 top-10 -z-10 h-56 w-56 rounded-full blur-3xl transition-colors duration-700 ${mood.blob1}`}
      />
      <div
        className={`absolute right-20 top-24 -z-10 h-32 w-52 rounded-[55%_45%_65%_35%] blur-2xl transition-colors duration-700 ${mood.blob2}`}
      />
      <div
        className={`absolute bottom-20 left-20 -z-10 h-24 w-44 rotate-[-12deg] rounded-[65%_35%_45%_55%] blur-2xl transition-colors duration-700 ${mood.blob3}`}
      />
      <div
        className={`absolute bottom-8 right-8 -z-10 h-72 w-72 rounded-full blur-3xl transition-colors duration-700 ${mood.blob4}`}
      />
    </>
  );
}
