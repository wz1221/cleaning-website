/* =========================================================
   〇〇專業清潔 官方形象網站 — 互動功能
   規範請見 AGENTS.md：每個功能獨立、元素不存在時直接略過。
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const header = document.querySelector('.header');
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const desktopQuery = window.matchMedia('(min-width: 1024px)');

  /* ===== 手機選單 ===== */
  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  }

  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // 點選選單內連結後收合
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    // Esc 關閉
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // 點選選單外區域關閉
    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
    });

    // 切換到桌面寬度時重設
    desktopQuery.addEventListener('change', function (event) {
      if (event.matches) setMenu(false);
    });
  }

  /* ===== 捲動：header 陰影、回到頂部按鈕 ===== */
  const toTop = document.querySelector('.to-top');

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0 });
      const brand = document.querySelector('.header .brand');
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* ===== 導覽列目前區塊高亮 ===== */
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  const sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function updateActiveLink() {
    const offset = (header ? header.offsetHeight : 0) + window.innerHeight * 0.3;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) current = section;
    });
    if (atBottom) current = sections[sections.length - 1];

    navLinks.forEach(function (link) {
      const active = current && link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if (sections.length) {
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();
  }

  /* ===== 區塊淡入 ===== */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ===== 提示訊息 ===== */
  const toast = document.querySelector('.toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }

  /* ===== 複製 LINE ID ===== */
  function fallbackCopy(text) {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(input);
    return ok;
  }

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      const text = button.getAttribute('data-copy');
      const label = button.querySelector('.copy-btn__label');
      const done = function (ok) {
        showToast(ok ? '已複製 LINE ID：' + text : '複製失敗，請手動輸入 ' + text);
        if (ok && label) {
          label.textContent = '已複製';
          setTimeout(function () { label.textContent = '複製'; }, 2000);
        }
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
      } else {
        done(fallbackCopy(text));
      }
    });
  });

  /* ===== 網頁簡報 Deck（服務文章頁） ===== */
  document.querySelectorAll('.deck').forEach(function (deck) {
    const track = deck.querySelector('.deck__track');
    const slides = deck.querySelectorAll('.slide');
    const prev = deck.querySelector('.deck__btn--prev');
    const next = deck.querySelector('.deck__btn--next');
    const fsBtn = deck.querySelector('.deck__btn--fs');
    const dotsWrap = deck.querySelector('.deck__dots');
    const count = deck.querySelector('.deck__count');
    const bar = deck.querySelector('.deck__progress-bar');
    if (!track || !slides.length) return;

    const total = slides.length;
    let index = 0;
    const dots = [];

    if (dotsWrap) {
      slides.forEach(function (slide, i) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'deck__dot';
        dot.setAttribute('aria-label', '前往第 ' + (i + 1) + ' 張');
        dot.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function go(i) {
      index = Math.max(0, Math.min(total - 1, i));
      track.style.transform = 'translateX(' + (-100 * index) + '%)';
      slides.forEach(function (slide, k) {
        const active = k === index;
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
      });
      dots.forEach(function (dot, k) {
        if (k === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (count) count.textContent = (index + 1) + ' / ' + total;
      if (bar) bar.style.width = ((index + 1) / total * 100) + '%';
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === total - 1;
    }

    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });

    // 鍵盤：焦點在簡報內時可用方向鍵翻頁
    deck.addEventListener('keydown', function (event) {
      const keys = { ArrowRight: 1, PageDown: 1, ArrowLeft: -1, PageUp: -1 };
      if (event.key in keys) { event.preventDefault(); go(index + keys[event.key]); }
      else if (event.key === 'Home') { event.preventDefault(); go(0); }
      else if (event.key === 'End') { event.preventDefault(); go(total - 1); }
      else if (event.key === ' ' && document.fullscreenElement === deck) { event.preventDefault(); go(index + 1); }
    });

    // 觸控 / 滑鼠拖曳翻頁
    let startX = null;
    let startY = null;
    const viewport = deck.querySelector('.deck__viewport');
    if (viewport) {
      viewport.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        startX = event.clientX;
        startY = event.clientY;
      });
      viewport.addEventListener('pointerup', function (event) {
        if (startX === null) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        startX = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
      });
      viewport.addEventListener('pointercancel', function () { startX = null; });
    }

    // 全螢幕播放
    if (fsBtn) {
      if (!deck.requestFullscreen) {
        fsBtn.hidden = true;
      } else {
        fsBtn.addEventListener('click', function () {
          if (document.fullscreenElement === deck) document.exitFullscreen();
          else deck.requestFullscreen().then(function () { deck.focus(); }).catch(function () {});
        });
        document.addEventListener('fullscreenchange', function () {
          const on = document.fullscreenElement === deck;
          fsBtn.setAttribute('aria-label', on ? '離開全螢幕' : '全螢幕播放');
          const use = fsBtn.querySelector('use');
          if (use) use.setAttribute('href', on ? '#i-compress' : '#i-expand');
        });
      }
    }

    deck.classList.add('is-ready');
    go(0);
  });

  /* ===== 頁尾年份 ===== */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
