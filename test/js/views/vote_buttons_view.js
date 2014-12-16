    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.VoteButtonsView = Backbone.View.extend({
    className: 'vote',
    template: Handlebars.compile($('#vote-buttons-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    events : {
        'click span' : 'voteColorToggle'
    },
    voteColorToggle: function(ev){
        var target = $(ev.currentTarget);
        target.toggleClass('select');
        target.siblings().removeClass('select');
    }


});