/**
 * IVAN AFFRIANDI — PORTFOLIO
 * Digital Architecture // SYST-01 — Interaction script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ============================================================
     LIVE WIB CLOCK (FOOTER)
     ============================================================ */
  const footerClock = document.getElementById('footerClock');

  function updateClock() {
    if (!footerClock) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    footerClock.textContent = now.toLocaleTimeString('en-GB', options);
  }

  function updateDate() {
    const heroDate = document.getElementById('heroDate');
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const dateStr = `${y}.${m}.${d}`;
    
    if (heroDate) {
      heroDate.textContent = dateStr;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();
  updateDate();



  /* ============================================================
     CLICK FEEDBACK
     ============================================================ */
  const interactive = document.querySelectorAll('a, .work-item');
  interactive.forEach(el => {
    el.addEventListener('mousedown', () => {
      el.style.transform = "scale(0.99)";
    });
    el.addEventListener('mouseup', () => {
      el.style.transform = "scale(1)";
    });
  });

  /* ============================================================
     PROJECT MODAL LOGIC
     ============================================================ */
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalId = document.getElementById('modalId');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModalBtn = document.getElementById('closeModal');
  const workItems = document.querySelectorAll('.work-item');

  function openModal(item) {
    const isSkill = item.classList.contains('skill-grid-item');
    
    if (isSkill) {
      const id = item.querySelector('.skill-meta span:first-child').innerText;
      const name = item.querySelector('.skill-name').innerText;
      const desc = item.getAttribute('data-desc');
      const level = item.getAttribute('data-level');

      modalImg.parentElement.style.display = 'none'; // Hide project image
      modalId.innerText = id;
      modalTitle.innerText = name;
      modalDesc.innerText = desc;

      // Inject Skill Bar
      const specsArea = modal.querySelector('.modal-text-wrap > div:last-child');
      specsArea.innerHTML = `
        <span class="h-unit">EXPERTISE LEVEL</span>
        <div class="skill-bar-wrap">
          <div class="skill-bar">
            <div class="skill-bar-fill" style="width: 0%"></div>
          </div>
          <span class="skill-percent">${level}%</span>
        </div>
      `;

      setTimeout(() => {
        const fill = modal.querySelector('.skill-bar-fill');
        if (fill) fill.style.width = level + '%';
      }, 100);

    } else {
      // Original Project Modal Logic
      const img = item.querySelector('img').src;
      const id = item.querySelector('.skill-id').innerText;
      const title = item.querySelector('.skill-name').innerText;
      const desc = item.querySelector('.work-detail-hidden').innerHTML;

      modalImg.parentElement.style.display = 'block'; // Show project image
      modalImg.src = img;
      modalId.innerText = id;
      modalTitle.innerText = title;
      modalDesc.innerHTML = desc;

      // Restore Project Specs if overwritten
      const specsArea = modal.querySelector('.modal-text-wrap > div:last-child');
      specsArea.innerHTML = `
        <span class="h-unit">Structural Specs</span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; margin-top: 20px; font-family: var(--mono); font-size: 12px; gap: 20px;">
          <div>
            <p style="opacity: 0.6; margin-bottom: 5px;">STATUS</p>
            <p>DEPLOYED // ACTIVE</p>
          </div>
          <div>
            <p style="opacity: 0.6; margin-bottom: 5px;">ENGINE</p>
            <p>LIQUID / CANVAS</p>
          </div>
        </div>
      `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; 
  }

  // Work Items
  workItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(item);
    });
  });

  // Skill Items
  const skillItems = document.querySelectorAll('.skill-grid-item');
  skillItems.forEach(item => {
    item.addEventListener('click', () => {
      openModal(item);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  /* ============================================================
     MECHANICAL CARD STACKS LOGIC
     ============================================================ */
  function initializeCardStacks() {
    const stacks = document.querySelectorAll('.js-card-stack');
    
    stacks.forEach(stack => {
      let cards = Array.from(stack.querySelectorAll('.skill-card'));
      
      function updateStack() {
        cards.forEach((card, index) => {
          // Reset classes
          card.classList.remove('is-moving');
          
          // Set visual properties based on index
          // Only show up to 4 cards in the visual deck
          if (index < 4) {
            card.style.zIndex = 4 - index;
            card.style.transform = `translate(${index * 8}px, ${index * 8}px)`;
            card.style.opacity = 1;
            card.style.pointerEvents = index === 0 ? 'auto' : 'none';
          } else {
            card.style.zIndex = 0;
            card.style.transform = `translate(32px, 32px)`;
            card.style.opacity = 0;
            card.style.pointerEvents = 'none';
          }
        });
      }

      stack.addEventListener('click', (e) => {
        const topCard = cards[0];
        if (!topCard || topCard.classList.contains('is-moving')) return;

        // Animate top card out
        topCard.classList.add('is-moving');
        
        setTimeout(() => {
          // Move top card to the back of the array
          const movedCard = cards.shift();
          cards.push(movedCard);
          
          // Refresh the stack visuals
          updateStack();
        }, 500); // Match CSS transition duration
      });

      // Initial positioning
      updateStack();
    });
  }

  initializeCardStacks();

  /* ============================================================
     PREMIUM POLISH: CUSTOM CURSOR LOGIC
     ============================================================ */
  const cursor = document.getElementById('customCursor');

  if (cursor && window.innerWidth > 600) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactives = document.querySelectorAll('a, button, .work-item, #emailClick, .social-icon-link, .skill-card, .skill-grid-item');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
      });
    });

    // Scroll Progress Tracking
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = winScroll / height;
        progressBar.style.transform = `scaleX(${scrolled})`;
      });
    }
  }
});
