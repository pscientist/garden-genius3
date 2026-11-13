export function LogoTitle() {
  return (
    <header className="flex items-center gap-2 sm:gap-3">
      
      <img src="/images/logo.png" alt="GardenViz logo" className="h-[55px] w-auto shrink-0"/>

      <div> 
        <h1 className="font-inter text-[21px] font-bold leading-tight tracking-tight text-brand sm:text-[23px]">
          Garden<span className="text-[#36454f]">Viz</span>
        </h1>
        <p className="font-inter mt-0.5 hidden text-xs font-semibold tracking-tight text-brand sm:block">
          Garden Design Visualizer for Busy Homeowners
        </p>

      </div>
    </header>
  );
}
