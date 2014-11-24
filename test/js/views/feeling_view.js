/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FeelingView = Backbone.View.extend({
    tagName: 'li',
    className: 'feeling',
    template: Handlebars.compile($('#feeling_template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click' : 'navigate_feeling'
    },
    navigate_feeling : function(){
        var feelingId = this.model.get('id');
        sbk.app.navigate('!' + feelingId, {trigger: true});
    }
});