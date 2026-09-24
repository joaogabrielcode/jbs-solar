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

  const quoteForm = document.querySelector('[data-quote-form]');
  if (quoteForm) {
    const feedback = quoteForm.querySelector('[data-form-feedback]');
    quoteForm.addEventListener('invalid', (event) => event.target.setAttribute('aria-invalid', 'true'), true);
    quoteForm.addEventListener('input', (event) => {
      if (event.target.checkValidity()) event.target.removeAttribute('aria-invalid');
    });
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;

      const formData = new FormData(quoteForm);
      const observation = String(formData.get('message') || '').trim();
      const lines = [
        'Olá, JBS Solar! Gostaria de solicitar um orçamento.',
        '',
        `Nome: ${String(formData.get('name')).trim()}`,
        `WhatsApp: ${String(formData.get('whatsapp')).trim()}`,
        `Cidade: ${String(formData.get('city')).trim()}`,
        `Tipo de cliente: ${String(formData.get('clientType')).trim()}`,
        `Serviço de interesse: ${String(formData.get('service')).trim()}`,
        `Valor médio da conta: ${String(formData.get('energyBill')).trim()}`,
      ];
      if (observation) lines.push(`Observação: ${observation}`);

      const whatsappUrl = `https://wa.me/558481479896?text=${encodeURIComponent(lines.join('\n'))}`;
      const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!whatsappWindow && feedback) feedback.textContent = 'Permita pop-ups para abrir o WhatsApp.';
    });
  }

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const services = [...document.querySelectorAll('[data-service-item]')];
  const serviceDialog = document.querySelector('[data-service-dialog]');
  const dialogTitle = serviceDialog?.querySelector('[data-service-dialog-title]');
  const dialogNumber = serviceDialog?.querySelector('[data-service-dialog-number]');
  const dialogContent = serviceDialog?.querySelector('[data-service-dialog-content]');
  let lastServiceTrigger = null;

  const closeServiceDialog = () => {
    if (!serviceDialog?.open) return;
    serviceDialog.close();
  };

  const openService = (item, trigger = null) => {
    if (!serviceDialog || !dialogTitle || !dialogNumber || !dialogContent) return;
    const title = item.querySelector('.service-title');
    const number = item.querySelector('.service-number');
    const content = item.querySelector('.service-content');
    if (!title || !number || !content) return;
    dialogTitle.textContent = title.textContent;
    dialogNumber.textContent = number.textContent;
    dialogContent.innerHTML = content.innerHTML;
    lastServiceTrigger = trigger;
    if (serviceDialog.open) serviceDialog.close();
    serviceDialog.showModal();
  };

  services.forEach((item) => {
    const trigger = item.querySelector('[data-service-open]');
    trigger?.addEventListener('click', () => openService(item, trigger));
  });

  serviceDialog?.querySelector('[data-service-close]')?.addEventListener('click', closeServiceDialog);
  serviceDialog?.addEventListener('click', (event) => {
    if (event.target === serviceDialog) closeServiceDialog();
  });
  serviceDialog?.addEventListener('close', () => {
    if (lastServiceTrigger) lastServiceTrigger.focus({ preventScroll: true });
  });

  const openLinkedService = () => {
    const item = services.find((service) => `#${service.id}` === window.location.hash);
    if (item) openService(item);
  };
  openLinkedService();
  window.addEventListener('hashchange', openLinkedService);

  const accordionItems = [...document.querySelectorAll('.accordion details')];
  const setAccordionExpanded = (item, expanded) => {
    const summary = item.querySelector('summary');
    const content = item.querySelector('p');
    if (!summary || !content) return;
    if (item._motion) item._motion.cancel();
    summary.setAttribute('aria-expanded', String(expanded));
    if (motionPreference.matches || !item.animate) {
      item.open = expanded;
      content.style.removeProperty('opacity');
      content.style.removeProperty('overflow');
      item.style.removeProperty('height');
      item.style.removeProperty('overflow');
      return;
    }

    const startHeight = item.getBoundingClientRect().height;
    item.open = true;
    const endHeight = expanded ? item.getBoundingClientRect().height : summary.getBoundingClientRect().height;
    item.style.overflow = 'hidden';
    content.style.overflow = 'hidden';
    const heightMotion = item.animate([
      { height: `${startHeight}px` },
      { height: `${endHeight}px` },
    ], { duration: 260, easing: 'cubic-bezier(.2, .7, .2, 1)' });
    const contentMotion = content.animate([
      { opacity: expanded ? 0 : 1 },
      { opacity: expanded ? 1 : 0 },
    ], { duration: 190, easing: 'ease-out' });
    item._motion = heightMotion;
    heightMotion.onfinish = () => {
      item.open = expanded;
      item.style.removeProperty('height');
      item.style.removeProperty('overflow');
      content.style.removeProperty('opacity');
      content.style.removeProperty('overflow');
      item._motion = null;
    };
    contentMotion.onfinish = () => contentMotion.cancel();
  };

  accordionItems.forEach((item) => {
    const summary = item.querySelector('summary');
    summary?.setAttribute('aria-expanded', String(item.open));
    summary?.addEventListener('click', (event) => {
      event.preventDefault();
      setAccordionExpanded(item, !item.open);
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      let serviceIndex = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.matches('[data-service-item]')) {
          entry.target.style.setProperty('--reveal-delay', `${Math.min(serviceIndex++, 6) * 70}ms`);
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((element) => observer.observe(element));
  }

  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches) return;
    reveals.forEach((element) => element.classList.add('is-visible'));
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
