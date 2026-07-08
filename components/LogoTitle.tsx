export function LogoTitle() {
  return (
    <header className="flex items-center gap-2 sm:gap-3">
      
      <img src="/images/logo.png" alt="GardenViz logo" className="h-12 w-auto sm:h-12 shrink-0"/>

      <div> 
        <h1 className="font-fraunces text-lg font-semibold leading-tight tracking-tight text-[#1f321d] sm:text-xl">
          GardenViz
        </h1>
        <p className="font-inter mt-0.5 hidden text-sm font-medium tracking-tight text-[#3a4f35] sm:block sm:text-sm">
          Garden Design Visualizer for Busy Homeowners
        </p>

      </div>
    </header>
  );
}
