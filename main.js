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
  // Project Modal Items (Work Items)
  const workItems = document.querySelectorAll('.work-item');
  const skillItems = document.querySelectorAll('.skill-grid-item, .list-system-item');

  function openModal(item) {
    const isSkill = item.classList.contains('skill-grid-item') || item.classList.contains('list-system-item');
    
    if (isSkill) {
      const id = item.querySelector('.skill-id, .item-id').innerText;
      const name = item.querySelector('.skill-name, .item-label').innerText;
      const desc = item.getAttribute('data-desc');
      const level = parseInt(item.getAttribute('data-level'));
      const engine = item.getAttribute('data-engine') || 'TECHNICAL';
      const rev = item.getAttribute('data-rev') || 'v1.0.0';

      modalImg.parentElement.style.display = 'none'; // Hide project image
      modalId.innerText = id;
      modalTitle.innerText = name;
      modalDesc.innerText = desc;

      // Inject Skill Specs
      const specsArea = modal.querySelector('.modal-text-wrap > div:last-child');
      specsArea.innerHTML = `
        <span class="h-unit">Structural Specs</span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; margin-top: 20px; font-family: var(--mono); font-size: 12px; gap: 20px; margin-bottom: 30px;">
          <div>
            <p style="opacity: 0.6; margin-bottom: 5px;">ENGINE</p>
            <p>${engine}</p>
          </div>
          <div>
            <p style="opacity: 0.6; margin-bottom: 5px;">REV-ID</p>
            <p>${rev}</p>
          </div>
        </div>
      `;

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

      // Restore Project Specs
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
     PREMIUM POLISH: CUSTOM CURSOR LOGIC
     ============================================================ */
  const cursor = document.getElementById('customCursor');

  if (cursor && window.innerWidth > 600) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactives = document.querySelectorAll('a, button, .work-item, #emailClick, .social-icon-link, .list-system-item, .skill-grid-item');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
      });
    });
  }
});
