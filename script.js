/* =========================================================
   SMORA BOUTIQUE — SCRIPT
   Organized into small functions grouped by feature.
   ========================================================= */

/* ---------- PRODUCT DATA ---------- */
const newArrivals = [
  { id:'na1', name:'Luna Satin Dress', cat:'dresses', price:6500, img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', desc:'A fluid satin dress cut for effortless movement, finished with a soft cowl neckline.' },
  { id:'na2', name:'Amara Co-Ord Set', cat:'sets', price:7200, img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', desc:'A tailored two-piece set in warm neutral tones, designed to move seamlessly from day to evening.' },
  { id:'na3', name:'Elara Linen Shirt', cat:'tops', price:3800, img:'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80', desc:'A breathable linen shirt with relaxed tailoring and mother-of-pearl buttons.' },
  { id:'na4', name:'Sofia Pleated Dress', cat:'dresses', price:7800, img:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', desc:'Fine pleats fall gracefully from a fitted bodice for a soft, editorial silhouette.' },
  { id:'na5', name:'Mira Soft Knit Top', cat:'tops', price:3200, img:'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80', desc:'An ultra-soft knit top with a relaxed drape, perfect layered or worn alone.' },
  { id:'na6', name:'Aria Tailored Blazer', cat:'outerwear', price:9500, img:'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=80', desc:'A sharply tailored blazer in soft taupe wool blend, built to anchor any look.' },
  { id:'na7', name:'Celeste Maxi Dress', cat:'dresses', price:8200, img:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', desc:'A floor-length maxi dress with a soft empire waist and delicate side slit.' },
  { id:'na8', name:'Noelle Everyday Set', cat:'sets', price:6800, img:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80', desc:'A relaxed everyday set in brushed cotton, made for easy, elevated dressing.' },
];

const bestSellers = [
  { id:'bs1', name:'Elise Wrap Dress', cat:'dresses', price:7000, rating:5, img:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80', desc:'A flattering wrap silhouette in a soft champagne hue, cinched with a self-tie belt.' },
  { id:'bs2', name:'Rosalie Tote', cat:'accessories', price:4500, rating:5, img:'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', desc:'A structured leather tote in soft taupe, roomy enough for everyday essentials.' },
  { id:'bs3', name:'Ines Silk Blouse', cat:'tops', price:5600, rating:4, img:'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80', desc:'A fluid silk blouse with a soft tie neckline, easily dressed up or down.' },
  { id:'bs4', name:'Camille Trench Coat', cat:'outerwear', price:11500, rating:5, img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80', desc:'A timeless trench in warm beige gabardine, cut for a longer, elegant line.' },
];

const allProducts = [...newArrivals, ...bestSellers];

/* ---------- STATE ---------- */
let wishlist = new Set();
let cart = []; // {id, name, price, img, qty}
let currentFilter = 'all';
let qvCurrentProduct = null;
let qvQty = 1;
let qvSize = null;

/* ---------- HELPERS ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const money = (n) => `Rs. ${n.toLocaleString('en-PK')}`;

function starString(n){
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/* ---------- RENDER PRODUCT CARDS ---------- */
function productCardHTML(p, showRating){
  return `
  <article class="product-card" data-cat="${p.cat}" data-id="${p.id}">
    <div class="product-media">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <button class="wishlist-heart" data-id="${p.id}" aria-label="Add ${p.name} to wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 6 5c2.2 0 3.8 1.3 6 3.6C14.2 6.3 15.8 5 18 5c3.7 0 5.5 3.4 4 6.9C19.5 16.4 12 21 12 21z"/></svg>
      </button>
      <button class="qv-btn" data-id="${p.id}">Quick View</button>
    </div>
    <div class="product-info">
      <p class="product-cat">${p.cat}</p>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-bottom">
        <span class="product-price">${money(p.price)}</span>
        ${showRating ? `<span class="stars-mini">${starString(p.rating || 5)}</span>` : ''}
      </div>
      <button class="add-bag-btn" data-id="${p.id}">Add To Bag</button>
      <button class="order-now-btn" data-id="${p.id}">Order Now</button>
    </div>
  </article>`;
}

function renderGrid(container, products, showRating){
  container.innerHTML = products.map(p => productCardHTML(p, showRating)).join('');
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderGrid($('#productGrid'), newArrivals, false);
  renderGrid($('#bestSellerGrid'), bestSellers, true);

  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initSearch();
  initWishlist();
  initBag();
  initFilters();
  initQuickView();
  initNewsletter();
  initContactForm();
  initScrollReveal();
  initBackToTop();
  initCategoryJump();
});

/* ---------- 1. STICKY / SCROLLING NAVBAR ---------- */
function initHeaderScroll(){
  const header = $('#siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

/* ---------- 2. MOBILE HAMBURGER MENU ---------- */
function initMobileMenu(){
  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ---------- 3. SMOOTH SCROLL ---------- */
function initSmoothScroll(){
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1 && $(targetId)) {
        e.preventDefault();
        $(targetId).scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });
}

/* ---------- 4. SEARCH OVERLAY ---------- */
function initSearch(){
  const overlay = $('#searchOverlay');
  const input = $('#searchInput');
  const resultsBox = $('#searchResults');

  const open = () => {
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 300);
  };
  const close = () => {
    overlay.classList.remove('active');
    input.value = '';
    resultsBox.innerHTML = '';
  };

  $('#searchToggle').addEventListener('click', open);
  $('#searchClose').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  function runSearch(){
    const term = input.value.trim().toLowerCase();
    if (!term){ resultsBox.innerHTML = ''; return; }
    const matches = allProducts.filter(p => p.name.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term));
    if (matches.length === 0){
      resultsBox.innerHTML = `<p class="search-empty">No styles found. Try another search.</p>`;
      return;
    }
    resultsBox.innerHTML = matches.map(p => `
      <div class="search-result-item">
        <img src="${p.img}" alt="${p.name}">
        <div>
          <strong>${p.name}</strong>
          <p class="product-cat">${p.cat} · ${money(p.price)}</p>
        </div>
      </div>`).join('');
  }

  $('#searchBtn').addEventListener('click', runSearch);
  input.addEventListener('input', runSearch);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(); });
}

/* ---------- 5. WISHLIST ---------- */
function initWishlist(){
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-heart');
    if (!btn) return;
    const id = btn.dataset.id;
    if (wishlist.has(id)){
      wishlist.delete(id);
      btn.classList.remove('active');
    } else {
      wishlist.add(id);
      btn.classList.add('active');
      showToast('Added to your wishlist.');
    }
    $('#wishlistCount').textContent = wishlist.size;
  });
}

/* ---------- 6. SHOPPING BAG ---------- */
function initBag(){
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-bag-btn');
    if (!btn) return;
    const product = allProducts.find(p => p.id === btn.dataset.id);
    if (product) addToCart(product, 1);
  });

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.order-now-btn');
    if (!btn) return;
    const product = allProducts.find(p => p.id === btn.dataset.id);
    if (product) orderNow(product);
  });

  $('#bagToggle').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#scrim').addEventListener('click', () => { closeCart(); });
}

function addToCart(product, qty){
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty += qty;
  else cart.push({ id:product.id, name:product.name, price:product.price, img:product.img, qty });
  renderCart();
  updateBagCount();
  showToast('Added to your bag.');
}

function renderCart(){
  const box = $('#cartItems');
  if (cart.length === 0){
    box.innerHTML = `<p class="cart-empty">Your bag is feeling light. Time to add something beautiful.</p>`;
  } else {
    box.innerHTML = cart.map(item => `
      <div class="cart-line" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-line-info">
          <h4>${item.name}</h4>
          <p>${money(item.price)} × ${item.qty}</p>
          <span class="cart-remove" data-id="${item.id}">Remove</span>
        </div>
      </div>`).join('');
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  $('#cartTotal').textContent = money(total);

  $$('.cart-remove').forEach(el => {
    el.addEventListener('click', () => {
      cart = cart.filter(item => item.id !== el.dataset.id);
      renderCart();
      updateBagCount();
    });
  });
}

function orderNow(product){
  addToCart(product, 1);
  showToast(`Order started for ${product.name} — let's confirm your details.`);
  setTimeout(() => {
    const contact = $('#contact');
    if (contact) contact.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 500);
}

function updateBagCount(){
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $('#bagCount').textContent = count;
}

function openCart(){
  $('#cartPanel').classList.add('active');
  $('#scrim').classList.add('active');
}
function closeCart(){
  $('#cartPanel').classList.remove('active');
  if (!$('#quickViewModal').closest('.modal-scrim').classList.contains('active')){
    $('#scrim').classList.remove('active');
  }
}

/* ---------- 7. PRODUCT FILTERING ---------- */
function initFilters(){
  $('#filterBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter();
  });
}

function applyFilter(){
  $$('#productGrid .product-card').forEach(card => {
    const match = currentFilter === 'all' || card.dataset.cat === currentFilter;
    card.classList.toggle('hidden', !match);
  });
}

function initCategoryJump(){
  $$('[data-filter-jump]').forEach(card => {
    card.addEventListener('click', (e) => {
      const filter = card.dataset.filterJump;
      setTimeout(() => {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (targetBtn) targetBtn.click();
      }, 400);
    });
  });
}

/* ---------- 8. QUICK VIEW MODAL ---------- */
function initQuickView(){
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.qv-btn');
    if (!btn) return;
    const product = allProducts.find(p => p.id === btn.dataset.id);
    if (product) openQuickView(product);
  });

  $('#modalClose').addEventListener('click', closeQuickView);
  $('#modalScrim').addEventListener('click', (e) => { if (e.target === $('#modalScrim')) closeQuickView(); });

  $$('#qvSizes .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#qvSizes .size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      qvSize = btn.textContent;
    });
  });

  $('#qtyPlus').addEventListener('click', () => { qvQty++; $('#qtyValue').textContent = qvQty; });
  $('#qtyMinus').addEventListener('click', () => { if (qvQty > 1) qvQty--; $('#qtyValue').textContent = qvQty; });

  $('#qvAddBtn').addEventListener('click', () => {
    if (qvCurrentProduct) addToCart(qvCurrentProduct, qvQty);
    closeQuickView();
  });

  $('#qvOrderBtn').addEventListener('click', () => {
    if (qvCurrentProduct) orderNow(qvCurrentProduct);
    closeQuickView();
  });
}

function openQuickView(product){
  qvCurrentProduct = product;
  qvQty = 1;
  qvSize = null;
  $('#qvImage').src = product.img;
  $('#qvImage').alt = product.name;
  $('#qvCategory').textContent = product.cat;
  $('#qvName').textContent = product.name;
  $('#qvPrice').textContent = money(product.price);
  $('#qvDesc').textContent = product.desc;
  $('#qtyValue').textContent = '1';
  $$('#qvSizes .size-btn').forEach(b => b.classList.remove('active'));
  $('#modalScrim').classList.add('active');
}

function closeQuickView(){
  $('#modalScrim').classList.remove('active');
}

/* ---------- 9. NEWSLETTER VALIDATION ---------- */
function initNewsletter(){
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletterEmail').value.trim();
    const msg = $('#newsletterMsg');
    if (!email){
      msg.textContent = 'Please enter your email address.';
      msg.className = 'form-msg error';
      return;
    }
    if (!isValidEmail(email)){
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'form-msg error';
      return;
    }
    msg.textContent = 'Thank you for joining the SMORA circle!';
    msg.className = 'form-msg success';
    $('#newsletterEmail').value = '';
  });
}

/* ---------- 10. CONTACT FORM VALIDATION ---------- */
function initContactForm(){
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#contactName').value.trim();
    const email = $('#contactEmail').value.trim();
    const message = $('#contactMessage').value.trim();
    const msg = $('#contactMsg');

    if (!name || !email || !message){
      msg.textContent = 'Please fill in all fields before sending.';
      msg.className = 'form-msg error';
      return;
    }
    if (!isValidEmail(email)){
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'form-msg error';
      return;
    }
    msg.textContent = 'Thank you — your message has been sent. We will be in touch soon.';
    msg.className = 'form-msg success';
    $('#contactForm').reset();
  });
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- 11. SCROLL REVEAL ---------- */
function initScrollReveal(){
  const items = $$('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  items.forEach(item => observer.observe(item));
}

/* ---------- 12. BACK TO TOP ---------- */
function initBackToTop(){
  const btn = $('#backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 700);
  }, { passive:true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ---------- 13. TOAST NOTIFICATION ---------- */
let toastTimer;
function showToast(text){
  const toast = $('#toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
