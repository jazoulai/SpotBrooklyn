var current_story_spots = null;
var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a');
map.setView([40.685259, -73.977664], 10);
map.on('zoomend', function(e){

   if(current_story_spots != null) {

       if (map.getZoom() <= 12 && map.hasLayer(current_story_spots)) {
           //map.removeLayer(current_story_spots);
       } else if (map.getZoom() > 12 && !map.hasLayer(current_story_spots)) {

           //map.addLayer(current_story_spots);
       }
   }
});


Neighborhoods = Backbone.Model.extend();

NeighborhoodsCollection = Backbone.Collection.extend({
    model: Neighborhoods,
    url: 'js/data/neighborhoods2.json'
});


Stories = Backbone.Model.extend({
    defaults: {
        back_button_href: "",
        back_button_text: "< Home"
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
        map.setView([40.685259, -73.977664], 10);
    },
    load_story:function (id) {

        //load story
        this.story = this.storyCollection.get(id);
        this.storyView = new StoryView({model:this.story});
        $('#content_container').html(this.storyView.render().el);

        //filter story-specific neighborhood ploygons
        var neighborhoodsCollection = this.neighborhoodsCollection;
        var neighborhoodsCollectionIds = neighborhoodsCollection.pluck('id');
        var storyCollectionNeighborhoods = this.story.attributes.neighborhoods;
        var currentStory = this.story;
        var neighborhoodsIntersection = _.intersection(neighborhoodsCollectionIds, storyCollectionNeighborhoods);

        var neighborhoodPolygons = [];
        window.current_story_spots = currentStory.attributes.spotMarkers;
        var spotId = currentStory.attributes.spotMarkers.id;

        //load and set marker hrefs for each neighborhood polygon
        neighborhoodsIntersection.forEach(function(neighborhood){
            neighborhoodPolygons.push(neighborhoodsCollection.get(neighborhood).attributes);
        });


        L.geoJson(neighborhoodPolygons, {
            onEachFeature: function(feature, layer){
                layer.on('click', function(){

                    var neighborhoodCenter = feature.properties.center_point;
                    var neighborhoodZoom = feature.properties.zoom_level;
                    map.setView(neighborhoodCenter, neighborhoodZoom);


                    L.geoJson(current_story_spots, {
                        onEachFeature: function(feature, layer){
                            layer.on('click', function(){
                                location.href = '#/spot/' + spotId;
                            });
                        }
                    }).addTo(map);
                });
            }
        }).addTo(map);





        /*L.geoJson(neighborhoodsCollection.get(neighborhood).attributes, {
            onEachFeature: function(feature, layer){
                layer.on('click', function(){
                    window.current_story_spots = L.geoJson(currentStory.attributes.spotMarkers, {
                        onEachFeature: function(feature, layer){
                            layer.on('click', function(){
                                location.href = '#/spot/willie';
                            });
                        }
                    });
                    //set neighborhood-specific center point and zoom level
                    var centerPoint = neighborhoodsCollection.get(neighborhood).attributes.properties.center_point;
                    var zoomLevel = neighborhoodsCollection.get(neighborhood).attributes.properties.zoom_level;
                    map.setView(centerPoint, zoomLevel);
                    current_story_spots.addTo(map);
                })
            }
        }).addTo(map);*/















        //instantiate and render NavigationView with stories object as model
        this.navigationView = new NavigationView({model:this.story});
        $('#nav').html(this.navigationView.render().el);
    },
    load_spot: function (id){
        //get Spots model object by id
        this.spot = this.spotsCollection.get(id);
        //instantiate a SpotView using Spots model object as the model
        this.spotView = new SpotView({model:this.spot});
        //render the SpotView's template into a unique div
        $('#content_container').html(this.spotView.render().el);




        /*//This breaks on hard reload
        //map.removeLayer(this.markers);
        //store spot coordinates in a local variable
        this.spotMarkers = this.spot.attributes.spot;
        //center map center coordinates in a local variable
        this.centerSpot = this.spot.attributes.spot.properties.center;
        //setView of map to the spot's coordinates, and specified zoom level
        map.setView(this.centerSpot);
        //render spot's marker onto the map
        L.geoJson(this.spotMarkers).addTo(map);*/

        this.navigationView = new NavigationView({model:this.spot});
        $('#nav').html(this.navigationView.render().el);
        console.log(this.spot)
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