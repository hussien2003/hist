// اختيار العناصر من DOM
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// التعامل مع التمرير لتفعيل الروابط
window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150; // تعديل الفارق لتعويض المسافة
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      // تصحيح السطر التالي
      document.querySelector(`header nav a[href="#${id}"]`).classList.add('active');
    }
  });

  // عند التمرير، يمكن أيضًا إخفاء القائمة إذا كانت ظاهرة
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// تفعيل قائمة التنقل عند النقر على أيقونة القائمة
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// تحريك البطاقات بشكل أفقي تلقائي
let testimonials = document.querySelector('.testimonials');
let boxes = document.querySelectorAll('.testimonials-box');
let totalWidth = 0;

// حساب العرض الكلي لجميع البطاقات
boxes.forEach(box => {
    totalWidth += box.offsetWidth + 20; // إضافة 20px لتباعد البطاقات
});

// تعيين مدة الحركة
let scrollDuration = 10; // بالثواني (يمكنك تعديل السرعة)

// وظيفة التمرير
function autoScroll() {
    testimonials.scrollLeft += 1;
    if (testimonials.scrollLeft >= totalWidth) {
        testimonials.scrollLeft = 0; // إذا وصلنا إلى نهاية البطاقات نعود للبداية
    }
}

// إنشاء IntersectionObserver لمراقبة الوصول إلى القسم
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // عندما يظهر القسم في العرض، يتم تفعيل الحركة
            setInterval(autoScroll, (scrollDuration * 1000) / totalWidth);
        }
    });
}, { threshold: 0.5 }); // 50% من القسم يجب أن يكون مرئيًا

// مراقبة القسم الذي يحتوي على البطاقات
observer.observe(testimonials);
