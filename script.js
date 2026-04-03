// تشغيل مكتبة الأنيميشن
// AOS (Animate On Scroll) لتأثيرات الظهور عند التمرير
AOS.init({
    duration: 1000, // مدة الأنيميشن بالملي ثانية
    once: true, // هل يعمل الأنيميشن مرة واحدة فقط؟
    offset: 100 // الإزاحة بالبكسل لبدء الأنيميشن
});

// نظام الفلترة لمعرض الأعمال
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // تغيير الزر النشط (إزالة Active من القديم وإضافته للجديد)
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter'); // جلب قيمة الفلتر

        projectCards.forEach(card => {
            // التحقق من الفلتر أو عرض الكل
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block'; // عرض العنصر
                // إضافة تأخير بسيط لتأثير الانتقال
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0'; // إخفاء العنصر (شفافية)
                // إخفاء العنصر تماماً بعد انتهاء تأثير الانتقال
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});
