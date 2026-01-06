 // Initialize AOS Animation
 AOS.init({
     duration: 800,
     easing: 'ease-in-out',
     once: true,
     offset: 100
 });

 // Header scroll effect
 window.addEventListener('scroll', function() {
     const header = document.getElementById('header');
     if (window.scrollY > 50) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
 });

 // Mobile Menu Toggle
 const menuToggle = document.querySelector('.menu-toggle');
 const navLinks = document.querySelector('.nav-links');

 menuToggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
     menuToggle.innerHTML = navLinks.classList.contains('active') ?
         '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
 });

 // Close mobile menu when clicking on a link
 document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
         menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
     });
 });

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();

         const targetId = this.getAttribute('href');
         if (targetId === '#') return;

         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
         }
     });
 });

 // Testimonial Slider
 const slides = document.querySelectorAll('.testimonial-slide');
 const dots = document.querySelectorAll('.slider-dot');
 let currentSlide = 0;

 function showSlide(index) {
     slides.forEach(slide => slide.classList.remove('active'));
     dots.forEach(dot => dot.classList.remove('active'));

     slides[index].classList.add('active');
     dots[index].classList.add('active');
     currentSlide = index;
 }

 dots.forEach((dot, index) => {
     dot.addEventListener('click', () => showSlide(index));
 });

 // Auto slide change
 setInterval(() => {
     currentSlide = (currentSlide + 1) % slides.length;
     showSlide(currentSlide);
 }, 5000);

 // Back to Top Button
 const backToTopBtn = document.querySelector('.back-to-top');

 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         backToTopBtn.classList.add('active');
     } else {
         backToTopBtn.classList.remove('active');
     }
 });

 backToTopBtn.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // Inicializa EmailJS
 emailjs.init('MyX2lX-jzFOJ6hvYy');

 const contactForm = document.getElementById('contactForm');

 contactForm.addEventListener('submit', function(e) {
     e.preventDefault();

     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const subject = document.getElementById('subject').value;
     const message = document.getElementById('message').value;

     const submitBtn = contactForm.querySelector('button[type="submit"]');
     submitBtn.disabled = true;
     submitBtn.textContent = 'Enviando...';

     // Envía el email
     emailjs.send(
             'service_pjdw59t',
             'template_m8x70rl', {
                 name: name,
                 email: email,
                 subject: subject,
                 message: message,
             }
         )
         .then(() => {
             alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
             contactForm.reset();
             submitBtn.disabled = false;
             submitBtn.textContent = 'Enviar Mensaje';
         })
         .catch((err) => {
             alert('Error al enviar: ' + err.text);
             submitBtn.disabled = false;
             submitBtn.textContent = 'Enviar Mensaje';
         });
 });