/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList",
        ":story": "loadStory"
    },
    initialize: function (storyCollection) {
        this.storyCollection = storyCollection;

        sbk.Notifications = {};
        _.extend(sbk.Notifications, Backbone.Events);
    }

    ,
    loadList: function () {
        this.bodyElement = $('body');
    // Partnership View
        this.partnershipsView = new sbk.PartnershipsView();
        this.bodyElement.append(this.partnershipsView.render().el);
    // About View
        this.aboutView = new sbk.AboutView();
        this.bodyElement.append(this.aboutView.render().el);
    },
    loadStory: function(storyId) {
       var storyModel = this.storyCollection.get(storyId);
    // Story Map View
        this.storyMapView = new sbk.StoryMapView({model: storyModel});
    }
});