/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SpotListView = Backbone.View.extend({
    id: 'list_container',
    initialize: function () {
        this.collection.on("reset", this.render, this);
    },
    render: function () {
        _.each(this.collection.models, function (spot) {
            $(this.el).append(new sbk.SpotListItemView({model: spot}).render().el);
        }, this);
        return this;
    }
});