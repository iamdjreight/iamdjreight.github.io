document.addEventListener('click',function(e){
  let package = e.target.id;
  sessionStorage.setItem('package', package);
});
