/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

var sbk = sbk || {};

$(document).ready(function () {

    sbk.app = new sbk.AppRouter();

    Backbone.history.start();

});
