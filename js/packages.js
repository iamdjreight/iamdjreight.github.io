document.addEventListener('click',function(e){
  sessionStorage.setItem('package', e.target.id);
});

// set copyright current year
document.getElementById('currentYear').textContent = new Date().getFullYear();
