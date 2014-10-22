/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList",
        //why do these routes trigger the wrong function when they are out of this order?
        "!about" : "loadAbout",
        "!:storyId": "loadStory"
    },

    initialize: function (storyCollection) {
        this.storyCollection = storyCollection;
        this.map = new sbk.MapView({
            storyCollection: storyCollection
        });

    },

    loadList: function () {
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        this.map.resetMap();
        this.map.updateStoryMarkerOnScroll();
        this.listNavigationView = new sbk.ListNavigationView();
        $('#nav').html(this.listNavigationView.render().el);
    },

   loadStory: function (storyId) {
        var story = this.storyCollection.get(storyId);
        this.storyView = new sbk.StoryView({model: story});
        $('#content_container').html(this.storyView.render().el);
        this.map.renderStoryMarker(story);
        this.storyNavigationView = new sbk.StoryNavigationView();
        $('#nav').html(this.storyNavigationView.render().el);
    },

    loadAbout: function () {
        this.aboutView = new sbk.AboutView();
        $('#content_container').html(this.aboutView.render().el);
    }
});