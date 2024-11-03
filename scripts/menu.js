// Vérifie la langue de la page
const lang = localStorage.getItem('language') || 'fr';

if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.getElementById('menu-title').textContent = 'Sections Menu';
    document.getElementById('footer-text').textContent = 'Join me on:';
} else {
    document.documentElement.lang = 'fr';
}

// Change la langue et redirige
const languageSwitcher = document.getElementById('language-flag');
languageSwitcher.addEventListener('click', () => {
    const newLang = lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('language', newLang);
    window.location.reload(); // Recharge la page pour appliquer la nouvelle langue
});