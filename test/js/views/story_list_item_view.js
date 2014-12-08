/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'story-list-item',
    template: Handlebars.compile($('#story-list-item-template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events : {
        'click .plus-one' : 'plusOne'
    },
    plusOne: function (ev) {
        $(ev.currentTarget).toggleClass('select');
        $(ev.currentTarget).siblings().removeClass('select');
        var title = this.model.get('id');
        var vote = $(ev.currentTarget).find('span').html();
        ga('send', 'event', vote, 'click', title, 1);
    }
});