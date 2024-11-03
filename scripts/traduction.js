// Vérifie la langue de la page
const lang = localStorage.getItem('language') || 'fr';
document.documentElement.lang = lang;

// Met à jour le titre de la section
const titleElement1 = document.querySelector('#three-stars h2');
const spanElement1 = titleElement1.querySelector('.arrow');
const titleElement2 = document.querySelector('#five-stars h2');
const spanElement2 = titleElement2.querySelector('.arrow');
const titleElement3 = document.querySelector('#seven-stars h2');
const spanElement3 = titleElement3.querySelector('.arrow');
const titleElement4 = document.querySelector('#g15 h2');
const spanElement4 = titleElement4.querySelector('.arrow');
const titleElement5 = document.querySelector('#g17 h2');
const spanElement5 = titleElement5.querySelector('.arrow');
const titleElement6 = document.querySelector('#six-red-stars h2');
const spanElement6 = titleElement6.querySelector('.arrow');
const titleElement7 = document.querySelector('#g19 h2');
const spanElement7 = titleElement7.querySelector('.arrow');
const titleElement8 = document.querySelector('#one-diamond h2');
const spanElement8 = titleElement8.querySelector('.arrow');

if (lang === 'en') {
    titleElement1.childNodes[0].textContent = '3 Yellow Stars';
    spanElement1.textContent = '▼';
    titleElement2.childNodes[0].textContent = '5 Yellow Stars';
    spanElement2.textContent = '▼';
    titleElement3.childNodes[0].textContent = '7 Yellow Stars';
    spanElement3.textContent = '▼';
    titleElement4.childNodes[0].textContent = 'Gear tier 15';
    spanElement4.textContent = '▼';
    titleElement5.childNodes[0].textContent = 'Gear tier 17';
    spanElement5.textContent = '▼';
    titleElement6.childNodes[0].textContent = '6 Red stars';
    spanElement6.textContent = '▼';
    titleElement7.childNodes[0].textContent = 'Gear tier 19';
    spanElement7.textContent = '▼';
    titleElement8.childNodes[0].textContent = '1 Diamond';
    spanElement8.textContent = '▼';
}

// Met à jour le texte du bouton
const buttonElement = document.getElementById('toggle-button');
buttonElement.textContent = lang === 'en' ? 'Toggle Display' : 'Inverser l\'affichage';

// Change la langue et redirige
const languageSwitcher = document.getElementById('language-flag');
languageSwitcher.addEventListener('click', () => {
    const newLang = lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('language', newLang);
    window.location.reload(); // Recharge la page pour appliquer la nouvelle langue
});
