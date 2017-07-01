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
        $('.profile-picture').html('<img src="'+response[0].owner.avatar_url+'">');
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
