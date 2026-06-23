import { StaticImageData } from "next/image"
import Blogito from "@public/Blogito.png"
import OnTrack from "@public/onTrack.webp"
import SecureVault from "@public/securevault.jpg"
import TestimonialsLo from "@public/testimonialslo.png"
import FitKaka from "@public/fitkaka.webp"
import Syncoo from "@public/syncoo.webp"
import CanvasBoard from "@public/canvas.webp"

export const projectImages: Record<string, StaticImageData> = {
  "testimonialslo.png": TestimonialsLo,
  "Blogito.png": Blogito,
  "onTrack.webp": OnTrack,
  "securevault.jpg": SecureVault,
  "fitkaka.webp": FitKaka,
  "syncoo.webp": Syncoo,
  "canvas.webp": CanvasBoard,
}
