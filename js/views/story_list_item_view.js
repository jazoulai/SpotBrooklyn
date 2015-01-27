/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'story-list-item',
    template: Handlebars.compile($('#story-list-item-template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        _.defer(function(view){
            view.horizontalStoryPreviews();
        }, this);
        return this;
    },
    events: {
        'click' : 'navigateToStory'
    },
    horizontalStoryPreviews: function(){
        var self = this;

        if (window.innerHeight < window.innerWidth) {
            $(this.el).addClass('horizontal');
        } else {
            $(this.el).removeClass('horizontal');
        }

        $(window).resize(function(){
            if (window.innerHeight < window.innerWidth) {
                $(self.el).addClass('horizontal');
            } else {
                $(self.el).removeClass('horizontal');
            }
        });
    },
    navigateToStory: function(){
       var storyId = this.model.get('id');
       sbk.app.navigate(! + storyId, {trigger: true});
    }
});