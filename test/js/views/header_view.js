/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.HeaderView = Backbone.View.extend({
    id: 'header',
    template: Handlebars.compile($('#header-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});