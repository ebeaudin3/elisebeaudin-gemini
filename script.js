/* ==========================================================
   DYNAMIC SIDEBAR & RESPONSIVE MOBILE NAVIGATION ENGINE
   ========================================================== */
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        const sidebar = document.getElementById('custom-sidebar');
        if (!sidebar) return; // Safety catch if the element isn't on the page
        
        sidebar.innerHTML = data;
        
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
