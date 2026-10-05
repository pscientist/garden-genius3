export type ImageUploadPanelProps = {
  beforeImgUrl: string | null;
  file: File | null;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

export function ImageUploadPanel({
  beforeImgUrl,
  file,
  loading,
  onFileChange,
  onSubmit,
}: ImageUploadPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Upload and generate controls */}
      <div className="rounded-[1.5rem] border border-[#d8c7a9]/70 bg-[#fffaf0]/80 p-4 shadow-xl shadow-[#4d5a35]/12 backdrop-blur">

        <label className="group flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#8ea56e] bg-white/55 px-5 py-4 text-center transition hover:border-[#8a5d35] hover:bg-white/75">

         <div className="flex flex-1 items-center justify-center overflow-hidden rounded-3xl border border-[#c9b38d] bg-[#2f281e] p-2 shadow-inner">
            {beforeImgUrl ? (
              <img
                alt="Before garden photo"
                className="h-full min-h-[20rem] w-full rounded-[1.25rem] object-cover"
                src={beforeImgUrl}
              />
            ) : (
              <div className="flex min-h-[20rem] w-full items-center justify-center rounded-[1.25rem] bg-[#fbf5e8]/10 px-8 text-center text-sm leading-6 text-[#fbf5e8]/75">
                Please upload your garden photo
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
