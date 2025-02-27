
export async function loadNavbar() {
    try {
        const response = await fetch("../components/navbar.html");
        const html = await response.text();
        document.getElementById("navbar-container").innerHTML = html;
    
    } catch(error) {
        console.error("Navbar 로드 실패: ", error);
    }
}