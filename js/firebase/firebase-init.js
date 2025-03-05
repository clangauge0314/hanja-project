import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  // 여러분들의 프로젝트 정보를 입력해주세요.
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };