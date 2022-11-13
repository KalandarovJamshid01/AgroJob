const User = require("./../model/user");
const Region = require("./../model/region");
const jwt = require("jsonwebtoken");
const Job = require("../model/job");
const Type = require("./../model/jobType");
const District = require("./../model/district");
const Apply = require("./../model/apply");
const userRole = async (req, res, next) => {
  let user;

  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(err(403, "Toke is invallid"));
      }
      req.user = user;
    });
    user = await User.findById(req.user.id);

    return user;
  } else {
    user = false;
    return user;
  }
};

const home = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);

    const jobs = await Job.find()
      .populate({
        path: "region",
        select: "name_uz",
      })
      .populate({
        path: "district",
        select: "name_uz",
      })
      .populate({
        path: "type",
        select: "name",
      })
      .limit(6);

    console.log(jobs);
    res.render("home", {
      user,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

const jobs = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);
    const jobs = await Job.find()
      .populate({
        path: "region",
        select: "name_uz",
      })
      .populate({
        path: "district",
        select: "name_uz",
      })
      .populate({
        path: "type",
        select: "name",
      });

    res.render("jobs", {
      user,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

const jobDetail = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate({
        path: "region",
        select: "name_uz",
      })
      .populate({
        path: "district",
        select: "name_uz",
      })
      .populate({
        path: "type",
        select: "name",
      })
      .populate({ path: "user" });
    const appliedUsers = await Apply.find({ jobId: req.params.jobId }).populate(
      {
        path: "users",
        select: "name phone",
      }
    );
    let user = await userRole(req, res, next);
    res.render("jobDetail", { user, job, appliedUsers });
  } catch (error) {
    console.log(error);
  }
};
const contact = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);

    res.render("contact", {
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res, next) => {
  try {
    res.render("login", {});
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    const regions = await Region.find().populate({
      path: "districts",
      select: "name_uz _id",
    });
    res.render("register", {
      regions,
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.cookies) {
      res.clearCookie("token", null, {
        httpOnly: true,
      });
    }
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

const createJob = async (req, res, next) => {
  let user = await userRole(req, res, next);
  const regions = await Region.find().populate({
    path: "districts",
    select: "name_uz _id",
  });

  const jobTypes = await Type.find();

  try {
    res.render("createJob", {
      user,
      regions,
      jobTypes,
    });
  } catch (error) {
    console.log(error);
  }
};
const createType = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);

    const types = await Type.find().populate({
      path: "users",
      select: "name createdAt",
    });

    res.render("createType", {
      user,
      types,
    });
  } catch (error) {
    console.log(error);
  }
};

const myJobs = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);
    const jobs = await Job.find()
      .populate({
        path: "region",
        select: "name_uz",
      })
      .populate({
        path: "district",
        select: "name_uz",
      })
      .populate({
        path: "type",
        select: "name",
      });
    const regions = await Region.find().populate({
      path: "districts",
      select: "name_uz _id",
    });

    const jobTypes = await Type.find();

    res.render("myJobs", {
      user,
      jobs,
      regions,
      jobTypes,
    });
    console.log(user, jobs);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  home,
  jobs,
  jobDetail,
  contact,
  login,
  register,
  logout,
  createJob,
  createType,
  myJobs,
};
