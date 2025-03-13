import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { fetchAndDisplayWords } from "./word-list-utils.js";

const GEMINI_API_KEY = "";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function handleAIRecommendation(currentUser, db) {
  const subject = prompt("추천받을 주제를 입력해주세요.");
  if (!subject) return;

  let amount;
  do {
    amount = prompt("추천을 받을 한자의 개수를 입력해주세요. (1~50)");
  } while (!amount.match(/^\d+$/) || amount < 1 || amount > 50);

  amount = Number(amount);

  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "한자를 추천받는 중입니다...";
  loadingDiv.className =
    "fixed top-0 left-0 w-full bg-blue-500 text-white text-center p-2";

  try {
    document.body.appendChild(loadingDiv);
    const recommendations = await getHanjaRecommendation(subject, amount);
    console.log(recommendations);
    // firestore 저장 함수
    alert(`${amount}개의 한자가 성공적으로 추천되어 저장되었습니다.`);
    await fetchAndDisplayWords(currentUser, db, "ai");
  } catch (error) {
    alert(error.message);
    console.error(error);
  } finally {
    loadingDiv.remove();
  }
}

async function getHanjaRecommendation(subject, amount) {
  const prompt = `Recommend ${amount} Chinese characters (Hanja) related to the following topic: ${subject}.  
    Follow this exact format for each character:  
    Hanja|Korean Pronunciation|Stroke Count|Description (in Korean, max 10 characters)  
    
    ### Important Rules:  
    1. The Korean pronunciation must strictly follow the format: "meaning + pronunciation" (e.g., "나무 목", "물 수").  
    2. Each response must contain exactly **one** Hanja character (no two-character words).  
    3. The stroke count must be **100% accurate**, matching the standard stroke order.  
    4. The description and pronunciation must be written in **Korean**.  
    5. Each line should contain only one entry, and the format should be followed exactly.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    alert("AI 서버 응답에 실패했습니다.");
    return;
  }

  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    alert("AI로부터 응답을 받지 못했습니다.");
    return;
  }

  const recommendations = data.candidates[0].content.parts[0].text
    .split("\n")
    .filter((line) => line.trim() && line.includes("|"))
    .map((line) => {
      const [hanja, meaning, stroke, description] = line
        .split("|")
        .map((s) => s.trim());

      return {
        hanja,
        meaning,
        stroke: parseInt(stroke),
        description,
        createdAt: new Date().toISOString(),
      };
    });

    if(recommendations.length === 0) {
        alert("유효한 한자 추천을 받지 못했습니다.")
        return;
    }

    return recommendations;
}
