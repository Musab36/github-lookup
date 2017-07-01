var githubRepos = require('./../js/user-backend.js').reposModule;

$(document).ready(function() {
  $("#myResults").hide();
  $("#userForm").submit(function(event) {
    event.preventDefault();
    var username = $("#myInput").val();
    $("#myResults").hide(function() {
      githubRepos(username).then(function() {
        $("#myResults").show();
      });
    });
  });
});
