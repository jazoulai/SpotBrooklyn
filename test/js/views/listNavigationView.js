/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ListNavigationView = Backbone.View.extend({

    id: 'list_nav_container',
    template: Handlebars.compile($('#list_navigation_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    }

});