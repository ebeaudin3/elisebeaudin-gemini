document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("custom-sidebar");
    if (!sidebarContainer) return;

    // ==========================================================
    // 1. AUTOMATISATION DES LIENS DE LANGUE
    // ==========================================================
    const path = window.location.pathname;
    let filename = path.substring(path.lastIndexOf('/') + 1);
    
    if (filename === "") filename = "index.html";

    let baseName = filename.replace(".html", "");
    let currentLang = "en"; 

    if (baseName.endsWith("-fr")) {
        currentLang = "fr";
        baseName = baseName.slice(0, -3); 
    } else if (baseName.endsWith("-ko")) {
        currentLang = "ko";
        baseName = baseName.slice(0, -3); 
    }

    const urlEN = `${baseName}.html`;
    const urlFR = `${baseName}-fr.html`;
    const urlKO = `${baseName}-ko.html`;

    // homepage
    const urlHome = currentLang === 'en' ? 'index.html' : `index-${currentLang}.html`;

    // ==========================================================
    // 2. DICTIONNAIRE DE TRADUCTION DE LA SIDEBAR
    // ==========================================================
    const translations = {
        en: {
            bio: "Welcome! I am an oceanographer and a storyteller, currently a Data Specialist (Underwater Acoustics) at Ocean Networks Canada, in Victoria, BC, Canada.",
            home: "HOME",
            about: "ABOUT ME",
            research: "RESEARCH",
            publications: "PUBLICATIONS",
            sidequests: "SIDEQUESTS"
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
        <div class="language-selector" style="margin-bottom: 20px";>
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
            <li><a href="${baseName === 'index' ? '#' : urlHome}" class="${baseName === 'index' ? 'active' : ''}">${t.home}</a></li>
            <li><a href="about${currentLang === 'en' ? '' : '-' + currentLang}.html" class="${baseName === 'about' ? 'active' : ''}">${t.about}</a></li>
            <li><a href="research${currentLang === 'en' ? '' : '-' + currentLang}.html" class="${baseName === 'research' ? 'active' : ''}">${t.research}</a></li>
            <li><a href="publications${currentLang === 'en' ? '' : '-' + currentLang}.html" class="${baseName === 'publications' ? 'active' : ''}">${t.publications}</a></li>
        </ul>

        <div class="social-icons">
            <a href="mailto:ebeaudin[@]oceannetworkscanada.ca"><img src="images/logos/mail.png" alt="Email"></a>
            <a href="https://www.linkedin.com/in/elise-beaudin" target="_blank"><img src="images/logos/linkedin.png" alt="LinkedIn"></a>
        </div>
        <div class="copyright">Copyright © Tous droits réservés. 2026</div>
    `;

    // ==========================================================
    // 4. AUTOMATIC SMART FALLBACK ENGINE (Link Sweeper)
    // ==========================================================
    // Scans every single link inside the sidebar automatically
    const sidebarLinks = sidebarContainer.querySelectorAll("a");
    
    sidebarLinks.forEach(link => {
        const targetHref = link.getAttribute("href");

        // Skip external paths, contact lines, or placeholders
        if (!targetHref || targetHref.startsWith("http") || targetHref.startsWith("mailto") || targetHref === "#") return;

        // Ping the server to verify if the file actually exists
        fetch(targetHref, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    // If the server returns a 404 error, strip the language codes back to English
                    const fallbackHref = targetHref.replace("-fr.html", ".html").replace("-ko.html", ".html");
                    link.href = fallbackHref;
                }
            })
            .catch(() => {}); // Prevents local testing/offline network crash logs
    });
    
    // ==========================================================
    // 5. MOBILE HAMBURGER TOGGLE INTERACTION
    // ==========================================================
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "mobile-nav-toggle";
    toggleBtn.innerHTML = "☰"; 
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        sidebarContainer.classList.toggle("mobile-open");
        toggleBtn.classList.toggle("is-open");

        if (toggleBtn.classList.contains("is-open")) {
            toggleBtn.innerHTML = "✕";
        } else {
            toggleBtn.innerHTML = "☰";
        }
    });
});
