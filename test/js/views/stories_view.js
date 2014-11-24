    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoriesView = Backbone.View.extend({
    tagName: 'ul',
    id: 'stories-list',
    initialize: function () {

        this.collection.on('reset', this.render, this);
    },
    render: function () {
        _.each(this.collection.models, function (story) {
            $(this.el).append(new sbk.StoryView({model: story}).render().el);
        }, this);

        return this;
    }
});