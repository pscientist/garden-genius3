export type ImageUploadPanelProps = {
  beforeImgUrl: string | null;
  file: File | null;
  loading: boolean;
  error: string | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

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
                </div>

                <span className="absolute bottom-3 right-4 hidden text-xs @md:block font-medium tracking-wide text-[#fbf5e8]/70">
                  Example photo
                </span>
              </div>
            )}

            <span className="absolute left-3 top-3 rounded-full bg-[#fbf5e8]/90 px-3 py-1 text-xs font-semibold text-[#253d21] shadow-md">
              Before
            </span>

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
          </div>
          
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          <span className="rounded-full bg-[#2f4f29] mt-3 px-4 py-2 text-sm font-semibold text-[#fbf5e8] shadow-lg shadow-[#2f4f29]/20 transition group-hover:bg-[#45663a]">
            Choose image
          </span>
          <span className="mt-2 text-sm text-[#536246]">
            {file ? file.name : "PNG, JPG, or HEIC garden photo"}
          </span>
        </label>

        <button
          className="mt-3 w-full rounded-full bg-[#294823] px-6 py-3 text-base font-semibold text-[#fbf5e8] shadow-xl shadow-[#2f4f29]/25 transition hover:-translate-y-0.5 hover:bg-[#3d6535] disabled:cursor-not-allowed disabled:bg-[#9baa8b] disabled:shadow-none"
          disabled={!file || loading}
          onClick={onSubmit}
        >
          {loading ? "Composing your garden..." : "Generate Garden"}
        </button>
      </div>
    
    </div>
  );
}
