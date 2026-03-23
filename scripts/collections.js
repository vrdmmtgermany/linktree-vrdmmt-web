(function() {
    let { links, collections } = loadData();

    function initCollections() {
        renderCollections();
        document.getElementById('addCollectionBtn').onclick = () => {
            collections.push({ id: 'col_' + Date.now(), name: "Neue Sammlung" });
            renderCollections();
        };
        document.getElementById('saveCollectionsBtn').onclick = () => saveData({ collections });
    }

    function renderCollections() {
        const container = document.getElementById('collectionsContainer');
        if (!container) return;

        container.innerHTML = collections.map((col, idx) => {
            // Finde alle Links, die dieser Sammlung zugeordnet sind
            const assignedLinks = links.filter(l => l.collectionId === col.id);
            
            return `
            <div class="card" style="margin-bottom: 20px; border-left: 4px solid var(--admin-red);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <input type="text" value="${escapeHtml(col.name)}" 
                           oninput="updateCollectionName(${idx}, this.value)" 
                           style="font-family:'Bebas Neue'; font-size:1.4rem; background:none; border:none; border-bottom:1px solid #333; color:white; width:70%;">
                    <button class="btn-mini" onclick="deleteCollection(${idx})" style="color:#7A0C01;"><i class="fas fa-trash"></i></button>
                </div>
                <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:8px;">
                    <p style="font-size:0.65rem; opacity:0.5; text-transform:uppercase; margin-bottom:8px;">Zugeordnete Rituale:</p>
                    ${assignedLinks.length > 0 ? assignedLinks.map(l => `
                        <div style="font-size:0.8rem; margin-bottom:4px; color:#ccc;"><i class="fas fa-link" style="font-size:0.7rem;"></i> ${escapeHtml(l.title)}</div>
                    `).join('') : '<p style="font-size:0.75rem; color:#444;">Noch keine Links zugewiesen.</p>'}
                </div>
            </div>`;
        }).join('');

        new Sortable(container, {
            animation: 150,
            onEnd: (evt) => {
                const item = collections.splice(evt.oldIndex, 1)[0];
                collections.splice(evt.newIndex, 0, item);
            }
        });
    }

    window.updateCollectionName = (idx, val) => { collections[idx].name = val; };
    window.deleteCollection = (idx) => { if(confirm('Sammlung löschen?')) { collections.splice(idx, 1); renderCollections(); }};

    initCollections();
    window.addEventListener('storage_updated', () => { ({ links, collections } = loadData()); renderCollections(); });
})();

