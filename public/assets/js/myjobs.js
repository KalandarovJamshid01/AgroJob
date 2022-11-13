const deleteJobBtn = document.querySelector(".deleteJob");

const deleteJob = async (jobId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/v1/jobs/${jobId}`,
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
