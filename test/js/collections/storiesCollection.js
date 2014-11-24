/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoriesCollection = Backbone.Collection.extend({
    model: sbk.Story,
    url: 'js/data/stories.json'
});