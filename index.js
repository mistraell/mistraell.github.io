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

document.addEventListener('DOMContentLoaded', function() {
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

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === chatModal) {
            chatModal.style.display = 'none';
            chatButton.classList.remove('active');
        }
    });
});

const btnUp = {
    el: document.querySelector('#btn-up'),
    show() {
        this.el.classList.remove('footer-icon-up');
    },
    hide() {
        this.el.classList.add('footer-icon-up-hide');
    },
    addEventListener() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 400 ? this.show() : this.hide();
        });
        document.querySelector('#btn-up').onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
btnUp.addEventListener();
