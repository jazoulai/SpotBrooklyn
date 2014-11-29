/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'story-list',
    initialize: function () {
        var filteredArray = this.collection.reset(this.collection.shuffle(), {silent:true});
        this.filteredCollection = new Backbone.Collection(filteredArray);
        this.collection.on('reset', this.render, this);
    },
    render: function () {
        _.each(this.filteredCollection.models, function (storyItem) {
            $(this.el).append(new sbk.StoryListItemView({model: storyItem}).render().el);
        }, this);

        return this;
    }
});