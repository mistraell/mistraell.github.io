document.addEventListener('DOMContentLoaded', function() {
    const teachersContainer = document.querySelector('#teachers-list');
    const loadMoreBtn = document.querySelector('#load-more-btn');
    let displayedTeachers = 0;
    const teachersPerLoad = 4;
    let allTeachers = [];


    fetch('content/data/teachers.json')
        .then(response => response.json())
        .then(data => {
            allTeachers = data;
            loadTeachers();
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));


    function loadTeachers() {
        const nextTeachers = allTeachers.slice(displayedTeachers, displayedTeachers + teachersPerLoad);

        nextTeachers.forEach(teacher => {
            const card = createTeacherCard(teacher);
            teachersContainer.appendChild(card);
        });

        displayedTeachers += nextTeachers.length;

        if (displayedTeachers >= allTeachers.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    function createTeacherCard(teacher) {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.innerHTML = `
            <div class="teacher-card">
                <div class="teacher-image-container">
                    <img src="content/images/teachers/${teacher.photo}" alt="Преподаватель">
                </div>
                <div class="description-container">
                    <h3>${teacher.name}</h3>
                    <p>${teacher.activity}</p>    
                    <p>${teacher.shortDescription}</p>
                </div>
            <button class="view-details-btn" data-id="${teacher.id}">Узнать ближе</button>
            </div>
        `;
        return card;
    }

    loadMoreBtn.addEventListener('click', loadTeachers);

    teachersContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details-btn')) {
            const teacherId = parseInt(e.target.getAttribute('data-id'));
            const teacher = allTeachers.find(t => t.id === teacherId);
            showTeacherModal(teacher);
        }
    });

    function showTeacherModal(teacher) {
        const modal = document.createElement('div');
        modal.classList.add('teacher-modal');

        modal.innerHTML = `
        <div class="modal-content">
      
                <span class="close-modal">&times;</span>
                <img src="content/images/teachers/${teacher.photo}" alt="${teacher.name}">
                <h2>${teacher.name}</h2>
                <p class="activity">${teacher.activity}</p>
                <div class="full-description">${teacher.fullDescription}</div>
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