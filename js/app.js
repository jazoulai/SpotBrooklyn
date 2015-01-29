/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

$(document).ready(function () {

    //Firefox

    conditionizr.add('notFirefox', function () {
        return typeof InstallTrigger == 'undefined';
    });

    conditionizr.config({
        assets: '../'
    });

    conditionizr.on('notFirefox', function(){
       console.log('not fire');
    });

    conditionizr.load('css/cover.css', ['notFirefox']);

    window.viewportUnitsBuggyfill.init();

    var storyCollection = new sbk.StoriesCollection();
    $.when(storyCollection.fetch())
        .then(function () {
            sbk.app = new sbk.AppRouter(storyCollection);
            Backbone.history.start();
        });
});