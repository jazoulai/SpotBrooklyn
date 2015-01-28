/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.StoryMapView = Backbone.View.extend({
    id: 'story-map',
    template: Handlebars.compile($('#story-map-template').html()),
    render: function(){
        $(this.el).html(this.template());
    }
});