$(document).ready(function($) {
    
    $('.repo-box').each(function() {
        var github = $(this).data("github");
        $repo_box = $(this);

        $.when(
            $.ajax({
                    url:'https://api.github.com/users/'+github+'/repos',
                    datatype: 'jsonp'
                   })
        ).done(function(data, status_text, jqXHR) {

            var response = data;
            var repos = [];

            response.forEach(function(repo) {

                date = repo.updated_at;
                date = new Date(date);
                date_string = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                 
                var item = {
                    name: repo.name,
                    url: repo.html_url,
                    date: date,
                    updated: date_string,
                    description: repo.description
                };
                repos.push(item);
            });
            
            repos.sort(function(a,b) {
                return b.date - a.date;
            });
            
            repos.forEach(function(repo) {

                $item = $('<div class="repo">' +
                    '<p class="repo-title">' +
                    '<a class="repo-link" href="?">?</a>' +
                    '</p>' +
                    '<p class="repo-updated"></p>' +
                    '<p class="repo-desc">?</p>' +
                    '</div>'
                );

                $item.find('.repo-link').attr('href', repo.url);
                $item.find('.repo-link').text(repo.name);
                $item.find('.repo-updated').text("Last updated on " + repo.updated);
                $item.find('.repo-desc').text(repo.description);
                $item.appendTo($repo_box);
            });
        });
    });
});
