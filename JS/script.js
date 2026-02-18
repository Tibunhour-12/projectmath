 const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Toggle Mobile Menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
    });

    // Toggle Dark Mode
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        // Save user preference
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    // Set theme on initial load
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }
