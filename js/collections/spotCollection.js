/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SpotCollection = Backbone.Collection.extend({
    model: sbk.Spot,
    url: 'js/data/spots.json'
});