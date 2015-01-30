/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */


sbk.loadBackboneApp = function() {
    var storyCollection = new sbk.StoriesCollection();
    $.when(storyCollection.fetch())
        .then(function () {
            sbk.app = new sbk.AppRouter(storyCollection);
            Backbone.history.start();
        });
};
sbk.loadGoogleAnalytics = function(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-46046711-1', 'auto');
    ga('send', 'pageview');
};

$(document).ready(function () {
    $(function() {
        WebFont.load({
            typekit: {
                id: 'urz0jfm'
            },
            active: function() {
                window.viewportUnitsBuggyfill.init();
                sbk.loadBackboneApp();
                sbk.loadGoogleAnalytics();
            }
        });
    });
});