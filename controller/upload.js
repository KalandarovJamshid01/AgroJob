const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const filterImage = (req, file, cb) => {
  console.log(file, "Manabu ekan");
  if (file.mimetype.startsWith("image")) {
    req.file = file;
    cb(null, true);
  } else {
    req.file = file;
    cb(new AppError("You must upload only image format", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: filterImage,
});

const uploadImageUser = upload.single("photo");

const resizeImage = async (req, res, next) => {
  console.log(req.file, "men");
  if (!req.file) {
    return next();
  }
  const ext = req.file.mimetype.split("/")[1];

  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .toFile(`${__dirname}/../public/img/${req.file.filename}`);
  next();
};

module.exports = { resizeImage, uploadImageUser };
