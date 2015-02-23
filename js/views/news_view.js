/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.NewsView = Backbone.View.extend({
    id: 'news',
    template: Handlebars.compile($('#news-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});