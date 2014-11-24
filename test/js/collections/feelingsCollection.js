/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FeelingsCollection = Backbone.Collection.extend({
    model: sbk.Feeling,
    url: 'js/data/feelings.json'
});