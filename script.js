/* ============================================================
   CONFIG — Replace these with your real values
   ============================================================ */
const CONFIG = {
  STRIPE_PUBLISHABLE_KEY: 'pk_test_YOUR_KEY_HERE',   // from Stripe dashboard
  BACKEND_URL: 'https://your-backend.com',            // your Node/Express server
  SUCCESS_URL: window.location.origin + '/success.html',
  CANCEL_URL: window.location.origin + '/cancel.html',
  REQUEST_WEBHOOK: 'https://your-backend.com/api/requests',
  CURRENCY: 'zar',        // South African Rand
  CURRENCY_SYMBOL: 'R',
};

// Initialize Stripe (only if key is set)
let stripe = null;
try {
  if (CONFIG.STRIPE_PUBLISHABLE_KEY && !CONFIG.STRIPE_PUBLISHABLE_KEY.includes('YOUR_KEY')) {
    stripe = Stripe(CONFIG.STRIPE_PUBLISHABLE_KEY);
  }
} catch(e) { console.warn('Stripe not configured yet'); }

/* ============================================================
   PRODUCT DATA — Prices in Rands, ultra-affordable
   ============================================================ */
const products = [
  {
    id:1, name:"Nebula Lamp", cat:"Ambient", price:149, tag:"New",
    desc:"A mesmerizing projection lamp that fills your room with drifting galaxies. USB-powered, 3 color modes, perfect for bedrooms and meditation spaces.",
    rating:4.8, reviews:342,
    options:{Color:['Aurora','Nebula Pink','Deep Space']},
    gallery:[
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800"
    ],
    mood:"calm", aesthetic:"cozy"
  },
  {
    id:2, name:"Brass Compass", cat:"Adventure", price:89, tag:"Hot",
    desc:"Handcrafted solid brass compass with leather case. Fully functional, beautifully aged. A timeless gift for travelers and dreamers.",
    rating:4.9, reviews:189,
    options:{},
    gallery:[
      "https://images.unsplash.com/photo-1528262946336-09eca4296b1d?w=800",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
      "https://images.unsplash.com/photo-1472396961694-9b0387a1722f?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
    ],
    mood:"adventurous", aesthetic:"retro"
  },
  {
    id:3, name:"Mechanical Keyboard", cat:"Tech", price:349, tag:"Limited",
    desc:"Hot-swappable mechanical keyboard with RGB backlighting, PBT keycaps, and a satisfying tactile feel. USB-C, compatible with Mac and Windows.",
    rating:4.7, reviews:521,
    options:{Switch:['Red','Blue','Brown'],Layout:['US','UK','ISO']},
    gallery:[
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800"
    ],
    mood:"focused", aesthetic:"tech"
  },
  {
    id:4, name:"Ceramic Pour-Over", cat:"Kitchen", price:99, tag:null,
    desc:"Minimalist ceramic pour-over dripper. Hand-thrown, food-safe glaze. Brews a cleaner, brighter cup than paper filters.",
    rating:4.6, reviews:98,
    options:{Color:['Matte White','Charcoal','Sage']},
    gallery:[
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
      "https://images.unsplash.com/photo-1497935586351-b67a49e014bf?w=800",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
    ],
    mood:"calm", aesthetic:"minimal"
  },
  {
    id:5, name:"Leather Journal", cat:"Stationery", price:69, tag:null,
    desc:"Full-grain leather journal with 200 pages of acid-free paper. Ages beautifully. Refillable insert.",
    rating:4.9, reviews:412,
    options:{Size:['A5','A6','Pocket']},
    gallery:[
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800"
    ],
    mood:"creative", aesthetic:"retro"
  },
  {
    id:6, name:"Wireless Earbuds", cat:"Tech", price:199, tag:"Hot",
    desc:"Active noise cancellation, 30-hour battery life, IPX5 water resistance. Hi-Res audio certified.",
    rating:4.5, reviews:1203,
    options:{Color:['Midnight','Pearl','Sage']},
    gallery:[
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
      "https://images.unsplash.com/photo-1606220945770-b59628487b5c?w=800",
      "https://images.unsplash.com/photo-1598331668826-20ce550d1692?w=800",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c42a?w=800"
    ],
    mood:"focused", aesthetic:"tech"
  },
  {
    id:7, name:"Scented Candle Set", cat:"Home", price:79, tag:null,
    desc:"Set of 3 hand-poured soy candles. Notes of cedar, vanilla, and bergamot. 40-hour burn each.",
    rating:4.8, reviews:267,
    options:{},
    gallery:[
      "https://images.unsplash.com/photo-1602874801006-e26c4c5b5e8a?w=800",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800",
      "https://images.unsplash.com/photo-1608181831718-c9ffd8728c1b?w=800",
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=800"
    ],
    mood:"calm", aesthetic:"cozy"
  },
  {
    id:8, name:"Watercolor Kit", cat:"Creative", price:119, tag:"New",
    desc:"Professional-grade 24-color watercolor set with 3 brushes and a travel tin. Pigment-rich, lightfast.",
    rating:4.7, reviews:156,
    options:{},
    gallery:[
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800"
    ],
    mood:"creative", aesthetic:"minimal"
  },
  {
    id:9, name:"Smart Watch Band", cat:"Tech", price:49, tag:null,
    desc:"Premium fluoroelastomer band. Soft, sweat-resistant, hypoallergenic. Fits most smartwatches.",
    rating:4.4, reviews:892,
    options:{Color:['Black','Navy','Rose','Olive'],Size:['38/40mm','42/44mm']},
    gallery:[
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"
    ],
    mood:"focused", aesthetic:"tech"
  },
  {
    id:10, name:"Hiking Backpack", cat:"Adventure", price:249, tag:"Limited",
    desc:"40L waterproof hiking backpack with ergonomic harness. Multiple compartments, rain cover included.",
    rating:4.8, reviews:334,
    options:{Color:['Forest','Slate','Ember']},
    gallery:[
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1622260614153-03223fb7205f?w=800",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165b66?w=800",
      "https://images.unsplash.com/photo-1547947948-8a18f74165a2?w=800"
    ],
    mood:"adventurous", aesthetic:"minimal"
  },
  {
    id:11, name:"Vintage Radio", cat:"Home", price:299, tag:"New",
    desc:"Retro-styled Bluetooth radio with real FM/AM tuning. Walnut cabinet, warm analog sound.",
    rating:4.9, reviews:201,
    options:{},
    gallery:[
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1545454675-3531b5460326?w=800",
      "https://images.unsplash.com/photo-1514513121445-b8a18f741617?w=800"
    ],
    mood:"calm", aesthetic:"retro"
  },
  {
    id:12, name:"Desk Plant", cat:"Home", price:59, tag:null,
    desc:"Live succulent in a handmade ceramic pot. Low-maintenance, air-purifying. Each one unique.",
    rating:4.6, reviews:178,
    options:{Pot:['Terracotta','White','Black']},
    gallery:[
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc65?w=800",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800"
    ],
    mood:"calm", aesthetic:"cozy"
  },
];

const cart = [];
const bundle = [];
let currentProduct = null;
let modalQty = 1;
const SYM = CONFIG.CURRENCY_SYMBOL;

// Helper to format prices
function fmt(n){ return SYM + n.toFixed(2); }

/* ============================================================
   RENDER PRODUCTS
   ============================================================ */
function renderProducts(){
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(p=>`
    <div class="product reveal" data-id="${p.id}" onclick="openModal(${p.id})">
      <div class="product-img">
        ${p.tag?`<div class="product-tag">${p.tag}</div>`:''}
        <img src="${p.gallery[0]}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="product-foot">
          <span class="price">${SYM}${p.price}</span>
          <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id},event)">+</button>
        </div>
      </div>
    </div>
  `).join('');
  initTilt();
  initReveal();
}

/* ============================================================
   PRODUCT MODAL
   ============================================================ */
function openModal(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  currentProduct = p;
  modalQty = 1;
  document.getElementById('modalMainImg').src = p.gallery[0];
  document.getElementById('modalCat').textContent = p.cat;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalPrice').textContent = SYM+p.price;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalRating').innerHTML = `⭐ ${p.rating} · ${p.reviews} reviews`;
  document.getElementById('modalQty').textContent = 1;

  document.getElementById('modalThumbs').innerHTML = p.gallery.map((g,i)=>`
    <div class="modal-thumb ${i===0?'active':''}" onclick="switchImg('${g}',this)">
      <img src="${g}" alt="">
    </div>
  `).join('');

  const opts = document.getElementById('modalOptions');
  if(Object.keys(p.options).length){
    opts.innerHTML = Object.entries(p.options).map(([k,v])=>`
      <div style="margin-bottom:12px">
        <label>${k}</label>
        <div class="option-chips">
          ${v.map((opt,i)=>`<div class="option-chip ${i===0?'selected':''}" onclick="selectOption(this)">${opt}</div>`).join('')}
        </div>
      </div>
    `).join('');
    opts.style.display = 'block';
  } else {
    opts.style.display = 'none';
  }

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function switchImg(src,el){
  document.getElementById('modalMainImg').src = src;
  document.querySelectorAll('.modal-thumb').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
}
function selectOption(el){
  el.parentElement.querySelectorAll('.option-chip').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
}
function changeModalQty(d){
  modalQty = Math.max(1, modalQty + d);
  document.getElementById('modalQty').textContent = modalQty;
}
function addModalToCart(){
  for(let i=0;i<modalQty;i++) addToCart(currentProduct.id);
  showToast(`Added ${modalQty}× ${currentProduct.name} to cart`);
  closeModal();
}
function buyNowModal(){
  for(let i=0;i<modalQty;i++) addToCart(currentProduct.id);
  closeModal();
  stripeCheckout();
}
function requestVariation(){
  closeModal();
  prefillRequest(`Variation of ${currentProduct.name}`);
  document.getElementById('request').scrollIntoView({behavior:'smooth'});
}

/* ============================================================
   3D TILT + ORB
   ============================================================ */
function initTilt(){
  document.querySelectorAll('.product').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX-r.left, y = e.clientY-r.top;
      const rx = ((y/r.height)-0.5)*-10;
      const ry = ((x/r.width)-0.5)*10;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}
document.addEventListener('mousemove',e=>{
  const orb = document.getElementById('orb');
  orb.style.transform = `translate(${e.clientX-300}px,${e.clientY-300}px)`;
});

/* ============================================================
   CART
   ============================================================ */
function addToCart(id,e){
  const p = products.find(x=>x.id===id);
  const existing = cart.find(x=>x.id===id);
  if(existing) existing.qty++;
  else cart.push({...p,qty:1});
  updateCart();
  if(e) flyToCart(e);
}
function flyToCart(e){
  const btn = e.target.getBoundingClientRect();
  const cartRect = document.querySelector('.cart-btn').getBoundingClientRect();
  const fly = document.createElement('div');
  fly.className = 'fly-item';
  fly.style.left = btn.left+'px';
  fly.style.top = btn.top+'px';
  document.body.appendChild(fly);
  requestAnimationFrame(()=>{
    fly.style.transition = 'all .8s cubic-bezier(.5,-0.5,.7,.2)';
    fly.style.left = cartRect.left+'px';
    fly.style.top = cartRect.top+'px';
    fly.style.transform = 'scale(0.1)';
    fly.style.opacity = '0';
  });
  setTimeout(()=>fly.remove(),900);
}
function updateCart(){
  document.getElementById('cartCount').textContent = cart.reduce((s,i)=>s+i.qty,0);
  const items = document.getElementById('cartItems');
  if(cart.length===0){
    items.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0">Your cart is empty ✨</p>';
  } else {
    items.innerHTML = cart.map(i=>`
      <div class="cart-item">
        <img src="${i.gallery[0]}" alt="">
        <div class="cart-item-info">
          <h4>${i.name}</h4>
          <div class="ci-price">${SYM}${i.price} × ${i.qty}</div>
          <div class="cart-item-qty">
            <button onclick="changeQty(${i.id},-1)">−</button>
            <span>${i.qty}</span>
            <button onclick="changeQty(${i.id},1)">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cartTotal').textContent = fmt(total);
}
function changeQty(id,d){
  const i = cart.find(x=>x.id===id);
  i.qty += d;
  if(i.qty<=0) cart.splice(cart.indexOf(i),1);
  updateCart();
}
function toggleCart(){
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

/* ============================================================
   STRIPE CHECKOUT (ZAR)
   ============================================================ */
async function stripeCheckout(){
  if(cart.length===0){ showToast('Your cart is empty'); return; }

  if(!stripe || CONFIG.BACKEND_URL.includes('your-backend')){
    showToast('⚙️ Demo mode — configure Stripe in CONFIG to enable checkout');
    console.log('Cart contents:', cart);
    console.log('Total:', cart.reduce((s,i)=>s+i.price*i.qty,0), 'ZAR');
    return;
  }

  try {
    const res = await fetch(CONFIG.BACKEND_URL + '/create-checkout-session', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        currency: CONFIG.CURRENCY,
        items: cart.map(i=>({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          image: i.gallery[0]
        }))
      })
    });
    const { url } = await res.json();
    window.location.href = url;
  } catch(err){
    console.error(err);
    showToast('Checkout failed. Please try again.');
  }
}

/* ============================================================
   BUNDLE BUILDER
   ============================================================ */
function renderBundlePool(){
  const pool = document.getElementById('bundlePool');
  pool.innerHTML = products.slice(0,8).map(p=>`
    <div class="bundle-item" draggable="true" data-id="${p.id}">
      <img src="${p.gallery[0]}" alt="">
      <div class="bi-price">${SYM}${p.price}</div>
    </div>
  `).join('');
  initDrag();
}
function initDrag(){
  document.querySelectorAll('.bundle-item').forEach(item=>{
    item.addEventListener('dragstart',e=>{
      e.dataTransfer.setData('text/plain',item.dataset.id);
      item.style.opacity='0.4';
    });
    item.addEventListener('dragend',()=>item.style.opacity='1');
    item.addEventListener('click',()=>toggleBundle(parseInt(item.dataset.id)));
  });
  const dz = document.getElementById('dropZone');
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag-over')});
  dz.addEventListener('dragleave',()=>dz.classList.remove('drag-over'));
  dz.addEventListener('drop',e=>{
    e.preventDefault();
    dz.classList.remove('drag-over');
    toggleBundle(parseInt(e.dataTransfer.getData('text/plain')));
  });
}
function toggleBundle(id){
  const idx = bundle.findIndex(b=>b.id===id);
  if(idx>=0) bundle.splice(idx,1);
  else bundle.push({...products.find(x=>x.id===id),qty:1});
  updateBundle();
}
function updateBundle(){
  document.querySelectorAll('.bundle-item').forEach(el=>{
    el.classList.toggle('in-bundle',bundle.some(b=>b.id===parseInt(el.dataset.id)));
  });
  const list = document.getElementById('bundleList');
  list.innerHTML = bundle.map(b=>`
    <div class="bundle-list-item">
      <img src="${b.gallery[0]}" alt="">
      <span class="bli-name">${b.name}</span>
      <span>${SYM}${b.price}</span>
      <span class="bli-rm" onclick="toggleBundle(${b.id})">✕</span>
    </div>
  `).join('');
  const subtotal = bundle.reduce((s,b)=>s+b.price,0);
  const discount = bundle.length>=3;
  const total = discount ? subtotal*0.85 : subtotal;
  document.getElementById('bundleTotal').textContent = fmt(total);
  document.getElementById('bundleDiscount').style.display = discount?'block':'none';
}
function checkoutBundle(){
  if(bundle.length===0){ showToast('Add some items first! ✨'); return; }
  bundle.forEach(b=>addToCart(b.id));
  bundle.length = 0;
  updateBundle();
  toggleCart();
  setTimeout(stripeCheckout, 500);
}

/* ============================================================
   REQUEST FORM
   ============================================================ */
function prefillRequest(text){
  document.getElementById('reqProduct').value = text;
  document.getElementById('request').scrollIntoView({behavior:'smooth'});
  setTimeout(()=>document.getElementById('reqProduct').focus(), 600);
}
function previewImages(e){
  const preview = document.getElementById('imgPreview');
  preview.innerHTML = '';
  Array.from(e.target.files).forEach(f=>{
    const img = document.createElement('img');
    img.src = URL.createObjectURL(f);
    preview.appendChild(img);
  });
}
async function submitRequest(e){
  e.preventDefault();
  const data = {
    product: document.getElementById('reqProduct').value,
    description: document.getElementById('reqDesc').value,
    price: document.getElementById('reqPrice').value,
    email: document.getElementById('reqEmail').value,
    currency: 'ZAR',
    timestamp: new Date().toISOString()
  };

  if(!CONFIG.REQUEST_WEBHOOK.includes('your-backend')){
    try {
      await fetch(CONFIG.REQUEST_WEBHOOK, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
    } catch(err){ console.warn('Request webhook failed', err); }
  }

  showToast('✨ Request received! We\'ll email you within 48h.');
  document.getElementById('requestForm').reset();
  document.getElementById('imgPreview').innerHTML = '';
  console.log('Product request submitted:', data);
}

/* ============================================================
   THEME + REVEAL + TOAST
   ============================================================ */
document.querySelectorAll('.theme-dot').forEach(d=>{
  d.onclick = ()=>document.body.dataset.theme = d.dataset.theme;
});
function initReveal(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
}

/* ============================================================
   INIT
   ============================================================ */
renderProducts();
renderBundlePool();
initReveal();

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ closeModal(); if(document.getElementById('cartDrawer').classList.contains('open')) toggleCart(); }
});

