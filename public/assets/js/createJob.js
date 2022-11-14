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

const addJob = async (
  title,
  body,
  price,
  userId,
  typeId,
  regionId,
  districtId
) => {
  try {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("price", price);
    formData.append("userId", userId);
    formData.append("typeId", typeId);
    formData.append("regionId", regionId);
    formData.append("districtId", districtId);
    const res = await axios.post(
      "http://13.127.199.83:8000/api/v1/jobs/",
      formData
    );
    if (res.status === 201) {
      alert("Ish yaratildi");
      window.setTimeout(() => {
        location.assign("/myJobs");
      }, 1000);
    } else {
      console.log(err);
      alert(`Xatolik yuz berdi.`);
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    alert(`Xatolik yuz berdi.`);
    window.setTimeout(() => {
      location.reload();
    }, 1000);
  }
};

const jobForm = document.querySelector(".jobForm");

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector(".jobName").value;
  const body = document.querySelector(".jobContent").value;
  const price = document.querySelector(".priceJob").value;
  const userId = document.querySelector(".userType").value;
  const typeId = document.querySelector(".jobType").value;
  const regionId = region.value;
  const districtId = district.value;
  console.log(title, body, price, userId, regionId, districtId, typeId);
  addJob(title, body, price, userId, typeId, regionId, districtId);
});
