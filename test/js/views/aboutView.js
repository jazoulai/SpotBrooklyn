/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AboutView = Backbone.View.extend({
    id: 'about_container',
    template: Handlebars.compile($('#about_template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});