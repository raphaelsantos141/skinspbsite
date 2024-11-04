// Toggle Submenu
function toggleSubMenu(id) {
    const submenu = document.getElementById(id);
    submenu.classList.toggle('show');
}

// Filter Weapons Functionality
function filterWeapons(category) {
    const weapons = document.querySelectorAll('.weapon-card');

    weapons.forEach(weapon => {
        if (category === 'all' || weapon.dataset.category === category) {
            weapon.style.display = 'block';
        } else {
            weapon.style.display = 'none';
        }
    });

    // Handle active class for menu and submenu items
    const allMenuItems = document.querySelectorAll('.filter-menu > li, .submenu li');

    // Remove active class from all menu items
    allMenuItems.forEach(item => item.classList.remove('active'));

    // Add active class to the clicked menu item
    const selectedItem = document.querySelector(`li[onclick="filterWeapons('${category}')"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
}

let currentPage = 1;
const itemsPerPage = 42; // 6 colunas * 7 linhas = 42 cards

function displayPage(page) {
    const weapons = document.querySelectorAll('.weapon-card');
    const totalPages = Math.ceil(weapons.length / itemsPerPage);

    // Ocultar todos os cards
    weapons.forEach((weapon, index) => {
        weapon.style.display = 'none';
        if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
            weapon.style.display = 'block'; // Mostrar apenas os cards da página atual
        }
    });

    // Gerar números de página
    const pageNumbersContainer = document.getElementById('page-numbers');
    pageNumbersContainer.innerHTML = ''; // Limpar números antigos
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.innerText = i;
        pageNumber.classList.add('page-number');
        pageNumber.onclick = () => displayPage(i);
        if (i === page) {
            pageNumber.classList.add('active'); // Destaque a página atual
        }
        pageNumbersContainer.appendChild(pageNumber);
    }

    // Atualizar estado dos botões
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === totalPages;
}

function changePage(direction) {
    const weapons = document.querySelectorAll('.weapon-card');
    const totalPages = Math.ceil(weapons.length / itemsPerPage);
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    displayPage(currentPage);
}

// Inicializar na página 1
document.addEventListener('DOMContentLoaded', () => {
    displayPage(currentPage);
});


// Sample weapon data
const weapons = [
    { name: "Aug A3", category: "assault", image: "https://cdn2.pointblank.id/Web/upload/image/weaponInfo/20240423/145248849.png" },
    { name: "K-400", category: "explosive", image: "https://cdn2.pointblank.id/Web/upload/image/weaponInfo/20240430/104509348.png" },
    { name: "Bora-12", category: "sniper", image: "sniper.png" },
    { name: "M4A1", category: "assault", image: "https://cdn2.pointblank.id/Web/upload/image/weaponInfo/20240423/145248849.png" },
    { name: "Desert Eagle", category: "secondary", image: "https://cdn2.pointblank.id/Web/upload/image/weaponInfo/20240430/104509348.png" },
    { name: "Karambit", category: "melee", image: "https://cdn2.pointblank.id/Web/upload/image/weaponInfo/20240423/145248849.png" },
    { name: "M67", category: "explosive", image: "https://cdn2.pointblank.id/Web/upload/image/weaponInfo/20240430/104509348.png" },
];

weapons.sort((a, b) => a.name.localeCompare(b.name));


// Render weapons
function renderWeapons(filter = 'all') {
    const weaponGrid = document.querySelector('.weapon-grid');

    weaponGrid.innerHTML = ''; // Clear existing cards
    weapons.forEach(weapon => {
        if (filter === 'all' || weapon.category === filter) {
            const weaponCard = document.createElement('div');
            weaponCard.className = 'weapon-card';
            weaponCard.setAttribute('data-category', weapon.category);
            weaponCard.innerHTML = `
    <a href="weapon.html?name=${encodeURIComponent(weapon.name)}">
        <div class="image-background">
            <img src="${weapon.image}" alt="${weapon.name}" class="overlay">
        </div>
        <h3>${weapon.name}</h3>
        <span class="tag ${weapon.category}">${capitalizeFirstLetter(weapon.category)}</span>
    </a>
`;

            weaponGrid.appendChild(weaponCard);
        }
    });
}

// Filter Weapons Functionality
function filterWeapons(category) {
    const active = document.querySelector('.filter-menu li.active');
    if (active) active.classList.remove('active');
    const selected = document.querySelector(`.filter-menu li:nth-child(${['all', 'main', 'secondary', 'melee', 'explosive'].indexOf(category) + 1})`);
    if (selected) selected.classList.add('active');
    renderWeapons(category);
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Toggle Submenu
function toggleSubMenu(id) {
    const submenu = document.getElementById(id);
    submenu.classList.toggle('show');
}

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const weaponCards = document.querySelectorAll('.weapon-card');
    weaponCards.forEach(card => {
        const weaponName = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = weaponName.includes(searchQuery) ? '' : 'none';
    });
});

// Initial render
renderWeapons('all');

