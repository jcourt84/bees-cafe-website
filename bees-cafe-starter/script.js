const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    menuToggle.textContent = '☰';
  });
});

/* INTERACTIVE CAFE MENU */

const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

function activateMenuTab(selectedTab) {
  menuTabs.forEach(tab => {
    const active = tab === selectedTab;

    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  menuPanels.forEach(panel => {
    panel.hidden = panel.id !==
      selectedTab.getAttribute('aria-controls');
  });
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    activateMenuTab(tab);
  });

  tab.addEventListener('keydown', event => {
    let nextIndex = index;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % menuTabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + menuTabs.length) % menuTabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = menuTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateMenuTab(menuTabs[nextIndex]);
    menuTabs[nextIndex].focus();
  });
});
