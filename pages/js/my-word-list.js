import { loadNavbar } from "../../components/js/navbar.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "../../js/firebase/firebase-init.js";

import { loadModals } from "../../utils/word-list-utils.js";

let currentUser = null;

document.addEventListener("DOMContentLoaded", async () => {
  loadNavbar();
  await loadModals(["../components/add-hanja-modal.html"]);

  const elements = {
    addWordBtn: document.getElementById("add-word"),
    searchInput: document.getElementById("search-input"),
    filterType: document.getElementById("filter-type"),
    loadMoreBtn: document.getElementById("load-more"),
  }

  if(elements.addWordBtn) {
    elements.addWordBtn.addEventListener("click", () => {
      const modal = document.getElementById("hanja-modal");
      if(modal) modal.classList.remove("hidden");
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

