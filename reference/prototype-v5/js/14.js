/* Resources hub: reuse the About page's Our thinking layout (featured article + article cards) */
(function(){
  var host=document.getElementById('solThinkHost'),src=document.getElementById('a-thinking');
  if(!host||!src)return;
  var feat=src.querySelector('.t-feat'),list=src.querySelector('.t-list');
  if(feat)host.appendChild(feat.cloneNode(true));
  if(list){
    var l=list.cloneNode(true);host.appendChild(l);
    [].slice.call(l.querySelectorAll('.tcard')).forEach(function(card){
      var b=card.querySelector('.t-toggle');if(!b)return;
      b.addEventListener('click',function(){var o=card.classList.toggle('open');b.setAttribute('aria-expanded',String(o));b.querySelector('span').textContent=o?'Show less':'Read more'});
    });
  }
  [].slice.call(host.querySelectorAll('.rv')).forEach(function(e){e.classList.add('in')});
})();
