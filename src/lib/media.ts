type MediaType = "image" | "video" | "audio";

export const getMediaUrl = (
  type: MediaType,
  path: string
) => {
  return `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${type}/upload/${path}`;
};
