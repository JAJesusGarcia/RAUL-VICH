export const MEDIA = {
  home: {
    video: {
      intro: "home/video/intro.mp4",
    },
    images: {
      hero: "home/images/hero.webp",
      south: {
        patagonia: "home/images/south/patagonia.jpg",
      },
      north: {
        salta: "home/images/north/salta.jpg",
      },
    },
    audio: {
      ambiental: "audio_rikhxp.mp3",
    },
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
