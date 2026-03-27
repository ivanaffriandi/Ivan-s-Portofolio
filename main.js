document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ============================================================
     LIVE WIB CLOCK (FOOTER & MENU & DASHBOARD)
     ============================================================ */
  function updateClock() {
    const clocks = document.querySelectorAll('#footerClock, #menuClock');
    if (clocks.length === 0) return;
    
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = now.toLocaleTimeString('en-GB', options);
    
    clocks.forEach(clock => {
      clock.textContent = timeStr;
    });
  }

  function updateDate() {
    const heroDate = document.getElementById('heroDate');
    if (!heroDate) return;
    
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const dateStr = `${y}.${m}.${d}`;

    heroDate.textContent = dateStr;
  }

  setInterval(updateClock, 1000);
  updateClock();
  updateDate();

  /* ============================================================
     MENU OVERLAY LOGIC
     ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenu = document.getElementById('closeMenu');

  if (menuToggle && menuOverlay && closeMenu) {
    menuToggle.addEventListener('click', () => {
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  /* ============================================================
     BLOG / JOURNAL LOADER (ENRICHED CMS)
     ============================================================ */
  const blogTimeline = document.getElementById('blogTimeline');
  const blogModal = document.getElementById('blogModal');
  const closeBlogModal = document.getElementById('closeBlogModal');

  if (blogTimeline && blogModal) {
    let allPosts = [];

    async function initBlog() {
      try {
        const response = await fetch('logs.json');
        if (!response.ok) throw new Error('Network response was not ok');
        allPosts = await response.json();
        renderBlog(allPosts);
      } catch (error) {
        console.warn('CORS or Fetch Error, using fallback data:', error);
        allPosts = [
          {
            "id": "BLOG-01",
            "date": "2026.03.27",
            "category": "thoughts",
            "readTime": "5 MIN",
            "tags": ["MINIMALISM", "REFLECTION"],
            "image": "/Users/ivanaffriandi/.gemini/antigravity/brain/fe4c50df-d4ac-4278-89fc-1868952e648e/journal_lifestyle_architecture_city_1774610799717.png",
            "title": "Local System // Manual Override",
            "summary": "Journal data loaded via manual override for local file system access. Exploring the geometry of peace.",
            "content": "### The Geometry of Peace\n\nReturning to raw data structures ensures elegance and performance. Integrating a **JSON-based content engine** allows for rapid deployment without the overhead of a traditional backend."
          }
        ];
        renderBlog(allPosts);
      }
    }

    function renderBlog(posts) {
      blogTimeline.innerHTML = '<div class="timeline-spine"></div>';
      if (posts.length === 0) {
        blogTimeline.innerHTML += '<div class="log-empty" style="padding: 100px; text-align: center; width: 100%;">ZERO_POSTS_FOUND_IN_BUFFER</div>';
        return;
      }

      posts.forEach((post, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'right' : 'left'}`;
        
        item.innerHTML = `
          <div class="timeline-node">[ ${post.date} ]</div>
          <div class="timeline-card">
            <div class="timeline-card-image">
              <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="timeline-card-content">
              <span class="timeline-tag">${post.category}</span>
              <h3 class="timeline-card-title">${post.title}</h3>
              <p class="timeline-card-summary">${post.summary}</p>
            </div>
          </div>
        `;

        item.querySelector('.timeline-card').addEventListener('click', () => openPost(post));
        blogTimeline.appendChild(item);
      });
      
      updateInteractiveFeedback();
    }

    function openPost(post) {
      document.getElementById('postCategory').textContent = post.category.toUpperCase();
      document.getElementById('postTitle').textContent = post.title;
      document.getElementById('postId').textContent = post.id;
      document.getElementById('postDate').textContent = post.date;
      document.getElementById('postReadTime').textContent = post.readTime;
      document.getElementById('postImage').src = post.image;
      
      // Parse Markdown
      const contentArea = document.getElementById('postContent');
      if (typeof marked !== 'undefined') {
        contentArea.innerHTML = marked.parse(post.content);
      } else {
        contentArea.textContent = post.content;
      }

      // Tags
      const tagsArea = document.getElementById('postTags');
      tagsArea.innerHTML = post.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

      blogModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeBlogModal.addEventListener('click', () => {
      blogModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Filter Logic
    const filterItems = document.querySelectorAll('.filter-item');
    filterItems.forEach(filter => {
      filter.addEventListener('click', () => {
        filterItems.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        const cat = filter.getAttribute('data-filter');
        const filtered = cat === 'all' ? allPosts : allPosts.filter(p => p.category === cat);
        renderBlog(filtered);
      });
    });

    initBlog();
  }

  function updateInteractiveFeedback() {
    const interactive = document.querySelectorAll('a, .work-item, .menu-toggle-btn, .blog-card, .filter-item');
    interactive.forEach(el => {
      // Avoid duplicate listeners
      if (el.dataset.listenerAttached) return;
      el.dataset.listenerAttached = "true";

      el.addEventListener('mousedown', () => {
        el.style.transform = "scale(0.98)";
      });
      el.addEventListener('mouseup', () => {
        el.style.transform = "scale(1)";
      });
      
      if (typeof cursor !== 'undefined' && cursor) {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
      }
    });
  }

  /* ============================================================
     SCROLL PROGRESS LOGIC
     ============================================================ */
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.height = scrolled + "%";
    });
  }

  /* ============================================================
     CLICK FEEDBACK
     ============================================================ */
  const interactive = document.querySelectorAll('a, .work-item, .menu-toggle-btn, .journal-item');
  interactive.forEach(el => {
    el.addEventListener('mousedown', () => {
      el.style.transform = "scale(0.98)";
    });
    el.addEventListener('mouseup', () => {
      el.style.transform = "scale(1)";
    });
  });

  /* ============================================================
     PROJECT MODAL LOGIC (PORTFOLIO PAGE ONLY)
     ============================================================ */
  const modal = document.getElementById('projectModal');
  if (modal) {
    const modalImg = document.getElementById('modalImg');
    const modalId = document.getElementById('modalId');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModalBtn = document.getElementById('closeModal');
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

        modalImg.parentElement.style.display = 'none';
        modalId.innerText = id;
        modalTitle.innerText = name;
        modalDesc.innerText = desc;

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

        // (Expertise loader code omitted for brevity but should be kept if needed elsewhere)

      } else {
        const img = item.querySelector('img').src;
        const id = item.querySelector('.skill-id').innerText;
        const title = item.querySelector('.skill-name').innerText;
        const desc = item.querySelector('.work-detail-hidden').innerHTML;

        modalImg.parentElement.style.display = 'block';
        modalImg.src = img;
        modalId.innerText = id;
        modalTitle.innerText = title;
        modalDesc.innerHTML = desc;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    workItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(item);
      });
    });

    skillItems.forEach(item => {
      item.addEventListener('click', () => openModal(item));
    });

    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  /* ============================================================
     PREMIUM POLISH: CUSTOM CURSOR LOGIC
     ============================================================ */
  const cursor = document.getElementById('customCursor');

  if (cursor && window.innerWidth > 600) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const updateInteractives = () => {
      const interactives = document.querySelectorAll('a, button, .work-item, .menu-toggle-btn, .list-system-item, .skill-grid-item, .journal-item');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
      });
    };
    updateInteractives();
  }
});
