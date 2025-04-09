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


document.addEventListener("DOMContentLoaded", function () {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Ошибка загрузки футера:', error));
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatModal');
    const closeButton = document.querySelector('.close');

    chatButton.addEventListener('click', function() {
        chatModal.style.display = 'block';
        this.classList.add('active');
    });

    closeButton.addEventListener('click', function() {
        chatModal.style.display = 'none';
        chatButton.classList.remove('active');
    });

    window.addEventListener('click', function(event) {
        if (event.target === chatModal) {
            chatModal.style.display = 'none';
            chatButton.classList.remove('active');
        }
    });
});
