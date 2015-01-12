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
        'click' : 'vote'
    },
    vote: function (ev) {
        var self = this;
        $(this.el).css('box-shadow', '0 1px 1px 0px #888888');
        $.when(setTimeout( function() {
            $(self.el).css('box-shadow', '0 2px 5px 1px #888888');
        }, 75)).then(function(){

            var title = this.model.get('headline');

            if($(self.el).find('.fa-thumbs-up:last-of-type').hasClass('liked')){

                $(self.el).find('.liked').animate({
                    color: "#D3D3D3"
                });
                $(self.el).find('.fa-thumbs-up:last-of-type').removeClass('liked');
                ga('send', 'event', 'like', 'click', title, 1);

            } else {

                $(self.el).find('.fa-thumbs-up:first-of-type').fadeIn(500, function(){
                    setTimeout(function(){
                        $(self.el).find('.fa-thumbs-up:last-of-type').animate({
                            color: "red"
                        }).addClass('liked');
                        $(self.el).find('.fa-thumbs-up:first-of-type').fadeOut(500);
                    }, 200);
                });
                ga('send', 'event', 'unlike', 'click', title, 1);
            }
        });
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
    }
});