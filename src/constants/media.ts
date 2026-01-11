export const MEDIA = {
  images: {
    hero: "images/hero.webp",
    bus: "images/bus.jpg",
  },
  video: {
    intro: "video/intro.mp4",
  },
  audio: {
    ambientNorth: "audio/north.mp3",
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
