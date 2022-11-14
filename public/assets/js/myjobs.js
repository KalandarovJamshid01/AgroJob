const district = document.querySelector("#districtInput");

const districts = async (regionId) => {
  try {
    const res = await axios.get(
      `http://13.127.199.83:8000/api/v1/regions/${regionId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
const region = document.querySelector("#regionInput");

region.addEventListener("change", async () => {
  const res = await districts(region.value);
  for (let i = 0; i < res.data.districts.length; i++) {
    let opt = document.createElement("option");
    opt.value = res.data.districts[i]._id;
    opt.innerHTML = res.data.districts[i].name_uz;
    district.appendChild(opt);
  }
});

const deleteJobBtn = document.querySelector(".deleteJob");

const deleteJob = async (jobId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://13.127.199.83:8000/api/v1/jobs/${jobId}`,
    });
    if (res.status === 204) {
      alert("Job deleteded successfully");
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      alert("Xatolik yuz berdi");
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
  }
};

deleteJobBtn.addEventListener("click", () => {
  const jobId = deleteJobBtn.value;
  console.log(jobId);
  deleteJob(jobId);
});

const updateBtn = document.querySelector(".updateJob");
const editContent = document.querySelector(".editContent");

const updateJob = async (
  title,
  body,
  price,
  userId,
  typeId,
  regionId,
  districtId,
  photo,
  jobId
) => {
  try {
    const res = await axios.patch(
      `http://13.127.199.83:8000/api/v1/jobs/${jobId}`,
      {
        title: title,
        body: body,
        price: price,
        userId: userId,
        typeId: typeId,
        regionId: regionId,
        districtId: districtId,
        photo: photo,
      }
    );
    if (res.status === 203) {
      alert("Job updated successfully");
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      alert("Xatolik yuz berdi");
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    alert("Xatolik yuz berdi");
    window.setTimeout(() => {
      location.reload();
    }, 1000);
  }
};

const jobForm = document.querySelector(".jobForm");

editContent.addEventListener("click", async (e) => {
  console.log(e.target.classList);
  if (e.target.classList.contains("updateJob")) {
    document.querySelector(".jobForm").classList.toggle("d-none");
    let value = e.target.getAttribute("value");
    console.log(value, "value mana");
    try {
      const job = await axios({
        method: "GET",
        url: `http://13.127.199.83:8000/api/v1/jobs/${value}`,
      });
      console.log(job);
      document.querySelector(".jobName").value = job.data.title;
      document.querySelector(".jobContent").value = job.data.body;
      document.querySelector(".priceJob").value = job.data.price;
      document.querySelector(".userType").value = job.data.userId;
      document.querySelector(".jobType").value = job.data.typeId;
      region.value = job.data.regionId;
      district.value = job.data.districtId;
      jobForm.value = value;
      document.querySelector(".photoJob").value = job.data.photo;
    } catch (err) {
      console.log(err);
    }
  }
});

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector(".jobName").value;
  const body = document.querySelector(".jobContent").value;
  const price = document.querySelector(".priceJob").value;
  const userId = document.querySelector(".userType").value;
  const typeId = document.querySelector(".jobType").value;
  const regionId = region.value;
  const districtId = district.value;
  const photo = document.querySelector(".photoJob").value;
  const jobId = jobForm.value;
  console.log(title, body, price, userId, regionId, districtId, photo, typeId);
  updateJob(
    title,
    body,
    price,
    userId,
    typeId,
    regionId,
    districtId,
    photo,
    jobId
  );
});
