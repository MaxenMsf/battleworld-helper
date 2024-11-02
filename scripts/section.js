document.addEventListener('DOMContentLoaded', function() {
    // Charger le header
    fetch('header.html')
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
        const rows = csvData.split('\n').slice(1); // Skip header row
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

        rows.forEach(row => {
            const [name, characterId, , , stars] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(stars) >= 3 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#three-stars #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , stars] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(stars) >= 5 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#five-stars #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , stars] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(stars) >= 7 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#seven-stars #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , , , gearTier] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(gearTier) >= 15 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#g15 #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , , , gearTier] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(gearTier) >= 17 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#g17 #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , stars, redStars] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(stars) >= 6 && parseInt(redStars) >= 6 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#six-red-stars #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , , , gearTier] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(gearTier) >= 19 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#g19 #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

        rows.forEach(row => {
            const [name, characterId, , , stars, redStars] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];
            if (parseValue(stars) >= 7 && parseInt(redStars) >= 8 && formattedCharacterId) {
                const characterDiv = document.querySelector(`#one-diamond #${formattedCharacterId}`);
                if (characterDiv) {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = name;
                    characterDiv.querySelector('.players').appendChild(playerDiv);
                }
            }
        });

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
});
