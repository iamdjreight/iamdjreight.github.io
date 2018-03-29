document.addEventListener('click',function(e){
  sessionStorage.setItem('package', JSON.stringify(e.target.id))
});
