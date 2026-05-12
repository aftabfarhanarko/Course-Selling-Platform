import axios from "axios";

type ImgBBUploadApiResponse = {
  data: {
    url?: string;
    display_url?: string;
    delete_url?: string;
  };
  success: boolean;
  status: number;
};

export async function uploadImageToImgBB(file: File | Blob): Promise<string> {
  const apiKey =
    process.env.NEXT_PUBLIC_IMGBB_API_KEY ?? process.env.IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "ImgBB API key missing. Set NEXT_PUBLIC_IMGBB_API_KEY in .env",
    );
  }

  const form = new FormData();
  form.append("image", file);

  const response = await axios.post<ImgBBUploadApiResponse>(
    "https://api.imgbb.com/1/upload",
    form,
    {
      params: { key: apiKey },
    },
  );

  const url =
    response.data?.data?.display_url ??
    response.data?.data?.url ??
    null;

  if (!url) {
    throw new Error("ImgBB upload failed: invalid response");
  }

  return url;
}
