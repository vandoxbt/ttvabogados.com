/* Botón flotante de WhatsApp — Ttupa Vargas Estudio de Abogados.
   Autocontenido: se inyecta en <body>, fuera del árbol que renderiza support.js,
   por lo que funciona igual en index.html y en aviso-legal.html. */
(function () {
  'use strict';

  var MENSAJE = 'Hola, quisiera una consulta sobre ';
  var CONTACTOS = [
    { etiqueta: 'Consultas generales', numero: '51905505420', visible: '+51 905 505 420' },
    { etiqueta: 'Agenda tu cita', numero: '51930901494', visible: '+51 930 901 494' }
  ];

  var ICONO =
    '<svg viewBox="0 0 448 512" width="28" height="28" aria-hidden="true" focusable="false" fill="currentColor">' +
    '<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 110.9L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

  var CSS = [
    '.twa-root{position:fixed;right:20px;bottom:20px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:9999;',
    "font-family:'Raleway',Helvetica,Arial,sans-serif;display:flex;flex-direction:column;align-items:flex-end;gap:12px;}",
    '.twa-menu{display:flex;flex-direction:column;align-items:flex-end;gap:10px;opacity:0;visibility:hidden;',
    'transform:translateY(10px) scale(.96);transform-origin:bottom right;transition:opacity .22s ease,transform .22s ease,visibility .22s;}',
    '.twa-root.twa-open .twa-menu{opacity:1;visibility:visible;transform:translateY(0) scale(1);}',
    '.twa-item{display:flex;align-items:center;gap:12px;background:#001F3F;color:#FFFFFF;text-decoration:none;',
    'padding:11px 16px;max-width:80vw;box-shadow:0 6px 22px rgba(0,31,63,.24);transition:background .18s ease;}',
    '.twa-item:hover{background:#0A2E52;color:#FFFFFF;}',
    '.twa-item:focus-visible{outline:2px solid #25D366;outline-offset:2px;}',
    '.twa-item-ic{display:flex;color:#25D366;flex-shrink:0;}',
    '.twa-item-ic svg{width:20px;height:20px;}',
    '.twa-item-txt{display:flex;flex-direction:column;line-height:1.35;}',
    '.twa-item-lbl{font-size:13px;font-weight:600;letter-spacing:.06em;white-space:nowrap;}',
    '.twa-item-num{font-size:12px;font-weight:300;color:rgba(255,255,255,.72);white-space:nowrap;}',
    '.twa-fab{width:56px;height:56px;border-radius:50%;border:0;padding:0;cursor:pointer;background:#25D366;color:#FFFFFF;',
    'display:flex;align-items:center;justify-content:center;box-shadow:0 6px 22px rgba(0,31,63,.28);',
    'transition:transform .22s ease,background .18s ease;}',
    '.twa-fab:hover{background:#1EBE5A;}',
    '.twa-fab:focus-visible{outline:2px solid #001F3F;outline-offset:3px;}',
    '.twa-root.twa-open .twa-fab{transform:rotate(90deg);}',
    '@media (max-width:768px){.twa-root{right:16px;bottom:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));}',
    '.twa-item-lbl{font-size:12.5px;}}',
    '@media (prefers-reduced-motion:reduce){.twa-menu,.twa-fab{transition:none;}.twa-root.twa-open .twa-fab{transform:none;}}'
  ].join('');

  function enlace(c) {
    return 'https://wa.me/' + c.numero + '?text=' + encodeURIComponent(MENSAJE);
  }

  function montar() {
    if (document.querySelector('.twa-root')) return;

    var estilo = document.createElement('style');
    estilo.textContent = CSS;
    document.head.appendChild(estilo);

    var raiz = document.createElement('div');
    raiz.className = 'twa-root';

    var menu = document.createElement('div');
    menu.className = 'twa-menu';
    menu.id = 'twa-menu';

    CONTACTOS.forEach(function (c) {
      var a = document.createElement('a');
      a.className = 'twa-item';
      a.href = enlace(c);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute(
        'aria-label',
        'Escribir por WhatsApp a ' + c.etiqueta + ', ' + c.visible + ' (se abre en una pestaña nueva)'
      );
      a.innerHTML =
        '<span class="twa-item-ic">' + ICONO + '</span>' +
        '<span class="twa-item-txt"><span class="twa-item-lbl"></span>' +
        '<span class="twa-item-num"></span></span>';
      a.querySelector('.twa-item-lbl').textContent = c.etiqueta;
      a.querySelector('.twa-item-num').textContent = c.visible;
      menu.appendChild(a);
    });

    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'twa-fab';
    boton.id = 'twa-toggle';
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-controls', 'twa-menu');
    boton.setAttribute('aria-label', 'Abrir opciones de contacto por WhatsApp');
    boton.innerHTML = ICONO;

    raiz.appendChild(menu);
    raiz.appendChild(boton);
    document.body.appendChild(raiz);

    function abierto() {
      return raiz.classList.contains('twa-open');
    }

    function alternar(estado) {
      raiz.classList.toggle('twa-open', estado);
      boton.setAttribute('aria-expanded', estado ? 'true' : 'false');
      boton.setAttribute(
        'aria-label',
        estado ? 'Cerrar opciones de contacto por WhatsApp' : 'Abrir opciones de contacto por WhatsApp'
      );
    }

    boton.addEventListener('click', function (e) {
      e.stopPropagation();
      alternar(!abierto());
    });

    document.addEventListener('click', function (e) {
      if (abierto() && !raiz.contains(e.target)) alternar(false);
    });

    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && abierto()) {
        alternar(false);
        boton.focus();
      }
    });

    raiz.addEventListener('focusout', function (e) {
      if (abierto() && !raiz.contains(e.relatedTarget)) alternar(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();
