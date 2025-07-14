/**
 * @file Script principal pour la page Champion League 2025
 * @description Gère la récupération des données simulées, la génération dynamique
 * du contenu des carrousels et leur initialisation.
 * Inclut une solution pour éviter le "Flash of Unpopulated Content" (FOUC).
 */

document.addEventListener('DOMContentLoaded', function() {

    // =========================================================================
    // 1. SIMULATION DE LA BASE DE DONNÉES
    // =========================================================================

    const heroSlidesData = [
        {
            imageUrl: 'https://via.placeholder.com/1920x600/000000/FFFFFF?text=Bienvenue+au+Championnat',
            title: 'Bienvenue au Championnat Ultime',
            text: 'Suivez les scores, les statistiques et la progression des joueurs en temps réel.',
            buttonText: 'Voir les Matchs'
        },
        {
            imageUrl: 'https://via.placeholder.com/1920x600/333333/FFFFFF?text=Vivez+le+Frisson',
            title: 'Vivez le Frisson',
            text: 'Chaque match, chaque but, en direct.',
            buttonText: 'Voir les Scores'
        },
        {
            imageUrl: 'https://via.placeholder.com/1920x600/1a1a1a/FFFFFF?text=Rejoignez+la+Communauté',
            title: 'Rejoignez la Communauté',
            text: 'Inscrivez-vous pour suivre vos équipes préférées.',
            buttonText: 'Inscrivez-vous'
        }
    ];

    const recentMatchesData = [
        { teamA: 'Équipe A', teamB: 'Équipe B', score: '3 - 2', date: '2025-10-15 18:00', status: 'Joué <i class="fa-solid fa-circle-check text-success fs-6"></i>', colorindicator: 'text-success', scoreStatus: 'Score Final' },
        { teamA: 'Équipe C', teamB: 'Équipe D', score: '1 - 1', date: '2025-10-15 20:00', status: 'Live <i class="fa-solid fa-circle text-danger fs-6"></i>', colorindicator: 'text-danger', scoreStatus: 'Score en Cours' },
        { teamA: 'Équipe E', teamB: 'Équipe F', score: '0 - 0', date: '2025-10-14 17:00', status: 'Joué <i class="fa-solid fa-circle-check text-success fs-6"></i>', colorindicator: 'text-success', scoreStatus: 'Score Final' },
        { teamA: 'Équipe Z', teamB: 'Équipe W', score: '2 - 2', date: '2025-10-13 20:00', status: 'Live <i class="fa-solid fa-circle text-danger fs-6"></i>', colorindicator: 'text-danger', scoreStatus: 'Score en Cours' },
        { teamA: 'Équipe X', teamB: 'Équipe Y', score: '4 - 1', date: '2025-10-13 18:00', status: 'Joué <i class="fa-solid fa-circle-check text-success fs-6"></i>', colorindicator: 'text-success', scoreStatus: 'Score Final' },
        { teamA: 'Équipe K', teamB: 'Équipe L', score: '1 - 0', date: '2025-10-12 17:00', status: 'Joué <i class="fa-solid fa-circle-check text-success fs-6"></i>', colorindicator: 'text-success', scoreStatus: 'Score Final' }
    ];

    const upcomingMatchesData = [
        { teamA: 'Équipe G', teamB: 'Équipe H', date: '2025-10-16 19:00', location: '<i class="fa-solid fa-location-dot fs-6 text-success"></i> Stade Un' },
        { teamA: 'Équipe I', teamB: 'Équipe J', date: '2025-10-17 20:00', location: '<i class="fa-solid fa-location-dot fs-6 text-success"></i> Arène de la Ville' },
        { teamA: 'Équipe M', teamB: 'Équipe N', date: '2025-10-18 19:00', location: '<i class="fa-solid fa-location-dot fs-6 text-success"></i> Grand Parc' },
        { teamA: 'Équipe O', teamB: 'Équipe P', date: '2025-10-19 20:00', location: '<i class="fa-solid fa-location-dot fs-6 text-success"></i> Stade National' },
        { teamA: 'Équipe R', teamB: 'Équipe S', date: '2025-10-20 18:00', location: '<i class="fa-solid fa-location-dot fs-6 text-success"></i> Stade Central' },
        { teamA: 'Équipe P', teamB: 'Équipe T', date: '2025-11-20 18:00', location: '<i class="fa-solid fa-location-dot fs-6 text-success"></i> Stade Central' }
    ];

    const playerData = [
        { name: 'Joueur A', equipe: 'Équipe A', post: 'Attaquant', stat: 'Cartons Rouges: 2', colorindicator: 'text-danger', imageUrl: 'https://via.placeholder.com/100x100/FF5733/FFFFFF?text=A' },
        { name: 'Joueur B', equipe: 'Équipe B', post: 'Milieu', stat: 'Cartons Jaunes: 3', colorindicator: 'text-warning', imageUrl: 'https://via.placeholder.com/100x100/FFC300/FFFFFF?text=B' },
        { name: 'Joueur C', equipe: 'Équipe C', post: 'Buteur', stat: 'Buts: 8', colorindicator: 'text-success', imageUrl: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=C' },
        { name: 'Joueur D', equipe: 'Équipe D', post: 'Défenseur', stat: 'Cartons Rouges: 4', colorindicator: 'text-danger', imageUrl: 'https://via.placeholder.com/100x100/33AFFF/FFFFFF?text=D' },
        { name: 'Joueur E', equipe: 'Équipe E', post: 'Gardien', stat: 'Cartons Jaunes: 3', colorindicator: 'text-warning', imageUrl: 'https://via.placeholder.com/100x100/C70039/FFFFFF?text=E' },
        { name: 'Joueur F', equipe: 'Équipe F', post: 'Ailier', stat: 'Buts: 11', colorindicator: 'text-success', imageUrl: 'https://via.placeholder.com/100x100/900C3F/FFFFFF?text=F' }
    ];


    // =========================================================================
    // 2. FONCTIONS DE TEMPLATE HTML
    // =========================================================================

    /**
     * Crée le code HTML pour une diapositive du carrousel principal (Hero).
     * @param {object} slide - L'objet contenant les données de la diapositive.
     * @returns {string} Le code HTML de la diapositive.
     */
    const createHeroSlide = (slide) => `
        <div class="hero-slide" style="background-image: url('${slide.imageUrl}');">
            <div class="hero-content">
                <h1>${slide.title}</h1>
                <p>${slide.text}</p>
                <button class="btn">${slide.buttonText}</button>
            </div>
        </div>`;

    /**
     * Crée le code HTML pour une carte de match récent.
     * @param {object} match - L'objet contenant les données du match.
     * @returns {string} Le code HTML de la carte.
     */
    const createRecentMatchCard = (match) => `
        <div class="card h-100">
            <h3>${match.teamA} vs ${match.teamB}</h3>
            <p>${match.scoreStatus}: ${match.score}</p>
            <p>Date & Heure: ${match.date}</p>
            <p class="${match.colorindicator}">Statut: ${match.status}</p>
        </div>`;

    /**
     * Crée le code HTML pour une carte de match à venir.
     * @param {object} match - L'objet contenant les données du match.
     * @returns {string} Le code HTML de la carte.
     */
    const createUpcomingMatchCard = (match) => `
        <div class="card h-100 card-upcoming-match">
            <h3>${match.teamA} vs ${match.teamB}</h3>
            <p>Date & Heure: ${match.date}</p>
            <p>${match.location}</p>
        </div>`;

    /**
     * Crée le code HTML pour une carte de joueur.
     * @param {object} player - L'objet contenant les données du joueur.
     * @returns {string} Le code HTML de la carte.
     */
    const createPlayerCard = (player) => `
        <div class="player-card h-100">
            <img src="${player.imageUrl}" alt="Photo de ${player.name}">
            <div class="info">
                <h3>${player.name}</h3>
                <p>${player.equipe}</p>
                <p>Poste: ${player.post}</p>
                <p class="${player.colorindicator} fw-4">${player.stat}</p>
            </div>
        </div>`;


    // =========================================================================
    // 3. FONCTION DE RENDU GÉNÉRIQUE
    // =========================================================================

    /**
     * Peuple un carrousel avec des données, en créant des diapositives (slides).
     * @param {string} carouselId - L'ID de l'élément carrousel.
     * @param {Array} data - Le tableau de données.
     * @param {Function} createCardFn - La fonction qui génère le HTML d'une carte.
     * @param {object} config - Configuration du carrousel.
     * @param {number} config.itemsPerSlideDesktop - Nombre d'éléments par slide sur grand écran.
     * @param {number} config.itemsPerSlideMobile - Nombre d'éléments par slide sur petit écran.
     * @param {string} [config.colClassDesktop] - Classes CSS pour les colonnes sur grand écran.
     * @param {string} [config.colClassMobile] - Classes CSS pour les colonnes sur petit écran.
     */
    function renderCarousel(carouselId, data, createCardFn, config) {
        const desktopInner = document.querySelector(`#${carouselId}Desktop .carousel-inner`);
        const mobileInner = document.querySelector(`#${carouselId}Mobile .carousel-inner`);

        if (desktopInner) {
            desktopInner.innerHTML = '';
            for (let i = 0; i < data.length; i += config.itemsPerSlideDesktop) {
                const slideData = data.slice(i, i + config.itemsPerSlideDesktop);
                const activeClass = i === 0 ? 'active' : '';
                desktopInner.innerHTML += `
                    <div class="carousel-item ${activeClass}">
                        <div class="row g-4 justify-content-center align-items-stretch">
                            ${slideData.map(item => `
                                <div class="${config.colClassDesktop || ''}">
                                    ${createCardFn(item)}
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
            }
        }

        if (mobileInner) {
            mobileInner.innerHTML = '';
            for (let i = 0; i < data.length; i += config.itemsPerSlideMobile) {
                const slideData = data.slice(i, i + config.itemsPerSlideMobile);
                const activeClass = i === 0 ? 'active' : '';
                mobileInner.innerHTML += `
                    <div class="carousel-item ${activeClass}">
                         <div class="row g-4 justify-content-center align-items-stretch">
                            ${slideData.map(item => `
                                <div class="${config.colClassMobile || 'col-12'}">
                                    ${createCardFn(item)}
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
            }
        }
    }


    // =========================================================================
    // 4. FONCTIONS D'INITIALISATION
    // =========================================================================

    /**
     * Peuple tous les carrousels de la page.
     */
    function populateAllCarousels() {
        // Remplir le carrousel principal (Hero) - Cas spécial sans version mobile/desktop distincte
        const heroCarouselInner = document.querySelector('#heroCarousel .carousel-inner');
        heroCarouselInner.innerHTML = '';
        heroSlidesData.forEach((slide, index) => {
            const activeClass = index === 0 ? 'active' : '';
            heroCarouselInner.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    ${createHeroSlide(slide)}
                </div>`;
        });

        // Remplir les autres carrousels en utilisant la fonction générique
        renderCarousel('liveMatchesCarousel', recentMatchesData, createRecentMatchCard, {
            itemsPerSlideDesktop: 3,
            itemsPerSlideMobile: 1,
            colClassDesktop: 'col-lg-4 col-md-6',
        });

        renderCarousel('upcomingMatchesCarousel', upcomingMatchesData, createUpcomingMatchCard, {
            itemsPerSlideDesktop: 2,
            itemsPerSlideMobile: 1,
            colClassDesktop: 'col-md-6',
        });

        renderCarousel('playerHighlightsCarousel', playerData, createPlayerCard, {
            itemsPerSlideDesktop: 3,
            itemsPerSlideMobile: 1,
            colClassDesktop: 'col-lg-4 col-md-6',
        });
    }

    /**
     * Initialise les instances de carrousel Bootstrap.
     */
    function initializeBootstrapCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const interval = carousel.dataset.bsInterval ? parseInt(carousel.dataset.bsInterval, 10) : 5000;
            new bootstrap.Carousel(carousel, {
                interval: interval,
                wrap: true
            });
        });
    }
    
    /**
     * Met en place les écouteurs d'événements pour les boutons de statistiques.
     */
    function setupEventListeners() {
        const statsButtons = document.querySelectorAll('.stats-buttons .btn');
        statsButtons.forEach(button => {
            button.addEventListener('click', function() {
                statsButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }


    // =========================================================================
    // 5. POINT D'ENTRÉE PRINCIPAL
    // =========================================================================

    /**
     * Fonction principale qui orchestre le chargement de la page.
     */
    function main() {
        populateAllCarousels();
        initializeBootstrapCarousels();
        setupEventListeners();

        // **SOLUTION AU PROBLÈME DE LATENCE (FOUC)**
        // Une fois le contenu généré, on rend les sections visibles.
        // La transition est gérée en CSS pour un effet de fondu.
        document.querySelectorAll('.loading-content').forEach(section => {
            section.classList.remove('loading-content');
        });

        // ========================= NOUVEAU CODE CI-DESSOUS =========================
        
        /**
         * Active le clignotement pour les icônes des matchs "Live".
         */
        function activateLiveBlinking() {
            // On cible toutes les icônes de cercle qui sont dans un paragraphe ayant la classe text-danger.
            // C'est notre indicateur pour un match "Live" selon la structure de données.
            const liveIcons = document.querySelectorAll('p.text-danger i.fa-circle');
            
            liveIcons.forEach(icon => {
                icon.classList.add('is-blinking');
            });
        }

        // Appeler la fonction pour faire clignoter les icônes
        activateLiveBlinking();
        
        // ========================= FIN DU NOUVEAU CODE =========================
    }

    // Lancement de l'application
    main();

});