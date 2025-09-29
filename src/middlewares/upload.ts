import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "portfolio_uploads",
      format: "jpg",
      public_id: file.originalname.split(".")[0],
    };
  },
});

const upload = multer({ storage });

export default upload;
