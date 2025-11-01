(function(){
  const nav = document.querySelector('.nav-links');
  const burger = document.querySelector('.hamburger');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      burger.setAttribute('aria-expanded', String(!open));
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth < 720 && nav) nav.style.display = 'none';
      }
    });
  });

  // Demo form handler
  const form = document.getElementById('demo-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (document.getElementById('email') || {}).value || '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = 'Please enter a valid email.';
        note.style.color = '#fca5a5';
        return;
      }
      try {
        const list = JSON.parse(localStorage.getItem('ps_demo_requests')||'[]');
        list.push({ email, ts: Date.now() });
        localStorage.setItem('ps_demo_requests', JSON.stringify(list));
      } catch {}
      note.textContent = 'Thanks! We\'ll reach out shortly.';
      note.style.color = '#a7f3d0';
      form.reset();
    });
  }

  // Profile mini?demo
  const saveBtn = document.getElementById('save-profile');
  const savedNote = document.querySelector('.saved-note');
  const profileForm = document.getElementById('demo-profile');
  if (saveBtn && profileForm) {
    saveBtn.addEventListener('click', () => {
      const data = Object.fromEntries(new FormData(profileForm));
      try { localStorage.setItem('ps_profile', JSON.stringify(data)); } catch {}
      if (savedNote) {
        savedNote.textContent = 'Profile saved locally for demo.';
        setTimeout(() => savedNote.textContent = '', 2500);
      }
    });
  }
})();
