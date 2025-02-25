import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

  const firebaseConfig = {

  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };