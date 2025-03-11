import { loadNavbar } from "../../components/js/navbar.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "../../js/firebase/firebase-init.js";

let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  const elements = {
    addWordBtn: document.getElementById("add-word"),
    searchInput: document.getElementById("search-input"),
    filterType: document.getElementById("filter-type"),
    loadMoreBtn: document.getElementById("load-more"),
  }

  if(elements.addWordBtn) {
    elements.addWordBtn.addEventListener("click", () => {
      alert("클릭되었습니다.")
    })
  }

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      currentUser = user;
    } else {
      alert("로그인이 필요합니다.");
      window.location.href = "../login.html";
    }
  })
});

