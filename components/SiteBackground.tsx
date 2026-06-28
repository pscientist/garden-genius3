export function SiteBackground() {
  return (
    <>
      {/* Background garden-themed color shapes */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(90,126,71,0.34),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(138,93,53,0.22),_transparent_30%),linear-gradient(135deg,_#eef4df_0%,_#f7efe2_48%,_#d9c5a6_100%)]" />
      <div className="absolute left-8 top-10 -z-10 h-56 w-56 rounded-full bg-[#78935b]/24 blur-3xl" />
      <div className="absolute right-20 top-24 -z-10 h-32 w-52 rounded-[55%_45%_65%_35%] bg-[#9dbb7a]/24 blur-2xl" />
      <div className="absolute bottom-20 left-20 -z-10 h-24 w-44 rotate-[-12deg] rounded-[65%_35%_45%_55%] bg-[#6f8a55]/20 blur-2xl" />
      <div className="absolute bottom-8 right-8 -z-10 h-72 w-72 rounded-full bg-[#8a5d35]/18 blur-3xl" />
    </>
  );
}
