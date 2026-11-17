(function(){
  document.documentElement.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Key detail pages: generated from one data set, one template (documentation tabs + spec table) */
  var KEYPAGES=[
    {id:'key-bio',name:'AUTH Bio',tag:'Biometric',method:'Fingerprint',line:'Fingerprint-based sign-in for everyday staff roles.',ideal:'Everyday staff roles across branch, office and field teams.',feat:'Fingerprint verification on the key itself, so sign-in completes with a touch that only the account owner can complete.'},
    {id:'key-touch',name:'AUTH Bio Touch',tag:'Touch-activated',method:'Touch',line:'Touch-activated sign-in where a tap confirms the attempt.',ideal:'Teams that want the simplest possible step at sign-in: connect the key, tap, and the verified sign-in completes.',feat:'A single touch confirms the person is present at sign-in, paired with FIDO2 verification on the key.'},
    {id:'key-pro',name:'AUTH Bio Pro',tag:'Biometric',method:'Fingerprint',line:'Biometric sign-in for roles that need extended management options.',ideal:'Administrators and high-assurance roles that need extended management options alongside biometric sign-in.',feat:'Fingerprint verification with extended management options, for the roles your policies hold to the highest assurance.'},
    {id:'key-desktop',name:'AUTH Bio Desktop',tag:'Desktop',method:'Desktop sign-in',line:'Desktop-based sign-in for fixed workstations and shared terminals.',ideal:'Fixed workstations and shared terminals in branches, clinics and service desks, where the key stays with the desk.',feat:'A desktop form factor that stays with the workstation, ready for the next verified sign-in, shift after shift.'}
  ];
  var KEY_TABS=['Product Details','Overview','Security','Platforms','Windows Sign-in','Differentiators'];
  function keyTabText(k,t){
    if(t===0)return '<p><b>'+k.name+' is an enterprise FIDO2 security key, delivered and supported by XSignOn.</b> '+k.line+' Enrollment, replacement and lifecycle run through AMS.</p>';
    if(t===1)return '<p><b>Overview.</b> '+k.feat+'</p>';
    if(t===2)return '<p><b>Security.</b> The key is FIDO2 certified and completes verification on the device, so sign-in is bound to the person holding the key and the service they are signing in to.</p>';
    if(t===3)return '<p><b>Platforms.</b> Compatibility is confirmed against your identity provider and device mix before any hardware is ordered. <span class="confirm">Confirm spec</span></p>';
    if(t===4)return '<p><b>Windows sign-in</b> is supported through standard FIDO2 flows, with enrollment guided in AMS. <span class="confirm">Confirm spec</span></p>';
    return '<p><b>What sets it apart.</b> '+k.feat+' Delivered and supported by XSignOn, with AMS carrying delivery, enrollment and replacements.</p>';
  }
  (function buildKeyViews(){
    var main=document.getElementById('main');
    if(!main)return;
    var html='';
    KEYPAGES.forEach(function(k){
      var tabs='',panels='';
      KEY_TABS.forEach(function(t,i){
        tabs+='<button class="tab-btn" role="tab" aria-selected="'+(i===0?'true':'false')+'" data-tab="'+i+'">'+t+'</button>';
        panels+='<div class="tab-panel" data-panel="'+i+'"'+(i===0?'':' hidden')+'>'+keyTabText(k,i)+'</div>';
      });
      var sibs=KEYPAGES.filter(function(o){return o.id!==k.id;}).map(function(o){
        return '<a class="rel-row" href="#'+o.id+'"><span class="t">'+o.name+'</span><span class="d">Key</span></a>';
      }).join('');
      html+='<div id="view-'+k.id+'" hidden>'
        +'<section class="page-hero" data-nav="dark"><div class="wrap">'
        +'<nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a><span class="sep">/</span><a href="#products">Products</a><span class="sep">/</span><a href="#keys">Passwordless Keys</a><span class="sep">/</span><span class="cur">'+k.name+'</span></nav>'
        +'<h1 class="h-display">'+k.name+'</h1>'
        +'<div class="pmeta"><span class="ptag">'+k.tag+'</span><span class="ptag">FIDO2</span><span class="ptag">Delivered and supported by XSignOn</span></div>'
        +'</div></section>'
        +'<div data-nav="light">'
        +'<section class="page-sec"><div class="wrap"><div class="body-copy"><p><b>'+k.line+'</b> '+k.feat+'</p></div>'
        +'<div class="key-viz" aria-hidden="true"><span class="kv-key">'+k.name.replace('AUTH ','')+'</span><p>Ideal for: '+k.ideal+'</p></div>'
        +'</div></section>'
        +'<section class="page-sec"><div class="wrap"><div class="sec-head"><h2 class="h2">Documentation</h2></div>'
        +'<div data-tabs><div class="tabs" role="tablist" aria-label="'+k.name+' documentation">'+tabs+'</div>'+panels+'</div>'
        +'</div></section>'
        +'<section class="page-sec"><div class="wrap"><div class="sec-head"><h2 class="h2">Specifications</h2></div>'
        +'<div class="tbl-wrap"><table class="spec"><tbody>'
        +'<tr><th scope="row">Sign-in method</th><td>'+k.method+'</td></tr>'
        +'<tr><th scope="row">Form factor</th><td><span class="confirm">Confirm spec</span></td></tr>'
        +'<tr><th scope="row">Interface</th><td><span class="confirm">Confirm spec</span></td></tr>'
        +'<tr><th scope="row">FIDO2 certification</th><td>FIDO2 certified</td></tr>'
        +'<tr><th scope="row">Delivered and supported by XSignOn</th><td>Yes</td></tr>'
        +'</tbody></table></div>'
        +'<p class="lede" style="margin-top:22px;max-width:760px">Cells marked for confirmation are verified against your identity provider and device mix before any hardware is ordered.</p>'
        +'</div></section>'
        +'<section class="page-sec"><div class="wrap"><div class="sec-head"><h2 class="h2">Related</h2></div>'
        +'<a class="rel-row" href="#keys"><span class="t">Passwordless Keys</span><span class="d">Product</span></a>'
        +'<a class="rel-row" href="#ams"><span class="t">AMS</span><span class="d">Product</span></a>'
        +sibs
        +'<a class="rel-row" href="#case-bank"><span class="t">Securing Bank Access With FIDO2 Biometric Keys</span><span class="d">Case study</span></a>'
        +'</div></section>'
        +'<section class="cta-sec sm"><div class="wrap"><div class="cta-panel plain"><h2 class="h2">Get keys that arrive ready to enroll.</h2><a class="btn btn-white" href="#contact">Book a strategy call <span class="chev" aria-hidden="true">&#8250;</span></a></div></div></section>'
        +'</div></div>';
    });
    main.insertAdjacentHTML('beforeend',html);
  })();

  /* Mobile menu */
  var btn=document.getElementById('menuBtn'), nav=document.getElementById('mobileNav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open?'true':'false');
      btn.textContent=open?'Close':'Menu';
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu';});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu';btn.focus();}});
  }

  /* Router: hash -> view; in-view section anchors keep working */
  var VIEW_NAMES=['home','about','products','postureone','evalone','xsense','keys','key-bio','key-touch','key-pro','key-desktop','ams','compare','proof','case-bank','case-health','case-electrical','case-it','solutions','sol-identity','sol-ai','sol-quantum','sol-process','sol-enterprise','enterprise','thinking','industry','article-identity-first','article-data-ai','article-microseg','article-nonhuman','article-agentic','roi','contact','careers','login','register','thankyou','privacy','terms','unsubscribe','404'];
  var views={};
  VIEW_NAMES.forEach(function(n){views[n]=document.getElementById('view-'+n);});
  function revealIn(view){
    if(!view)return;
    setTimeout(function(){
      view.querySelectorAll('.rv:not(.in)').forEach(function(el){
        if(el.getBoundingClientRect().top < window.innerHeight+40) el.classList.add('in');
      });
    },80);
  }
  function showView(name,target,initial){
    if(!views[name])name='404';
    VIEW_NAMES.forEach(function(n){if(views[n])views[n].hidden=(n!==name);});
    if(target){target.scrollIntoView();}
    else{window.scrollTo(0,0);}
    pickTheme();
    if(!initial)revealIn(views[name]);
  }
  function viewOf(el){
    while(el){
      if(el.id&&el.id.indexOf('view-')===0)return el.id.slice(5);
      el=el.parentElement;
    }
    return 'home';
  }
  function goHash(hash,initial){
    var id=(hash||'').replace(/^#/,'');
    if(!id){showView('home',null,initial);return;}
    if(VIEW_NAMES.indexOf(id)>-1&&views[id]){showView(id,null,initial);return;}
    var t=document.getElementById(id);
    if(t){showView(viewOf(t),t,initial);return;}
    showView('404',null,initial);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var href=a.getAttribute('href');
      e.preventDefault();
      if(history.pushState){try{history.pushState(null,'',href==='#'?'#home':href);}catch(err){}}
      goHash(href);
    });
  });
  window.addEventListener('hashchange',function(){goHash(location.hash);});

  /* Nav theme switch: theme of the section under the header */
  var header=document.getElementById('siteHeader');
  var themed=Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  function pickTheme(){
    var y=84, theme=null;
    for(var i=0;i<themed.length;i++){
      var el=themed[i];
      if(el.offsetParent===null && el!==document.body) { if(el.getBoundingClientRect().height===0) continue; }
      var r=el.getBoundingClientRect();
      if(r.height===0) continue;
      if(r.top<=y && r.bottom>y){theme=el.getAttribute('data-nav');break;}
    }
    if(theme==='dark'){header.classList.add('nav-dark');header.classList.remove('nav-light');}
    else if(theme==='light'){header.classList.add('nav-light');header.classList.remove('nav-dark');}
  }
  var ticking=false;
  function onScroll(){
    if(ticking)return; ticking=true;
    requestAnimationFrame(function(){pickTheme();proofScroll();journeyScroll();ticking=false;});
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  pickTheme();

  /* Hero product carousel: auto-advance, arrows, dots, keyboard */
  (function(){
    var card=document.getElementById('heroCard');
    if(!card)return;
    var slides=Array.prototype.slice.call(card.querySelectorAll('.hslide'));
    var dots=Array.prototype.slice.call(card.querySelectorAll('.hdot'));
    var idx=0,timer=null;
    function show(n,user){
      idx=((n%slides.length)+slides.length)%slides.length;
      slides.forEach(function(s,i){
        var on=i===idx;
        s.classList.toggle('act',on);
        s.setAttribute('aria-hidden',on?'false':'true');
      });
      dots.forEach(function(d,i){
        d.classList.toggle('act',i===idx);
        if(i===idx)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');
      });
      if(user)restart();
    }
    function start(){if(reduced||timer||document.hidden)return;timer=setInterval(function(){show(idx+1);},6000);}
    function stop(){if(timer){clearInterval(timer);timer=null;}}
    function restart(){stop();start();}
    dots.forEach(function(d,i){d.addEventListener('click',function(){show(i,true);});});
    card.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft'){show(idx-1,true);}
      else if(e.key==='ArrowRight'){show(idx+1,true);}
    });
    card.addEventListener('mouseenter',stop);
    card.addEventListener('mouseleave',start);
    card.addEventListener('focusin',stop);
    card.addEventListener('focusout',function(e){if(!card.contains(e.relatedTarget))start();});
    document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else start();});
    show(0);
    start();
  })();

  /* Products coverflow: centred active card, angled neighbours, spring glide, arrows, dots, drag, keyboard, autoplay pauses on hover/focus */
  (function(){
    var root=document.getElementById('productCoverflow');
    if(!root)return;
    var viewport=document.getElementById('cfViewport');
    var cards=Array.prototype.slice.call(root.querySelectorAll('.cf-card'));
    var dots=Array.prototype.slice.call(root.querySelectorAll('.cf-dot'));
    var status=document.getElementById('cfStatus');
    var names=cards.map(function(c){var h=c.querySelector('h3');return h?h.textContent:'';});
    var idx=0,timer=null,hovering=false,focusing=false,dragX=null,dragged=false;
    var barEl=root.querySelector('.cf-timer i');
    function bar(on){if(!barEl)return;barEl.classList.remove('run');if(on&&!reduced){void barEl.offsetWidth;barEl.classList.add('run');}}
    function layout(){
      var n=cards.length;
      var fan=!reduced && root.clientWidth>=1180;
      var s=0;
      if(fan){
        var half=root.clientWidth/2;
        s=Math.max(300,(half-100)/2);
      }
      cards.forEach(function(c,i){
        var off=i-idx;
        off=((off%n)+n)%n; if(off>n/2)off-=n;
        var a=Math.abs(off);
        c.classList.toggle('is-active',off===0);
        c.classList.toggle('side-l',fan&&off<0);
        c.classList.toggle('side-r',fan&&off>0);
        if(!reduced){
          if(fan){
            c.style.transform='translateX(-50%) translateX('+(off*s)+'px) translateZ('+(-a*110)+'px) rotateY('+(off===0?0:-off*38)+'deg) scale('+(1-a*0.05)+')';
          }else{
            c.style.transform='translateX(-50%) translateX('+(off*62)+'%) translateZ('+(-a*130)+'px) rotateY('+(off===0?0:-off*36)+'deg) scale('+(1-a*0.07)+')';
          }
          c.style.opacity=String(1-a*0.16);
          c.style.zIndex=String(20-a);
        }
      });
      dots.forEach(function(d,i){
        d.classList.toggle('act',i===idx);
        if(i===idx)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');
      });
      if(status)status.textContent=names[idx]+', '+(idx+1)+' of '+cards.length;
    }
    function go(n,user){
      idx=((n%cards.length)+cards.length)%cards.length;
      layout();
      if(user)restart();
    }
    function start(){
      if(reduced||hovering||focusing||timer||document.hidden)return;
      bar(true);timer=setInterval(function(){idx=(idx+1)%cards.length;layout();bar(true);},5200);
    }
    function stop(){if(timer){clearInterval(timer);timer=null;}bar(false);}
    function restart(){stop();start();}
    root.querySelector('.cf-prev').addEventListener('click',function(){go(idx-1,true);});
    root.querySelector('.cf-next').addEventListener('click',function(){go(idx+1,true);});
    dots.forEach(function(d,i){d.addEventListener('click',function(){go(i,true);});});
    cards.forEach(function(c,i){
      c.addEventListener('click',function(e){
        if(dragged)return;
        if(i!==idx && !e.target.closest('a')){go(i,true);}
      });
      c.addEventListener('focusin',function(){if(i!==idx)go(i,false);});
    });
    root.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft'){e.preventDefault();go(idx-1,true);}
      else if(e.key==='ArrowRight'){e.preventDefault();go(idx+1,true);}
      else if(e.key==='Home'){e.preventDefault();go(0,true);}
      else if(e.key==='End'){e.preventDefault();go(cards.length-1,true);}
    });
    if(viewport){
      viewport.addEventListener('pointerdown',function(e){dragX=e.clientX;dragged=false;});
      viewport.addEventListener('pointermove',function(e){if(dragX!==null&&Math.abs(e.clientX-dragX)>8)dragged=true;});
      viewport.addEventListener('pointerup',function(e){
        if(dragX===null)return;
        var dx=e.clientX-dragX; dragX=null;
        if(Math.abs(dx)>48){go(dx<0?idx+1:idx-1,true);}
        setTimeout(function(){dragged=false;},0);
      });
      viewport.addEventListener('pointercancel',function(){dragX=null;dragged=false;});
    }
    root.addEventListener('mouseenter',function(){hovering=true;stop();});
    root.addEventListener('mouseleave',function(){hovering=false;start();});
    root.addEventListener('focusin',function(){focusing=true;stop();});
    root.addEventListener('focusout',function(e){if(!root.contains(e.relatedTarget)){focusing=false;start();}});
    document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else start();});
    window.addEventListener('resize',layout);
    layout();
    start();
  })();
  /* Heading / card fade-blur reveals */
  var rvEls=document.querySelectorAll('.rv');
  function revealAll(){rvEls.forEach(function(el){el.classList.add('in');});}
  if('IntersectionObserver' in window && !reduced){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
    },{threshold:.12});
    rvEls.forEach(function(el){
      if(el.getBoundingClientRect().top < window.innerHeight){el.classList.add('in');}
      else{io.observe(el);}
    });
    setTimeout(revealAll,1600); /* guarantee: nothing stays gated */
  }else{
    revealAll();
  }

  /* PostureOne bento: ambient review loop */
  var revItems=document.querySelectorAll('[data-rev]');
  var poCount=document.getElementById('poCount'), poStatus=document.getElementById('poStatus');
  var poStates=['Checking evidence','Owner confirmed','Evidence attached','Review complete'];
  if(revItems.length && poCount && !reduced){
    var step=0;
    setInterval(function(){
      step++;
      if(step>revItems.length){
        revItems.forEach(function(it){it.classList.remove('done');});
        step=0; poCount.textContent='1 of 4 reviewed'; poStatus.textContent='Evidence attached';
        return;
      }
      revItems[step-1].classList.add('done');
      poCount.textContent=(step+1)+' of 4 reviewed';
      poStatus.textContent=poStates[step-1];
    },2300);
  }

  /* Proof: scroll-linked word-by-word reveal (solid at rest, solid without JS / reduced motion) */
  var stmt=document.getElementById('proofStmt'), words=[], proofDone=false;
  if(stmt && !reduced){
    var parts=stmt.textContent.trim().split(/\s+/);
    stmt.innerHTML=parts.map(function(w){return '<span class="w" style="color:#d5dbe5">'+w+'</span>';}).join(' ');
    words=stmt.querySelectorAll('.w');
  }
  function proofScroll(){
    if(!words.length)return;
    if(proofDone){for(var j=0;j<words.length;j++){words[j].style.color='#081325';}return;}
    var r=stmt.getBoundingClientRect(), vh=window.innerHeight;
    var f=(vh*0.95 - r.top)/(r.height*0.6);
    f=Math.max(0,Math.min(1,f));
    if(f>=1)proofDone=true;
    var n=Math.round(f*words.length);
    for(var i=0;i<words.length;i++){words[i].style.color = i<n ? '#081325' : '#d5dbe5';}
  }
  proofScroll();

  /* Journeys: pinned cross-fade on wide screens, stacked otherwise (home + About) */
  var journeys=[];
  document.querySelectorAll('.journey').forEach(function(j){
    var rec={el:j,panels:j.querySelectorAll('.j-panel'),rail:j.querySelectorAll('.j-rail button')};
    journeys.push(rec);
    rec.rail.forEach(function(b){
      b.addEventListener('click',function(){
        var i=parseInt(b.getAttribute('data-j'),10);
        var top=j.getBoundingClientRect().top+window.scrollY;
        var jf=(j.id==='journey'||j.id==='journeyHow')?0.46:0.40;
        window.scrollTo({top:top + i*window.innerHeight*jf + 4, behavior: reduced?'auto':'smooth'});
      });
    });
  });
  function jSet(rec,idx){
    rec.panels.forEach(function(p,i){p.classList.toggle('act',i===idx);});
    rec.rail.forEach(function(b,i){b.classList.toggle('act',i===idx);});
  }
  function journeyMode(){
    journeys.forEach(function(rec){
      if(window.innerWidth>=900 && !reduced){rec.el.classList.add('pin-on');}
      else{rec.el.classList.remove('pin-on');}
    });
  }
  function journeyScroll(){
    journeys.forEach(function(rec){
      if(!rec.el.classList.contains('pin-on'))return;
      var r=rec.el.getBoundingClientRect();
      if(r.height===0)return;
      var stepH=window.innerHeight*((rec.el.id==='journey'||rec.el.id==='journeyHow')?0.46:0.40);
      var idx=Math.floor((-r.top)/stepH);
      idx=Math.max(0,Math.min(rec.panels.length-1,idx));
      jSet(rec,idx);
    });
  }
  if(journeys.length){
    journeyMode();
    window.addEventListener('resize',function(){journeyMode();journeyScroll();});
    journeyScroll();
  }

  /* Questions widget */
  var qaLauncher=document.getElementById('qaLauncher'), qaPanel=document.getElementById('qaPanel'), qaClose=document.getElementById('qaClose');
  function qaSet(open){
    qaPanel.hidden=!open;
    qaLauncher.setAttribute('aria-expanded', open?'true':'false');
    if(open){qaClose.focus();}
    else{qaLauncher.focus();}
  }
  if(qaLauncher&&qaPanel&&qaClose){
    qaLauncher.addEventListener('click',function(){qaSet(qaPanel.hidden);});
    qaClose.addEventListener('click',function(){qaSet(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!qaPanel.hidden){qaSet(false);}});
    qaPanel.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(){qaPanel.hidden=true;qaLauncher.setAttribute('aria-expanded','false');});});
  }
  document.querySelectorAll('.qa-item').forEach(function(item){
    var q=item.querySelector('.qa-q'), a=item.querySelector('.qa-a');
    q.addEventListener('click',function(){
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.qa-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.qa-a').style.maxHeight=null;o.querySelector('.qa-q').setAttribute('aria-expanded','false');});
      if(!isOpen){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';q.setAttribute('aria-expanded','true');}
    });
  });
  /* ROI calculator: results computed live from visitor inputs only */
  var roiStaff=document.getElementById('roiStaff'),roiResets=document.getElementById('roiResets'),
      roiMins=document.getElementById('roiMins'),roiRate=document.getElementById('roiRate');
  var roiCost=document.getElementById('roiCost'),roiN=document.getElementById('roiN'),roiH=document.getElementById('roiH');
  /* Our thinking: heading rows expand into the full card on hover, focus, or tap */
  (function(){
    var items=Array.prototype.slice.call(document.querySelectorAll('.think-item'));
    if(!items.length)return;
    var hoverable=window.matchMedia('(hover: hover) and (pointer: fine)');
    var lastTouch=false;
    document.addEventListener('pointerdown',function(e){lastTouch=(e.pointerType==='touch'||e.pointerType==='pen');},true);
    function setOpen(item,open){
      item.classList.toggle('open',open);
      var row=item.querySelector('.think-row');
      if(row)row.setAttribute('aria-expanded',open?'true':'false');
    }
    function closeOthers(except){
      items.forEach(function(it){if(it!==except&&(it.classList.contains('open')||it._pinned)){it._pinned=false;setOpen(it,false);}});
    }
    items.forEach(function(item){
      var row=item.querySelector('.think-row');
      if(!row)return;
      item.addEventListener('mouseenter',function(){if(!hoverable.matches||lastTouch)return;closeOthers(item);setOpen(item,true);});
      item.addEventListener('mouseleave',function(){if(!hoverable.matches)return;if(item._pinned)return;if(item.contains(document.activeElement))return;setOpen(item,false);});
      item.addEventListener('focusin',function(){closeOthers(item);setOpen(item,true);});
      item.addEventListener('focusout',function(e){if(item._pinned)return;if(!item.contains(e.relatedTarget))setOpen(item,false);});
      item.addEventListener('click',function(e){
        if(!lastTouch||!row.contains(e.target))return;
        e.preventDefault();
        e.stopPropagation();
        if(item.classList.contains('open')&&item._pinned){item._pinned=false;setOpen(item,false);}
        else{closeOthers(item);item._pinned=true;setOpen(item,true);}
      },true);
    });
  })();

  function roiCalc(){
    if(!roiStaff||!roiCost)return;
    var staff=Math.max(0,parseFloat(roiStaff.value)||0),
        rpy=Math.max(0,parseFloat(roiResets.value)||0),
        mins=Math.max(0,parseFloat(roiMins.value)||0),
        rate=Math.max(0,parseFloat(roiRate.value)||0);
    var n=staff*rpy,h=n*mins/60,cost=h*rate;
    roiN.textContent=Math.round(n).toLocaleString('en-US');
    roiH.textContent=Math.round(h).toLocaleString('en-US');
    roiCost.textContent='$'+Math.round(cost).toLocaleString('en-US');
  }
  [roiStaff,roiResets,roiMins,roiRate].forEach(function(i){if(i)i.addEventListener('input',roiCalc);});
  roiCalc();

  /* Contact form: validate, then show an in-page confirmation with copy (static mock, no backend) */
  var cForm=document.getElementById('contactForm'),cDone=document.getElementById('contactDone');
  if(cForm&&cDone){
    cForm.addEventListener('submit',function(e){
      e.preventDefault();
      if(!cForm.checkValidity()){cForm.reportValidity();return;}
      var v=function(id){var el=document.getElementById(id);return el?el.value:'';};
      document.getElementById('contactSummary').textContent='Thanks '+v('cfName')+'. Your inquiry ('+v('cfReason')+') is ready to send to XSignOn.';
      cForm.dataset.body='Name: '+v('cfName')+'\nEmail: '+v('cfEmail')+'\nCompany: '+v('cfCompany')+'\nPhone: '+v('cfPhone')+'\nReason: '+v('cfReason')+'\n\n'+v('cfMsg');
      cForm.hidden=true;cDone.hidden=false;
      cDone.scrollIntoView({block:'center',behavior:reduced?'auto':'smooth'});
    });
    var cCopy=document.getElementById('contactCopy');
    if(cCopy){cCopy.addEventListener('click',function(){
      var txt=cForm.dataset.body||'',btn=this;
      var done=function(){btn.textContent='Copied';};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,done);}
      else{done();}
    });}
  }

  /* Unsubscribe form: email + confirmation state */
  var uForm=document.getElementById('unsubForm'),uDone=document.getElementById('unsubDone');
  if(uForm&&uDone){
    uForm.addEventListener('submit',function(e){
      e.preventDefault();
      if(!uForm.checkValidity()){uForm.reportValidity();return;}
      uForm.hidden=true;uDone.hidden=false;
    });
  }

  /* Documentation tabs (XSense, AMS, key pages) */
  document.querySelectorAll('[data-tabs]').forEach(function(box){
    var btns=box.querySelectorAll('.tab-btn'), panels=box.querySelectorAll('.tab-panel');
    btns.forEach(function(b){
      b.addEventListener('click',function(){
        btns.forEach(function(x){x.setAttribute('aria-selected','false');});
        b.setAttribute('aria-selected','true');
        var i=b.getAttribute('data-tab');
        panels.forEach(function(p){p.hidden=(p.getAttribute('data-panel')!==i);});
      });
    });
  });

  /* Newsletter subscribe blocks: in-page confirmation */
  document.querySelectorAll('.news-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(!f.checkValidity()){f.reportValidity();return;}
      f.hidden=true;
      var d=f.parentElement.querySelector('.news-done');
      if(d)d.hidden=false;
    });
  });

  /* Log in: in-page state. Create account: routes to Thank You */
  var lForm=document.getElementById('loginForm'), lDone=document.getElementById('loginDone');
  if(lForm&&lDone){
    lForm.addEventListener('submit',function(e){
      e.preventDefault();
      if(!lForm.checkValidity()){lForm.reportValidity();return;}
      lForm.hidden=true;lDone.hidden=false;
    });
  }
  var rForm=document.getElementById('registerForm');
  if(rForm){
    rForm.addEventListener('submit',function(e){
      e.preventDefault();
      if(!rForm.checkValidity()){rForm.reportValidity();return;}
      if(location.hash==='#thankyou'){goHash('#thankyou');}
      else{location.hash='#thankyou';}
    });
  }

  /* Products hub overview: working product selector (cards + comparison table columns) */
  var OV_NAMES={postureone:'PostureOne',xsense:'XSense',authtouch:'AUTH Touch'};
  var ovCount=document.getElementById('ovCount'), ovClear=document.getElementById('ovClear'),
      ovAddback=document.getElementById('ovAddback'), ovAddBtns=document.getElementById('ovAddBtns'),
      ovTableWrap=document.getElementById('ovTableWrap');
  var ovSelected={postureone:true,xsense:true,authtouch:true};
  function ovRender(focusKey,focusAdd){
    var n=0, removed=[];
    Object.keys(OV_NAMES).forEach(function(k){
      if(ovSelected[k])n++; else removed.push(k);
      document.querySelectorAll('[data-ov-card="'+k+'"]').forEach(function(c){c.hidden=!ovSelected[k];});
      document.querySelectorAll('[data-ov-col="'+k+'"]').forEach(function(c){c.classList.toggle('ov-hidden',!ovSelected[k]);});
    });
    if(ovCount)ovCount.textContent=n+' of 3 selected';
    if(ovClear)ovClear.hidden=(n===0);
    if(ovTableWrap)ovTableWrap.hidden=(n===0);
    if(ovAddback&&ovAddBtns){
      ovAddback.hidden=removed.length===0;
      ovAddBtns.innerHTML='';
      removed.forEach(function(k){
        var b=document.createElement('button');
        b.type='button'; b.className='ov-add-btn'; b.textContent='Add '+OV_NAMES[k];
        b.setAttribute('data-ov-add',k);
        b.addEventListener('click',function(){ovSelected[k]=true; ovRender(k,false);});
        ovAddBtns.appendChild(b);
      });
    }
    if(focusKey){
      var tgt=document.querySelector(focusAdd?('[data-ov-add="'+focusKey+'"]'):('[data-ov-remove="'+focusKey+'"]'));
      if(tgt)tgt.focus();
    }
  }
  if(ovCount){
    document.querySelectorAll('[data-ov-remove]').forEach(function(b){
      b.addEventListener('click',function(){
        var k=b.getAttribute('data-ov-remove');
        ovSelected[k]=false; ovRender(k,true);
      });
    });
    if(ovClear)ovClear.addEventListener('click',function(){
      Object.keys(OV_NAMES).forEach(function(k){ovSelected[k]=false;});
      ovRender('postureone',true);
    });
    ovRender(null,false);
  }

  /* Contact reason preset (e.g. "Talk to our team" from the Products hub) */
  document.querySelectorAll('[data-preset-reason]').forEach(function(a){
    a.addEventListener('click',function(){
      var reason=a.getAttribute('data-preset-reason');
      setTimeout(function(){
        var sel=document.getElementById('cfReason');
        if(sel)sel.value=reason;
      },0);
    });
  });

  /* Initial route, after every initializer above has run */
  goHash(location.hash,true);
})();
