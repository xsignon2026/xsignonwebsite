(function(){
  var hub=document.getElementById('partnerHub');if(!hub)return;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INTERVAL=5000;
  var DATA=[
    {l:['Segmentation policies','Zone and flow maps','Containment events'],
     r:['One posture view','Owners and findings','Audit-ready evidence'],
     b:['PostureOne'],
     d:'<strong>Micro-Segmentation and Containment.</strong> Segmentation partners whose platforms PostureOne brings into one posture view.'},
    {l:['Data discovery findings','Classification results','AI data access'],
     r:['PostureOne evidence','EvalOne evidence','Reviewer-ready reports'],
     b:['PostureOne','EvalOne'],
     d:'<strong>Data + AI Security and DSPM.</strong> Data security partners whose findings flow into PostureOne and EvalOne evidence.'},
    {l:['FIDO2 biometric keys','Key enrolment','Hardware supply'],
     r:['The AUTH key range','Governed sign-in','Support from XSignOn'],
     b:['Passwordless Keys','XSense'],
     d:'<strong>Hardware Biometric Passwordless Authentication.</strong> The hardware behind the AUTH key range, delivered and supported by XSignOn.'},
    {l:['Cryptographic inventory','Post-quantum methods','Certificate and key use'],
     r:['Migration plan','Evidence per system','Clear owners'],
     b:['Quantum-Safe Security'],
     d:'<strong>Quantum-Safe Encryption and Cryptography.</strong> Cryptography partners supporting the move to post-quantum methods.'}
  ];
  var tabs=[].slice.call(hub.querySelectorAll('.hubx-tab'));
  var pill=document.getElementById('hubxPill'),detail=document.getElementById('hubxDetail');
  var L=document.getElementById('hubxLeft'),R=document.getElementById('hubxRight'),B=document.getElementById('hubxPlat');
  var prog=document.getElementById('hubxProg'),pauseBtn=document.getElementById('hubxPause');
  var conns=[].slice.call(hub.querySelectorAll('.hx-conn')),pulses=[].slice.call(hub.querySelectorAll('.hx-pulse'));
  var cur=-1,timer=null,visible=false,paused=false;
  function rows(list){return list.map(function(t){return '<div class="hubx-row">'+t+'</div>'}).join('')}
  function place(){var t=tabs[cur];if(pill&&t){pill.style.left=t.offsetLeft+'px';pill.style.width=t.offsetWidth+'px'}}
  function fill(d){L.innerHTML=rows(d.l);R.innerHTML=rows(d.r);B.innerHTML=d.b.map(function(t){return '<div>'+t+'</div>'}).join('');detail.innerHTML=d.d}
  function activate(i,pulse){
    var first=cur<0;cur=i;
    tabs.forEach(function(t,j){t.setAttribute('aria-selected',j===i?'true':'false')});
    conns.forEach(function(c,j){c.classList.toggle('on',j===i)});
    place();
    if(first||reduced){fill(DATA[i])}
    else{L.classList.add('swap');R.classList.add('swap');
      setTimeout(function(){fill(DATA[i]);L.classList.remove('swap');R.classList.remove('swap')},160)}
    if(pulse&&!reduced&&pulses[i]){var p=pulses[i];p.classList.remove('go');void p.getBoundingClientRect();p.classList.add('go')}
  }
  function bar(on){
    if(!prog)return;
    prog.classList.remove('run');
    if(on&&!reduced){void prog.offsetWidth;prog.style.animationDuration=INTERVAL+'ms';prog.classList.add('run')}
  }
  function clear(){if(timer){clearTimeout(timer);timer=null}bar(false)}
  function schedule(){
    clear();
    if(paused||!visible||document.hidden)return;
    bar(true);
    timer=setTimeout(function(){activate((cur+1)%tabs.length,true);schedule()},INTERVAL);
  }
  tabs.forEach(function(t,i){t.addEventListener('click',function(){activate(i,true);schedule()})});
  if(pauseBtn)pauseBtn.addEventListener('click',function(){
    paused=!paused;pauseBtn.setAttribute('aria-pressed',String(paused));pauseBtn.textContent=paused?'Play':'Pause';schedule();
  });
  document.addEventListener('visibilitychange',schedule);
  addEventListener('resize',place);
  addEventListener('load',place);
  activate(0,false);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){
      visible=e[0].isIntersecting;
      if(visible){hub.classList.add('inview');place();activate(cur,true)}
      schedule();
    },{threshold:.15}).observe(hub);
  }else{hub.classList.add('inview');visible=true;schedule()}
})();
