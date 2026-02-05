(function(){
  const btn=document.querySelector('[data-mobile-toggle]');
  const panel=document.querySelector('[data-mobile-panel]');
  if(!btn||!panel) return;
  btn.addEventListener('click',()=>{
    const open=panel.getAttribute('data-open')==='true';
    panel.setAttribute('data-open', String(!open));
    panel.style.display=open?'none':'block';
  });
})();
