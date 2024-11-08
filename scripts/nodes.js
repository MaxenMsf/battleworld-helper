// Fonction pour charger le header
function loadHeader() {
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
}

// Charger le header au démarrage
document.addEventListener('DOMContentLoaded', loadHeader);

// Fonction pour générer le tableau
function generateTable(tableId, characters) {
    const csvData = localStorage.getItem('csvData');

    if (!csvData) {
        alert('Aucune donnée CSV trouvée. Veuillez importer un fichier CSV.');
        return;
    }

    // Convertir les données CSV en tableau
    const rows = csvData.split('\n').slice(1);
    const players = {};

    // Mapping des portraits
    const characterPortraits = {
        'green-goblin-classic': 'portraits/Portrait_GreenGoblinGlider_d34c3dcd.png',
        'doctor-octopus': 'portraits/Portrait_DoctorOctopus_f5723b4f.png',
        'spider-slayer': 'portraits/Portrait_SpiderSlayer_affec33a.png',
        'kraven': 'portraits/Portrait_KravenTheHunter_ed036dee.png',
        'lizard': 'portraits/Portrait_Lizard_573d00b9.png',
        'vulture': 'portraits/Portrait_Vulture_1b9aa113.png',
        'mysterio': 'portraits/Portrait_Mysterio_ab8220b7.png',
        'shocker': 'portraits/Portrait_Shocker_fbfa3ba0.png',
        'rhino': 'portraits/Portrait_Rhino_78623e2d.png',
        'electro': 'portraits/Portrait_Electro_0e25d443.png',
        'peter-b-parker': 'portraits/Portrait_PeterBParker_0a7774ae.png',
        'peni-parker': 'portraits/Portrait_PeniParker_992f0956.png',
        'pavitr': 'portraits/Portrait_SpiderManPavitr_f4510bf7.png',
        'ghost-spider': 'portraits/Portrait_GhostSpider_f7a4fac2.png',
        'spider-man-noir': 'portraits/Portrait_SpiderManNoir_784aae26.png',
        'black-cat': 'portraits/Portrait_BlackCat_1f9ec310.png',
        'gwenom': 'portraits/Portrait_Gwenom_ec5049af.png',
        'red-goblin': 'portraits/Portrait_RedGoblin_51daec71.png',
        'venom': 'portraits/Portrait_Venom_1476f6dd.png',
        'carnage': 'portraits/Portrait_Carnage_2d848a59.png',
        'gladiator': 'portraits/Portrait_Gladiator_b17d83d2.png',
        'gorr': 'portraits/Portrait_Gorr_27c24f7f.png',
        'thanos-endgame': 'portraits/Portrait_ThanosEndgame_83979529.png',
        'ultimus': 'portraits/Portrait_Ultimus_5b3d4ef9.png',
        'silver-surfer': 'portraits/Portrait_SilverSurfer_5e051ebf.png',
        'mephisto': 'portraits/Portrait_Mephisto_9c8a7c7e.png',
        'odin': 'portraits/Portrait_Odin_c27c7498.png',
        'super-skrull': 'portraits/Portrait_SuperSkrull_472556f4.png',
        'dormammu': 'portraits/Portrait_Dormammu_50eb0f8e.png',
        'kestrel': 'portraits/Portrait_Sybil_a08de12d.png'
    };

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
        'Rhino': 'rhino',
        'Sybil': 'kestrel'
    };

    function parseValue(value) {
        return value.trim() === '' ? 0 : parseInt(value);
    }

    // Collecter les données des joueurs
    rows.forEach(row => {
        const [name, characterId, , power] = row.split(',');
        const formattedCharacterId = characterMapping[characterId.trim()];

        if (formattedCharacterId) {
            if (!players[name]) {
                players[name] = {};
            }
            players[name][formattedCharacterId] = parseValue(power);
        }
    });

    // Calculer le score total des 5 premiers personnages pour chaque joueur
    const playerScores = Object.keys(players).map(name => {
        const playerCharacters = players[name];
        const topCharacters = characters.recommended.concat(characters.alternative);

        const topFiveScore = topCharacters
            .slice(0, 5)
            .reduce((total, character) => {
                return total + (playerCharacters[character] || 0);
            }, 0);

        return { name, score: topFiveScore };
    });

    // Trier les joueurs par score décroissant
    playerScores.sort((a, b) => b.score - a.score);

    // Générer le tableau HTML
    const tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>Joueur</th>
                    ${[...characters.recommended, ...characters.alternative].map(char => 
                        `<th class="${
                            characters.recommended.includes(char) ? 'recommended' : 'alternative'
                        }">
                            <img src="${characterPortraits[char]}" alt="${char}" class="portrait">
                        </th>`
                    ).join('')}
                </tr>
            </thead>
            <tbody>
                ${playerScores.map(player => `
                    <tr>
                        <td>${player.name}</td>
                        ${[...characters.recommended, ...characters.alternative].map(char => `
                            <td class="${
                                characters.recommended.includes(char) ? 'recommended' : 'alternative'
                            }">
                                ${players[player.name][char] || '-'}
                            </td>
                        `).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById(tableId).innerHTML = tableHtml;
}