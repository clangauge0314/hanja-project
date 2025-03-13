import { auth, db } from "../../js/firebase/firebase-init.js";
import {
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

let writer = null;
let currentWordId = null;

export async function initLearnHanja() {
  const modal = document.getElementById("learn-hanja-modal");
  const closeBtn = document.getElementById("close-learn-modal");
  const animateBtn = document.getElementById("animate-button");
  const quizBtn = document.getElementById("quiz-button");

  if (!modal || !closeBtn || !animateBtn || !quizBtn) {
    alert("필요한 요소를 찾을 수 없습니다.");
    return;
  }

  let isQizeMode = false;

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    writer = null;
  });

  animateBtn.addEventListener("click", () => {
    if (writer && !isQizeMode) {
      writer.animateCharacter();
    }
  });

  quizBtn.addEventListener("click", () => {
    if (!writer) return;

    isQizeMode = true;
    quizBtn.textContent = "테스트";
    animateBtn.disabled = true;

    writer.quiz({
      drawingWidth: 10,
      onMistake: function (strokeData) {
        alert(
          `${strokeData.strokeNum + 1}번 획이 틀렸습니다. (${
            strokeData.mistakesOnStroke
          }번 틀림)`
        );
      },
      onComplete: function (summaryData) {
        isQizeMode = false;
        animateBtn.disabled = false;
        quizBtn.textContent = "퀴즈";
        alert(`총 ${summaryData.totalMistakes}번 틀렸습니다.`);
      },
    });
  });

  const deleteBtn = document.getElementById("delete-hanja");
  deleteBtn.addEventListener("click", async () => {
    const hanjaToDelete = document.getElementById("learn-hanja").textContent;

    if (confirm("정말로 이 한자를 삭제하시겠습니까?")) {
      try {
        const wordlistRef = doc(
          db,
          "wordlist",
          auth.currentUser.email,
          "wordlist",
          hanjaToDelete
        );
        await deleteDoc(wordlistRef);

        alert("한자가 성공적으로 삭제되었습니다.");
        modal.classList.add("hidden");
        window.location.reload();
      } catch (error) {
        console.error("한자 삭제 중 오류 발생: ", error);
        alert("한자 삭제에 실패했습니다.");
      }
    }
  });
}

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
