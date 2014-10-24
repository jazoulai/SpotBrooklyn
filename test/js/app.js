/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false */

var sbk = sbk || {};

$(document).ready(function () {
    var storyCollection = new sbk.StoryCollection();
    $.when(storyCollection.fetch())
        .then(function () {
            sbk.app = new sbk.AppRouter(storyCollection);
            Backbone.history.start();
        });




});

//todo: instantiate iframe for social media intent links, create the iframeView back the view by a model containing all the intent hrefs

//todo: set google analytics commands on the navigation anchors



/*TODO
*
* Feature List
* (1) Story list remembers where you left off
*
*
*
* */
