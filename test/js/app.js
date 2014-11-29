/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

var sbk = sbk || {};

$(document).ready(function () {
    var feelingsCollection = new sbk.FeelingsCollection();
    $.when(feelingsCollection.fetch())
        .then(function () {
            sbk.app = new sbk.AppRouter(feelingsCollection);
            Backbone.history.start();
        });
});