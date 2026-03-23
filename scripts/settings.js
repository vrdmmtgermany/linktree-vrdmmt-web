function exportBackup() {
    const data = loadData();
    const backup = {
        links: data.links,
        collections: data.collections,
        config: data.config,
        version: "6.0",
        timestamp: Date.now()
    };
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vrdmmt_backup_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup exportiert');
}

function importBackup(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.links) saveLinks(imported.links);
            if (imported.collections) saveCollections(imported.collections);
            if (imported.config) saveConfig(imported.config);
            showToast('Backup importiert');
        } catch(err) {
            alert('Fehler beim Import: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function resetAllData() {
    if(confirm('ACHTUNG: Alle Daten werden gelöscht. Dieser Vorgang kann nicht rückgängig gemacht werden.')) {
        localStorage.clear();
        showToast('Alle Daten wurden zurückgesetzt');
        setTimeout(() => location.reload(), 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('exportBackupBtn')?.addEventListener('click', exportBackup);
    document.getElementById('importBackupTrigger')?.addEventListener('click', () => document.getElementById('importBackupFile').click());
    document.getElementById('importBackupFile')?.addEventListener('change', (e) => {
        if(e.target.files.length) importBackup(e.target.files[0]);
        e.target.value = '';
    });
    document.getElementById('resetAllBtn')?.addEventListener('click', resetAllData);
});
