var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a');
map.setView([40.685259, -73.977664], 10);

Neighborhoods = Backbone.Model.extend();

NeighborhoodsCollection = Backbone.Collection.extend({
    model: Neighborhoods,
    url: 'js/data/neighborhoods2.json'
});


Stories = Backbone.Model.extend({
    defaults: {
        button_href: "",
        button_text: "< Home"
    }
});

StoryCollection = Backbone.Collection.extend({
    model:Stories,
    url: 'js/data/story_data.json'
});

Spots = Backbone.Model.extend({
});

SpotsCollection = Backbone.Collection.extend({
    model: Spots,
    url: 'js/data/pigeon_fanciers.json'
});

StoryListView = Backbone.View.extend({
    id: 'list_container',
    initialize:function () {
        this.model.on("reset", this.render, this);
    },
    render:function (eventName) {
        _.each(this.model.models, function (story) {
            $(this.el).append(new StoryListItemView({model:story}).render().el);
        }, this);
        return this;
    }
});

StoryListItemView = Backbone.View.extend({
    className: 'list_item',
    template: Handlebars.compile($('#list_item_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

StoryView = Backbone.View.extend({
    id: 'story_container',
    template: Handlebars.compile($('#story_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

SpotView = Backbone.View.extend({
    id: 'spot_container',
    template: Handlebars.compile($('#spot_template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

NavigationView = Backbone.View.extend({
    id: 'navigation_container',
    template: Handlebars.compile($('#navigation_template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"load_list",
        "story/:id":"load_story",
        "spot/:id":"load_spot"
    },
    initialize: function(neighborhoodsCollection, storyCollection, spotsCollection){
        this.neighborhoodsCollection = neighborhoodsCollection;
        this.storyCollection = storyCollection;
        this.spotsCollection = spotsCollection;

    },
    load_list:function (id) {
        this.storyListView = new StoryListView({model:this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        if(map.hasLayer(this.markers || this.spotMarkers)){
            map.removeLayer(this.markers);
        }
    },
    load_story:function (id) {


        //console.log(id);
        //console.log(this.storyCollection);
        //get Stories model object by id
        this.story = this.storyCollection.get(id);
        //instantiate a StoryView using Stories model object as the data model
        this.storyView = new StoryView({model:this.story});
        //render the StoryView's template into a unique div
        $('#content_container').html(this.storyView.render().el);
        //if spot specific marker exists, remove it
        if(map.hasLayer(this.spotMarkers)){
            map.removeLayer(this.markers);
        }
        //ensure that map's SetView is always consistent
        map.setView([40.685259, -73.977664], 11);

        var neighborhoodsCollection = this.neighborhoodsCollection;

        var neighborhoodsCollectionIds = neighborhoodsCollection.pluck('id');

        var storyCollectionNeighborhoods = this.story.attributes.neighborhoods;

        var currentStory = this.story;

        var neighborhoodsIntersection = _.intersection(neighborhoodsCollectionIds, storyCollectionNeighborhoods);

        neighborhoodsIntersection.forEach(function(neighborhood){
            L.geoJson(neighborhoodsCollection.get(neighborhood).attributes, {

                onEachFeature: function(feature, layer){
                    layer.on('click', function(){

                        var spots = L.geoJson(currentStory.attributes.spotMarkers, {
                            onEachFeature: function(feature, layer){
                                layer.on('click', function(){
                                    alert(feature.id);
                                });
                            }
                        });

                        var centerPoint = neighborhoodsCollection.get(neighborhood).attributes.properties.center_point;
                        var zoomLevel = neighborhoodsCollection.get(neighborhood).attributes.properties.zoom_level;

                        map.setView(centerPoint, zoomLevel);

                        spots.addTo(map);
                    })
                }

            }).addTo(map);
        });



        //instantiate NavigationView with stories object as model
        this.navigationView = new NavigationView({model:this.story});
        //render the NavigationView's template into a unique div
        $('#nav').html(this.navigationView.render().el);
    },
    load_spot: function (id){
        //get Spots model object by id
        this.spot = this.spotsCollection.get(id);
        //instantiate a SpotView using Spots model object as the model
        this.spotView = new SpotView({model:this.spot});
        //render the SpotView's template into a unique div
        $('#content_container').html(this.spotView.render().el);
        //This breaks on hard reload
        //map.removeLayer(this.markers);
        //store spot coordinates in a local variable
        this.spotMarkers = this.spot.attributes.spot;
        //center map center coordinates in a local variable
        this.centerSpot = this.spot.attributes.spot.properties.center;
        //setView of map to the spot's coordinates, and specified zoom level
        map.setView(this.centerSpot);
        //render spot's marker onto the map
        L.geoJson(this.spotMarkers).addTo(map);
        this.navigationView = new NavigationView({model:this.spot});
        $('#nav').html(this.navigationView.render().el);
    }
});

$(document).ready(function() {


    var neighborhoodsCollection = new NeighborhoodsCollection();
    neighborhoodsCollection.fetch({
        success: function(){
            var storyCollection = new StoryCollection();
            storyCollection.fetch({
                success: function () {
                    var spotsCollection = new SpotsCollection();
                    spotsCollection.fetch({
                        success: function(){
                            var app = new AppRouter(neighborhoodsCollection, storyCollection, spotsCollection);
                            Backbone.history.start();
                        }
                    });
                }
            });
        }
    });
});