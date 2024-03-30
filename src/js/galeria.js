const imgs = document.querySelectorAll(".card");
const fullpage = document.getElementsByClassName("fullscreen")[0];

for (let img of imgs) {
    img.addEventListener("click", () => {
        let element = img.cloneNode(true);
        let fullscreenWrapper = document.getElementById("fs-wrapper");

        element.classList.add("fullscreen");
        element.classList.remove("card");
        fullscreenWrapper.appendChild(element);
        fullscreenWrapper.style.display = "block";
    });
}

const wrapper = document.getElementById("fs-wrapper");
wrapper.addEventListener("click", () => {
    let children = wrapper.children;
    for (child of children) {
        wrapper.removeChild(child);
    }
    wrapper.style.display = "none";
});
