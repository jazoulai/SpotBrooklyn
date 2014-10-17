/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    id: 'list_container',
    initialize: function () {
        this.collection.on("reset", this.render, this);
    },
    render: function () {
        _.each(this.collection.models, function (story) {
            $(this.el).append(new sbk.StoryListItemView({model: story}).render().el);
        }, this);
        return this;
    }
});