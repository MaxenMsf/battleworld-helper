document.addEventListener('DOMContentLoaded', loadData);

function loadData() {
    const language = document.documentElement.lang || 'fr';
    const headerFile = 'header.html';

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
            'GhostRiderRobbie': 'ghost-rider-robbie',
            'Electro': 'electro',
            'Shocker': 'shocker',
            'Rhino': 'rhino'
        };

        function parseValue(value) {
            return value.trim() === '' ? 0 : parseInt(value);
        }

        const playersData = {};
        rows.forEach(row => {
            const [name, characterId, , power, stars, redStars, gearTier] = row.split(',');
            const formattedCharacterId = characterMapping[characterId.trim()];

            if (!playersData[formattedCharacterId]) {
                playersData[formattedCharacterId] = [];
            }

            playersData[formattedCharacterId].push({
                name: name,
                power: parseValue(power),
                stars: parseValue(stars),
                redStars: parseValue(redStars),
                gearTier: parseValue(gearTier)
            });
        });

        // Restaurer l'état des joueurs assignés depuis localStorage
        const savedAssignments = JSON.parse(localStorage.getItem('assignedPlayersMap')) || {};
        const playerAssignmentCount = {};
        const assignedPlayersMap = savedAssignments;

        Object.keys(assignedPlayersMap).forEach(characterId => {
            assignedPlayersMap[characterId].forEach(playerName => {
                updatePlayerAssignmentCount(playerName, 1);
            });
        });

        const maxAssignedPlayers = 5;
        const maxAssignmentsPerPlayer = 12;

        function updatePlayerAssignmentCount(playerName, increment) {
            if (!playerAssignmentCount[playerName]) {
                playerAssignmentCount[playerName] = 0;
            }
            playerAssignmentCount[playerName] += increment;
            return playerAssignmentCount[playerName];
        }

        function saveAssignmentsToLocalStorage() {
            localStorage.setItem('assignedPlayersMap', JSON.stringify(assignedPlayersMap));
        }

        function displayPlayers(sectionId, starThreshold, redStarThreshold = 0, gearTierThreshold = 0) {
            Object.keys(playersData).forEach(characterId => {
                const characterDiv = document.querySelector(`#${sectionId} #${characterId}`);
                if (!characterDiv) return;

                const eligiblePlayers = playersData[characterId]
                    .filter(player => player.stars >= starThreshold &&
                        player.redStars >= redStarThreshold &&
                        player.gearTier >= gearTierThreshold)
                    .sort((a, b) => b.power - a.power);

                eligiblePlayers.forEach(player => {
                    const playerDiv = document.createElement('div');
                    playerDiv.className = 'player';
                    playerDiv.textContent = `${player.name} (${player.power})`;

                    if (assignedPlayersMap[characterId] && assignedPlayersMap[characterId].includes(player.name)) {
                        playerDiv.style.color = 'blue';
                        playerDiv.style.marginTop = '5px';
                    }

                    playerDiv.addEventListener('click', function () {
                        const assignedPlayers = assignedPlayersMap[characterId] || [];

                        if (assignedPlayers.includes(player.name)) {
                            const index = assignedPlayers.indexOf(player.name);
                            if (index > -1) {
                                assignedPlayers.splice(index, 1);
                                updatePlayerAssignmentCount(player.name, -1);
                                playerDiv.style.color = '';
                                playerDiv.style.marginTop = '';
                            }
                        } else {
                            if (updatePlayerAssignmentCount(player.name, 0) < maxAssignmentsPerPlayer) {
                                if (assignedPlayers.length < maxAssignedPlayers) {
                                    assignedPlayers.push(player.name);
                                    updatePlayerAssignmentCount(player.name, 1);
                                    playerDiv.style.color = 'blue';
                                    playerDiv.style.marginTop = '5px';
                                } else {
                                    const alertMessage = language === 'en'
                                        ? 'Limit of assigned players reached for this character.'
                                        : 'Limite de joueurs assignés atteinte pour ce personnage.';
                                    alert(alertMessage);
                                }
                            } else {
                                const alertMessage = language === 'en'
                                    ? `Player ${player.name} cannot be assigned to more than ${maxAssignmentsPerPlayer} characters.`
                                    : `Le joueur ${player.name} ne peut pas être assigné à plus de ${maxAssignmentsPerPlayer} personnages.`;
                                alert(alertMessage);
                            }
                        }

                        assignedPlayersMap[characterId] = assignedPlayers;
                        saveAssignmentsToLocalStorage();
                    });

                    characterDiv.querySelector('.players').appendChild(playerDiv);
                });
            });
        }

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

        displayPlayers('three-stars', 3);
        displayPlayers('five-stars', 5);
        displayPlayers('seven-stars', 7);
        displayPlayers('g15', 0, 0, 15);
        displayPlayers('g17', 0, 0, 17);
        displayPlayers('six-red-stars', 6, 6);
        displayPlayers('g19', 0, 0, 19);
        displayPlayers('one-diamond', 7, 8);
    } else {
        alert('Aucune donnée CSV trouvée. Veuillez retourner au menu et importer un fichier CSV.');
    }
}
