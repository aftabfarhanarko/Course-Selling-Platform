// ImageUploadField.tsx
import { useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { uploadImageToImgBB } from "@/lib/images.upload"; // adjust path

export function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreviewError(false);
    setIsUploading(true);
    try {
      const url = await uploadImageToImgBB(file);
      if (url) onChange(url);
    } catch {
      // ignore
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const hasPreview = Boolean(value) && !previewError;

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
        Category Photo{" "}
        <span className="normal-case font-normal text-gray-300">
          · optional
        </span>
      </label>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileRef.current?.click()}
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden select-none ${
          hasPreview
            ? "border-transparent"
            : "border-gray-200 hover:border-indigo-300 bg-gray-50/50 hover:bg-indigo-50/20"
        }`}
        style={{ minHeight: hasPreview ? 0 : "100px" }}
      >
        {hasPreview ? (
          <div className="relative group">
            <img
              src={value}
              alt="Category"
              onError={() => setPreviewError(true)}
              className="w-full h-36 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }}
                disabled={isUploading}
                className="px-3 py-2 rounded-xl bg-white text-[11px] font-bold text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-1.5 disabled:opacity-60"
              >
                {isUploading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Upload size={12} />
                )}
                Change
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  setPreviewError(false);
                }}
                className="px-3 py-2 rounded-xl bg-red-500 text-[11px] font-bold text-white hover:bg-red-600 transition-colors flex items-center gap-1.5"
              >
                <X size={12} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            {isUploading ? (
              <>
                <Loader2 size={24} className="animate-spin text-indigo-400" />
                <p className="text-[11px] font-semibold text-gray-400">
                  Uploading…
                </p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <ImageIcon size={18} className="text-indigo-400" />
                </div>
                <p className="text-[11px] font-semibold text-gray-500">
                  Click or drag & drop to upload
                </p>
                <p className="text-[10px] text-gray-400">
                  PNG, JPG, WEBP · max 5 MB
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
