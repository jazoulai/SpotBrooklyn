/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListView = Backbone.View.extend({
    tagName: 'div',
    id: 'story-list',
    initialize: function () {
        this.collection.on('reset', this.render, this);
    },
    template: Handlebars.compile($('#story-list-template').html()),
    render: function () {
        this.newCollection = _.sample(this.collection.models, 3);
        $(this.el).html(this.template());
        _.each(this.newCollection, function (storyItem) {
            $(this.el).find('#stories-list-ul').prepend(new sbk.StoryListItemView({model: storyItem}).render().el);
        }, this);

        return this;
    },
    events: {
        'click #load-more' : 'loadMore'
    },
    loadMore: function(ev){

        if(this.collection.length > 3){
            console.log(this.collection.length);
            var self = this;
            _.each(self.newCollection, function(child){
                self.collection.remove(child);
            });
            this.render();
            $('html, body').animate({
                scrollTop: $('#story-list').offset().top
            }, 500);
        } else {
            this.resultsSignupView = new sbk.ResultsSignupView();
            $(this.el).replaceWith(this.resultsSignupView.render().el);
            $('html, body').animate({
                scrollTop: $('#results-signup').offset().top
            }, 500);
        }
    }
});