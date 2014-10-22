/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.NavigationView = Backbone.View.extend({

    id: 'nav_container',
    template: Handlebars.compile($('#navigation_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    }

});