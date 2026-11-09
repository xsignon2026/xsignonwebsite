/* About page: hero background, in-page nav, parallax, thinking toggles */
(function(){
  var view=document.getElementById('view-about'),hero=document.getElementById('aboutHero');
  if(!view||!hero)return;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Beams canvas (same system as the home hero) */
  (function(){
    var c=document.getElementById('aboutBeams');if(!c)return;
    var x=c.getContext('2d'),S=56,w=0,h=0,beams=[],vis=true,last=0;
    function rnd(a,b){return a+Math.random()*(b-a)}
    function mk(){var horiz=Math.random()<.5,max=horiz?h:w;
      return {horiz:horiz,line:Math.max(1,Math.floor(rnd(1,max/S)))*S,p:rnd(-200,horiz?w:h),v:rnd(60,130),len:rnd(90,190),red:Math.random()<.2}}
    function size(){var dpr=Math.min(devicePixelRatio||1,2);w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.max(6,Math.min(14,Math.round(w*h/60000)));beams=[];for(var i=0;i<n;i++)beams.push(mk());draw(0)}
    function draw(dt){
      x.clearRect(0,0,w,h);x.strokeStyle='rgba(255,255,255,.05)';x.lineWidth=1;var gx,gy;
      for(gx=0;gx<w;gx+=S){x.beginPath();x.moveTo(gx+.5,0);x.lineTo(gx+.5,h);x.stroke()}
      for(gy=0;gy<h;gy+=S){x.beginPath();x.moveTo(0,gy+.5);x.lineTo(w,gy+.5);x.stroke()}
      if(reduced)return;
      for(var i=0;i<beams.length;i++){var b=beams[i];b.p+=b.v*dt;
        if(b.p-b.len>(b.horiz?w:h)){beams[i]=b=mk();b.p=-10}
        var x0=b.horiz?b.p-b.len:b.line,y0=b.horiz?b.line:b.p-b.len,x1=b.horiz?b.p:b.line,y1=b.horiz?b.line:b.p,
            g=x.createLinearGradient(x0,y0,x1,y1),col=b.red?'255,90,98':'169,225,255';
        g.addColorStop(0,'rgba('+col+',0)');g.addColorStop(1,'rgba('+col+',.7)');x.strokeStyle=g;x.lineWidth=1.5;
        x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.stroke()}
    }
    function loop(now){if(vis&&w&&h&&!document.hidden&&hero.dataset.abg!=='persp'){draw(Math.min((now-last)/1000,.05))}last=now;if(!reduced)requestAnimationFrame(loop)}
    if('ResizeObserver' in window)new ResizeObserver(function(){if(c.clientWidth&&c.clientHeight)size()}).observe(c);
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(c);
    requestAnimationFrame(function(t){last=t;loop(t)});
  })();

    /* 3. Cursor spotlight */
  hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();
    hero.style.setProperty('--mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');hero.style.setProperty('--my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%')});

  /* 4. Replay the title reveal whenever the page is shown */
  function replay(){hero.classList.remove('in');void hero.offsetWidth;hero.classList.add('in')}
  if(!view.hidden)replay();
  new MutationObserver(function(){if(!view.hidden)replay()}).observe(view,{attributes:true,attributeFilter:['hidden']});

  /* 5. Slow image parallax */
  var ticking=false;
  function spy(){ticking=false;if(view.hidden)return;
    document.querySelectorAll('#view-about .about-fig').forEach(function(f){var r=f.getBoundingClientRect(),vh=innerHeight;
      if(r.bottom<0||r.top>vh)return;var p=(r.top+r.height/2-vh/2)/vh;f.style.setProperty('--py',(p*-26).toFixed(1)+'px')})}
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(spy)}},{passive:true});
  addEventListener('resize',spy);

  /* 6. Thinking cards: expand / collapse */
  [].slice.call(document.querySelectorAll('#view-about .tcard')).forEach(function(card){
    var b=card.querySelector('.t-toggle');if(!b)return;
    b.addEventListener('click',function(){var o=card.classList.toggle('open');b.setAttribute('aria-expanded',String(o));b.querySelector('span').textContent=o?'Show less':'Read more'})});
})();
