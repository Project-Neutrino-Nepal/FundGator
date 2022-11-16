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
  next(null, `${__dirname}/../uploads`);
};

const eventImageDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/event-images`);
};

const eventStoryImageDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/event-story-images`);
};

const eventStoryVideoDestination = (req, file, next) => {
  next(null, `${__dirname}/../uploads/event-story-videos`);
};

module.exports = uploadEventImage = multer({
  storage: multer.diskStorage({ destination: eventImageDestination, filename }),
  fileFilter: filter,
});

module.exports = uploadEventStoryImage = multer({
  storage: multer.diskStorage({
    destination: eventStoryImageDestination,
    filename,
  }),
  fileFilter: filter,
});

module.exports = uploadEventStoryVideo = multer({
  storage: multer.diskStorage({
    destination: eventStoryVideoDestination,
    filename,
  }),
  fileFilter: filter,
});

const upload = multer({
  storage: multer.diskStorage({ destination, filename }),
  fileFilter: filter,
});

module.exports = upload;
