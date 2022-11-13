const router = require("express").Router();
const verify = require("./../verify");
const apply = require("./../controller/apply");

router.route("/:jobId").get(apply.getAll).post(verify, apply.add);

module.exports = router;
