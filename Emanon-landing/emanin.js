// Mobile menu toggle - FIXED
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    hamburger.addEventListener('click', function() {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('active');
      
      // Change icon
      const icon = hamburger.querySelector('i');
      if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.header-inner') && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(!href || href === '#') return;
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          const offset = 70;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({top, behavior:'smooth'});
          // close mobile nav
          if(window.innerWidth < 768){
            mobileNav.classList.remove('active');
            hamburger.setAttribute('aria-expanded','false');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      });
    });

    // Testimonials slider
    document.addEventListener('DOMContentLoaded', () => {
      const track = document.querySelector('.testimonials-track');
      const cards = document.querySelectorAll('.testimonial-card');
      const prevBtn = document.getElementById('prevTest');
      const nextBtn = document.getElementById('nextTest');
      const dotsContainer = document.querySelector('.carousel-dots');

      let currentIndex = 0;
      const totalCards = cards.length;
      let cardsPerView = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;

      // Create dots
      const totalDots = Math.ceil(totalCards / cardsPerView);
      for(let i=0;i<totalDots;i++){
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(i===0) dot.classList.add('active');
        dot.dataset.index=i;
        dotsContainer.appendChild(dot);
        dot.addEventListener('click', ()=> {
          currentIndex=i;
          updateCarousel();
        });
      }
      const dots = document.querySelectorAll('.dot');

      function updateCarousel(){
        cardsPerView = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        const moveX = (100 / cardsPerView) * currentIndex;
        track.style.transform = `translateX(-${moveX}%)`;
        dots.forEach(dot=>dot.classList.remove('active'));
        if(dots[currentIndex]) dots[currentIndex].classList.add('active');
      }

      nextBtn.addEventListener('click', ()=>{
        if(currentIndex < totalDots -1) currentIndex++;
        else currentIndex=0;
        updateCarousel();
      });
      prevBtn.addEventListener('click', ()=>{
        if(currentIndex >0) currentIndex--;
        else currentIndex=totalDots-1;
        updateCarousel();
      });

      window.addEventListener('resize', updateCarousel);

      // Auto rotation
      let autoRotate = setInterval(()=>{
        nextBtn.click();
      }, 5000);

      const container = document.querySelector('.testimonials-container');
      container.addEventListener('mouseenter', ()=> clearInterval(autoRotate));
      container.addEventListener('mouseleave', ()=> autoRotate = setInterval(()=>nextBtn.click(),5000));

      updateCarousel();
    });

    // FAQ functionality
    document.addEventListener('DOMContentLoaded', function() {
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
          // Close all other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      });
    });

    // Contact form
    document.querySelector(".contact-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const form = this;
      const msgDiv = document.createElement("div");
      msgDiv.id = "contactMsg";
      msgDiv.style.display = "block";
      msgDiv.innerHTML = "Sending...";
      form.appendChild(msgDiv);

      fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new FormData(form)
      })
      .then(res => res.json())
      .then(data => {
          if(data.success){
              msgDiv.innerHTML = "✅ Message sent successfully!";
              form.reset();
          } else {
              msgDiv.innerHTML = "❌ Something went wrong. Please try again.";
          }
      })
      .catch(() => {
          msgDiv.innerHTML = "❌ Failed to send. Check your internet connection.";
      });
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();