function openMenu() {
    document.getElementById("side-menu").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
    document.getElementById("side-menu").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}
document.addEventListener("scroll", function () {
    const scrollProgress = document.querySelector(".scroll-progress");
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width = scrollPercentage + "%";
});