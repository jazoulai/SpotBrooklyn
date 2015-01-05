/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    tagName: 'div',
    id: 'story-list',
    initialize: function () {
        this.collection.on('reset', this.render, this);
    },
    template: Handlebars.compile($('#story-list-template').html()),
    sampleCollection: function() {
        this.storyList = $(this.el).find('#stories-list-ul');
        this.shuffledCollection = _.shuffle(this.collection.models);

        //append each story-list-item to the a child element of this view.
        _.each(this.shuffledCollection, function (idea) {
            this.storyList.append(new sbk.StoryListItemView({model: idea}).render().el);
        }, this);
    },
    render: function () {
        $(this.el).html(this.template());
        this.sampleCollection();
        return this;
    }
});