const package = sessionStorage.getItem('package');
document.getElementById(package).checked = true;

// set current year copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();
