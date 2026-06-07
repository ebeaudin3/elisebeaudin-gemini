document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("custom-sidebar");
    if (!sidebarContainer) return;

    // ==========================================================
    // 1. AUTOMATISATION DES LIENS DE LANGUE (Cache-Busting des suffixes)
    // ==========================================================
    const path = window.location.pathname;
    let filename = path.substring(path.lastIndexOf('/') + 1);
    
    // Si l'URL se termine par un slash (ex: site.com/), on considère que c'est l'index
    if (filename === "") filename = "index.html";

    // On isole le nom de la page (ex: "research-fr" -> "research-fr")
    let baseName = filename.replace(".html", "");
    let currentLang = "en"; // Langue par défaut

    // On détecte la langue actuelle et on extrait la racine propre de la page
    if (baseName.endsWith("-fr")) {
        currentLang = "fr";
        baseName = baseName.slice(0, -3); // Enlève "-fr"
    } else if (baseName.endsWith("-ko")) {
        currentLang = "ko";
        baseName = baseName.slice(0, -3); // Enlève "-ko"
    }

    // On génère dynamiquement les bons liens pour la page courante
    const urlEN = `${baseName}.html`;
    const urlFR = `${baseName}-fr.html`;
    const urlKO = `${baseName}-ko.html`;

    // ==========================================================
    // 2. DICTIONNAIRE DE TRADUCTION DE LA SIDEBAR
    // ==========================================================
    const translations = {
        en: {
            bio: "Welcome! I am an oceanographer and a storyteller, currently a Data Specialist (Underwater Acoustics) at Ocean Networks Canada, in Victoria, BC, Canada.",
            home: "HOME",
            about: "ABOUT ME",
            research: "RESEARCH",
            publications: "PUBLICATIONS"
        },
        fr: {
            bio: "Bienvenue ! Je suis océanographe physicienne et vulgarisatrice scientifique. J'occupe présentement le poste de Spécialiste en acoustique marine à Ocean Networks Canada, à Victoria, BC, Canada.",
            home: "ACCUEIL",
            about: "À PROPOS",
            research: "RECHERCHE",
            publications: "PUBLICATIONS"
        },
        ko: {
            bio: "환영합니다! 저는 오션그래퍼이자 스토리텔러이며, 현재 캐나다 빅토리아에 위치한 오션 네트워크 캐나다에서 데이터 전문가(수중 음향학)로 활동하고 있습니다.",
            home: "홈",
            about: "소개",
            research: "연구",
            publications: "논문 및 저서"
        }
    };

    const t = translations[currentLang];

    // ==========================================================
    // 3. INJECTION DYNAMIQUE DE LA SIDEBAR RE-TRADUITE
    // ==========================================================
    sidebarContainer.innerHTML = `
        <!-- Sélecteur de langue avec les href automatisés -->
        <div class="language-selector">
            <a href="${urlEN}" class="${currentLang === 'en' ? 'active-lang' : ''}">EN</a> | 
            <a href="${urlFR}" class="${currentLang === 'fr' ? 'active-lang' : ''}">FR</a> | 
            <a href="${urlKO}" class="${currentLang === 'ko' ? 'active-lang' : ''}">한국어</a>
        </div>

        <div class="profile-container">
            <img src="images/me.jpeg" alt="Élise Beaudin" class="profile-pic">
        </div>

        <h1>ÉLISE BEAUDIN</h1>
        <p class="bio">${t.bio}</p>

        <ul class="nav-links">
            <li><a href="${baseName === 'index' ? '#' : urlEN}" class="${baseName === 'index' ? 'active' : ''}">${t.home}</a></li>
            <li><a href="about${currentLang === 'en' ? '' : '-' + currentLang}.html" class="${baseName === 'about' ? 'active' : ''}">${t.about}</a></li>
            <li><a href="research${currentLang === 'en' ? '' : '-' + currentLang}.html" class="${baseName === 'research' ? 'active' : ''}">${t.research}</a></li>
            <li><a href="publications${currentLang === 'en' ? '' : '-' + currentLang}.html" class="${baseName === 'publications' ? 'active' : ''}">${t.publications}</a></li>
        </ul>

        <div class="social-icons">
            <!-- Vos icônes de réseaux sociaux ici -->
        </div>
        <div class="copyright">Copyright © Tous droits réservés. 2026</div>
    `;
    
    // Hamburger
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "mobile-nav-toggle";
    toggleBtn.innerHTML = "☰"; // Initial hamburger icon
    document.body.appendChild(toggleBtn);

    // Event listener to open/close the mobile menu framework smoothly
    toggleBtn.addEventListener("click", () => {
        sidebarContainer.classList.toggle("mobile-open");
        toggleBtn.classList.toggle("is-open");

        // Switches the symbol between hamburger (☰) and close (✕)
        if (toggleBtn.classList.contains("is-open")) {
            toggleBtn.innerHTML = "✕";
        } else {
            toggleBtn.innerHTML = "☰";
        }
    });
});
