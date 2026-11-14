/* Article pages: a thin reading-progress line at the top */
(function(){
  var bar=document.createElement('div');bar.id='readProg';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
  function upd(){
    var v=document.querySelector('[id^="view-article-"]:not([hidden])');
    if(!v){bar.style.opacity='0';return}
    var h=document.documentElement.scrollHeight-innerHeight;
    bar.style.opacity='1';bar.style.transform='scaleX('+(h>0?Math.min(1,Math.max(0,scrollY/h)):0).toFixed(3)+')';
  }
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
  addEventListener('hashchange',function(){setTimeout(upd,80)});
  upd();
})();
