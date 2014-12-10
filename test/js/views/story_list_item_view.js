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
    events : {
        'click .plus-one' : 'plusOne'
    },
    plusOne: function (ev) {
        $(ev.currentTarget).toggleClass('select');
        $(ev.currentTarget).siblings().removeClass('select');
        var vote = $(ev.currentTarget).find('span').html();
        var title = this.model.get('headline');
        console.log(vote + ' ' + title);
        ga('send', 'event', vote, 'click', title, 1);
    }
});