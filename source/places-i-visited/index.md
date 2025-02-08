---
title: 📍Places I visited
date: 2024-12-27 03:35:40
---

<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>
<style>
    #map {
        min-height: 700px;
        width: 100%;
    }
    .flag-icon-marker {
        position: relative;
        width: 20px;
        height: 20px;
        border: 2px solid #000;
        border-radius: 50%;
        overflow: hidden;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .flag-icon-marker img {
        width: 80%;
        height: 80%;
        object-fit: cover;
    }
</style>
<div id="map"></div>
<div><i>*Just refresh in case if map is not loading</i></div>
<script src=""></script>
<script>
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}
loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', function() {
    var map = L.map("map", {
        center: [0, 0],
        zoom: 1,
        zoomControl: true,
    });
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
    ).addTo(map);
    async function fetchPlaceData(postalCode, country = "DE") {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=${country}&format=json&polygon_geojson=1&accept-language=en`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
            return data[0];
            } else {
            console.error("Error fetching place data", url);
            return null;
            }
        } catch (error) {
            console.error("Error fetching place data", error);
            return null;
        }
    }
    function createFlagMarker(countryCode) {
        return L.divIcon({
            html: `
                <div class="flag-icon-marker">
                    <img class="map-marker-img" src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" alt="${countryCode}">
                </div>
            `,
            iconSize: [20, 20],
            className: "custom-flag-marker",
        });
    }
    function drawBoundingBoxAndPin(boundingbox, displayName, countryCode) {
        const bounds = [
            [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
            [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])],
        ];
        const rectangle = L.rectangle(bounds, {
            color: "#8a2be2",
            weight: 2,
            fillOpacity: 0.5,
        });
        rectangle.addTo(map).bindPopup(displayName);
        const centerLat =
            (parseFloat(boundingbox[0]) + parseFloat(boundingbox[1])) / 2;
        const centerLon =
            (parseFloat(boundingbox[2]) + parseFloat(boundingbox[3])) / 2;
        const marker = L.marker([centerLat, centerLon], {
            icon: createFlagMarker(countryCode),
        });
        marker.addTo(map).bindPopup(displayName);
        marker.on("click", () => {
            map.setView([centerLat, centerLon], 12);
        });
    }
    async function processPostalCodes(postalCodes, countryCode) {
        for (const postalCode of postalCodes) {
            let coordinates = postalCode.coordinates;
            let displayName = postalCode.displayName;
            if (!coordinates) {
                const placeData = await fetchPlaceData(
                    postalCode.code,
                    countryCode
                );
                if (placeData && placeData.boundingbox) {
                    coordinates = placeData.boundingbox;
                    displayName = placeData.display_name;
                }
            }
            if (coordinates) {
                globalPostalCodes[countryCode].find(
                    (el) => el.code == postalCode.code
                ).coordinates = coordinates;
                globalPostalCodes[countryCode].find(
                    (el) => el.code == postalCode.code
                ).displayName = displayName;
                drawBoundingBoxAndPin(coordinates, displayName, countryCode);
            }
        }
    }
    var globalPostalCodes = {
        PS: [
            {
            code: "",
            coordinates: [
                "29.4533796",
                "33.3356317",
                "34.2674994",
                "35.8950234",
            ],
            displayName: "Palestine",
            },
        ],
        JO: [
            {
            code: "",
            coordinates: [
                "29.1834010",
                "33.3734350",
                "34.8844372",
                "39.2998604",
            ],
            displayName: "Jordan",
            },
        ],
        DE: [
            {
            code: "13349",
            coordinates: [
                "52.5505073",
                "52.5640219",
                "13.3312085",
                "13.3651207",
            ],
            displayName: "13349, Wedding, Mitte, Berlin, Germany",
            },
            {
            code: "13355",
            coordinates: [
                "52.5331793",
                "52.5487035",
                "13.3757511",
                "13.4035279",
            ],
            displayName: "13355, Gesundbrunnen, Mitte, Berlin, Germany",
            },
            {
            code: "12047",
            coordinates: [
                "52.4857336",
                "52.4957889",
                "13.4206389",
                "13.4353562",
            ],
            displayName: "12047, Neukölln, Berlin, Germany",
            },
            {
            code: "20457",
            coordinates: [
                "53.5156988",
                "53.5514698",
                "9.9298603",
                "10.0247839",
            ],
            displayName: "20457, Steinwerder, Hamburg-Mitte, Hamburg, Germany",
            },
            {
            code: "21149",
            coordinates: ["53.4296167", "53.4761364", "9.7998057", "9.9175382"],
            displayName: "21149, Neugraben-Fischbek, Harburg, Hamburg, Germany",
            },
            {
            code: "22111",
            coordinates: [
                "53.5366519",
                "53.5625810",
                "10.0661032",
                "10.1130618",
            ],
            displayName: "22111, Horn, Hamburg-Mitte, Hamburg, Germany",
            },
            {
            code: "20253",
            coordinates: ["53.5716494", "53.5862418", "9.9574892", "9.9765435"],
            displayName: "20253, Eimsbüttel, Hamburg, Germany",
            },
            {
            code: "23570",
            coordinates: [
                "53.8971746",
                "53.9938868",
                "10.8165960",
                "10.9686302",
            ],
            displayName:
                "23570, Priwall, Travemünde, Lübeck, Schleswig-Holstein, Germany",
            },
            {
            code: "23558",
            coordinates: [
                "53.8456191",
                "53.8698746",
                "10.6190603",
                "10.6788151",
            ],
            displayName:
                "23558, Sankt Lorenz Süd, Lübeck, Schleswig-Holstein, Germany",
            },
            {
            code: "30159",
            coordinates: ["52.3666835", "52.3842965", "9.7220200", "9.7615838"],
            displayName:
                "30159, Centre, Hanover, Region Hannover, Lower Saxony, Germany",
            },
            {
            code: "40221",
            coordinates: ["51.1808684", "51.2292713", "6.7223048", "6.7738311"],
            displayName:
                "40221, Hamm, Stadtbezirk 3, Dusseldorf, North Rhine-Westphalia, Germany",
            },
            {
            code: "40213",
            coordinates: ["51.2161814", "51.2316938", "6.7634868", "6.7812924"],
            displayName:
                "40213, Carlstadt, Stadtbezirk 1, Dusseldorf, North Rhine-Westphalia, Germany",
            },
            {
            code: "40211",
            coordinates: ["51.2230673", "51.2376559", "6.7812924", "6.7993435"],
            displayName:
                "40211, Pempelfort, Stadtbezirk 1, Dusseldorf, North Rhine-Westphalia, Germany",
            },
            {
            code: "40210",
            coordinates: ["51.2171404", "51.2256932", "6.7822497", "6.7982357"],
            displayName:
                "40210, Stadtmitte, Stadtbezirk 1, Dusseldorf, North Rhine-Westphalia, Germany",
            },
            {
            code: "60329",
            coordinates: ["50.1010326", "50.1141779", "8.6564570", "8.6743594"],
            displayName:
                "60329, Bahnhofsviertel, Innenstadt 1, Frankfurt, Hesse, Germany",
            },
            {
            code: "60327",
            coordinates: ["50.0889704", "50.1145185", "8.6167326", "8.6666439"],
            displayName:
                "60327, Gutleutviertel, Innenstadt 1, Frankfurt, Hesse, Germany",
            },
        ],
        ES: [
            {
            code: "07001",
            coordinates: ["39.5195368", "39.6195368", "2.5995712", "2.6995712"],
            displayName: "07001, Palma, Balearic Islands, Spain",
            },
            {
            code: "07400",
            coordinates: ["39.7934672", "39.8934672", "3.0753776", "3.1753776"],
            displayName: "07400, Alcúdia, Raiguer, Balearic Islands, Spain",
            },
            {
            code: "08024",
            coordinates: ["41.3610755", "41.4610755", "2.1095876", "2.2095876"],
            displayName:
                "08024, Gràcia, Barcelona, Barcelonès, Barcelona, Catalonia, Spain",
            },
            {
            code: "08850",
            coordinates: ["41.2351582", "41.3351582", "1.9613999", "2.0613999"],
            displayName:
                "08850, Gavà, Baix Llobregat, Barcelona, Catalonia, Spain",
            },
            {
            code: "18005",
            coordinates: [
                "37.1203253",
                "37.2203253",
                "-3.6503292",
                "-3.5503292",
            ],
            displayName:
                "18005, Ronda, Granada, Comarca de la Vega de Granada, Granada, Andalusia, Spain",
            },
            {
            code: "18417",
            coordinates: [
                "36.9498407",
                "37.0498407",
                "-3.3156515",
                "-3.2156515",
            ],
            displayName:
                "18417, Trevélez, Comarca de la Alpujarra Granadina, Granada, Andalusia, Spain",
            },
            {
            code: "14004",
            coordinates: [
                "37.8287554",
                "37.9287554",
                "-4.8361260",
                "-4.7361260",
            ],
            displayName:
                "14004, Distrito Poniente Sur, Córdoba, Andalusia, Spain",
            },
            {
            code: "29400",
            coordinates: [
                "36.6954118",
                "36.7954118",
                "-5.2169149",
                "-5.1169149",
            ],
            displayName:
                "29400, Ronda, Serranía de Ronda, Malaga, Andalusia, Spain",
            },
        ],
        US: [
            {
            code: "75048",
            coordinates: [
                "32.9143414",
                "33.0143414",
                "-96.6369715",
                "-96.5369715",
            ],
            displayName: "75048, Sachse, Dallas County, Texas, United States",
            },
            {
            code: "75080",
            coordinates: [
                "32.9208440",
                "33.0208440",
                "-96.7926326",
                "-96.6926326",
            ],
            displayName:
                "75080, Richardson, Dallas County, Texas, United States",
            },
            {
            code: "76011",
            coordinates: [
                "32.7090897",
                "32.8090897",
                "-97.1385198",
                "-97.0385198",
            ],
            displayName:
                "76011, Arlington, Tarrant County, Texas, United States",
            },
            {
            code: "75214",
            coordinates: [
                "32.7758744",
                "32.8758744",
                "-96.7997473",
                "-96.6997473",
            ],
            displayName: "75214, Dallas, Dallas County, Texas, United States",
            },
            {
            code: "75087",
            coordinates: [
                "32.8954114",
                "32.9954114",
                "-96.5145247",
                "-96.4145247",
            ],
            displayName:
                "75087, Rockwall, Rockwall County, Texas, United States",
            },
            {
            code: "75460",
            coordinates: [
                "33.6132156",
                "33.7132156",
                "-95.5976811",
                "-95.4976811"
            ],
            displayName:
                "75460, Paris, Lamar County, Texas, United States",
            },
            {
            code: "74728",
            coordinates: [
                "34.0182033",
                "34.1182033",
                "-94.7983259",
                "-94.6983259"
            ],
            displayName:
                "74728, McCurtain County, Oklahoma, United States",
            },
            {
            code: "75006",
            coordinates: [
                "32.9149104",
                "33.0149104",
                "-96.9396866",
                "-96.8396866"
            ],
            displayName:
                "75006, Carrollton, Dallas County, Texas, United States",
            },
            {
            code: "75007",
            coordinates: [
                "32.9565275",
                "33.0565275",
                "-96.9478608",
                "-96.8478608"
            ],
            displayName:
                "75007, Carrollton, Dallas County, Texas, United States",
            },
        ],
        TN: [
            {
            code: "1100",
            coordinates: [
                "36.3637115",
                "36.4637115",
                "10.1373364",
                "10.2373364",
            ],
            displayName:
                "1100, زغوان الجنوبية, معتمدية زغوان, Zaghouan Governorate, Tunisia",
            },
            {
            code: "2036",
            coordinates: [
                "36.8257255",
                "36.9257255",
                "10.1955819",
                "10.2955819",
            ],
            displayName: "2036, سكرة, معتمدية سكرة, Ariana, Tunisia",
            },
            {
            code: "2083",
            coordinates: [
                "36.8411739",
                "36.9411739",
                "10.1187159",
                "10.2187159",
            ],
            displayName: "2083, المدينة الفاضلة, معتمدية رواد, Ariana, Tunisia",
            },
            {
            code: "8013",
            coordinates: [
                "36.4196802",
                "36.5196802",
                "10.7567611",
                "10.8567611",
            ],
            displayName: "8013, المعمورة, معتمدية بني خيار, Nabeul, Tunisia",
            },
        ],
        NO: [
            {
            code: "2004",
            coordinates: [
                "59.9037173",
                "60.0037173",
                "11.0131396",
                "11.1131396",
            ],
            displayName: "2004, Lillestrøm, Akershus, Norway",
            },
        ],
        IT: [
            {
            code: "00185",
            coordinates: [
                "41.8486308",
                "41.9486308",
                "12.4544921",
                "12.5544921",
            ],
            displayName:
                "00185, Municipio Roma I, Rome, Roma Capitale, Lazio, Italy",
            },
        ],
        PT: [
            {
            code: "1200-016",
            coordinates: [
                "38.7081361",
                "38.7121361",
                "-9.1451919",
                "-9.1411919",
            ],
            displayName: "1200-016, Misericórdia, Lisbon, Portugal",
            },
        ],
    };
    Object.keys(globalPostalCodes).map((key) =>
        processPostalCodes(globalPostalCodes[key], key)
    );
});
</script>