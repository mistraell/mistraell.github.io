document.addEventListener('DOMContentLoaded', function() {
    const directionsContainer = document.querySelector('#directions-container');
    let allDirections = [];

    fetch('content/data/directions.json')
        .then(response => response.json())
        .then(data => {
            allDirections = data;
            loadAllDirections();
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));

    function loadAllDirections() {
        allDirections.forEach(direction => {
            const card = createDirectionCard(direction);
            directionsContainer.appendChild(card);
        });
    }

    function createDirectionCard(direction) {
        const card = document.createElement('div');
        card.className = 'direction-card';
        card.innerHTML = `
            <div class="direction-card">
                <img src="${direction.image}" alt="${direction.name}">
                        <p>${direction.shortDescription.split('\n')[0]}</p>
                            ${direction.shortDescription
            .split('\n')
            .slice(1)
            .map(item => `<li>${item}</li>`)
            .join('')}
            <button class="view-details-btn" data-id="${direction.id}">Подробнее</button>
            </div>
        `;
        return card;
    }

    directionsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details-btn')) {
            const directionId = parseInt(e.target.getAttribute('data-id'));
            const direction = allDirections.find(d => d.id === directionId);
            showDirectionModal(direction);
        }
    });

    function showDirectionModal(direction) {
        const modal = document.createElement('div');
        modal.classList.add('direction-modal');

        modal.innerHTML = `
        <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${direction.image}" alt="${direction.name}">
                <h2>${direction.name}</h2>
                <div class="full-description">${direction.fullDescription}</div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }

    function closeModal(modal) {
        modal.classList.add('closing');

        modal.addEventListener('animationend', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, { once: true });
    }
});