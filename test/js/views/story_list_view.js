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
        this.findStoryList = $(this.el).find('#stories-list-ul');

        //create a randomly sampled copy of this.collection
        this.newCollection = _.sample(this.collection.models, 3);

        //append each story-list-item to the a child element of this view.
        _.each(this.newCollection, function (storyItem) {
            this.findStoryList.append(new sbk.StoryListItemView({model: storyItem}).render().el);
        }, this);

        //count the number of currently displayed ideas
        this.liLength = this.findStoryList.find('li').length;

        //store the length of this.collection before it is redefined
        this.totalIdeas = this.collection.length;

        //remove each child of the sampled copy from this.collection to avoid rendering duplicates.
        _.each(self.newCollection, function(child){
            self.collection.remove(child);
        });

    },
    render: function () {
        $(this.el).html(this.template());

        this.sampleCollection();

        //insert the total length of this.collection after the template is rendered
        $(this.el).find('#tally').html(this.liLength);
        $(this.el).find('#count').html(' of ' + this.totalIdeas);

        return this;
    },
    events: {
        'click #load-more' : 'loadMore'
    },
    loadMore: function(ev){

        if(this.collection.length > 0){

            this.sampleCollection();    
            $(this.el).find('#tally').html(this.liLength);
            var liIndex = this.liLength - 4;

            $('html, body').animate({
             scrollTop: $('li:eq(' + liIndex + ')').offset().top
             }, 500);



        } else {


            /*$('html, body').animate({
                scrollTop: $('#results-signup').offset().top
            }, 500);*/
        }
    }
});