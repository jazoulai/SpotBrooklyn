/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList",
        "!:storyId": "loadStory"
    },

    initialize: function (storyCollection) {
        this.storyCollection = storyCollection;
        this.map = new sbk.MapView({
            storyCollection: storyCollection,
        });
    },

    loadList: function () {
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);



        this.map.resetMap();

        this.map.updateStoryMarkerOnScroll();
    },

    loadStory: function (storyId) {
        var story = this.storyCollection.get(storyId);
        this.storyView = new sbk.StoryView({model: story});
        $('#content_container').html(this.storyView.render().el);

        this.map.renderStoryMarker(story);
    }

});