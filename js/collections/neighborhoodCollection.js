/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.NeighborhoodCollection = Backbone.Collection.extend({
    model: sbk.Neighborhood,
    url: 'js/data/neighborhoods.json'
});