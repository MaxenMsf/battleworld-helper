function loadData() {
    const language = document.documentElement.lang || 'fr';
    const headerFile = 'header.html';
    
    const translations = {
        fr: {
            stars: "étoiles",
            redStars: "étoiles rouges",
            gearTier: "paliers",
            diamond: "diamant",
            diamonds: "diamants",
            missing: "manque"
        },
        en: {
            stars: "stars",
            redStars: "red stars",
            gearTier: "gear levels",
            diamond: "diamond",
            diamonds: "diamonds",
            missing: "missing"
        }
    };

    fetch(headerFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du header.');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

    const csvData = localStorage.getItem('csvData');
    if (csvData) {
        // Nettoyer les données existantes
        document.querySelectorAll('.players').forEach(div => {
            div.innerHTML = '';
        });

        const rows = csvData.split('\n').slice(1);
        const characterMapping = {
           'OldManLogan': 'old-man-logan',
            'HankPym': 'hank-pym',
            'Sasquatch': 'sasquach',
            'Guardian': 'guardian',
            'Daken': 'daken',
            'IronPatriot': 'iron-patriot',
            'BlackBolt': 'black-bolt',
            'BlackPantherShuri': 'black-panther-shuri',
            'Northstar': 'northstar',
            'PandaPool': 'pandapool',
            'TheLeader': 'leader',
            'Sunfire': 'sunfire',
            'IronMan': 'iron-man',
            'Deathpool': 'deathpool',
            'Namor': 'namor',
            'MrFantastic': 'mister-fantastic',
            'Deadpool': 'deadpool',
            'Wolverine': 'wolverine',
            'CosmicGhostRider': 'cosmic-ghost-rider',
            'SpiderSlayer': 'spider-slayer',
            'SpiderManNoir': 'spider-man-noir',
            'SilverSurfer': 'silver-surfer',
            'MoonKnight': 'moon-knight',
            'Venom': 'venom',
            'SuperSkrull': 'super-skrull',
            'BlackCat': 'black-cat',
            'PeterBParker': 'peter-b-parker',
            'RedGoblin': 'red-goblin',
            'KravenTheHunter': 'kraven',
            'Ultimus': 'ultimus',
            'Nova': 'nova',
            'DoctorOctopus': 'doctor-octopus',
            'Gorr': 'gorr',
            'SpiderManPavitr': 'pavitr',
            'Mysterio': 'mysterio',
            'Carnage': 'carnage',
            'GreenGoblinGlider': 'green-goblin-classic',
            'ThanosEndgame': 'thanos-endgame',
            'PeniParker': 'peni-parker',
            'SymbioteSilverSurfer': 'void-knight',
            'SpiderManBigTime': 'big-time',
            'Vahl': 'vahl',
            'Gladiator': 'gladiator',
            'Gwenom': 'gwenom',
            'Lizard': 'lizard',
            'KangTheConqueror': 'kang',
            'GhostSpider': 'ghost-spider',
            'Vulture': 'vulture',
            'CaptainBritain': 'captain-britain',
            'StarBrand': 'starbrand',
            'BlackKnight': 'black-knight',
            'Doom': 'doom',
            'ZombieJuggernaut': 'zombie-juggernaut',
            'OmegaSentinel': 'omega-sentinel',
            'Sunspot': 'sunspot',
            'Rogue': 'rogue',
            'Sentinel': 'sentinel',
            'Ares': 'ares',
            'Forge': 'forge',
            'ZombieIronMan': 'zombie-iron-man',
            'Cyclops': 'cyclops',
            'ScientistSupreme': 'scientist-supreme',
            'Apocalypse': 'apocalypse',
            'Nimrod': 'nimrod',
            'Gambit': 'gambit',
            'Nightcrawler': 'nightcrawler',
            'AgathaHarkness': 'agatha',
            'LadyDeathstrike': 'lady-deathstrike',
            'Quicksilver': 'quicksilver',
            'CaptainCarter': 'captain-carter',
            'CaptainAmerica': 'captain-america',
            'Mephisto': 'mephisto',
            'ManThing': 'man-thing',
            'Oath': 'oath',
            'Blade': 'blade',
            'Dormammu': 'dormammu',
            'Archangel': 'archangel',
            'Phoenix': 'phoenix',
            'ZombieScarletWitch': 'zombie-scarlet-witch',
            'SpiderWeaver': 'spider-weaver',
            'MorganLeFay': 'morgan-le-fay',
            'X23': 'x23',
            'RedHulk': 'red-hulk',
            'Odin': 'odin',
            'GhostRiderRobbie': 'ghost-rider-robbie'
        };

        function parseValue(value) {
            return value.trim() === '' ? 0 : parseInt(value);
        }

        // Initialiser les données des joueurs
        const players = {};

        rows.forEach(row => {
            const [name, characterId, , , stars, redStars, gearTier] = row.split(',');

            if (!players[name]) {
                players[name] = {}; // Initialiser chaque joueur avec un objet de personnages
            }

            players[name][characterId.trim()] = {
                stars: parseValue(stars),
                redStars: parseValue(redStars),
                gearTier: parseValue(gearTier)
            };
        });

        // Fonction pour ajouter et trier les joueurs par nombre d'éléments manquants
        function addAndSortPlayers(sectionId, threshold, key, unitKey) {
            const unit = translations[language][unitKey];

            Object.keys(characterMapping).forEach(characterId => {
                const formattedCharacterId = characterMapping[characterId];
                const characterDiv = document.querySelector(`#${sectionId} #${formattedCharacterId}`);
                if (!characterDiv) return;

                // Collecte des données de joueurs manquants pour le tri
                const missingData = [];

                Object.keys(players).forEach(name => {
                    const playerData = players[name][characterId] || { stars: 0, redStars: 0, gearTier: 0 };
                    const missing = threshold - playerData[key];
                    
                    if (missing > 0) {
                        missingData.push({
                            name: name,
                            missing: missing,
                            unit: unit
                        });
                    }
                });

                // Trier par le nombre d'éléments manquants (du moins au plus)
                missingData.sort((a, b) => a.missing - b.missing);

                // Ajouter les joueurs triés dans le DOM
                missingData.forEach(data => {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = `${data.name} (${translations[language].missing}: ${data.missing} ${data.unit})`;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                });
            });
        }

        // Fonction spéciale pour la section "Diamant" qui inclut étoiles rouges manquantes
        function addAndSortPlayersForDiamond(sectionId) {
            Object.keys(characterMapping).forEach(characterId => {
                const formattedCharacterId = characterMapping[characterId];
                const characterDiv = document.querySelector(`#${sectionId} #${formattedCharacterId}`);
                if (!characterDiv) return;

                // Collecte des données de joueurs manquants pour le tri
                const missingData = [];

                Object.keys(players).forEach(name => {
                    const playerData = players[name][characterId] || { stars: 0, redStars: 0, gearTier: 0 };
                    const missingRedStars = 7 - playerData.redStars;

                    // Vérifie s'il manque des étoiles rouges ou des diamants
                    if (missingRedStars > 0) {
                        const diamondUnit = missingRedStars > 1 ? translations[language].diamonds : translations[language].diamond;
                        const text = `${missingRedStars} ${translations[language].redStars}`;
                        missingData.push({
                            name: name,
                            missing: missingRedStars,
                            displayText: text
                        });
                    }

                    // Vérifie les cas où il a 7 étoiles rouges et donc manque un diamant
                    if (playerData.redStars === 7) {
                        const text = `1 ${translations[language].diamond}`;
                        missingData.push({
                            name: name,
                            missing: 1,
                            displayText: text
                        });
                    }
                });

                // Trier par le nombre d'étoiles rouges manquantes (du moins au plus)
                missingData.sort((a, b) => a.missing - b.missing);

                // Ajouter les joueurs triés dans le DOM
                missingData.forEach(data => {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = `${data.name} (${translations[language].missing}: ${data.displayText})`;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                });
            });
        }

        // Appels pour chaque section avec les critères respectifs
        addAndSortPlayers('three-stars', 3, 'stars', 'stars');
        addAndSortPlayers('five-stars', 5, 'stars', 'stars');
        addAndSortPlayers('seven-stars', 7, 'stars', 'stars');
        addAndSortPlayers('six-red-stars', 6, 'redStars', 'redStars');
        addAndSortPlayersForDiamond('one-diamond');
        addAndSortPlayers('g15', 15, 'gearTier', 'gearTier');
        addAndSortPlayers('g17', 17, 'gearTier', 'gearTier');
        addAndSortPlayers('g19', 19, 'gearTier', 'gearTier');

        // Basculer l'affichage des sections
        document.querySelectorAll('.section h2').forEach(h2 => {
            h2.addEventListener('click', function() {
                const section = this.parentElement;
                const charactersDiv = section.querySelector('.characters');
                if (charactersDiv.style.display === 'none') {
                    charactersDiv.style.display = 'flex';
                    this.querySelector('.arrow').textContent = '▼';
                } else {
                    charactersDiv.style.display = 'none';
                    this.querySelector('.arrow').textContent = '►';
                }
            });
        });
    } else {
        alert('Aucune donnée CSV trouvée. Veuillez retourner au menu et importer un fichier CSV.');
    }
}