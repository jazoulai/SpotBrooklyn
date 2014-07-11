/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryNavigationView = Backbone.View.extend({
    id: 'navigation_container',
    template: Handlebars.compile($('#story_navigation_template').html()),
    render: function () {
        var self = this;
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).find('.home').on('click', function (e) {
            e.preventDefault();
            sbk.app.navigate('', { trigger: true } );
        });
        $(this.el).find('.first_spot').on('click', function (e) {
            e.preventDefault();
            sbk.app.navigate('!' + self.model.get('id') + '/' + self.model.get('spots')[0],
                { trigger: true });
        });
        return this;
    }
});