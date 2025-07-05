import { db } from './firebase.js';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

loadNavbar("view");

const userList = document.getElementById('userList');

async function loadUsers() {
  try {
    const snapshot = await getDocs(collection(db, "users"));

    if (snapshot.empty) {
      userList.innerHTML = "<p>No profiles found.</p>";
      return;
    }

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const docId = docSnap.id;

      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${data.name}</strong> (${data.email})<br><br>
        <div class="logo-row">
          <a href="https://github.com/${data.github}" target="_blank">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub">
          </a>
          <a href="https://leetcode.com/${data.leetcode}" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode">
          </a>
          <a href="https://codeforces.com/profile/${data.codeforces}" target="_blank">
            <img src="https://sta.codeforces.com/s/59648/images/codeforces-logo-with-telegram.png" alt="Codeforces">
          </a>
        </div>
        <br>
        <button class="deleteBtn" data-id="${docId}">🗑️ Delete</button>
      `;
      userList.appendChild(li);
    });

    userList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('deleteBtn')) {
        const id = e.target.getAttribute('data-id');
        if (confirm("Delete this profile?")) {
          await deleteDoc(doc(db, "users", id));
          alert("✅ Profile deleted.");
          location.reload();
        }
      }
    });

  } catch (err) {
    console.error("Error loading users:", err);
    userList.innerHTML = "<p style='color:red;'>Failed to load profiles.</p>";
  }
}

loadUsers();

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
