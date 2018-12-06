var allowedHosts = [];

var curHost = window.location.hostname;
allowedHosts.push(curHost);
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a');
    Array.prototype.forEach.call(links, function(link){
       var host = link.hostname;
       if(allowedHosts.indexOf(host) < 0){
           link.target = '_blank';
       }
    });
});
