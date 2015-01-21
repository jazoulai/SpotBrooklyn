/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList"
    },
    initialize: function (storyCollection) {
        this.storyCollection = storyCollection;
        sbk.Notifications = {};
        _.extend(sbk.Notifications, Backbone.Events);
    },
    loadList: function () {
        this.bodyElement = $('body');

        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        this.bodyElement.append(this.storyListView.render().el);

        this.partnershipsView = new sbk.PartnershipsView();
        this.bodyElement.append(this.partnershipsView.render().el);

        $('.fa-thumbs-up:first-of-type').hide();
    }
});