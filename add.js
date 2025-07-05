import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

loadNavbar("add");

const form = document.getElementById('userForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('email').value.trim();
  const github = document.getElementById('gitHub').value.trim();
  const leetcode = document.getElementById('leetCode').value.trim();
  const codeforces = document.getElementById('codeForces').value.trim();

  if (!name || !email || !github || !leetcode || !codeforces) {
    alert("⚠️ Please fill in all the fields before submitting.");
    return;
  }

  try {
    await addDoc(collection(db, "users"), {
      name, email, github, leetcode, codeforces
    });
    alert("✅ Info added successfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("❌ Failed to add. Check console.");
  }
});
function loadNavbar(currentPage) {
  const navHTML = `
    <nav class="navbar">
      <a href="index.html" class="nav-link" data-page="home">Home</a>
      <a href="add.html" class="nav-link" data-page="add">Add Profile</a>
      <a href="view.html" class="nav-link" data-page="view">View Profiles</a>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
      link.addEventListener("click", e => e.preventDefault());
    }
  });
}
