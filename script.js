/* ==========================================================
   DYNAMIC SIDEBAR & RESPONSIVE MOBILE NAVIGATION ENGINE
   ========================================================== */
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        const sidebar = document.getElementById('custom-sidebar');
        if (!sidebar) return; // Safety catch if the element isn't on the page
        
        sidebar.innerHTML = data;

        // 1. GESTION AUTOMATIQUE DES LIENS DE LANGUES (SMART ROUTING)
        // Récupère le nom du fichier actuel (ex: "research-fr.html" ou "index.html")
        let currentFile = window.location.pathname.split("/").pop() || "index.html";
        
        // Trouve la racine du fichier sans l'extension ni le suffixe de langue
        let baseName = currentFile.replace(".html", "").replace("-fr", "").replace("-ko", "");
        if (baseName === "") baseName = "index";

        // Assigne dynamiquement les bons liens de redirection de page
        const enLink = document.getElementById('lang-en');
        const frLink = document.getElementById('lang-fr');
        const koLink = document.getElementById('lang-ko');

        if (enLink) enLink.href = `${baseName}.html`;
        if (frLink) frLink.href = `${baseName}-fr.html`;
        if (koLink) koLink.href = `${baseName}-ko.html`; // Pour plus tard si besoin

        // Ajoute la classe 'active' sur la langue en cours d'utilisation
        if (currentFile.includes('-fr') && frLink) frLink.classList.add('active-lang');
        else if (currentFile.includes('-ko') && koLink) koLink.classList.add('active-lang');
        else if (enLink) enLink.classList.add('active-lang');
       
        // 1. Automatically create the mobile toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.innerHTML = '☰';
        document.body.appendChild(toggleBtn);
        
        // 2. Handle slide-out menu animations on click
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            toggleBtn.classList.toggle('is-open');
            toggleBtn.innerHTML = sidebar.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // 3. Automatically highlight the correct active page link
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    });
