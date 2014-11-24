/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FeelingsView = Backbone.View.extend({
    id: 'feelings-list',
    initialize: function () {
        this.collection.on("reset", this.render, this);
    },
    render: function () {
        _.each(this.collection.models, function (story) {
            $(this.el).append(new sbk.FeelingView({model: story}).render().el);
        }, this);
        return this;
    }
});