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
  const apiKey = "a6c948ab64f7987bbf9e5477cde3a1cb";

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
    response.data?.data?.display_url ?? response.data?.data?.url ?? null;

  if (!url) {
    throw new Error("ImgBB upload failed: invalid response");
  }

  return url;
}

export async function uploadImageToBackend(file: File | Blob): Promise<string> {
  const form = new FormData();
  form.append("image", file);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://course-selling-platform-api-uwr3.onrender.com";
  
  // Get token
  let token = "";
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("course_platform_auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        token =
          parsed?.user?.token ??
          parsed?.user?.accessToken ??
          parsed?.user?.access_token ??
          parsed?.token ??
          parsed?.accessToken ??
          parsed?.access_token ?? "";
      }
    } catch {}
  }

  const response = await axios.post<{ url: string }>(
    `${baseUrl}/media/upload`,
    form,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    }
  );

  if (!response.data?.url) {
    throw new Error("Upload to backend failed: invalid response");
  }

  return response.data.url;
}
