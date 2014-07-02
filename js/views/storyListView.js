/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    id: 'list_container',
    initialize: function () {
        this.model.on("reset", this.render, this);
    },
    render: function () {
        _.each(this.model.models, function (story) {
            $(this.el).append(new sbk.StoryListItemView({model: story}).render().el);
        }, this);
        return this;
    }
});