/* ========================================
   FEI - ENGENHARIA DE INTENÇÃO
   App JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ========================================
     REMOVE PRELOAD CLASS
     ======================================== */
  // Remove preload class after page load to enable transitions
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 100);


  /* ========================================
     DARK MODE TOGGLE
     ======================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  // Load saved theme preference
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    html.classList.add('dark');
    updateThemeIcon(true);
  } else if (currentTheme === 'light') {
    html.classList.remove('dark');
    updateThemeIcon(false);
  } else {
    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateThemeIcon(true);
    } else {
      updateThemeIcon(false);
    }
  }

  // Toggle on click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = html.classList.toggle('dark');
      const newTheme = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (darkIcon && lightIcon) {
      if (isDark) {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
      }
    }
  }


  /* ========================================
     MOBILE MENU TOGGLE
     ======================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }


  /* ========================================
     TOPIC EXPANSION SYSTEM (FEP Pattern - Compact)
     ======================================== */
  // Toggle topic explanations using event delegation
  document.addEventListener('click', function(e) {
    const topicButton = e.target.closest('.topic-button');

    if (topicButton) {
      const topicItem = topicButton.closest('.topic-item');
      const explanation = topicItem.querySelector('.topic-explanation');

      if (explanation) {
        const wasHidden = explanation.classList.contains('hidden');

        // Close all other topics in the same chapter (accordion behavior)
        const chapterCard = topicItem.closest('.chapter-card');
        if (chapterCard) {
          chapterCard.querySelectorAll('.topic-explanation').forEach(exp => {
            exp.classList.add('hidden');
          });
        }

        // Toggle current topic
        if (wasHidden) {
          explanation.classList.remove('hidden');
        }
      }
    }
  });


  /* ========================================
     SMOOTH SCROLL
     ======================================== */
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});


/* ========================================
   MODAL SYSTEM
   ======================================== */

// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Event listeners for modals
document.addEventListener('click', function(e) {
  // Close on X button
  if (e.target.classList.contains('close-modal')) {
    const modal = e.target.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // Close on backdrop click
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});
