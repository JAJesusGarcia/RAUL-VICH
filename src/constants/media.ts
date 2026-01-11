export const MEDIA = {
  images: {
    hero: "FILE_ID_IMAGE_1",
    profile: "FILE_ID_IMAGE_2",
  },
  video: {
    intro: "FILE_ID_VIDEO_1",
  },
  audio: {
    northAmbient: "1_d_2RlAe_HKtaTq11PSlqNmYvAtsaLok",
  },
};


//USO DE CONSTANTES EN OTRO ARCHIVO

// IMAGEN:

//import { getDriveUrl } from "@/lib/drive";
// import { MEDIA } from "@/constants/media";

// <img
//   src={getDriveUrl(MEDIA.images.hero)}
//   alt="hero"
// />


// VIDEO:

// <video controls width={600}>
//   <source
//     src={getDriveUrl(MEDIA.video.intro)}
//     type="video/mp4"
//   />
// </video>

// AUDIO:

// <audio controls src={getDriveUrl(MEDIA.audio.demo)} />
