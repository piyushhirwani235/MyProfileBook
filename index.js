document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const viewBtn = document.getElementById("viewBtn");

  addBtn.addEventListener("click", () => {
    window.location.href = "add.html";
  });

  viewBtn.addEventListener("click", () => {
    window.location.href = "view.html";
  });
});
