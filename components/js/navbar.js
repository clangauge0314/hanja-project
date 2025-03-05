import { auth } from "../../js/firebase/firebase-init.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { deleteAccount } from "../../js/firebase/firebase-auth.js";

export async function loadNavbar() {
  try {
    const response = await fetch("../components/navbar.html");
    const html = await response.text();
    document.getElementById("navbar-container").innerHTML = html;

    initializeNavbar();
  } catch (error) {
    console.error("Navbar 로드 실패: ", error);
  }
}

function initializeNavbar() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const avatar = document.getElementById("avatar");
  const profileDropdown = document.getElementById("profile-dropdown");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  avatar.addEventListener("click", () => {
    profileDropdown.classList.toggle("hidden");
  });

  document
    .getElementById("logout-button")
    .addEventListener("click", handleLogout);
  document
    .getElementById("mobile-logout-button")
    .addEventListener("click", handleLogout);

  document
    .getElementById("delete-account-button")
    .addEventListener("click", handleDeleteAccount);
  document
    .getElementById("mobile-delete-account-button")
    .addEventListener("click", handleDeleteAccount);
}

function handleLogout() {
  signOut(auth)
    .then(() => {
      alert("로그아웃이 완료되었습니다.");
      window.location.reload();
    })
    .catch((error) => {
      alert("로그아웃에 실패했습니다.");
      console.error("로그아웃 오류: ", error);
    });
}

async function handleDeleteAccount() {
  const confirmed = confirm(
    "정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  );
  if (confirmed) {
    try {
      await deleteAccount();
      alert("회원탈퇴가 완료되었습니다.");
    } catch (error) {
      alert(error.message || "회원탈퇴 중 오류가 발생했습니다.");
    }
  }
}
