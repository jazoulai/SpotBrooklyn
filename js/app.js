var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a');
map.setView([40.685259, -73.977664], 10);

Neighborhood = Backbone.Model.extend();

NeighborhoodsCollection = Backbone.Model.extend({
    model: Neighborhood,
    url: 'js/data/neighborhoods.json'
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
        this.storyCollection = storyCollection;g
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
        map.setView([40.685259, -73.977664], 10);





        //store StoryCollection's neighborhood array in a variable
        /*var storyNeighborhoods = this.story.attributes.neighborhoods;
        //for each neighborhood in the neighborhood array, do the following:
        storyNeighborhoods.forEach(function(neighborhood){
            //store all objects in the neighborhoodCollection
            var hood = neighborhoodsCollection.attributes;
            var nabe = [];
            var nabeGeo = [];

            //increment over each neighborhood object, and neighborhood string value
            for(var i = 0; i < _.size(hood); i++){
                //increment over each neighborhood value, and add it to the nabe array
                nabe.push(neighborhoodsCollection.attributes[i].properties.neighborhood);
                //increment over each neighborhood obkect, and add it to the nabeGeo array
                nabeGeo.push(neighborhoodsCollection.attributes[i]);
                //check if each item in the storyNeighborhood array is in the nabe array
                var filterNabe = $.inArray(neighborhood, nabe);
                //if the neighborhood exists, load the current neighborhood object
                if(filterNabe > -1){
                    L.geoJson(nabeGeo).addTo(map);
                }else{
                    console.log('not found')
                }
            }
        });*/


        /*
        * NEXT STEPS
        * create an L.geoJson onEachFeature function that sets the map view and loads the markers within that neighborhood.
        *create an L.geoJson onEachFeature that sets the location.href for that particular spot
        *create a Next button in the NavigationTemplate
        *create a Json record in each spot that references the next spot in order
        * */

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