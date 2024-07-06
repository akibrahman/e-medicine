import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    ({ error: "Unsupported file format. Upload only JPEG/JPG or PNG" }), false;
  }
};

const upload = multer(
  { storage, limits: { fieldSize: 1024 * 1024 } },
  fileFilter
);

export default upload;
