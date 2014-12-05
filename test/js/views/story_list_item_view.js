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
    plusOne: function () {
        var title = this.model.get('id');
        ga('send', 'event', '+1', 'click', title, 1);
        alert('+1');

    }
});