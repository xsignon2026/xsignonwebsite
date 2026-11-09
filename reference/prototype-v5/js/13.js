/* Solutions hub: reuse the home page's animated graphics on each solution card */
(function(){
  [].slice.call(document.querySelectorAll('#view-solutions .sol-card')).forEach(function(c){
    var src=document.querySelector('#journey .j-panel a[href="#'+c.getAttribute('data-sol')+'"]');
    var art=src&&src.closest('.j-panel').querySelector('.j-art');
    if(art)c.querySelector('.sol-art').appendChild(art.cloneNode(true));
  });
})();
