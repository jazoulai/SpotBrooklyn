/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AboutView = Backbone.View.extend({
    id: 'about',
    template: Handlebars.compile($('#about-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});