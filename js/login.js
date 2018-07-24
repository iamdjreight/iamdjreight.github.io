///////////////////////////////////////////// Database Code
(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBt6G7qtbkOkybsDP8sTHHIRwfR-FH0BCw",
    authDomain: "djreight-events.firebaseapp.com",
    databaseURL: "https://djreight-events.firebaseio.com",
    projectId: "djreight-events",
    storageBucket: "djreight-events.appspot.com",
    messagingSenderId: "963237232182"
  };

  firebase.initializeApp(config);

  // get elements
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const loginBtn = document.getElementById('login');
  // const logoutBtn = document.getElementById('logout');

  // login event
  loginBtn.addEventListener('click', e => {
    // get email & pwd
    const loginEmail = email.value;
    const loginPassword = password.value;
    const auth = firebase.auth();

    // sign in
    const promise = auth.signInWithEmailAndPassword(loginEmail, loginPassword);

    promise.catch(e => console.log(e.message));
  });

  // // logout
  // logoutBtn.addEventListener('click', e => {
  //   firebase.auth().signOut()
  //   window.location.href = 'login.html';    
  // });

  // realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log("Login successful!");
      window.location.href = 'calendarCMS.html';
      // logoutBtn.classList.remove('d-none');
    }
    else {
      console.log("Not logged in");
      // logoutBtn.classList.add('d-none');

    }
  });


}());