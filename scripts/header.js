document.getElementById('language-toggle').addEventListener('click', function() {
    const currentLang = document.documentElement.lang;
    if (currentLang === 'fr') {
        document.documentElement.lang = 'en';
        // Change text content to English
        document.querySelectorAll('[data-lang-fr]').forEach(el => {
            el.textContent = el.getAttribute('data-lang-en');
        });
    } else {
        document.documentElement.lang = 'fr';
        // Change text content to French
        document.querySelectorAll('[data-lang-en]').forEach(el => {
            el.textContent = el.getAttribute('data-lang-fr');
        });
    }
});