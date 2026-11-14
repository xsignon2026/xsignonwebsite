(function(){
  var root=document.getElementById('prodThinkCar');if(!root)return;
  var GAP=18,STEP=3200;
  var track=root.querySelector('.tc2-track'),view=root.querySelector('.tc2-view'),dotsEl=root.querySelector('.tc2-dots');
  var originals=[].slice.call(track.children),N=originals.length;
  originals.forEach(function(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.tabIndex=-1;track.appendChild(k)});
  var cards=[].slice.call(track.children),idx=0,cw=0,timer=null;
  function perView(){var w=window.innerWidth;return w>=1000?3:(w>=640?2:1)}
  function dots(){dotsEl.innerHTML='';for(var i=0;i<N;i++){(function(i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show article '+(i+1));
    b.addEventListener('click',function(){idx=i;move(true);restart()});dotsEl.appendChild(b)})(i)}}
  function mark(){[].slice.call(dotsEl.children).forEach(function(d,j){d.classList.toggle('on',j===idx%N)})}
  function move(anim){
    if(!anim){track.style.transition='none'}
    track.style.transform='translateX('+(-idx*(cw+GAP))+'px)';
    if(!anim){void track.offsetWidth;track.style.transition=''}
    mark();
  }
  function layout(){var w=view.clientWidth;if(!w)return;var pv=perView();cw=(w-GAP*(pv-1))/pv;cards.forEach(function(c){c.style.width=cw+'px'});move(false)}
  track.addEventListener('transitionend',function(e){if(e.target!==track)return;if(idx>=N){idx-=N;move(false)}});
  function next(){if(!cw)return;idx+=1;move(true)}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function restart(){stop();timer=setInterval(function(){if(!document.hidden)next()},STEP)}
  dots();mark();
  if('ResizeObserver' in window)new ResizeObserver(layout).observe(view);
  addEventListener('resize',layout);
  layout();restart();
})();
