(function(){
  var hub=document.getElementById('whyHub');if(!hub)return;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,INTERVAL=5000;
  var DATA=[
    ['01','Human oversight by design','Review, approval and override are built into the flow of work, with a named person accountable at every step that matters.'],
    ['02','Autonomy within authority','Agents act freely inside the tier they have earned, and the boundary is always visible to the people who set it.'],
    ['03','Evidence everywhere','Every decision carries its signals, sources and reasoning, ready for reviewers today and auditors tomorrow.'],
    ['04','Governance on the inside','Policy lives inside the product, applied as work happens, rather than in documents checked after the fact.']
  ];
  var nodes=[].slice.call(hub.querySelectorAll('.wx-node')),conns=[].slice.call(hub.querySelectorAll('.wx-conn')),pulses=[].slice.call(hub.querySelectorAll('.wx-pulse'));
  var detail=hub.querySelector('.wx-detail'),N=document.getElementById('wxN'),T=document.getElementById('wxT'),Pp=document.getElementById('wxP');
  var prog=document.getElementById('wxProg'),pauseBtn=document.getElementById('wxPause');
  var cur=-1,timer=null,visible=false,paused=false;
  function fill(d){N.textContent=d[0];T.textContent=d[1];Pp.textContent=d[2]}
  function activate(i,pulse){
    var first=cur<0;cur=i;
    nodes.forEach(function(n,j){n.setAttribute('aria-selected',j===i?'true':'false')});
    conns.forEach(function(c,j){c.classList.toggle('on',j===i)});
    if(first||reduced){fill(DATA[i])}
    else{detail.classList.add('swap');setTimeout(function(){fill(DATA[i]);detail.classList.remove('swap')},180)}
    if(pulse&&!reduced&&pulses[i]){var p=pulses[i];p.classList.remove('go');void p.getBoundingClientRect();p.classList.add('go')}
  }
  function bar(on){if(!prog)return;prog.classList.remove('run');if(on&&!reduced){void prog.offsetWidth;prog.style.animationDuration=INTERVAL+'ms';prog.classList.add('run')}}
  function clear(){if(timer){clearTimeout(timer);timer=null}bar(false)}
  function schedule(){clear();if(paused||!visible||document.hidden)return;bar(true);
    timer=setTimeout(function(){activate((cur+1)%nodes.length,true);schedule()},INTERVAL)}
  nodes.forEach(function(n,i){n.addEventListener('click',function(){activate(i,true);schedule()})});
  if(pauseBtn)pauseBtn.addEventListener('click',function(){paused=!paused;pauseBtn.setAttribute('aria-pressed',String(paused));pauseBtn.textContent=paused?'Play':'Pause';schedule()});
  document.addEventListener('visibilitychange',schedule);
  activate(0,false);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){visible=e[0].isIntersecting;if(visible)activate(cur,true);schedule()},{threshold:.2}).observe(hub);
  }else{visible=true;schedule()}
})();
