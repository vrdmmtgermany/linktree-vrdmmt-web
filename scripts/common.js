const STORAGE_KEYS = {
    LINKS: 'vrd_links',
    COLLECTIONS: 'vrd_collections',
    CONFIG: 'vrd_config'
};

const defaultConfig = {
    accentColor: "#7A0C01",
    bgColor: "#000000",
    textColor: "#ffffff",
    avatarUrl: "/Images/vrdmmtpb.png",
    bgImageUrl: "",
    siteTitle: "VRDMMT GERMANY",
    siteSubline: "UNCOMPROMISING TECHNO RITUALS",
    footerText: "EST. 2022 — VRDMMT GERMANY",
    buttonRadius: 16,
    cardOpacity: 85,
    particlesEnabled: true,
    socialLinks: { // NEU: Für deine Social Icons
        tiktok: '',
        instagram: '',
        facebook: '',
        email: ''
    }
};

const MASTER_DATA = {
    links: [], 
    collections: [],
    config: {}
};

function loadData() {
    try {
        const localLinks = JSON.parse(localStorage.getItem(STORAGE_KEYS.LINKS));
        const localCols = JSON.parse(localStorage.getItem(STORAGE_KEYS.COLLECTIONS));
        const localConf = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFIG));

        const links = localLinks || MASTER_DATA.links || [];
        const collections = localCols || MASTER_DATA.collections || [];
        const config = { ...defaultConfig, ...MASTER_DATA.config, ...localConf };

        return { links, collections, config };
    } catch (e) {
        return { links: [], collections: [], config: defaultConfig };
    }
}

function saveData(allData) {
    if (allData.links) localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(allData.links));
    if (allData.config) localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(allData.config));
    if (allData.collections) localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(allData.collections));
    
    window.dispatchEvent(new Event('storage'));
    showToast('Ritual gespeichert');
}

function exportRitualData() {
    const data = {
        links: JSON.parse(localStorage.getItem(STORAGE_KEYS.LINKS) || '[]'),
        collections: JSON.parse(localStorage.getItem(STORAGE_KEYS.COLLECTIONS) || '[]'),
        config: JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFIG) || '{}')
    };
    const dataStr = JSON.stringify(data, null, 2);
    console.log("KOPIERE DIESEN INHALT IN MASTER_DATA:", dataStr);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VRDMMT_MASTER.json`;
    a.click();
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showToast(msg) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style = "position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:#7A0C01; color:white; padding:15px 30px; border-radius:12px; font-family:'Bebas Neue'; z-index:10000; letter-spacing:2px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); pointer-events:none;";
    toast.innerHTML = msg.toUpperCase();
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = '0.5s'; setTimeout(() => toast.remove(), 500); }, 2000);
}

