/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.NewsView = Backbone.View.extend({
    id: 'news',
    template: Handlebars.compile($('#news-template').html()),
    initialize: function () {
        this.collection.on("reset", this.render, this);
    },
    render: function () {
        $(this.el).html(this.template());
        _.each(this.collection.models, function (newsItem) {
            $(this.el).append(new sbk.NewsItemView({model: newsItem}).render().el);
        }, this);
        return this;
    }
});