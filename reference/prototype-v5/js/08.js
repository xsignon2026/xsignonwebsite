/* About / What we do: expand a card in place with its products and a View more button */
(function(){
  var items=[].slice.call(document.querySelectorAll('#what .what-item'));if(!items.length)return;
  var ARROW='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function build(item){
    if(item.dataset.built)return;
    var key=item.dataset.src,view=document.getElementById('view-'+key),inner=item.querySelector('.wc-inner');
    if(!view||!inner)return;
    var rows=[],label='Products that deliver it';
    [].slice.call(view.querySelectorAll('.page-sec')).forEach(function(sec){
      var h=sec.querySelector('h2');
      if(h&&/products that deliver it/i.test(h.textContent)){
        [].slice.call(sec.querySelectorAll('a.rel-row')).forEach(function(a){
          var d=a.querySelector('.d');rows.push({href:a.getAttribute('href'),t:a.querySelector('.t').textContent,d:d?d.textContent:'Product'});
        });
      }
    });
    if(!rows.length){
      label='Key models';
      [].slice.call(view.querySelectorAll('.case-card')).forEach(function(c){
        var h=c.querySelector('h3'),a=c.querySelector('a[href^="#"]'),tag=c.querySelector('.ptag');
        if(h&&a)rows.push({href:a.getAttribute('href'),t:h.textContent,d:tag?tag.textContent:'Model'});
      });
    }
    inner.innerHTML='<p class="wc-label">'+esc(label)+'</p>'+
      rows.map(function(r){return '<a class="rel-row" href="'+esc(r.href)+'"><span class="t">'+esc(r.t)+'</span><span class="d">'+esc(r.d)+'</span></a>'}).join('')+
      '<a class="wc-more" href="#'+esc(key)+'">View more '+ARROW+'</a>';
    item.dataset.built='1';
  }
  function setOpen(item,open){
    item.classList.toggle('open',open);
    var b=item.querySelector('.what-card');b.setAttribute('aria-expanded',String(open));
  }
  var figImgs=[].slice.call(document.querySelectorAll('#whatFig .wf-img')),figCap=document.getElementById('whatCap');
  var CAPS=['Identity governance','AI governance','Passwordless sign-in','Quantum-safe security'];
  var shown=0;
  function showFig(i){
    if(i<0||i===shown&&figImgs[i]&&figImgs[i].classList.contains('on'))return;
    shown=i;figImgs.forEach(function(im,j){im.classList.toggle('on',j===i)});
    if(figCap)figCap.textContent=CAPS[i]||'';
  }
  function openIndex(){for(var k=0;k<items.length;k++){if(items[k].classList.contains('open'))return k}return shown}
  items.forEach(function(it,i){
    it.addEventListener('mouseenter',function(){showFig(i)});
    it.addEventListener('mouseleave',function(){showFig(openIndex())});
    it.addEventListener('focusin',function(){showFig(i)});
  });
  items.forEach(function(item){
    item.querySelector('.what-card').addEventListener('click',function(){
      var willOpen=!item.classList.contains('open');
      items.forEach(function(o){if(o!==item)setOpen(o,false)});
      if(willOpen)build(item);
      setOpen(item,willOpen);
      if(willOpen)showFig(items.indexOf(item));
      if(willOpen)setTimeout(function(){var r=item.getBoundingClientRect();if(r.top<90||r.top>innerHeight*.55)item.scrollIntoView({behavior:'smooth',block:'start'})},120);
    });
  });
})();
