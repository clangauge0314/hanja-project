import { auth, db } from "../../js/firebase/firebase-init.js";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

export async function initAddHanja() {
    const closeModalBtn = document.getElementById("close-modal");
    const hanjaInput = document.getElementById("hanja-input");
    const strokeInput = document.getElementById("stroke-input");
    const meaningInput = document.getElementById("meaning-input");
    const descriptionInput = document.getElementById("description-input");
    const saveHanjaBtn = document.getElementById("save-hanja");

    if(closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            CloseModal();
            resetForm();
        })
    }

    if(hanjaInput) {
        hanjaInput.addEventListener("input", async (e) => {
            const hanja = e.target.value.trim();
            if(hanja) {
                try {
                    const charData = await HanziWriter.loadCharacterData(hanja);
                    strokeInput.value = charData.strokes.length;
                } catch(error) {
                    console.error("획수를 가져오는 중 오류 발생: ", error);
                    strokeInput.value = "";
                }
            } else {
                strokeInput.value = "";
            }
        })
    }
}

function CloseModal() {
    const modal = document.getElementById("hanja-modal");
    if(modal) {
        modal.classList.add("hidden");
    }
}

function resetForm() {
    const hanjaInput = document.getElementById("hanja-input");
    const meaningInput = document.getElementById("meaning-input");
    const strokeInput = document.getElementById("stroke-input");
    const descriptionInput = document.getElementById("description-input");
  
    if (hanjaInput) hanjaInput.value = "";
    if (meaningInput) meaningInput.value = "";
    if (strokeInput) strokeInput.value = "";
    if (descriptionInput) descriptionInput.value = "";
}