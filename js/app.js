/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

$(document).ready(function () {

    window.viewportUnitsBuggyfill.init();

    var storyCollection = new sbk.StoriesCollection();
    $.when(storyCollection.fetch())
        .then(function () {
            sbk.app = new sbk.AppRouter(storyCollection);
            Backbone.history.start();
        });
});