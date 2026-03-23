(function() {
    console.log("VRDMMT Analytics-Engine geladen");

    function initAnalytics() {
        const stats = JSON.parse(localStorage.getItem('vrd_stats') || '{}');
        const data = loadData();
        const links = data.links || [];

        let totalClicks = 0;
        let topLinkTitle = "-";
        let maxClicks = 0;
        let statsHtml = '<table style="width:100%; border-collapse: collapse; margin-top:15px;">';
        statsHtml += '<tr style="border-bottom:1px solid #222; color:#777; font-size:0.8rem;"><th style="text-align:left; padding:8px;">LINK / RITUAL</th><th style="text-align:right; padding:8px;">CLICKS</th></tr>';

        // Berechnungen
        links.forEach(link => {
            const clicks = stats[link.id] || 0;
            totalClicks += clicks;

            if (clicks > maxClicks) {
                maxClicks = clicks;
                topLinkTitle = link.title;
            }

            statsHtml += `
                <tr style="border-bottom:1px solid #111;">
                    <td style="padding:12px 8px; font-size:0.9rem;">${link.title || 'Unbenannt'}</td>
                    <td style="padding:12px 8px; text-align:right; font-family:'Bebas Neue'; color:#7A0C01; font-size:1.2rem;">${clicks}</td>
                </tr>
            `;
        });

        statsHtml += '</table>';

        // DOM Update
        const totalEl = document.getElementById('totalClicks');
        const topEl = document.getElementById('topLink');
        const detailsEl = document.getElementById('detailedStats');

        if (totalEl) totalEl.innerText = totalClicks;
        if (topEl) topEl.innerText = topLinkTitle;
        if (detailsEl) detailsEl.innerHTML = links.length > 0 ? statsHtml : '<p style="text-align:center; padding:20px; color:#444;">NO DATA AVAILABLE</p>';
    }

    // Reset Funktion
    const resetBtn = document.getElementById('resetStatsBtn');
    if (resetBtn) {
        resetBtn.onclick = () => {
            if (confirm("Alle Statistiken unwiderruflich löschen?")) {
                localStorage.setItem('vrd_stats', JSON.stringify({}));
                initAnalytics();
            }
        };
    }

    // Tab-Wechsel Überwachung (Damit Stats beim Klick auf den Tab frisch geladen werden)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.tab === 'analytics') initAnalytics();
        });
    });

    // Initialer Start
    initAnalytics();
})();
