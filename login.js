function checkData() {
    var enterEmail = document.getElementById('email').value;
    var enterPwd = document.getElementById('pwd').value;
    var getEmail = localStorage.getItem('userEmail');
    var getPwd = localStorage.getItem('userPwd');
  
    if (enterEmail == getEmail) {
      if (enterPwd == getPwd) {
        window.location.assign('spin.html')
        alert('Login Successful');
      } else {
        alert('Wrong password');
      }
    } else {
      alert('Invalid details');
    }
  }
  
  