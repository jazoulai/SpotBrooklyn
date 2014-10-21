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
        this.lmap = new sbk.MapView({
            storyCollection: storyCollection
        });
    },

    loadList: function () {
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        this.lmap.resetMap();
        this.lmap.updateMarkerOnScroll();
    },

    loadStory: function () {
        console.log('story is locked and ready!');
    }

});