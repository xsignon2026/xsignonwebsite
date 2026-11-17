/* Perspective floor grid for dark bands (Resources, CTA). Pauses off-screen, static under reduced motion. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bandRGB(){var h=getComputedStyle(document.documentElement).getPropertyValue('--d1').trim().replace('#','');
    if(h.length!==6)return '6,28,75';return [0,2,4].map(function(i){return parseInt(h.substr(i,2),16)}).join(',')}
  document.querySelectorAll('canvas.bg-persp').forEach(function(c){
    var x=c.getContext('2d'),hz=parseFloat(c.dataset.horizon)||.35,al=parseFloat(c.dataset.alpha)||.6,
        w=0,h=0,vis=true,last=0,t=0;
    function size(){
      var dpr=Math.min(devicePixelRatio||1,2);
      w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);draw();
    }
    function draw(){
      x.clearRect(0,0,w,h);
      var hy=h*hz,cx=w*.5,i,k,rows=12,off=reduce?0:(t*.3)%1;
      x.lineWidth=1;
      for(i=-22;i<=22;i++){
        x.strokeStyle='rgba(120,170,255,'+(.2*al)+')';
        x.beginPath();x.moveTo(cx+i*14,hy);x.lineTo(cx+i*(w/9),h);x.stroke();
      }
      for(k=0;k<rows;k++){
        var p=(k+off)/rows,y=hy+(h-hy)*Math.pow(p,2.2);
        x.strokeStyle='rgba(120,170,255,'+((.04+.24*p)*al)+')';
        x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();
      }
      var g=x.createLinearGradient(0,hy-2,0,hy+h*.18);
      var d=bandRGB();g.addColorStop(0,'rgb('+d+')');g.addColorStop(1,'rgba('+d+',0)');
      x.fillStyle=g;x.fillRect(0,hy-2,w,h*.18+2);
    }
    function loop(now){
      if(vis&&w&&h&&!document.hidden){t+=Math.min((now-last)/1000,.05);draw()}
      last=now;
      if(!reduce)requestAnimationFrame(loop);
    }
    if('ResizeObserver' in window)new ResizeObserver(function(){if(c.clientWidth&&c.clientHeight)size()}).observe(c);
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(c);
    requestAnimationFrame(function(n){last=n;loop(n)});
  });
})();
