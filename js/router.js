/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "load_list",
        "story/:id": "load_story",
        "spot/:id": "load_spot"
    },
    initialize: function (neighborhoodCollection, storyCollection, spotCollection) {
        this.storyCollection = storyCollection;
        this.spotCollection = spotCollection;
        this.neighborhoodCollection = neighborhoodCollection;
        this.map = new sbk.Map({
            storyCollection: storyCollection,
            spotCollection: spotCollection,
            neighborhoodCollection: neighborhoodCollection
        });
    },
    load_list: function () {
        this.storyListView = new sbk.StoryListView({model: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        this.map.reset_map();
    },
    load_story: function (id) {
        var story = this.storyCollection.get(id);
        var storyView = new sbk.StoryView({model: story});
        $('#content_container').html(storyView.render().el);
        this.map.reset_map();

        this.map.render(story);
        //sbk.map.render_neighborhood_polygons(neighborhoodsCollectionIds, storyNeighborhoods, neighborhoods);
        //sbk.map.render_story_markers(spotMarkers);
        var navigationView = new sbk.NavigationView({model: story});
        $('#nav').html(navigationView.render().el);
    },
    load_spot: function (id) {
        var spot = this.spotCollection.get(id);
        var spotView = new sbk.SpotView({model: spot});
        $('#content_container').html(spotView.render().el);
        var navigationView = new sbk.NavigationView({model: spot});
        $('#nav').html(navigationView.render().el);
    }
});