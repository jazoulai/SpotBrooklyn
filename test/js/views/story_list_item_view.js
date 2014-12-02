/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryListItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'story-list-item-container',
    template: Handlebars.compile($('#story-list-item-template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events : {
        'click .like' : 'like',
        'click .dislike' : 'dislike'
    },
    like: function () {
        var title = this.model.get('id');
        ga('send', 'event', 'dislike', 'click', title, 1);

    },
    dislike: function () {
        var title = this.model.get('id');
        ga('send', 'event', 'like', 'click', title, 1);
    }
});