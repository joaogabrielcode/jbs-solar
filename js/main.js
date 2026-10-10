(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const sectionLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const navSections = sectionLinks.map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) })).filter(({ section }) => section);
  let headerFrame = null;
  const desktopHeader = window.matchMedia('(min-width: 961px)');
  const headerContacts = header?.querySelector('.header-contacts');

  const updateHeader = () => {
    const compact = window.scrollY >= 100;
    header?.classList.toggle('is-compact', compact);
    document.documentElement.classList.toggle('header-compact', compact);
    if (headerContacts) headerContacts.inert = !desktopHeader.matches;
  };

  const updateActiveLink = () => {
    headerFrame = null;
    const threshold = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 40;
    const active = navSections.filter(({ section }) => section.getBoundingClientRect().top <= threshold)
      .sort((a, b) => b.section.getBoundingClientRect().top - a.section.getBoundingClientRect().top)[0] || navSections[0];
    sectionLinks.forEach((link) => {
      if (link === active?.link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !nav) return;
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus && wasOpen) menuButton.focus();
  };

  updateHeader();
  updateActiveLink();
  const updateNavigation = () => { updateHeader(); updateActiveLink(); };
  window.addEventListener('scroll', () => {
    if (headerFrame === null) headerFrame = requestAnimationFrame(updateNavigation);
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('load', updateNavigation);

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu(true);
      if (event.key === 'Tab' && menuButton.getAttribute('aria-expanded') === 'true') {
        const controls = [...header.querySelectorAll('a, button')].filter((element) => element.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('resize', () => {
      if (desktopHeader.matches) closeMenu();
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
    dialogTitle.textContent = item.dataset.serviceModalTitle || title.textContent;
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

  const presenceMapElement = document.querySelector('[data-map-status]')?.closest('.presence-section')?.querySelector('#presence-map');
  const presenceStatus = document.querySelector('[data-map-status]');
  const presenceFilters = [...document.querySelectorAll('[data-map-filter]')];
  const presenceLocations = [
    { name: 'Macau', type: 'filial', lat: -5.115, lng: -36.635, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Guamaré', type: 'projeto', lat: -5.109, lng: -36.322, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Pendências', type: 'filial', lat: -5.260, lng: -36.722, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Alto do Rodrigues', type: 'filial', lat: -5.288, lng: -36.763, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Carnaubais', type: 'projeto', lat: -5.347, lng: -36.839, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Ipanguaçu', type: 'projeto', lat: -5.498, lng: -36.855, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Assú', type: 'projeto', lat: -5.577, lng: -36.915, hasProjects: true, address: '', mapsUrl: '' },
    { name: 'Itajá', type: 'projeto', lat: -5.638, lng: -36.871, hasProjects: true, address: '', mapsUrl: '' },
    // Centro da localidade: https://www.openstreetmap.org/node/416654197
    { name: 'Diogo Lopes', type: 'projeto', lat: -5.082597, lng: -36.463045, hasProjects: true, address: '', mapsUrl: '' },
    // Sede municipal (5°07′30″S, 35°38′20″O): https://www.site.saomigueldogostoso.rn.gov.br/pages/localizacao
    { name: 'São Miguel do Gostoso', type: 'filial', lat: -5.125, lng: -35.638889, hasProjects: true, address: '', mapsUrl: '' },
  ];

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]));

  const popupMarkup = (location) => {
    if (location.type === 'filial') {
      const unitName = location.name === 'Macau' ? 'Sede JBS Solar' : 'Unidade JBS Solar';
      const address = location.address ? `<p class="presence-popup__address">${escapeHtml(location.address)}</p>` : '';
      const directions = location.mapsUrl ? `<a class="presence-popup__link" href="${escapeHtml(location.mapsUrl)}" target="_blank" rel="noopener noreferrer">Como chegar ↗</a>` : '';
      return `<p class="presence-popup__eyebrow">Filial</p><h3 class="presence-popup__title">${escapeHtml(location.name)}</h3><p class="presence-popup__text">${unitName}</p>${address}${directions}`;
    }
    return `<p class="presence-popup__eyebrow">Projeto / atuação</p><h3 class="presence-popup__title">${escapeHtml(location.name)}</h3><p class="presence-popup__text">Atuação da JBS Solar nesta região.</p>`;
  };

  const listLocations = (kind) => presenceLocations.filter((location) => kind === 'filiais' ? location.type === 'filial' : location.hasProjects);
  document.querySelectorAll('[data-location-list]').forEach((list) => {
    const kind = list.dataset.locationList;
    list.innerHTML = listLocations(kind).map((location) => `<li><button type="button" data-location-name="${escapeHtml(location.name)}">${escapeHtml(location.name)}</button></li>`).join('');
  });

  if (presenceMapElement && window.maplibregl) {
    const presenceMap = new maplibregl.Map({
      container: presenceMapElement,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-36.45, -5.5],
      zoom: 7.8,
      minZoom: 6,
      attributionControl: true,
    });
    let activePresenceFilter = 'todos';

    presenceMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    presenceMap.on('error', () => {
      if (presenceStatus) presenceStatus.textContent = 'Não foi possível carregar o mapa agora. Tente atualizar a página.';
    });

    const visibleLocations = () => presenceLocations.filter((location) => {
      if (activePresenceFilter === 'filiais') return location.type === 'filial';
      if (activePresenceFilter === 'projetos') return location.hasProjects;
      return true;
    });

    const locationByName = (name) => presenceLocations.find((location) => location.name === name);
    const locationsGeoJson = () => ({
      type: 'FeatureCollection',
      features: visibleLocations().map((location) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
        properties: { name: location.name, type: location.type },
      })),
    });

    const hideGenericCityLabels = () => {
      presenceMap.getStyle()?.layers?.forEach((layer) => {
        if (layer.type === 'symbol' && layer['source-layer'] === 'place' && layer.layout?.['text-field']) {
          presenceMap.setLayoutProperty(layer.id, 'visibility', 'none');
        }
      });
    };

    const renderPresenceMarkers = () => {
      presenceMap.getSource('presence-locations')?.setData(locationsGeoJson());
    };

    const selectPresenceLocation = (locationName) => {
      const location = locationByName(locationName);
      if (!location) return;
      presenceMap.flyTo({ center: [location.lng, location.lat], zoom: Math.max(presenceMap.getZoom(), 9.6), speed: .8, curve: 1.25, essential: true });
      presenceMap.once('moveend', () => {
        new maplibregl.Popup({ offset: 14, closeButton: true, closeOnClick: false, className: 'presence-popup' })
          .setLngLat([location.lng, location.lat])
          .setHTML(popupMarkup(location))
          .addTo(presenceMap);
      });
    };

    presenceFilters.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        activePresenceFilter = filterButton.dataset.mapFilter;
        presenceFilters.forEach((button) => {
          const isActive = button === filterButton;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });
        if (presenceStatus) presenceStatus.textContent = activePresenceFilter === 'filiais' ? 'Exibindo as unidades da JBS Solar.' : activePresenceFilter === 'projetos' ? 'Exibindo cidades com projetos e atuação.' : 'Arraste, aproxime e selecione uma cidade.';
        renderPresenceMarkers();
      });
    });

    document.querySelectorAll('[data-location-name]').forEach((button) => button.addEventListener('click', () => {
      const locationName = button.dataset.locationName;
      const selectedLocation = presenceLocations.find((location) => location.name === locationName);
      if (selectedLocation && activePresenceFilter !== 'todos' && !visibleLocations().includes(selectedLocation)) {
        const allFilter = presenceFilters.find((filter) => filter.dataset.mapFilter === 'todos');
        allFilter?.click();
      }
      selectPresenceLocation(locationName);
    }));

    presenceMap.on('load', () => {
      hideGenericCityLabels();
      presenceMap.addSource('presence-locations', { type: 'geojson', data: locationsGeoJson() });
      presenceMap.addLayer({
        id: 'presence-location-points',
        type: 'circle',
        source: 'presence-locations',
        paint: {
          'circle-color': ['match', ['get', 'type'], 'filial', '#ff5b16', '#58c7e7'],
          'circle-radius': ['match', ['get', 'type'], 'filial', 10, 7],
          'circle-stroke-color': 'rgba(255,255,255,.94)',
          'circle-stroke-width': 3,
          'circle-opacity': .98,
        },
      });
      presenceMap.addLayer({
        id: 'presence-location-labels',
        type: 'symbol',
        source: 'presence-locations',
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 11,
          'text-font': ['Open Sans Regular'],
          'text-offset': [0, 1.7],
          'text-anchor': 'top',
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#052b4f',
          'text-halo-color': 'rgba(255,255,255,.94)',
          'text-halo-width': 1.4,
        },
      });
      presenceMap.on('click', 'presence-location-points', (event) => {
        const feature = event.features?.[0];
        const location = feature ? locationByName(feature.properties.name) : null;
        if (!location) return;
        presenceMap.flyTo({ center: [location.lng, location.lat], zoom: Math.max(presenceMap.getZoom(), 9.6), speed: .8, curve: 1.25, essential: true });
        new maplibregl.Popup({ offset: 14, closeButton: true, closeOnClick: false, className: 'presence-popup' })
          .setLngLat([location.lng, location.lat])
          .setHTML(popupMarkup(location))
          .addTo(presenceMap);
      });
      presenceMap.on('mouseenter', 'presence-location-points', () => { presenceMap.getCanvas().style.cursor = 'pointer'; });
      presenceMap.on('mouseleave', 'presence-location-points', () => { presenceMap.getCanvas().style.cursor = ''; });
      presenceMap.fitBounds([[-37.08, -6.12], [-35.35, -4.88]], { padding: 42, duration: 0, maxZoom: 8.4 });
      requestAnimationFrame(() => presenceMap.resize());
    });
    window.addEventListener('resize', () => presenceMap.resize(), { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(() => presenceMap.resize()).observe(presenceMapElement);
  } else if (presenceStatus) {
    presenceStatus.textContent = 'O mapa não pôde ser carregado agora.';
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
