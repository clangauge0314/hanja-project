import { auth, db } from "../../js/firebase/firebase-init.js";
import {
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

let writer = null;
let currentWordId = null;

export async function initLearnHanja() {}

export function showLearnHanjaModal(word) {
  const modal = document.getElementById("learn-hanja-modal");
  const target = document.getElementById("character-target-div");

  target.innerHTML = "";

  document.getElementById("learn-hanja").textContent = word.hanja;
  document.getElementById("learn-meaning").textContent = word.meaning;
  document.getElementById("learn-stroke").textContent = `${word.stroke} 획`;
  document.getElementById("learn-description").textContent = word.description;
  document.getElementById("learn-date").textContent = new Date(
    word.createdAt
  ).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  writer = HanziWriter.create("character-target-div", word.hanja, {
    width: 300,
    height: 300,
    padding: 5,
    showOutline: true,
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 500,
    strokeColor: "#333",
    outlineColor: "#ddd",
    showCharacter: false,
  });

  currentWordId = word.id;

  modal.classList.remove("hidden");
}
