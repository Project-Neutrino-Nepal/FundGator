const multer = require("multer");

const filename = (req, file, next) => {
  let lastIndexof = file.originalname.lastIndexOf(".");
  let ext = file.originalname.substring(lastIndexof);
  next(null, `img-${Date.now()}${ext}`);
};

const filter = (req, file, next) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype ===
      "image/png || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4'||file.mimetype === 'video/gif'"
  ) {
    next(null, true);
  } else {
    next(null, false);
  }
};
const destination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/`);
};

const profileImageDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/profile-images`);
};

const postsImageDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/posts-images`);
};

const companyImageDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/company-images`);
};

const companyVideoDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/company-videos`);
};

const uploadProfileImage = multer({
  storage: multer.diskStorage({
    destination: profileImageDestination,
    filename,
  }),
  fileFilter: filter,
});

const uploadPostsImage = multer({
  storage: multer.diskStorage({
    destination: postsImageDestination,
    filename,
  }),
  fileFilter: filter,
});

const uploadCompanyImage = multer({
  storage: multer.diskStorage({
    destination: companyImageDestination,
    filename,
  }),
  fileFilter: filter,
});

const uploadCompanyVideo = multer({
  storage: multer.diskStorage({
    destination: companyVideoDestination,
    filename,
  }),
  fileFilter: filter,
});

const upload = multer({
  storage: multer.diskStorage({ destination, filename }),
  fileFilter: filter,
});

module.exports = {
  upload,
  uploadProfileImage,
  uploadPostsImage,
  uploadCompanyImage,
  uploadCompanyVideo,
};
