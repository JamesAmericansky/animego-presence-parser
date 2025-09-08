import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function buildResizedUrl(url, width, height) {
  const buffer = await urlToBinary(url);
  if (!buffer) return null;

  const base64 = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64, {
    folder: "test",
    width: width,
    height: height,
    crop: "fill",
  });
  return result.secure_url;
}

async function urlToBinary(url) {
  const response = await axios.get(url, { 
    responseType: "arraybuffer",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://animego.me/"
    },
    family: 4
  });
  return Buffer.from(response.data);
}