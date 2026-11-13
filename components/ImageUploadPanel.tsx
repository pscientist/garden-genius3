export type ImageUploadPanelProps = {
  beforeImgUrl: string | null;
  file: File | null;
  loading: boolean;
  error: string | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

// Shared look for the primary action pills: green-to-charcoal 3D gradient with a soft spotlight.
const primaryPillClasses =
  "rounded-full border border-white/70 bg-[radial-gradient(circle_at_15%_10%,rgba(170,235,180,0.3),transparent_55%),linear-gradient(to_bottom_right,#3f9e5f,#1f6b45_45%,#1c2b24)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.35),0_6px_14px_rgba(0,0,0,0.45)] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] transition relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:-translate-x-full before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-0";

// "Torch" sweep: a soft light band slides left to right across the pill on hover.
// The duration is 0 when not hovered, so it snaps back off-screen instead of sweeping backwards.
const torchHoverOnLabel =
  "group-hover:before:translate-x-[200%] group-hover:before:duration-700 group-hover:before:ease-out";
const torchHoverOnSelf =
  "enabled:hover:before:translate-x-[200%] enabled:hover:before:duration-700 enabled:hover:before:ease-out";

export function ImageUploadPanel({
  beforeImgUrl,
  file,
  loading,
  error,
  onFileChange,
  onSubmit,
}: ImageUploadPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Upload and generate controls */}
      <div>

        <label className="group flex cursor-pointer flex-col items-center justify-center text-center">

         <div className="relative aspect-[4/3] w-full">
            {beforeImgUrl ? (
              <img
                alt="Before garden photo"
                className="h-full w-full rounded-2xl object-cover shadow-xl shadow-[#4d5a35]/30"
                src={beforeImgUrl}
              />
            ) : (
              <div className="@container relative h-full w-full overflow-hidden rounded-2xl bg-[#2f281e] shadow-xl shadow-[#4d5a35]/30">
                {/* Example "before" photo, softly dimmed so the invitation stands out */}
                <img
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-105 object-cover brightness-90 saturate-75 transition duration-700 group-hover:scale-110"
                  src="/images/before_images/Sample_Before1.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f321d]/85 via-[#1f321d]/45 to-[#1f321d]/20" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-5 pt-6 text-center text-[#fbf5e8] @md:gap-3 @md:px-8 @md:pt-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbf5e8]/15 ring-1 ring-[#fbf5e8]/50 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-[#fbf5e8]/25 @md:h-14 @md:w-14">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 @md:h-7 @md:w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
                      <circle cx="12" cy="13" r="3.5" />
                    </svg>
                  </span>
                  <p className="font-fraunces text-xl font-semibold leading-tight @md:text-3xl">
                    Show us your garden
                  </p>
                  <p className="max-w-xs text-xs leading-5 text-[#fbf5e8]/85 @md:text-sm @md:leading-6">
                    Drop in a photo of your outdoor space and we&apos;ll imagine
                    what it could become.
                  </p>
                  <span className={`${primaryPillClasses} ${torchHoverOnLabel} mt-1 px-4 py-1.5 text-xs group-hover:brightness-110 @md:mt-2 @md:px-6 @md:py-2.5 @md:text-base`}>
                    Upload your garden photo
                  </span>
                  <span className="hidden text-xs text-[#fbf5e8]/70 @md:block">
                    JPG or PNG
                  </span>
                </div>

                <span className="absolute bottom-3 right-4 hidden text-xs @md:block font-medium tracking-wide text-[#fbf5e8]/70">
                  Example photo
                </span>
              </div>
            )}

            <span className="absolute left-3 top-3 rounded-full bg-[#fbf5e8]/90 px-3 py-1 text-xs font-semibold text-[#253d21] shadow-md">
              Before
            </span>

            {beforeImgUrl && (
              <span className="absolute right-3 top-3 rounded-full bg-[#fbf5e8]/90 px-3 py-1 text-xs font-semibold text-[#253d21] shadow-md transition group-hover:bg-white">
                Change photo
              </span>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#2f281e]/55 p-6">
                <p
                  role="alert"
                  className="rounded-2xl bg-[#e07b24] px-5 py-4 text-center text-base font-semibold leading-6 text-white shadow-xl"
                >
                  {error}
                </p>
              </div>
            )}

            {beforeImgUrl && (
              <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
                <button
                  type="button"
                  disabled={loading}
                  onClick={(e) => {
                    // The button sits inside the <label>; don't let the click open the file picker.
                    e.preventDefault();
                    onSubmit();
                  }}
                  className={`${primaryPillClasses} ${torchHoverOnSelf} px-6 py-2.5 text-base hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100`}
                >
                  {loading ? "Composing your garden..." : "Generate Garden"}
                </button>
              </div>
            )}
          </div>
          
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {file && (
            <span className="mt-2 text-sm text-[#536246]">{file.name}</span>
          )}
        </label>
      </div>
    
    </div>
  );
}
