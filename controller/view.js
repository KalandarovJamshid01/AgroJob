const User = require("./../model/user");
const Region = require("./../model/region");
const jwt = require("jsonwebtoken");
const Job = require("../model/job");
const Type = require("./../model/jobType");
const District = require("./../model/district");
const Apply = require("./../model/apply");
const AppError = require("./../utility/appError");
const userRole = async (req, res, next) => {
  let user;
  console.log(req.cookies.token);
  if (req.cookies.token) {
    await jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      function (err, user) {
        if (err) {
          return next(new AppError("Toke is invallid", 403));
        }
        req.user = user;
      }
    );
    user = await User.findById(req.user.id);
    console.log(typeof user.role);

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
    console.log(types);

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
    const jobs = await Job.find({ userId: req.user.id })
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
    console.log(jobs);
    const regions = await Region.find().populate({
      path: "districts",
      select: "name_uz _id",
    });
    const jobTypes = await Type.find();
    console.log(jobTypes);

    res.render("myJobs", {
      user,
      jobs,
      regions,
      jobTypes,
    });
  } catch (error) {
    console.log(error);
  }
};

const jobRegion = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);
    const jobs = await Job.find({ regionId: user.regionId })
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
    console.log(jobs);
    res.render("jobRegion", {
      user,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};
const jobDistrict = async (req, res, next) => {
  try {
    let user = await userRole(req, res, next);
    const jobs = await Job.find({ districtId: user.districtId })
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
    console.log(jobs);
    res.render("jobDistrict", {
      user,
      jobs,
    });
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
  jobRegion,
  jobDistrict,
};
