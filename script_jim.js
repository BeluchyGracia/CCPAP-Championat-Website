// Champion League 2025 - Interactive JavaScript

// Sample data for different tabs
const playerData = {
    scorers: [
        { rank: 1, name: "John Doe", position: "FW", team: "FC Example", goals: 12, matches: 10, goalRate: 80, image: "https://via.placeholder.com/40" },
        { rank: 2, name: "Alex Smith", position: "MF", team: "United Stars", goals: 10, matches: 11, goalRate: 70, image: "https://via.placeholder.com/40" },
        { rank: 3, name: "Marco Villa", position: "FW", team: "Real Goals", goals: 9, matches: 10, goalRate: 65, image: "https://via.placeholder.com/40" },
        { rank: 4, name: "Luis Bravo", position: "FW", team: "Goal Kings", goals: 8, matches: 12, goalRate: 60, image: "https://via.placeholder.com/40" },
        { rank: 5, name: "Carlos Silva", position: "FW", team: "FC Example", goals: 7, matches: 9, goalRate: 55, image: "https://via.placeholder.com/40" },
        { rank: 6, name: "David Wilson", position: "MF", team: "United Stars", goals: 6, matches: 10, goalRate: 50, image: "https://via.placeholder.com/40" }
    ],
    assists: [
        { rank: 1, name: "Mike Johnson", position: "MF", team: "FC Example", assists: 8, matches: 10, assistRate: 75, image: "https://via.placeholder.com/40" },
        { rank: 2, name: "Tom Brown", position: "FW", team: "United Stars", assists: 7, matches: 11, assistRate: 65, image: "https://via.placeholder.com/40" },
        { rank: 3, name: "James Lee", position: "MF", team: "Real Goals", assists: 6, matches: 10, assistRate: 60, image: "https://via.placeholder.com/40" },
        { rank: 4, name: "Robert Garcia", position: "FW", team: "Goal Kings", assists: 5, matches: 12, assistRate: 55, image: "https://via.placeholder.com/40" }
    ],
    redCards: [
        { rank: 1, name: "Steve Black", position: "DF", team: "Bottom FC", redCards: 3, matches: 10, image: "https://via.placeholder.com/40" },
        { rank: 2, name: "Mark Red", position: "MF", team: "Goal Kings", redCards: 2, matches: 11, image: "https://via.placeholder.com/40" },
        { rank: 3, name: "Paul White", position: "DF", team: "Real Goals", redCards: 2, matches: 10, image: "https://via.placeholder.com/40" }
    ],
    yellowCards: [
        { rank: 1, name: "Chris Yellow", position: "DF", team: "Bottom FC", yellowCards: 8, matches: 10, image: "https://via.placeholder.com/40" },
        { rank: 2, name: "Nick Orange", position: "MF", team: "Goal Kings", yellowCards: 7, matches: 11, image: "https://via.placeholder.com/40" },
        { rank: 3, name: "Sam Green", position: "DF", team: "Real Goals", yellowCards: 6, matches: 10, image: "https://via.placeholder.com/40" }
    ],
    goalkeepers: [
        { rank: 1, name: "Peter Safe", position: "GK", team: "FC Example", cleanSheets: 6, matches: 10, saveRate: 85, image: "https://via.placeholder.com/40" },
        { rank: 2, name: "George Wall", position: "GK", team: "United Stars", cleanSheets: 5, matches: 11, saveRate: 80, image: "https://via.placeholder.com/40" },
        { rank: 3, name: "Frank Block", position: "GK", team: "Real Goals", cleanSheets: 4, matches: 10, saveRate: 75, image: "https://via.placeholder.com/40" }
    ]
};

const teamData = [
    { rank: 1, team: "FC Example", played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 25, goalsAgainst: 10, goalDiff: 15, points: 25 },
    { rank: 2, team: "United Stars", played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 12, goalDiff: 10, points: 23 },
    { rank: 3, team: "Goal Kings", played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 19, goalsAgainst: 15, goalDiff: 4, points: 20 },
    { rank: 4, team: "Real Goals", played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 18, goalsAgainst: 16, goalDiff: 2, points: 18 },
    { rank: 5, team: "Midfield Masters", played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 16, goalsAgainst: 14, goalDiff: 2, points: 16 },
    { rank: 6, team: "Defense First", played: 10, won: 3, drawn: 5, lost: 2, goalsFor: 12, goalsAgainst: 11, goalDiff: 1, points: 14 },
    { rank: 7, team: "Attack Force", played: 10, won: 3, drawn: 2, lost: 5, goalsFor: 15, goalsAgainst: 18, goalDiff: -3, points: 11 },
    { rank: 8, team: "Balanced Team", played: 10, won: 2, drawn: 4, lost: 4, goalsFor: 13, goalsAgainst: 16, goalDiff: -3, points: 10 },
    { rank: 9, team: "Struggling FC", played: 10, won: 1, drawn: 3, lost: 6, goalsFor: 9, goalsAgainst: 20, goalDiff: -11, points: 6 },
    { rank: 10, team: "Bottom FC", played: 10, won: 1, drawn: 2, lost: 7, goalsFor: 8, goalsAgainst: 30, goalDiff: -22, points: 5 }
];

// Global variables
let currentTab = 'scorers';
let currentPage = 1;
let itemsPerPage = 4;
let filteredData = [];

// DOM elements
const tabs = document.querySelectorAll('.tabs div');
const tableBody = document.querySelector('tbody');
const pagination = document.querySelector('.pagination');
const searchInput = document.querySelector('.search-login input');
const filterSelects = document.querySelectorAll('.filters select');
const loginBtn = document.querySelector('.login-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupTabNavigation();
    setupSearch();
    setupFilters();
    setupPagination();
    setupLoginButton();
    setupTableRowInteractions();
    
    // Load initial data
    loadTabData(currentTab);
    updateTeamTable();
}

// Tab Navigation
function setupTabNavigation() {
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update current tab and reload data
            const tabTypes = ['scorers', 'assists', 'redCards', 'yellowCards', 'goalkeepers'];
            currentTab = tabTypes[index];
            currentPage = 1;
            
            loadTabData(currentTab);
        });
    });
}

// Load data for specific tab
function loadTabData(tabType) {
    filteredData = [...playerData[tabType]];
    renderTable();
    updatePagination();
}

// Render table with current data
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    pageData.forEach((player, index) => {
        const row = document.createElement('tr');
        row.className = 'player-row';
        row.dataset.playerId = player.rank;
        
        let cells = '';
        switch(currentTab) {
            case 'scorers':
                cells = `
                    <td>${player.rank}</td>
                    <td class="player-info">
                        <img src="${player.image}" alt="${player.name}" />
                        <div>${player.name} - ${player.position}</div>
                    </td>
                    <td>${player.team}</td>
                    <td>${player.goals}</td>
                    <td>${player.matches}</td>
                    <td><div class="progress-bar"><div class="progress-fill" style="width: ${player.goalRate}%"></div></div></td>
                `;
                break;
            case 'assists':
                cells = `
                    <td>${player.rank}</td>
                    <td class="player-info">
                        <img src="${player.image}" alt="${player.name}" />
                        <div>${player.name} - ${player.position}</div>
                    </td>
                    <td>${player.team}</td>
                    <td>${player.assists}</td>
                    <td>${player.matches}</td>
                    <td><div class="progress-bar"><div class="progress-fill" style="width: ${player.assistRate}%"></div></div></td>
                `;
                break;
            case 'redCards':
                cells = `
                    <td>${player.rank}</td>
                    <td class="player-info">
                        <img src="${player.image}" alt="${player.name}" />
                        <div>${player.name} - ${player.position}</div>
                    </td>
                    <td>${player.team}</td>
                    <td>${player.redCards}</td>
                    <td>${player.matches}</td>
                    <td><span class="red-card-indicator">${player.redCards}</span></td>
                `;
                break;
            case 'yellowCards':
                cells = `
                    <td>${player.rank}</td>
                    <td class="player-info">
                        <img src="${player.image}" alt="${player.name}" />
                        <div>${player.name} - ${player.position}</div>
                    </td>
                    <td>${player.team}</td>
                    <td>${player.yellowCards}</td>
                    <td>${player.matches}</td>
                    <td><span class="yellow-card-indicator">${player.yellowCards}</span></td>
                `;
                break;
            case 'goalkeepers':
                cells = `
                    <td>${player.rank}</td>
                    <td class="player-info">
                        <img src="${player.image}" alt="${player.name}" />
                        <div>${player.name} - ${player.position}</div>
                    </td>
                    <td>${player.team}</td>
                    <td>${player.cleanSheets}</td>
                    <td>${player.matches}</td>
                    <td><div class="progress-bar"><div class="progress-fill" style="width: ${player.saveRate}%"></div></div></td>
                `;
                break;
        }
        
        row.innerHTML = cells;
        tableBody.appendChild(row);
    });
    
    // Update table headers based on current tab
    updateTableHeaders();
}

// Update table headers based on current tab
function updateTableHeaders() {
    const headers = document.querySelectorAll('thead th');
    const headerTexts = {
        scorers: ['#', 'Player', 'Team', 'Goals', 'Matches', 'Goal Rate'],
        assists: ['#', 'Player', 'Team', 'Assists', 'Matches', 'Assist Rate'],
        redCards: ['#', 'Player', 'Team', 'Red Cards', 'Matches', 'Cards'],
        yellowCards: ['#', 'Player', 'Team', 'Yellow Cards', 'Matches', 'Cards'],
        goalkeepers: ['#', 'Player', 'Team', 'Clean Sheets', 'Matches', 'Save Rate']
    };
    
    headerTexts[currentTab].forEach((text, index) => {
        if (headers[index]) {
            headers[index].textContent = text;
        }
    });
}

// Search functionality
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length === 0) {
            filteredData = [...playerData[currentTab]];
        } else {
            filteredData = playerData[currentTab].filter(player => 
                player.name.toLowerCase().includes(searchTerm) ||
                player.team.toLowerCase().includes(searchTerm) ||
                player.position.toLowerCase().includes(searchTerm)
            );
        }
        
        currentPage = 1;
        renderTable();
        updatePagination();
    });
}

// Filter functionality
function setupFilters() {
    filterSelects.forEach((select, index) => {
        select.addEventListener('change', (e) => {
            applyFilters();
        });
    });
}

function applyFilters() {
    let filtered = [...playerData[currentTab]];
    
    // Apply team filter
    const teamFilter = filterSelects[3].value;
    if (teamFilter && teamFilter !== 'Team') {
        filtered = filtered.filter(player => player.team === teamFilter);
    }
    
    // Apply position filter
    const positionFilter = filterSelects[2].value;
    if (positionFilter && positionFilter !== 'Position') {
        filtered = filtered.filter(player => player.position === positionFilter);
    }
    
    filteredData = filtered;
    currentPage = 1;
    renderTable();
    updatePagination();
}

// Pagination
function setupPagination() {
    pagination.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const text = e.target.textContent;
            
            if (text === 'Previous' && currentPage > 1) {
                currentPage--;
            } else if (text === 'Next' && currentPage < getTotalPages()) {
                currentPage++;
            } else if (!isNaN(text)) {
                currentPage = parseInt(text);
            }
            
            renderTable();
            updatePagination();
        }
    });
}

function updatePagination() {
    const totalPages = getTotalPages();
    const buttons = pagination.querySelectorAll('button');
    
    // Update page number buttons
    buttons.forEach((button, index) => {
        if (index > 0 && index < buttons.length - 1) {
            const pageNum = index;
            button.textContent = pageNum;
            button.classList.toggle('active', pageNum === currentPage);
        }
    });
    
    // Update Previous/Next buttons
    buttons[0].disabled = currentPage === 1;
    buttons[buttons.length - 1].disabled = currentPage === totalPages;
}

function getTotalPages() {
    return Math.ceil(filteredData.length / itemsPerPage);
}

// Team table update
function updateTeamTable() {
    const teamTableBody = document.querySelector('.performance-table tbody');
    if (!teamTableBody) return;
    
    teamTableBody.innerHTML = '';
    
    teamData.forEach(team => {
        const row = document.createElement('tr');
        if (team.rank <= 3) row.classList.add('top');
        if (team.rank >= 8) row.classList.add('bottom');
        
        row.innerHTML = `
            <td>${team.rank}</td>
            <td><i class="fas fa-trophy"></i> ${team.team}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${team.goalDiff > 0 ? '+' : ''}${team.goalDiff}</td>
            <td>${team.points}</td>
        `;
        
        teamTableBody.appendChild(row);
    });
}

// Login button functionality
function setupLoginButton() {
    loginBtn.addEventListener('click', () => {
        showLoginModal();
    });
}

function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Login to Champion League</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
    
    // Form submission
    const form = modal.querySelector('#loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;
        
        // Simulate login
        if (username && password) {
            loginBtn.textContent = `Welcome, ${username}`;
            loginBtn.style.background = '#4CAF50';
            modal.remove();
            showNotification('Login successful!', 'success');
        } else {
            showNotification('Please enter valid credentials', 'error');
        }
    });
}

// Table row interactions
function setupTableRowInteractions() {
    document.addEventListener('click', (e) => {
        const row = e.target.closest('.player-row');
        if (row) {
            showPlayerDetails(row.dataset.playerId);
        }
    });
}

function showPlayerDetails(playerId) {
    const player = playerData[currentTab].find(p => p.rank == playerId);
    if (!player) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content player-details">
            <span class="close">&times;</span>
            <div class="player-header">
                <img src="${player.image}" alt="${player.name}" />
                <div>
                    <h2>${player.name}</h2>
                    <p>${player.position} • ${player.team}</p>
                </div>
            </div>
            <div class="player-stats">
                <h3>Statistics</h3>
                <div class="stats-grid">
                    ${getPlayerStatsHTML(player)}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

function getPlayerStatsHTML(player) {
    switch(currentTab) {
        case 'scorers':
            return `
                <div class="stat-item">
                    <span class="stat-label">Goals</span>
                    <span class="stat-value">${player.goals}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Matches</span>
                    <span class="stat-value">${player.matches}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Goal Rate</span>
                    <span class="stat-value">${player.goalRate}%</span>
                </div>
            `;
        case 'assists':
            return `
                <div class="stat-item">
                    <span class="stat-label">Assists</span>
                    <span class="stat-value">${player.assists}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Matches</span>
                    <span class="stat-value">${player.matches}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Assist Rate</span>
                    <span class="stat-value">${player.assistRate}%</span>
                </div>
            `;
        case 'goalkeepers':
            return `
                <div class="stat-item">
                    <span class="stat-label">Clean Sheets</span>
                    <span class="stat-value">${player.cleanSheets}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Matches</span>
                    <span class="stat-value">${player.matches}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Save Rate</span>
                    <span class="stat-value">${player.saveRate}%</span>
                </div>
            `;
        default:
            return `
                <div class="stat-item">
                    <span class="stat-label">Matches</span>
                    <span class="stat-value">${player.matches}</span>
                </div>
            `;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for modals and notifications
const additionalStyles = `
    .modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        animation: fadeIn 0.3s;
    }
    
    .modal.show {
        display: block;
    }
    
    .modal-content {
        background-color: white;
        margin: 15% auto;
        padding: 20px;
        border-radius: 12px;
        width: 80%;
        max-width: 500px;
        position: relative;
        animation: slideIn 0.3s;
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover {
        color: #000;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
    }
    
    .form-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .player-details .player-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .player-details .player-header img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
    }
    
    .stat-item {
        text-align: center;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .stat-label {
        display: block;
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 5px;
    }
    
    .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--navy);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: #4CAF50;
    }
    
    .notification.error {
        background: #f44336;
    }
    
    .notification.info {
        background: #2196F3;
    }
    
    .red-card-indicator {
        background: #f44336;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
    }
    
    .yellow-card-indicator {
        background: #ff9800;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
    }
    
    .player-row {
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .player-row:hover {
        background-color: #f8f9fa;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export functions for potential external use
window.ChampionLeague = {
    loadTabData,
    showPlayerDetails,
    showNotification,
    playerData,
    teamData
};
