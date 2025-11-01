const header = document.getElementById("header");

let ticking = false;
let lastScrollY = 0;

function updateHeader() {
  if (lastScrollY > 90) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  ticking = false;
}

window.addEventListener(
  "scroll",
  function () {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  },
  { passive: true }
);

const map = L.map("map", { zoomControl: true }).setView([0, 20], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const regionColors = {
  "south-america": "#2ECC71",
  africa: "#E67E22",
  asia: "#3498DB",
  australia: "#9B59B6",
};

function createIcon(color) {
  return L.divIcon({
    className: "custom-rf-icon",
    html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.4);transition:all 0.3s ease"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

const rainforests = [
  {
    id: "amazon",
    name: "Amazonas",
    region: "south-america",
    coords: [-3.4653, -62.2159],
    summary:
      "A világ legnagyobb trópusi esőerdeje, a biodiverzitás központja. Több ezer növény- és állatfaj otthona, létfontosságú a globális klímára.",
  },
  {
    id: "congo",
    name: "Kongó-medence",
    region: "africa",
    coords: [0.3476, 15.183],
    summary:
      "Afrika második legnagyobb esőerdeje. Fontos ökológiai szereplő, sok endemikus fajjal és hagyományos közösségekkel.",
  },
  {
    id: "borneo",
    name: "Borneo",
    region: "asia",
    coords: [1.5, 114.0],
    summary:
      "Borneo őserdői kiemelkedő helyet foglalnak el az orangutánok és más ritka fajok fennmaradásában, de erős az erdőirtás nyomása.",
  },
  {
    id: "sumatra",
    name: "Szumátra",
    region: "asia",
    coords: [0.5897, 101.3431],
    summary:
      "Gazdag biodiverzitás, sok ritka fajjal (pl. sumátrai tigris). Az élőhelyek csökkenése miatt veszélyeztetett.",
  },
  {
    id: "newguinea",
    name: "Új-Guinea",
    region: "asia",
    coords: [-5.0, 143.5],
    summary:
      "Ázsia és Ausztrália között fekvő sziget, hatalmas, részben érintetlen esőerdőkkel és rengeteg endemitással.",
  },
  {
    id: "mata_atlantica",
    name: "Mata Atlântica",
    region: "south-america",
    coords: [-23.0, -46.6],
    summary:
      "Az Atlanti-óceán partvidékének erdeje: rendkívül biodiverz és erősen degradálódott — az eredeti erdők töredéke maradt.",
  },
  {
    id: "central_america",
    name: "Közép-Amerika",
    region: "south-america",
    coords: [10.0, -84.0],
    summary:
      "Costa Rica, Panama és környékének trópusi erdei híresek fajgazdagságukról és ökoturizmusukról.",
  },
  {
    id: "madagascar",
    name: "Madagaszkár",
    region: "africa",
    coords: [-18.5, 46.9],
    summary:
      "Sok egyedi faj származik innen (lemurok stb.). Az erdőirtás súlyosan fenyegeti a sziget ökoszisztémáját.",
  },
  {
    id: "daintree",
    name: "Daintree",
    region: "australia",
    coords: [-16.16, 145.42],
    summary:
      "Az egyik legrégebbi trópusi esőerdő a világon, különleges növény- és állatvilággal.",
  },
];

const markers = {};
const layerGroups = {};

rainforests.forEach((rf) => {
  const color = regionColors[rf.region];
  const icon = createIcon(color);
  const marker = L.marker(rf.coords, { icon: icon });

  const popupHtml = `
                <div>
                    <h3>${rf.name}</h3>
                    <p>${rf.summary}</p>
                    <p style="margin-top:8px;font-size:13px;color:#666"><strong>Koordináta:</strong> ${rf.coords[0].toFixed(
                      4
                    )}, ${rf.coords[1].toFixed(4)}</p>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(
                      rf.name + " esőerdő"
                    )}" target="_blank" class="popup-link">További információ</a>
                </div>
            `;
  marker.bindPopup(popupHtml, { maxWidth: 300 });

  if (!layerGroups[rf.region]) {
    layerGroups[rf.region] = L.layerGroup();
  }
  layerGroups[rf.region].addLayer(marker);
  markers[rf.id] = marker;
});
Object.values(layerGroups).forEach((group) => group.addTo(map));

const filterButtons = document.querySelectorAll(".filter-btn");
const statsBox = document.getElementById("stats");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterButtons.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const region = this.dataset.region;

    if (region === "all") {
      Object.values(layerGroups).forEach((group) => group.addTo(map));
      statsBox.textContent = `${rainforests.length} esőerdő megjelenítve`;
    } else {
      Object.entries(layerGroups).forEach(([key, group]) => {
        if (key === region) {
          group.addTo(map);
        } else {
          map.removeLayer(group);
        }
      });
      const count = rainforests.filter((rf) => rf.region === region).length;
      statsBox.textContent = `${count} esőerdő megjelenítve`;
    }
  });
});

map.on("popupopen", function (e) {
  const latlng = e.popup._latlng;
  map.panTo(latlng, { animate: true });
});


 const hamburger = document.getElementById("hamburger");
        const menu = document.getElementById("mainMenu");

  
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            menu.classList.toggle("active");
        });


        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                menu.classList.remove("active");
            });
        });


        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("click", () => {
                hamburger.classList.remove("active");
                menu.classList.remove("active");
            });
        });


        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
        