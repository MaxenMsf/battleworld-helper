document.getElementById('csvForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    const lang = document.documentElement.lang; // Récupère la langue de la page

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            localStorage.setItem('csvData', csvData);
            if (lang === 'en') {
                window.location.href = 'menu_en.html';
            } else {
                window.location.href = 'menu.html';
            }
        };
        reader.readAsText(file);
    } else {
        if (lang === 'en') {
            alert('Please select a CSV file.');
        } else {
            alert('Veuillez sélectionner un fichier CSV.');
        }
    }
});