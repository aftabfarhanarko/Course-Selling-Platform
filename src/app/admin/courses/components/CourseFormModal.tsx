import React, { useState, useEffect } from "react";
import { Check, Loader2, DollarSign, Link as LinkIcon, Image as ImageIcon, User, ShieldCheck, Upload } from "lucide-react";
import { UiCourse } from "./types";
import ModalShell from "./ModalShell";
import { uploadImageToBackend } from "@/lib/images.upload";

type Props = {
  initial?: UiCourse | null;
  categories: { id: number | string; name: string }[];
  instructors?: { id: number | string; name: string }[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    title: string;
    slug?: string;
    description?: string;
    categoryId: number;
    instructorId?: number;
    price?: number;
    discountPrice?: number;
    thumbnail?: string;
    courseUrl?: string;
    isPublished?: boolean;
    metadata?: {
      level?: string;
      is_premium?: boolean;
    };
  }) => void;
};

export default function CourseFormModal({
  initial,
  categories,
  instructors = [],
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [manualSlug, setManualSlug] = useState(!!initial?.slug);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId ? String(initial.categoryId) : ""
  );
  const [instructorId, setInstructorId] = useState(
    initial?.instructorId ? String(initial.instructorId) : ""
  );
  const [price, setPrice] = useState(initial?.price ? String(initial.price) : "");
  const [discountPrice, setDiscountPrice] = useState(initial?.discountPrice ? String(initial.discountPrice) : "");
  
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  
  const [courseUrl, setCourseUrl] = useState(initial?.courseUrl ?? "");
  const [level, setLevel] = useState(initial?.level ?? "");
  const [isPremium, setIsPremium] = useState(initial?.is_premium ?? false);
  const [isPublished, setIsPublished] = useState(initial?.isPublished ?? false);
  
  const [uploadingImg, setUploadingImg] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!manualSlug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  }, [title, manualSlug]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Course title is required";
    if (!categoryId) e.categoryId = "Please select a category";
    return e;
  };

  const submit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    
    let finalThumbnail = thumbnail;
    
    if (thumbnailFile) {
      setUploadingImg(true);
      try {
        finalThumbnail = await uploadImageToBackend(thumbnailFile);
      } catch (err) {
        alert("Image upload failed. Please try again.");
        setUploadingImg(false);
        return;
      }
      setUploadingImg(false);
    }
    
    onSubmit({
      title: title.trim(),
      slug: slug.trim() || undefined,
      description: description.trim() || undefined,
      categoryId: Number(categoryId),
      instructorId: instructorId ? Number(instructorId) : undefined,
      price: price ? Number(price) : undefined,
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      thumbnail: finalThumbnail.trim() || undefined,
      courseUrl: courseUrl.trim() || undefined,
      metadata: {
        level: level.trim() || undefined,
        is_premium: isPremium,
      }
    });
  };

  const isBusy = loading || uploadingImg;

  return (
    <ModalShell
      title={initial ? "Edit Course" : "Create Course"}
      subtitle={initial ? "PATCH /course/:id" : "POST /course"}
      loading={isBusy}
      onClose={onClose}
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pb-2 scrollbar-thin">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Advanced Next.js"
              className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.title ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="text-[10px] text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.categoryId ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            >
              <option value="" disabled>Select a category...</option>
              {categories.map((cat) => (
                <option key={String(cat.id)} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-[10px] text-red-500 mt-1">{errors.categoryId}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Instructor <span className="text-gray-300 normal-case font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={12} />
              </div>
              <select
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              >
                <option value="">Select instructor...</option>
                {instructors.map((inst) => (
                  <option key={String(inst.id)} value={String(inst.id)}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Level <span className="text-gray-300 normal-case font-normal">(optional)</span>
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full h-9 px-3 text-[12px] border rounded-xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            >
              <option value="">Select level...</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Slug <span className="text-gray-300 normal-case font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <LinkIcon size={12} />
              </div>
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setManualSlug(true);
                }}
                placeholder="advanced-next-js"
                className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Thumbnail Upload <span className="text-gray-300 normal-case font-normal">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setThumbnailFile(e.target.files[0]);
                  }
                }}
                className="w-full h-9 px-3 py-1.5 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-semibold file:px-2 file:py-0.5 file:rounded-md file:mr-2 file:cursor-pointer cursor-pointer text-gray-600"
              />
            </div>
            {(thumbnail || thumbnailFile) && (
               <p className="text-[9px] text-gray-400 mt-1 truncate">
                 {thumbnailFile ? `Selected: ${thumbnailFile.name}` : `Current: ${thumbnail}`}
               </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Price <span className="text-gray-300 normal-case font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <DollarSign size={12} />
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2500"
                className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Discount Price <span className="text-gray-300 normal-case font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <DollarSign size={12} />
              </div>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="1800"
                className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Course URL <span className="text-gray-300 normal-case font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <LinkIcon size={12} />
            </div>
            <input
              value={courseUrl}
              onChange={(e) => setCourseUrl(e.target.value)}
              placeholder="https://yoursite.com/courses/nextjs"
              className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Description <span className="text-gray-300 normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[90px] px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex items-center gap-6 mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPremium"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="isPremium" className="text-[12px] font-semibold text-gray-700 select-none cursor-pointer flex items-center gap-1">
              <ShieldCheck size={14} className="text-indigo-500" /> Premium Course
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
            />
            <label htmlFor="isPublished" className="text-[12px] font-semibold text-gray-700 select-none cursor-pointer">
              Publish immediately
            </label>
          </div>
        </div>

        <div className="flex gap-2.5 pt-4">
          <button
            onClick={onClose}
            disabled={isBusy}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={isBusy}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60"
          >
            {isBusy ? <Loader2 size={14} className="animate-spin" /> : <Check size={13} />}
            {uploadingImg ? "Uploading Image..." : initial ? "Save Changes" : "Create Course"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}