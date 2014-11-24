    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoriesView = Backbone.View.extend({
    tagName: 'ul',
    id: 'stories-list',
    initialize: function (collection) {
        var feelingId = collection.feelingId;
        this.collection = collection.collection;
        var matchingModels = this.collection.filter(function(story){
            return _.contains(story.get('feelings'), feelingId);
        });
        this.filteredCollection = new Backbone.Collection(matchingModels);
        this.collection.on('reset', this.render, this);
    },
    render: function () {
        _.each(this.filteredCollection.models, function (story) {
            $(this.el).append(new sbk.StoryView({model: story}).render().el);
        }, this);

        return this;
    }
});