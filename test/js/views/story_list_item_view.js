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
    vote: function (ev) {
        var vote = $(ev.currentTarget).attr('aria-label');
        var title = this.model.get('headline');
        ga('send', 'event', vote, 'click', title, 1);
    }
});