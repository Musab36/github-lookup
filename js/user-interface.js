var githubRepos = require('./../js/user-backend.js').reposModule;

$(document).ready(function() {
  $("#mybtn").click(function() {
    $("#mybtn").fadeOut();
    $(".well").fadeOut();
    $("#back").fadeIn();
    $("#pp").show();
  });
  $("#back").click(function() {
    $("#back").fadeOut();
    $("#myResults").fadeOut();
    $(".profile").fadeOut();
    $(".well").show();
    $("#mybtn").fadeIn();
    $(".marqs1").show();
    $(".marqs2").show();
  });
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
