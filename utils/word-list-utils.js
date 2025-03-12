export async function loadModals(modalPaths) {
    const responses = await Promise.all(modalPaths.map(path => fetch(path)));
    const htmlContents = await Promise.all(responses.map(response => response.text()));
    document.getElementById("modal-container").innerHTML = htmlContents.join("");
}