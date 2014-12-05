/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'story-list',
    initialize: function () {
        this.filteredArray = this.collection.reset(this.collection.sample(4), {silent:true});
        this.filteredCollection = new Backbone.Collection(this.filteredArray);
        this.collection.on('reset', this.render, this);
    },
    template: Handlebars.compile($('#story-list-template').html()),
    render: function () {
        _.each(this.filteredCollection.models, function (storyItem) {
            $(this.el).append(new sbk.StoryListItemView({model: storyItem}).render().el);
        }, this);

        $(this.el).append(this.template());
        return this;
    },
    events: {
        'click span' : 'loadMore'
    },
    loadMore: function () {
        $('html, body').animate({
            scrollTop: $('#story-list').offset().top
        }, 500);
    }
});