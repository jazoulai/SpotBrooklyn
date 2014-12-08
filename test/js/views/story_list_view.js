/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'story-list',
    initialize: function () {
        this.collection.on('reset', this.render, this);
        console.log('initialize');
    },
    template: Handlebars.compile($('#story-list-template').html()),
    render: function () {
        var newCollection = _.sample(this.collection.models, 4);
        _.each(newCollection, function (storyItem) {
            $(this.el).append(new sbk.StoryListItemView({model: storyItem}).render().el);
        }, this);

        $(this.el).append(this.template());
        return this;
    },
    events: {
        'click #load-more' : 'loadMore'
    },
    loadMore: function(){
        this.collection = new Backbone.Collection(this.collection.models);
        this.$el.empty();
        this.render();


    }
});