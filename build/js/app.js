(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = 'c8f89bd44061119148005f1d6103393fa3a9e417';

},{}],2:[function(require,module,exports){
var key = require('./../.env').apiKey; // We are exporting the apiKey from .env file
var githubRepos = function(username) { // Repos function
  // We are loading data from github when a user enters a username
    return $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response) {
$("#myRepos").html(" "); // We are getting the content in the id myRepos and setting the content to empty
  console.log(response);
    if (response.length > 0) { // A function calculating the length of the response and if  length is greater than 0 Github Respositories is appended
     var description = " ";
     $("#myRepos").append("<h1 id='userRepos'><span class='user'></span>Github Repositories</h1>");
            $.each(response, function(index) { // We are looping through each response and  moments.js is used to display when a repo was created
                var created = moment(this.created_at).format('MMMM Do YYYY, h a');
                  var updated = moment(this.updated_at).format('MMMM Do YYYY, h a');
      if (this.description !== null) {
          description = this.description;
              }
        $("#myRepos").append("<div>" + "<h1><a href='" + this.url + "'><span class='title'></span> " + this.name + "</a></h1>" + "<div>" + "<p>Created: " + created + "</p>" + "<p>Updated: " + updated + "</p>" + "</div>" + "<div class='col-md-12'>" + "<p>" + description + "</p>" + "</div>" +
                                "</div>");
                })
        $('.image').html('<img src="'+response[0].owner.avatar_url+'">');
          }
               else {
         // We are getting all the contents that are within the user id
          $("#user").html("<h1 class='center'>USER NOT FOUND</h1>");
              $.each(response, function(i)
                    {
                }).fail(function(error) {
                console.log(error.responseJSON.message);
              }
              )}
                  }
                )};
// We are exporting Module called githubRepos
 exports.reposModule = githubRepos;

},{"./../.env":1}],3:[function(require,module,exports){
var githubRepos = require('./../js/user-backend.js').reposModule;

$(document).ready(function() {
  $("#mybtn").click(function() {
    $("#mybtn").fadeOut();
    $(".well").fadeOut();
    $("#back").fadeIn();
  });
  $("#back").click(function() {
    $("#back").fadeOut();
    $("#myResults").fadeOut();
    $(".well").fadeIn();
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

},{"./../js/user-backend.js":2}]},{},[3]);
