/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "story/:id": "loadStory",
        "spot/:id": "loadSpot"
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
        this.storyListView = new sbk.StoryListView({model: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        this.map.resetMap();
    },
    loadStory: function (id) {
        var story = this.storyCollection.get(id);
        var storyView = new sbk.StoryView({model: story});
        $('#content_container').html(storyView.render().el);
        this.map.resetMap();

        this.map.renderMap(story);
        var navigationView = new sbk.NavigationView({model: story});
        $('#nav').html(navigationView.render().el);
    },
    loadSpot: function (id) {
        var spot = this.spotCollection.get(id);
        var spotView = new sbk.SpotView({model: spot});
        $('#content_container').html(spotView.render().el);
        var navigationView = new sbk.NavigationView({model: spot});
        $('#nav').html(navigationView.render().el);
    }
});