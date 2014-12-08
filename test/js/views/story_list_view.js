/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'story-list',
    initialize: function () {
        this.collection.on('reset', this.render, this);
    },
    template: Handlebars.compile($('#story-list-template').html()),
    render: function () {






        this.newCollection = _.sample(this.collection.models, 3);
        _.each(this.newCollection, function (storyItem) {
            $(this.el).append(new sbk.StoryListItemView({model: storyItem}).render().el);
        }, this);

        $(this.el).append(this.template());

        return this;
    },
    events: {
        'click #load-more' : 'loadMore'
    },
    loadMore: function(ev){

        if(this.collection.length > 2){
            console.log(this.collection.length);
            var self = this;
            _.each(self.newCollection, function(child){
                self.collection.remove(child);
            });
            this.$el.empty();
            this.render();
        } else {
            $(this.el).html('<span>no more!</span>');
        }
    }
});