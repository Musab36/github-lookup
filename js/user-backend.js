var key = require('./../.env').apiKey;
var githubRepos = function(username) {
    return $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response) {
    $("#myRepos").html(" ");
      console.log(response);
      if (response.length > 0) {
        var description = " ";
          $("#myRepos").append("<h1 id='repo-title'><span class='title'></span>Github Repositories</h1>");
            $.each(response, function(index) {
                var created = moment(this.created_at).format('MMMM Do YYYY, h a');
                  var updated = moment(this.updated_at).format('MMMM Do YYYY, h a');
      if (this.description !== null) {
          description = this.description;
              }
        $("#myRepos").append("<div class='col-md-12'>" + "<h1><a href='" + this.url + "'><span class='title'></span> " + this.name + "</a></h1>" + "<div class='col-md-12'>" + "<p>Created: " + created + "</p>" + "<p>Updated: " + updated + "</p>" + "</div>" + "<div class='col-md-12'>" + "<p>" + description + "</p>" + "</div>" +
                                "</div>");
                })
          }
               else {
          $("#user").html("<h1 class='center'>USER NOT FOUND</h1>");
              $.each(response, function(i)
                    {
                }).fail(function(error) {
                console.log(error.responseJSON.message);
              }
              )}
                  }
                )};

 exports.reposModule = githubRepos;
