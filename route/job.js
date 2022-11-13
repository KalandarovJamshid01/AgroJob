const router = require("express").Router();
const job = require("../controller/job");
const upload = require("../controller/upload");
const verify = require("../verify");
router
  .route("/")
  .get(job.getAll)
  .post(verify, upload.uploadImageUser, upload.resizeImage, job.add);

router
  .route("/:id")
  .get(job.getOne)
  .patch(verify, job.update)
  .delete(verify, job.deletejob);

module.exports = router;
