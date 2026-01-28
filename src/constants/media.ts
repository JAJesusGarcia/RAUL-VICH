export const MEDIA = {
  home: {
    video: {
      hero: "hero_ywnmkw.mp4",
      heroNorth: "north_hoa7bo.mp4",
      heroSouth: "_Desprendimiento_HISTÓRICO_Glaciar_Perito_Moreno_️_Base_collapse_glacier_amazing_Lean_Gon_-_La_Vida_Misma_Lean_Gon_1080p_h264_ilezsn.mp4",
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
      south: [
        "south_cqgbx3.webp",
        "4_lxay0v.jpg",
        "3_uediva.jpg",
        "2_zbj75u.jpg",
        "1_u7szot.jpg",
        "south_cqgbx3.webp"
      ],
    },
    audio: {
      ambiental: "audio_rikhxp.mp3",
    },
  },

  destinations: {
    north: {
      cover: "north-3_oxlsbz.webp",
    },
    south: {
      cover: "north-3_oxlsbz.webp",
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
