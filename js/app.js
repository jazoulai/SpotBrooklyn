window.Stories = Backbone.Model.extend();

window.StoryCollection = Backbone.Collection.extend({
    model:Stories,
    url: 'api/wines'
});

window.StoryListView = Backbone.View.extend({
    id: 'list_container',
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },
    render:function (eventName) {
        _.each(this.model.models, function (wine) {
            $(this.el).append(new StoryListItemView({model:wine}).render().el);
        }, this);
        return this;
    }
});

window.StoryListItemView = Backbone.View.extend({
    className: 'list_item',
    template:_.template($('#list_item_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

window.StoryView = Backbone.View.extend({
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
    list:function () {
        this.storyList = new StoryCollection();
        this.storyListView = new StoryListView({model:this.storyList});
        this.storyList.fetch();
        $('#content_container').html(this.storyListView.render().el);
    },
    storyContent:function (id) {
        this.story = this.storyList.get(id);
        this.storyView = new StoryView({model:this.story});
        $('#content_container').html(this.storyView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();

$(document).ready(function(){

    function ajaxResponse (){
        return $.get('js/data/geo_data.json');
    }

    ajaxResponse().done(function(geoData){
        console.log(geoData);

    var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a').setView([40.685259, -73.977664], 14);
        L.geoJson(geoData).addTo(map);
    });
});