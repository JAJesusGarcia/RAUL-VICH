export const MEDIA = {
  home: {
    video: {
      hero: "hero_ywnmkw.mp4",
      heroNorth: "north_hoa7bo.mp4"
    },
    images: {
      north: [
        "north-3_oxlsbz.webp",
        "north_jcrjxa.webp",
        "heroNorth_td07v9.jpg",
        "north-2_cpbde8.jpg",
        "north-3_oxlsbz.webp",
        "north_jcrjxa.webp",
      ],
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
