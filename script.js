// 1. تحميل مكتبة يوتيوب API أولاً
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player; // متغير لحفظ المشغل

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.category-link');
    const blocks = document.querySelectorAll('.content-block');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');
    const videoOverlay = document.getElementById('videoOverlay');
    const playerContainer = document.getElementById('player-container');
    const closeVideo = document.getElementById('closeVideo');

    let lastScrollY = window.scrollY;

    // 1. إخفاء/إظهار زر الأقسام عند السكرول
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768 && !sidebar.classList.contains('is-open')) {
            if (window.scrollY > lastScrollY && window.scrollY > 80) {
                toggleBtn.style.transform = 'translateY(-100px)';
                toggleBtn.style.opacity = '0';
            } else {
                toggleBtn.style.transform = 'translateY(0)';
                toggleBtn.style.opacity = '1';
            }
        }
        lastScrollY = window.scrollY;
    });

    // 2. تبديل الأقسام
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-content');
            links.forEach(l => l.classList.remove('active'));
            blocks.forEach(b => b.classList.remove('active-content'));
            link.classList.add('active');
            const targetBlock = document.getElementById('content-' + target);
            if(targetBlock) targetBlock.classList.add('active-content');
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('is-open');
                overlay.classList.remove('is-open');
                toggleBtn.style.opacity = '1';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. التحكم في السايدبار
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.add('is-open');
        overlay.classList.add('is-open');
        toggleBtn.style.opacity = '0';
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-open');
        toggleBtn.style.opacity = '1';
    });

    // 4. تشغيل الفيديو (التعديل المطلوب للقفل التلقائي)
    document.querySelectorAll('.video-placeholder').forEach(p => {
        p.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            videoOverlay.style.display = 'flex';
            
            // تنظيف المكان لعمل المشغل
            playerContainer.innerHTML = '<div id="yt-player"></div>';
            
            player = new YT.Player('yt-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'vq': 'hd1080',
                    'enablejsapi': 1
                },
                events: {
                    'onStateChange': function(event) {
                        // حالة 0 تعني نهاية الفيديو
                        if (event.data === YT.PlayerState.ENDED) {
                            closeAll();
                        }
                    }
                }
            });
        });
    });

    const closeAll = () => {
        videoOverlay.style.display = 'none';
        if (player && player.destroy) {
            player.destroy(); // حذف الفيديو تماماً عشان ميتقلش الموقع
        }
        playerContainer.innerHTML = '';
    };

    closeVideo.addEventListener('click', closeAll);
    videoOverlay.addEventListener('click', (e) => { if(e.target === videoOverlay) closeAll(); });

    // 5. اللودر
    window.onload = () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
        }, 1500);
    };
});
