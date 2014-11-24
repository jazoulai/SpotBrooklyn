/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryView = Backbone.View.extend({
    tagName: 'li',
    className: 'story',
    template: Handlebars.compile($('#story-template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }/*,
    events: {
        'click' : 'navigate_feeling'
    },
    navigate_feeling : function(){
        var feelingId = this.model.get('id');
        sbk.app.navigate('!' + feelingId, {trigger: true});
    }*/
});