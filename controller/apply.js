const app = require("../middleware/app");
const Apply = require("./../model/apply");

const getAll = async (req, res, next) => {
  try {
    console.log(req.params.jobId);
    const applies = await Apply.find({ jobId: req.params.jobId });

    res.status(200).json(applies);
  } catch (error) {
    console.log(error.message);
  }
};

const add = async (req, res, next) => {
  try {
    console.log(req.body);
    const apply = await Apply.create({
      userId: req.user.id,
      jobId: req.params.jobId,
    });

    res.status(201).json(apply);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  add,
};
