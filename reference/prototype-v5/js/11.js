/* Comparison table: highlight the column under the cursor */
(function(){
  var t=document.getElementById('ovTable');if(!t)return;
  function clear(){[].slice.call(t.querySelectorAll('.col-hot')).forEach(function(x){x.classList.remove('col-hot')})}
  t.addEventListener('mouseover',function(e){var c=e.target.closest('[data-ov-col]');if(!c)return;var k=c.getAttribute('data-ov-col');
    [].slice.call(t.querySelectorAll('[data-ov-col]')).forEach(function(x){x.classList.toggle('col-hot',x.getAttribute('data-ov-col')===k)})});
  t.addEventListener('mouseleave',clear);
})();
