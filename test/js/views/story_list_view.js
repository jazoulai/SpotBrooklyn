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
        var self = this;
        this.storyList = $(this.el).find('#stories-list-ul');
        this.sampledCollection = _.sample(this.collection.models, 3);

        //append each story-list-item to the a child element of this view.
        _.each(this.sampledCollection, function (idea) {
            this.storyList.append(new sbk.StoryListItemView({model: idea}).render().el);
        }, this);

        this.countListItems = this.storyList.find('li').length;
        this.countTotalItems = this.collection.length;

        //remove each child of the sampled copy from this.collection to avoid rendering duplicates.
        _.each(self.sampledCollection, function(child){
            self.collection.remove(child);
        });
    },
    render: function () {
        $(this.el).html(this.template());
        this.sampleCollection();
        //insert the total length of this.collection after the template is rendered
        $(this.el).find('#tally').html(this.countListItems);
        $(this.el).find('#count').html(' of ' + this.countTotalItems);
        return this;
    },
    events: {
        'click #load-more' : 'loadMore'
    },
    loadMore: function(){
        if(this.collection.length > 0){
            this.sampleCollection();
            $(this.el).find('#tally').html(this.countListItems);
            var liIndex = this.countListItems - 4;

            $('html, body').animate({
             scrollTop: $('li:eq(' + liIndex + ')').offset().top
             }, 500);

            if (this.collection.length === 0) {
                var button = $(this.el).find('button');
                button.removeClass('enabled');
                button.addClass('disabled');
                button.html('No More');
            }
        }
    }
});