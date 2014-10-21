/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

var sbk = sbk || {};

$(document).ready(function () {
    var storyCollection = new sbk.StoryCollection();
    var spotCollection = new sbk.SpotCollection();
    $.when(storyCollection.fetch(),
           spotCollection.fetch())
        .then(function () {
            console.log('fetched!');
            sbk.app = new sbk.AppRouter(storyCollection, spotCollection);
            Backbone.history.start();
        });
});
