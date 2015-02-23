/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.NewsItemView = Backbone.View.extend({
    id: 'news-item',
    template: Handlebars.compile($('#news-item-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});