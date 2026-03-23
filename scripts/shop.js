(function() {
    window.renderProductList = function() {
        const container = document.getElementById('productList');
        if (!container) return;
        
        const { links } = loadData();
        const products = links.filter(l => l.type === 'product');

        if (!products.length) {
            container.innerHTML = `
                <div style="text-align:center; padding:40px; opacity:0.3; border: 2px dashed #333; border-radius:15px;">
                    <i class="fas fa-box-open" style="font-size:3rem; margin-bottom:15px;"></i><br>
                    DEIN SHOP IST LEER.<br>
                    <small>Stelle im Link-Manager einen Link auf den Typ "Produkt" um.</small>
                </div>`;
            return;
        }

        container.innerHTML = `
            <div style="margin-bottom: 20px; font-family: 'Bebas Neue'; color: var(--admin-red); letter-spacing: 1px;">
                AKTIVE PRODUKTE IM SHOP: ${products.length}
            </div>
            ${products.map(p => `
                <div class="product-item" style="background:rgba(255,255,255,0.03); padding:15px; border-radius:12px; margin-bottom:12px; border:1px solid rgba(251, 191, 36, 0.2); display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:15px;">
                        <div style="width:45px; height:45px; background:#fbbf24; border-radius:10px; display:flex; align-items:center; justify-content:center; color:black; font-size: 1.2rem;">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div>
                            <strong style="font-family:'Bebas Neue'; letter-spacing:1px; font-size:1.3rem; display:block;">${escapeHtml(p.title)}</strong>
                            <span style="color:#fbbf24; font-weight:bold;">${escapeHtml(p.price)} €</span>
                            ${p.desc ? `<span style="opacity:0.4; font-size:0.8rem; margin-left:10px;">| ${escapeHtml(p.desc)}</span>` : ''}
                        </div>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <a href="${p.url}" target="_blank" class="btn-mini" style="background:#333;"><i class="fas fa-eye"></i></a>
                    </div>
                </div>
            `).join('')}
        `;
    }

    document.addEventListener('DOMContentLoaded', renderProductList);
})();

