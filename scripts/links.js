(function() {
    let data = loadData();
    let links = data.links || [];
    let collections = data.collections || [];

    function initLinks() {
        renderLinksEditor();
    }

    window.addRitualLink = function(title, url, type) {
        const newEntry = { 
            id: 'lnk_' + Date.now(), 
            title: title || 'NEUES RITUAL', 
            url: url || '', 
            type: type || 'link', 
            collectionId: collections.length > 0 ? collections[0].id : 'none',
            price: '',
            desc: '',
            visible: true
        };
        links.push(newEntry);
        saveAndRefresh();
    };

    window.updateLink = (idx, key, val) => {
        links[idx][key] = val;
        // Speichern ohne kompletten Re-Render, damit der Cursor im Input bleibt
        data.links = links;
        saveData(data);
        if (window.renderProductList) window.renderProductList();
    };

    window.deleteLink = (idx) => {
        if(confirm('RITUAL UNWIDERRUFLICH LÖSCHEN?')) {
            links.splice(idx, 1);
            saveAndRefresh();
        }
    };

    function saveAndRefresh() {
        data.links = links;
        saveData(data);
        renderLinksEditor();
        if (window.renderProductList) window.renderProductList();
    }

    function renderLinksEditor() {
        const container = document.getElementById('linksEditorContainer');
        if (!container) return;

        container.innerHTML = links.map((link, idx) => `
            <div class="card link-card" style="border-left: 4px solid ${link.type === 'product' ? '#fbbf24' : 'var(--admin-red)'}; margin-bottom: 20px; position: relative; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="font-family: 'Bebas Neue'; color: #555;">#${idx + 1} ${link.type.toUpperCase()}</span>
                    <button class="btn-mini" onclick="deleteLink(${idx})" style="background:none; border:none; color: #ff4444; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </div>
                
                <div class="design-row">
                    <div class="design-col">
                        <label>TITEL</label>
                        <input type="text" value="${escapeHtml(link.title)}" oninput="updateLink(${idx}, 'title', this.value)" placeholder="z.B. Soundcloud Mix">
                    </div>
                    <div class="design-col">
                        <label>URL / LINK</label>
                        <input type="text" value="${escapeHtml(link.url)}" oninput="updateLink(${idx}, 'url', this.value)" placeholder="https://...">
                    </div>
                </div>

                <div class="design-row" style="margin-top: 15px;">
                    <div class="design-col">
                        <label>TYP</label>
                        <select onchange="updateLink(${idx}, 'type', this.value); renderLinksEditor();" class="admin-input">
                            <option value="link" ${link.type === 'link' ? 'selected' : ''}>Standard Link</option>
                            <option value="product" ${link.type === 'product' ? 'selected' : ''}>Produkt / Shop</option>
                            <option value="video" ${link.type === 'video' ? 'selected' : ''}>Video / Stream</option>
                        </select>
                    </div>
                    <div class="design-col">
                        <label>SAMMLUNG / GRUPPE</label>
                        <select onchange="updateLink(${idx}, 'collectionId', this.value)" class="admin-input">
                            <option value="none">Keine Gruppe</option>
                            ${collections.map(col => `<option value="${col.id}" ${link.collectionId === col.id ? 'selected' : ''}>${escapeHtml(col.name)}</option>`).join('')}
                        </select>
                    </div>
                </div>

                ${link.type === 'product' ? `
                <div class="design-row" style="margin-top: 15px; background: rgba(251, 191, 36, 0.05); padding: 10px; border-radius: 8px;">
                    <div class="design-col">
                        <label>PREIS (€)</label>
                        <input type="text" value="${escapeHtml(link.price || '0.00')}" oninput="updateLink(${idx}, 'price', this.value)">
                    </div>
                    <div class="design-col">
                        <label>BESCHREIBUNG</label>
                        <input type="text" value="${escapeHtml(link.desc || '')}" oninput="updateLink(${idx}, 'desc', this.value)" placeholder="Kurze Info...">
                    </div>
                </div>
                ` : `
                <div class="design-row" style="margin-top: 15px;">
                    <div class="design-col">
                        <label>BESCHREIBUNG (OPTIONAL)</label>
                        <input type="text" value="${escapeHtml(link.desc || '')}" oninput="updateLink(${idx}, 'desc', this.value)">
                    </div>
                </div>
                `}
            </div>
        `).join('');
    }

    document.addEventListener('DOMContentLoaded', initLinks);
})();

