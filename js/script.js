// ==========================================================================
// PORTAFOLIO — ARTURO
// Navegación tipo editor: pestañas activas, scroll-spy, barra de estado
// y menú de explorador en móvil.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const sections   = Array.from(document.querySelectorAll('.code-file'));
  const fileItems  = Array.from(document.querySelectorAll('.file-item'));
  const tabs       = Array.from(document.querySelectorAll('.tab'));
  const statusFile = document.getElementById('statusFile');
  const statusLine = document.getElementById('statusLine');
  const statusLang = document.getElementById('statusLang');

  const LANG_BY_ID = {
    'sobre-mi':    { file: 'sobre-mi.js',      lang: 'JavaScript' },
    'habilidades': { file: 'habilidades.json', lang: 'JSON' },
    'servicios':   { file: 'servicios.md',     lang: 'Markdown' },
    'proyectos':   { file: 'proyectos.html',   lang: 'HTML' },
    'contacto':    { file: 'contacto.sh',      lang: 'Shell Script' },
  };

  function setActive(id){
    fileItems.forEach(el => el.classList.toggle('active', el.dataset.target === id));
    tabs.forEach(el => el.classList.toggle('active', el.dataset.target === id));

    const info = LANG_BY_ID[id];
    if (info){
      statusFile.textContent = info.file;
      statusLang.textContent = info.lang;
    }
  }

  // --- Scroll-spy: detecta qué sección está visible y actualiza pestaña/sidebar/status bar ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  });

  sections.forEach(section => observer.observe(section));

  // --- Click en pestañas: hace scroll a la sección correspondiente ---
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.getElementById(tab.dataset.target);
      if (target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Menú de explorador en móvil ---
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('explorerToggle');

  if (toggle && sidebar){
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // cerrar el explorador al elegir un archivo en móvil
    fileItems.forEach(item => {
      item.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });
    });

    // cerrar al hacer click fuera del sidebar
    document.addEventListener('click', (e) => {
      const isInsideSidebar = sidebar.contains(e.target);
      const isToggle = toggle.contains(e.target);
      if (!isInsideSidebar && !isToggle){
        sidebar.classList.remove('open');
      }
    });
  }

  // --- Número de línea aproximado en la barra de estado, según scroll ---
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking){
      window.requestAnimationFrame(() => {
        const line = Math.max(1, Math.round(window.scrollY / 24) % 400);
        statusLine.textContent = line;
        ticking = false;
      });
      ticking = true;
    }
  });

  setActive('sobre-mi');
});
