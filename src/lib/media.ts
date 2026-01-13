type MediaType = "image" | "video";

export const getMediaUrl = (type: MediaType, publicId: string) => {
  return `https://res.cloudinary.com/dpadnzbyw/${type}/upload/${publicId}`;
};


// type MediaType = "image" | "video";

// export const getMediaUrl = (
//   type: MediaType,
//   path: string
// ) => {
//   return `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${type}/upload/${path}`;
// };


