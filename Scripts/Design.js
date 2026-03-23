(function() {
    let data = loadData();
    if (!data.config) data.config = {};
    let config = data.config;

    const defaults = {
        accentColor: '#7A0C01',
        bgColor: '#000000',
        siteTitle: 'VRDMMT',
        siteSubline: 'UNCOMPROMISING TECHNO',
        footerText: 'EST. 2022 — VRDMMT GERMANY',
        buttonRadius: 16,
        cardOpacity: 85,
        particlesEnabled: true,
        avatarUrl: '/Images/vrdmmtpb.png',
        recentAvatars: ['/Images/vrdmmtpb.png'],
        socialShowSection: true,
        socialPosition: 'top',
        social_tiktok_show: true, social_tiktok_url: '',
        social_instagram_show: true, social_instagram_url: '',
        social_facebook_show: false, social_facebook_url: '',
        social_email_show: true, social_email_url: ''
    };

    Object.keys(defaults).forEach(key => {
        if (config[key] === undefined) config[key] = defaults[key];
    });

    function initDesign() {
        const allInputs = [
            'accentColor', 'bgColor', 'siteTitle', 'siteSubline', 
            'footerText', 'buttonRadius', 'cardOpacity', 'particlesEnabled',
            'socialShowSection', 'socialPosition',
            'social_tiktok_show', 'social_tiktok_url',
            'social_instagram_show', 'social_instagram_url',
            'social_facebook_show', 'social_facebook_url',
            'social_email_show', 'social_email_url'
        ];

        allInputs.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            if (el.type === 'checkbox') {
                el.checked = config[id];
            } else {
                el.value = config[id];
            }

            el.addEventListener('input', () => {
                if (el.type === 'checkbox') {
                    config[id] = el.checked;
                } else if (el.type === 'number') {
                    config[id] = parseInt(el.value) || 0;
                } else {
                    config[id] = el.value;
                }
                
                updatePreview();
                saveConfig();
            });
        });

        const uploadInput = document.getElementById('avatarUpload');
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    config.avatarUrl = base64;
                    
                    if (!config.recentAvatars.includes(base64)) {
                        config.recentAvatars.unshift(base64);
                        if (config.recentAvatars.length > 6) config.recentAvatars.pop();
                    }
                    
                    renderAvatarPicker();
                    updatePreview();
                    saveConfig();
                };
                reader.readAsDataURL(file);
            });
        }

        renderAvatarPicker();
        updatePreview();
    }

    function saveConfig() {
        data.config = config;
        saveData(data);
    }

    function renderAvatarPicker() {
        const container = document.getElementById('avatarPickerContainer');
        if (!container) return;
        
        const trigger = container.querySelector('.upload-trigger');
        container.querySelectorAll('.img-preview-item').forEach(el => el.remove());
        
        config.recentAvatars.forEach(img => {
            const div = document.createElement('div');
            div.className = `img-preview-item ${config.avatarUrl === img ? 'active' : ''}`;
            div.style.backgroundImage = `url('${img}')`;
            div.style.width = '50px'; div.style.height = '50px'; div.style.borderRadius = '8px';
            div.style.cursor = 'pointer';
            div.style.border = config.avatarUrl === img ? '2px solid var(--admin-red)' : '2px solid transparent';
            
            div.onclick = () => {
                config.avatarUrl = img;
                renderAvatarPicker();
                updatePreview();
                saveConfig();
            };
            container.insertBefore(div, trigger);
        });
    }

    function updatePreview() {
        const title = document.getElementById('previewTitle');
        const sub = document.getElementById('previewSub');
        const avatar = document.getElementById('liveAvatarPreview');
        const bg = document.getElementById('livePreview');

        if (title) { title.innerText = config.siteTitle; title.style.color = config.accentColor; }
        if (sub) { sub.innerText = config.siteSubline; }
        if (avatar) { avatar.style.backgroundImage = `url('${config.avatarUrl}')`; avatar.style.borderColor = config.accentColor; }
        if (bg) { bg.style.backgroundColor = config.bgColor; bg.style.borderColor = config.accentColor + '44'; }

        renderPreviewSocials();
    }

    function renderPreviewSocials() {
        const bg = document.getElementById('livePreview');
        if (!bg) return;

        const oldRow = bg.querySelector('.preview-social-row');
        if (oldRow) oldRow.remove();

        if (!config.socialShowSection) return;

        const row = document.createElement('div');
        row.className = 'preview-social-row';
        row.style.display = 'flex'; row.style.gap = '10px'; row.style.marginTop = '15px'; row.style.justifyContent = 'center';

        const platforms = ['tiktok', 'instagram', 'facebook', 'email'];
        const icons = { tiktok: 'fab fa-tiktok', instagram: 'fab fa-instagram', facebook: 'fab fa-facebook', email: 'fas fa-envelope' };

        platforms.forEach(p => {
            if (config[`social_${p}_show`] && config[`social_${p}_url`]) {
                const icon = document.createElement('i');
                icon.className = icons[p]; icon.style.color = config.accentColor; icon.style.fontSize = '1.2rem';
                row.appendChild(icon);
            }
        });

        if (config.socialPosition === 'top') {
            bg.insertBefore(row, sub);
        } else {
            bg.appendChild(row);
        }
    }

    document.addEventListener('DOMContentLoaded', initDesign);
})();

