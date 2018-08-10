$(document).ready(function() {


  const url = window.location.search;

  const username = $("#sign-in-username");
  const password = $("#sign-in-password");
  const signIn = $("#sign-in-form");

  if (localStorage.getItem("token")) { displayLogin(); }

  $("#logout").click(function() {
    handleLogout();
  });

  $(signIn).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    if (!username.val().trim() || !password.val().trim()) return;
    const account = {
      username: username.val().trim(),
      password: password.val().trim()
    };

    submitLogin(account);
  });

  function submitLogin(body) {
    $.post("/api/accounts/login", body, function(data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.payload.username);
      window.location.href = "/";
    });
  }

  function handleLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  }

  function displayLogin() {
    const loggedIn = $("#sign-in");
    loggedIn.empty();
    loggedIn.html('<h2>Logged In</h2>Username: ' + localStorage.getItem("username") + '</br>Token: ' + localStorage.getItem("token").substr(0, 50) + '...</br><button id="logout" type="submit" class="btn btn-success submit btn-lg">Log Out</button>');

    // $("#token").text("Token: " + data.token.substr(0, 50) + "...");
  }
});
  