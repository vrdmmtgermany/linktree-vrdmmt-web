<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>VRDMMT | Admin Control</title>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* --- Basis (wie gehabt) --- */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #000;
            color: #fff;
            font-family: 'Inter', sans-serif;
            padding: 30px 20px;
            position: relative;
        }
        body::before {
            content: '';
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: 
                radial-gradient(circle at 20% 50%, rgba(122,12,1,0.15), transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(122,12,1,0.1), transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(122,12,1,0.05), transparent 40%);
            animation: pulse 8s ease-in-out infinite;
            z-index: 0;
        }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
        }
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 40px;
            padding: 20px 30px;
            background: rgba(0,0,0,0.3);
            backdrop-filter: blur(8px);
            border-radius: 24px;
            border-bottom: 1px solid rgba(122,12,1,0.3);
        }
        .logo-area {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .logo-img {
            height: 60px;
            width: auto;
            border-radius: 12px;
            transition: transform 0.3s;
        }
        .logo-img:hover { transform: scale(1.02); }
        .logo-text {
            font-family: 'Bebas Neue';
            font-size: 2rem;
            letter-spacing: 3px;
            color: #7A0C01;
            text-shadow: 0 0 20px rgba(122,12,1,0.5);
        }
        .admin-actions {
            display: flex;
            gap: 15px;
        }
        .btn {
            background: rgba(122,12,1,0.2);
            border: 1px solid rgba(122,12,1,0.5);
            padding: 10px 20px;
            border-radius: 40px;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
        }
        .btn-primary {
            background: #7A0C01;
            border-color: #7A0C01;
        }
        .btn-primary:hover {
            background: #9a1c11;
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(122,12,1,0.4);
        }
        .btn-danger {
            background: rgba(220,38,38,0.2);
            border-color: #dc2626;
        }
        .btn-danger:hover {
            background: #dc2626;
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            flex-wrap: wrap;
        }
        .tab-btn {
            background: transparent;
            border: none;
            color: #aaa;
            padding: 12px 24px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }
        .tab-btn.active {
            color: #7A0C01;
        }
        .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #7A0C01;
        }
        .tab-pane {
            display: none;
            animation: fade 0.3s ease;
        }
        .tab-pane.active {
            display: block;
        }
        @keyframes fade {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .card {
            background: rgba(15,15,15,0.85);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(122,12,1,0.2);
            border-radius: 24px;
            padding: 25px;
            margin-bottom: 30px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .card h2 {
            font-family: 'Bebas Neue';
            font-size: 1.8rem;
            margin-bottom: 20px;
            letter-spacing: 2px;
            border-left: 4px solid #7A0C01;
            padding-left: 15px;
        }
        .links-table {
            width: 100%;
            border-collapse: collapse;
        }
        .links-table th, .links-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .links-table th {
            font-weight: 700;
            color: #7A0C01;
        }
        .links-table td button {
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            margin: 0 5px;
            font-size: 1.1rem;
            transition: 0.2s;
        }
        .links-table td button:hover {
            color: #7A0C01;
            transform: scale(1.1);
        }
        .delete-link:hover {
            color: #dc2626 !important;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }
        input, textarea, select {
            width: 100%;
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 12px 15px;
            border-radius: 12px;
            color: #fff;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s;
        }
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #7A0C01;
            box-shadow: 0 0 10px rgba(122,12,1,0.2);
        }
        .form-row {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .form-row .form-group {
            flex: 1;
        }
        .collection-item {
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 15px;
            margin-bottom: 15px;
            transition: all 0.2s;
        }
        .collection-item:hover {
            background: rgba(255,255,255,0.08);
        }
        .collection-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .collection-header h3 {
            font-size: 1.2rem;
            font-weight: 600;
        }
        .collection-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        .collection-link-tag {
            background: rgba(122,12,1,0.3);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .remove-link-tag {
            cursor: pointer;
            opacity: 0.6;
            transition: 0.2s;
        }
        .remove-link-tag:hover {
            opacity: 1;
            color: #dc2626;
        }

        /* Toast-Styles (kompatibel mit common.js) */
        .vrd-toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #1a1a1a;
            border: 1px solid #7A0C01;
            color: #fff;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 100000;
            opacity: 0;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .vrd-toast.vrd-toast-error {
            background: #3a1a1a;
            border-color: #ff4444;
        }

        @media (max-width: 768px) {
            .admin-header { flex-direction: column; align-items: flex-start; }
            .logo-area { width: 100%; justify-content: space-between; }
            .tabs { justify-content: center; }
            .links-table th, .links-table td { padding: 8px; font-size: 0.85rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="admin-header">
            <div class="logo-area">
                <img id="adminLogo" class="logo-img" src="" alt="VRDMMT Logo" onerror="this.style.display='none'; document.getElementById('logoFallback').style.display='flex'">
                <div id="logoFallback" class="logo-text" style="display: none;">
                    <i class="fas fa-crown"></i> VRDMMT ADMIN
                </div>
            </div>
            <div class="admin-actions">
                <button class="btn" id="saveAllBtn"><i class="fas fa-save"></i> Alle speichern</button>
                <a href="../index.html" class="btn" target="_blank"><i class="fas fa-eye"></i> Vorschau</a>
                <button class="btn btn-danger" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </div>
        </div>

        <div class="tabs">
            <button class="tab-btn active" data-tab="links">Links</button>
            <button class="tab-btn" data-tab="collections">Collections</button>
            <button class="tab-btn" data-tab="settings">Einstellungen</button>
        </div>

        <!-- Links Tab -->
        <div class="tab-pane active" id="tab-links">
            <div class="card">
                <h2><i class="fas fa-plus-circle"></i> Neuer Link</h2>
                <form id="linkForm">
                    <div class="form-row">
                        <div class="form-group"><label>Titel *</label><input type="text" id="linkTitle" required placeholder="z.B. Instagram"></div>
                        <div class="form-group"><label>URL / E-Mail / Text</label><input type="text" id="linkUrl" placeholder="https://... oder mailto:..."></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label>Beschreibung</label><input type="text" id="linkDesc" placeholder="Kurze Beschreibung"></div>
                        <div class="form-group"><label>Icon (Font Awesome)</label><input type="text" id="linkIcon" placeholder="fab fa-instagram"></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label>Typ</label>
                            <select id="linkType">
                                <option value="link">Normaler Link</option>
                                <option value="product">Produkt (mit Preis)</option>
                                <option value="text">Textblock</option>
                                <option value="form">Kontaktformular</option>
                            </select>
                        </div>
                        <div class="form-group" id="priceGroup" style="display: none;"><label>Preis</label><input type="text" id="linkPrice" placeholder="29.90"></div>
                        <div class="form-group" id="currencyGroup" style="display: none;"><label>Währung</label><input type="text" id="linkCurrency" placeholder="€"></div>
                    </div>
                    <div class="form-group" id="contentGroup" style="display: none;"><label>Inhalt (bei Textblock)</label><textarea id="linkContent" rows="3"></textarea></div>
                    <div class="form-group" id="emailGroup" style="display: none;"><label>E-Mail (bei Formular)</label><input type="email" id="linkEmail"></div>
                    <div class="form-group"><label><input type="checkbox" id="linkActive" checked> Aktiv (auf Startseite sichtbar)</label></div>
                    <input type="hidden" id="editingLinkId" value="">
                    <button type="submit" class="btn btn-primary">Link speichern</button>
                    <button type="button" id="cancelEditBtn" class="btn" style="display: none;">Abbrechen</button>
                </form>
            </div>

            <div class="card">
                <h2><i class="fas fa-list"></i> Alle Links</h2>
                <div style="overflow-x: auto;">
                    <table class="links-table" id="linksTable">
                        <thead>
                            <tr><th>ID</th><th>Titel</th><th>Typ</th><th>Aktiv</th><th>Clicks</th><th>Aktionen</th></tr>
                        </thead>
                        <tbody id="linksTbody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Collections Tab -->
        <div class="tab-pane" id="tab-collections">
            <div class="card">
                <h2><i class="fas fa-folder-plus"></i> Neue Collection</h2>
                <div class="form-row">
                    <div class="form-group" style="flex: 2;"><input type="text" id="newCollectionName" placeholder="Collection Name"></div>
                    <button id="addCollectionBtn" class="btn btn-primary">Erstellen</button>
                </div>
            </div>
            <div id="collectionsList"></div>
        </div>

        <!-- Settings Tab -->
        <div class="tab-pane" id="tab-settings">
            <div class="card">
                <h2><i class="fas fa-globe"></i> Allgemein</h2>
                <div class="form-group"><label>Seitentitel</label><input type="text" id="config_siteTitle"></div>
                <div class="form-group"><label>Untertitel (Subline)</label><input type="text" id="config_siteSubline"></div>
                <div class="form-group"><label>Logo / Avatar URL</label><input type="text" id="config_avatarUrl" placeholder="/images/logo.png"></div>
                <div class="form-group"><label>Footer-Text</label><input type="text" id="config_footerText"></div>
            </div>
            <div class="card">
                <h2><i class="fas fa-palette"></i> Design</h2>
                <div class="form-row">
                    <div class="form-group"><label>Akzentfarbe (Hex)</label><input type="text" id="config_accentColor" placeholder="#7A0C01"></div>
                    <div class="form-group"><label>Hintergrundfarbe (Hex)</label><input type="text" id="config_bgColor" placeholder="#000000"></div>
                    <div class="form-group"><label>Textfarbe (Hex)</label><input type="text" id="config_textColor" placeholder="#ffffff"></div>
                    <div class="form-group"><label>Card Opacity (0-100)</label><input type="number" id="config_cardOpacity" min="0" max="100" step="5"></div>
                    <div class="form-group"><label>Button Radius (px)</label><input type="number" id="config_buttonRadius" step="1"></div>
                </div>
            </div>
            <div class="card">
                <h2><i class="fas fa-share-alt"></i> Social Media</h2>
                <div class="form-group"><label><input type="checkbox" id="config_socialShowSection"> Social Media Bereich anzeigen</label></div>
                <div class="form-group"><label>Position</label><select id="config_socialPosition"><option value="top">Oben</option><option value="bottom">Unten</option></select></div>
                <div class="form-row">
                    <div class="form-group"><label>TikTok</label><input type="text" id="config_social_tiktok_url"><label><input type="checkbox" id="config_social_tiktok_show"> Anzeigen</label></div>
                    <div class="form-group"><label>Instagram</label><input type="text" id="config_social_instagram_url"><label><input type="checkbox" id="config_social_instagram_show"> Anzeigen</label></div>
                    <div class="form-group"><label>Facebook</label><input type="text" id="config_social_facebook_url"><label><input type="checkbox" id="config_social_facebook_show"> Anzeigen</label></div>
                    <div class="form-group"><label>E-Mail</label><input type="email" id="config_social_email_url"><label><input type="checkbox" id="config_social_email_show"> Anzeigen</label></div>
                </div>
            </div>
        </div>
    </div>

    <script src="../scripts/common.js"></script>
    <script>
        // --- Globale Daten ---
        let appData = { config: {}, links: [], collections: [] };

        // --- Daten laden & speichern (nutzt common.js) ---
        function loadAdminData() {
            if (typeof loadData === 'function') {
                appData = loadData();
                if (!appData.config) appData.config = {};
                if (!appData.links) appData.links = [];
                if (!appData.collections) appData.collections = [];
            } else {
                console.warn("loadData nicht gefunden, verwende leere Daten.");
                appData = { config: {}, links: [], collections: [] };
            }
            // Logo anzeigen
            const logoUrl = appData.config.avatarUrl || appData.config.logoUrl || '';
            const logoImg = document.getElementById('adminLogo');
            const logoFallback = document.getElementById('logoFallback');
            if (logoUrl) {
                logoImg.src = logoUrl;
                logoImg.style.display = 'block';
                logoFallback.style.display = 'none';
            } else {
                logoImg.style.display = 'none';
                logoFallback.style.display = 'flex';
            }
        }

        function saveAdminData() {
            if (typeof saveData === 'function') {
                saveData(appData);
                showToast('✅ Alle Daten gespeichert!', 'success');
            } else {
                console.error("saveData nicht definiert");
                showToast('❌ Fehler: saveData nicht verfügbar', 'error');
            }
        }

        // --- Klickzahlen aus common.js holen ---
        function getClickCount(linkId) {
            if (typeof getStats === 'function') {
                const stats = getStats();
                return stats[linkId]?.clicks || 0;
            }
            return 0;
        }

        // --- Links Tab ---
        function renderLinksTable() {
            const tbody = document.getElementById('linksTbody');
            tbody.innerHTML = '';
            appData.links.forEach(link => {
                const row = tbody.insertRow();
                row.insertCell(0).innerText = link.id || '?';
                row.insertCell(1).innerText = link.title || 'Unbenannt';
                row.insertCell(2).innerText = link.type || 'link';
                row.insertCell(3).innerHTML = link.active !== false ? '✅' : '❌';
                row.insertCell(4).innerText = getClickCount(link.id);
                const actions = row.insertCell(5);
                actions.innerHTML = `
                    <button class="edit-link" data-id="${link.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-link" data-id="${link.id}"><i class=
