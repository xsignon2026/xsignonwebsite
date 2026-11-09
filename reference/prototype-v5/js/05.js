(function(){
  var list=document.getElementById('prodxTabs');if(!list)return;
  var tabs=[].slice.call(list.querySelectorAll('.prodx-tab')),panels=[].slice.call(document.querySelectorAll('.prodx-panel'));
  function show(i,focus){
    tabs.forEach(function(t,j){var on=j===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1});
    panels.forEach(function(p,j){var on=j===i;p.classList.toggle('on',on);p.hidden=!on});
    if(focus)tabs[i].focus();
  }
  tabs.forEach(function(t,i){t.addEventListener('click',function(){show(i)})});
  list.addEventListener('keydown',function(e){
    var i=tabs.indexOf(document.activeElement);if(i<0)return;
    if(e.key==='ArrowRight'){e.preventDefault();show((i+1)%tabs.length,true)}
    else if(e.key==='ArrowLeft'){e.preventDefault();show((i-1+tabs.length)%tabs.length,true)}
  });
})();
