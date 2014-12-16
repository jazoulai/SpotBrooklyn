/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'story-list-item',
    template: Handlebars.compile($('#story-list-item-template').html()),
    render: function () {
        this.voteButtonsView = new sbk.VoteButtonsView();
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).append(this.voteButtonsView.render().el);
        return this;
    },
    events: {
        'click span' : 'vote'
    },
    vote: function (ev) {
        var target = $(ev.currentTarget);
        var votePrompt = target.parent().siblings('.scrollLink');
        if(target.hasClass('select') || target.siblings().hasClass('select')) {
            votePrompt.html('You voted!');
        } else {
            votePrompt.html('Click to Vote!');
        }
        var vote = $(ev.currentTarget).attr('aria-label');
        var title = this.model.get('headline');
        ga('send', 'event', vote, 'click', title, 1);
    }
});