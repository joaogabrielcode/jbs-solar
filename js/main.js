(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const services = [...document.querySelectorAll('[data-service-item]')].map((item) => {
    // Native grouping remains available without JavaScript. Enhanced grouping
    // lets the outgoing panel finish its closing animation.
    item.removeAttribute('name');
    const state = {
      item,
      summary: item.querySelector('summary'),
      content: item.querySelector('.service-content'),
      expanded: item.open,
      animation: null,
    };
    state.summary.setAttribute('aria-expanded', String(state.expanded));
    return state;
  });

  const setServiceExpanded = (state, expanded) => {
    const { item, summary, content } = state;
    const startHeight = item.getBoundingClientRect().height;
    if (state.animation) {
      state.animation.cancel();
      state.animation = null;
    }
    state.expanded = expanded;
    summary.setAttribute('aria-expanded', String(expanded));
    item.toggleAttribute('data-closing', !expanded);
    if (!expanded && content.contains(document.activeElement)) summary.focus({ preventScroll: true });
    content.inert = !expanded;

    const finish = () => {
      item.open = expanded;
      item.style.removeProperty('overflow');
      item.removeAttribute('data-closing');
      state.animation = null;
    };
    if (motionPreference.matches || !item.animate) {
      finish();
      return;
    }

    item.open = true;
    const endHeight = expanded ? item.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
    item.style.overflow = 'hidden';
    const animation = item.animate([
      { height: `${startHeight}px` },
      { height: `${endHeight}px` },
    ], { duration: 250, easing: 'cubic-bezier(.2, .7, .2, 1)' });
    state.animation = animation;
    animation.onfinish = () => {
      if (state.animation === animation) finish();
    };
  };

  const openService = (state) => {
    services.forEach((other) => {
      if (other !== state && other.expanded) setServiceExpanded(other, false);
    });
    setServiceExpanded(state, true);
  };

  services.forEach((state) => {
    state.summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (state.expanded) setServiceExpanded(state, false);
      else openService(state);
    });
  });

  const openLinkedService = () => {
    const state = services.find(({ item }) => `#${item.id}` === window.location.hash);
    if (state && !state.expanded) openService(state);
  };
  openLinkedService();
  window.addEventListener('hashchange', openLinkedService);

  const finishServiceAnimations = () => {
    services.forEach((state) => {
      if (state.animation) state.animation.finish();
    });
  };
  window.addEventListener('resize', finishServiceAnimations);

  const reveals = document.querySelectorAll('.reveal');
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      let serviceIndex = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.matches('[data-service-item]')) {
          entry.target.style.setProperty('--reveal-delay', `${Math.min(serviceIndex++, 3) * 60}ms`);
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((element) => observer.observe(element));
  }

  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches) return;
    finishServiceAnimations();
    reveals.forEach((element) => element.classList.add('is-visible'));
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
