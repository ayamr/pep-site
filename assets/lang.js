(function(){
  function getLang(){ return localStorage.getItem('lang') || 'fr'; }
  function setLang(l){ localStorage.setItem('lang', l); document.documentElement.lang=l; }

  function applyI18n(dict, l){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.getAttribute('data-i18n');
      const v=dict[l] && dict[l][k];
      if(v===undefined) return;
      if(el.hasAttribute('data-i18n-lines')) el.innerHTML=String(v).replace(/\n/g,'<br>');
      else el.textContent=v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const k=el.getAttribute('data-i18n-placeholder');
      const v=dict[l] && dict[l][k];
      if(v!==undefined) el.setAttribute('placeholder', v);
    });
  }

  function renderFeatured(l, dict){
    const holder=document.querySelector('[data-featured]');
    const dots=document.querySelector('[data-featured-dots]');
    if(!holder || !window.PEP_NEWS) return;
    const items=(window.PEP_NEWS.items||[]).slice(0,4);
    holder.innerHTML='';
    items.forEach((it, idx)=>{
      const date=(l==='ht')?it.date_ht:it.date_fr;
      const title=(l==='ht')?it.title_ht:it.title_fr;
      const summary=(l==='ht')?it.summary_ht:it.summary_fr;

      const slide=document.createElement('div');
      slide.className='news-slide'+(idx===0?' active':'');
      if(it.image) slide.style.backgroundImage = `url(${it.image})`;

      slide.innerHTML=`
        <div class="news-slide-overlay"></div>
        <div class="news-slide-inner">
          <small>${date}</small>
          <strong>${title}</strong>
          <p>${summary}</p>
          <a href="${it.href}">${(dict[l] && dict[l].news_read) ? dict[l].news_read : 'Lire'} →</a>
        </div>
      `;
      holder.appendChild(slide);
    });
    if(dots){
      dots.innerHTML='';
      items.forEach((it,i)=>{
        const b=document.createElement('button');
        b.type='button';
        b.className='news-dot-btn'+(i===0?' active':'');
        b.setAttribute('aria-label', 'Ouvrir : ' + ((l==='ht')?it.title_ht:it.title_fr));
        b.addEventListener('click', ()=>{ window.location.href = it.href; });
        dots.appendChild(b);
      });
    }
  }

  function startCarousel(){
    const holder=document.querySelector('[data-featured]');
    const dots=document.querySelector('[data-featured-dots]');
    if(!holder) return;
    let i=0;
    setInterval(()=>{
      const slides=holder.querySelectorAll('.news-slide');
      if(!slides.length) return;
      slides[i].classList.remove('active');
      if(dots && dots.children[i]) dots.children[i].classList.remove('active');
      i=(i+1)%slides.length;
      slides[i].classList.add('active');
      if(dots && dots.children[i]) dots.children[i].classList.add('active');
    }, 4500);
  }

  function boot(){
    const dict=window.PEP_I18N;
    if(!dict){ console.error('PEP_I18N missing'); return; }
    const l=getLang();
    setLang(l);
    applyI18n(dict, l);

    const sel=document.getElementById('langSelect');
    if(sel){
      sel.value=l;
      sel.addEventListener('change', ()=>{
        const nl=sel.value;
        setLang(nl);
        applyI18n(dict, nl);
        renderFeatured(nl, dict);
      });
    }
    renderFeatured(l, dict);
    startCarousel();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
