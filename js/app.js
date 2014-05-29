Stories = Backbone.Model.extend();

StoryCollection = Backbone.Collection.extend({
    model:Stories,
    url: 'js/data/story_data.json'
});

StoryListView = Backbone.View.extend({
    id: 'list_container',
    initialize:function () {
        this.model.on("reset", this.render, this);
    },
    render:function (eventName) {
        console.log(this.model);
        _.each(this.model.models, function (story) {
            $(this.el).append(new StoryListItemView({model:story}).render().el);
        }, this);
        return this;
    }
});

StoryListItemView = Backbone.View.extend({
    className: 'list_item',
    template:_.template($('#list_item_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

StoryView = Backbone.View.extend({
    id: 'story_container',
    template:_.template($('#story_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"list",
        "story/:id":"storyContent"
    },
    initialize: function(storyListCollection){
        this.storyListCollection = storyListCollection;
        console.log(this.storyListCollection);
    },
    list:function () {
        this.storyListView = new StoryListView({model:this.storyListCollection});
        $('#content_container').html(this.storyListView.render().el);
    },
    storyContent:function (id) {
        this.story = this.storyListCollection.get(id);
        this.storyView = new StoryView({model:this.story});
        $('#content_container').html(this.storyView.render().el);
    }
});

$(document).ready(function(){
    var storyListCollection = new StoryCollection();
    storyListCollection.fetch({
        success: function(){
            var app = new AppRouter(storyListCollection);
            Backbone.history.start();
        }
    });

    function ajaxResponse (){
        return $.get('js/data/geo_data.json');
    }

    ajaxResponse().done(function(geoData){
    var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a').setView([40.685259, -73.977664], 14);
        L.geoJson(geoData).addTo(map);
    });
});