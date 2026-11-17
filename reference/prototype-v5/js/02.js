/* Hero background: faint grid with light beams travelling along it. Pauses off-screen, static under reduced motion. */
(function(){
  var c=document.getElementById('heroBeams');if(!c)return;
  var x=c.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var S=56,w=0,h=0,beams=[],vis=true,last=0;
  function rnd(a,b){return a+Math.random()*(b-a)}
  function mk(){
    var horiz=Math.random()<.5,max=horiz?h:w;
    return {horiz:horiz,line:Math.max(1,Math.floor(rnd(1,max/S)))*S,p:rnd(-200,horiz?w:h),
            v:rnd(60,130),len:rnd(90,190),red:Math.random()<.2};
  }
  function size(){
    var dpr=Math.min(devicePixelRatio||1,2);
    w=c.clientWidth;h=c.clientHeight;
    c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.max(6,Math.min(16,Math.round(w*h/60000)));
    beams=[];for(var i=0;i<n;i++)beams.push(mk());
    draw(0);
  }
  function draw(dt){
    x.clearRect(0,0,w,h);
    x.strokeStyle='rgba(255,255,255,.05)';x.lineWidth=1;
    var gx,gy;
    for(gx=0;gx<w;gx+=S){x.beginPath();x.moveTo(gx+.5,0);x.lineTo(gx+.5,h);x.stroke()}
    for(gy=0;gy<h;gy+=S){x.beginPath();x.moveTo(0,gy+.5);x.lineTo(w,gy+.5);x.stroke()}
    if(reduce)return;
    for(var i=0;i<beams.length;i++){
      var b=beams[i];b.p+=b.v*dt;
      if(b.p-b.len>(b.horiz?w:h)){beams[i]=b=mk();b.p=-10}
      var x0=b.horiz?b.p-b.len:b.line,y0=b.horiz?b.line:b.p-b.len,
          x1=b.horiz?b.p:b.line,y1=b.horiz?b.line:b.p,
          g=x.createLinearGradient(x0,y0,x1,y1),col=b.red?'255,90,98':'169,225,255';
      g.addColorStop(0,'rgba('+col+',0)');g.addColorStop(1,'rgba('+col+',.7)');
      x.strokeStyle=g;x.lineWidth=1.5;
      x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.stroke();
    }
  }
  function loop(now){
    if(vis&&w&&h&&!document.hidden){draw(Math.min((now-last)/1000,.05))}
    last=now;
    if(!reduce)requestAnimationFrame(loop);
  }
  if('ResizeObserver' in window)new ResizeObserver(function(){if(c.clientWidth&&c.clientHeight)size()}).observe(c);
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(c);
  requestAnimationFrame(function(t){last=t;loop(t)});
})();
