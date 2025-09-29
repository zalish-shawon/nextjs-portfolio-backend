import multer from "multer";

const storage = multer.memoryStorage(); // keep file buffer in memory
export const upload = multer({ storage });
