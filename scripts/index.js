document.getElementById('csvForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            localStorage.setItem('csvData', csvData);
            window.location.href = 'menu.html';
        };
        reader.readAsText(file);
    } else {
        alert('Veuillez sélectionner un fichier CSV.');
    }
});