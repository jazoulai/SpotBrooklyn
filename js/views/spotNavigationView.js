/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SpotNavigationView = Backbone.View.extend({
    initialize: function(models) {
        this.story = models.story;
        this.spot = models.spot;
    },
    id: 'navigation_container',
    template: Handlebars.compile($('#spot_navigation_template').html()),
    render: function () {
        var self = this;
        var data = this.story.toJSON();
        data.nextSpotId = self.story.nextSpotIdFrom(self.spot.get('id'));
        data.previousSpotId = self.story.previousSpotIdFrom(self.spot.get('id'));
        $(this.el).html(this.template(data));

        return this;
    }
});