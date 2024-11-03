/*document.getElementById('toggle-button').addEventListener('click', function() {
    const currentPage = document.body.getAttribute('data-page');

    let targetPage = '';
    switch (currentPage) {
        case 'section_un':
            targetPage = 'section_un_inverse.html';
            break;
        case 'section_un_inverse':
            targetPage = 'section_un.html';
            break;
        case 'section_deux':
            targetPage = 'section_deux_inverse.html';
            break;
        case 'section_deux_inverse':
            targetPage = 'section_deux.html';
            break;
        case 'section_trois':
            targetPage = 'section_trois_inverse.html';
            break;
        case 'section_trois_inverse':
            targetPage = 'section_trois.html';
            break;
        case 'section_quatre':
            targetPage = 'section_quatre_inverse.html';
            break;
        case 'section_quatre_inverse':
            targetPage = 'section_quatre.html';
            break;
        case 'section_cinq':
            targetPage = 'section_cinq_inverse.html';
            break;
        case 'section_cinq_inverse':
            targetPage = 'section_cinq.html';
            break;
        default:
            console.error('Page inconnue');
            return;
    }
    window.location.href = targetPage;
}); */

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-button');
    let isInverse = false;

    toggleButton.addEventListener('click', function() {
        isInverse = !isInverse;
        const newScriptSrc = isInverse ? 'scripts/section_inverse.js' : 'scripts/section.js';

        // Créer un nouveau script
        const newScript = document.createElement('script');
        newScript.id = 'info';
        newScript.src = newScriptSrc;

        // Remplacer l'ancien script par le nouveau
        const oldScript = document.getElementById('info');
        oldScript.parentNode.replaceChild(newScript, oldScript);

        // Exécuter loadData() après le chargement du nouveau script
        newScript.onload = function() {
            if (typeof loadData === 'function') {
                loadData();
            }

            // Ajouter ou supprimer l'attribut data-page
            const body = document.body;
            if (isInverse) {
                body.setAttribute('data-page', 'inverse');
            } else {
                body.removeAttribute('data-page');
            }
        };
    });
});