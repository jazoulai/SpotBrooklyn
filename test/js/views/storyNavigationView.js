/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryNavigationView = Backbone.View.extend({

    id: 'story_nav_container',
    template: Handlebars.compile($('#story_navigation_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    }

});