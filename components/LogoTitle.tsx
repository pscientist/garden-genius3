export function LogoTitle() {
  return (
    <header className="flex flex-col items-start">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src="/images/logo.png" alt="GardenViz logo" className="h-[37.4px] w-auto shrink-0"/>
        <h1 className="font-fraunces text-[25px] font-bold leading-tight tracking-tight text-brand sm:text-[23px]">
          Garden<span className="text-[#36454f]">Viz</span>
        </h1>
      </div>
      <p className="font-menu mt-0.5 hidden text-[16px] tracking-tight text-hover-active sm:block">
        Simple Design for Busy Homeowners
      </p>
    </header>
  );
}
