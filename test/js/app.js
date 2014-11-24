/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

var sbk = sbk || {};

$(document).ready(function () {
    var feelingsCollection = new sbk.FeelingsCollection();
    var storiesCollection = new sbk.StoriesCollection();
    $.when(feelingsCollection.fetch(),
           storiesCollection.fetch())
        .then(function () {
            sbk.app = new sbk.AppRouter(feelingsCollection, storiesCollection);
            Backbone.history.start();
        });
});