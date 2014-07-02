/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SpotNavigationView = Backbone.View.extend({
    id: 'navigation_container',
    template: Handlebars.compile($('#spot_navigation_template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});