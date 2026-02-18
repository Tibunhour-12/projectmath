// 1. Dropdown Logic
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents immediate closing
    dropdownMenu.classList.toggle('hidden');
});

// Close dropdown when clicking anywhere else
window.addEventListener('click', () => {
    if (!dropdownMenu.classList.contains('hidden')) {
        dropdownMenu.classList.add('hidden');
    }
});

// 2. Dark Mode Logic
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    // Toggle icons
    if (html.classList.contains('dark')) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
});

   // Desktop dropdown
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Mobile dropdown
    const dropdownBtnMobile = document.getElementById('dropdownBtnMobile');
    const dropdownMenuMobile = document.getElementById('dropdownMenuMobile');
    dropdownBtnMobile.addEventListener('click', () => {
        dropdownMenuMobile.classList.toggle('hidden');
    });

    // Optional: click outside to close dropdown
    window.addEventListener('click', function(e) {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
        if (!dropdownBtnMobile.contains(e.target) && !dropdownMenuMobile.contains(e.target)) {
            dropdownMenuMobile.classList.add('hidden');
        }
    });

