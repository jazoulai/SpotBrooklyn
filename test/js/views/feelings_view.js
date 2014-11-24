/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FeelingsView = Backbone.View.extend({
    tagName: 'ul',
    id: 'feelings-list',
    initialize: function () {
        var filteredArray = this.collection.reset(this.collection.shuffle(), {silent:true});
        this.filteredCollection = new Backbone.Collection(filteredArray);
        this.collection.on('reset', this.render, this);
    },
    render: function () {
        _.each(this.filteredCollection.models, function (story) {
            $(this.el).append(new sbk.FeelingView({model: story}).render().el);
        }, this);

        return this;
    }
});