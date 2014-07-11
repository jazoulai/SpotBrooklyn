/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList",
        "!:storyId": "loadStory", //does the storyID argument start at the route?
        "!:storyId/:spotId": "loadSpot"
    },

    initialize: function (neighborhoodCollection, storyCollection, spotCollection) {
        this.storyCollection = storyCollection;
        this.spotCollection = spotCollection;
        this.neighborhoodCollection = neighborhoodCollection;
        this.map = new sbk.MapView({
            storyCollection: storyCollection,
            spotCollection: spotCollection,
            neighborhoodCollection: neighborhoodCollection
        });
    },

    loadList: function () {
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);  //how else should we insert views into the dom?
        this.map.resetMap();
    },

    loadStory: function (storyId) {
        var story = this.storyCollection.get(storyId);
        var storyView = new sbk.StoryView({model: story});
        $('#content_container').html(storyView.render().el);
        this.map.resetMap();
        this.map.renderStory(story);


        var storyNavigationView = new sbk.StoryNavigationView({model: story});
        $('#nav').html(storyNavigationView.render().el);
    },

    loadSpot: function (storyId, spotId) {
        var spot = this.spotCollection.get(spotId);
        var spotView = new sbk.SpotView({model: spot});
        var story = this.storyCollection.get(storyId);
        $('#content_container').html(spotView.render().el);

        this.map.renderStory(story);
        this.map.zoomToSpot(spot);

        var spotNavigationView = new sbk.SpotNavigationView({story: story, spot: spot});
        $('#nav').html(spotNavigationView.render().el);
    }
});