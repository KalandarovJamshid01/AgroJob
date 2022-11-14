const router = require("express").Router();
const job = require("../controller/job");
const { resizeImage, uploadImageUser } = require("../controller/upload");
const verify = require("../verify");
router
  .route("/")
  .get(job.getAll)
  .post(verify, uploadImageUser, resizeImage, job.add);

router
  .route("/:id")
  .get(job.getOne)
  .patch(verify, job.update)
  .delete(verify, job.deletejob);

module.exports = router;
