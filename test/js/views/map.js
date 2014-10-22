/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.MapView = Backbone.View.extend({

    initialize: function (collections) {
        this.storyCollection = collections.storyCollection;
        this.spotCollection = collections.spotCollection;
        this.lmap = L.mapbox.map('map', 'spotbrooklyn.06i7wrk9', {
            attributionControl: false,
            zoomControl: false
        });


    },

    updateStoryMarkerOnScroll: function(){
        var self = this;
        var height = $(document).height() * 0.60;
        var listItem =  $('.list_item');

        this.storyMarkerLayer = new L.GeoJSON([]);

        function renderStoryMarker () {
            if(self.storyMarkerLayer){
                self.lmap.removeLayer(self.storyMarkerLayer);
            }
            listItem.each(function(index){
                if($(this).position().top <= height) {
                    listItem.removeAttr('id', 'marker');
                    listItem.eq(index).attr('id', 'marker');
                }
            });

            //TODO: make seperate function
            var storyId = $('#marker div:first').attr('id');
            var story = self.storyCollection.get(storyId);

            var storyGeometry = [];
            var storyMarker = story.get("geometry");
            storyMarker.id = storyId;
            storyGeometry.push(storyMarker);


            self.storyMarkerLayer = new L.GeoJSON(storyGeometry, {
                onEachFeature: function(feature, layer){
                    layer.on('click', function () {
                       sbk.app.navigate('!' + feature.id, {trigger: true});
                    });
                }
            });
            self.lmap.addLayer(self.storyMarkerLayer);
        }
        renderStoryMarker();

        var didScroll = false;
        $('#list_container').on('scroll', function(){
            didScroll = true;
            renderStoryMarker();
        });


        setInterval(function() {
            if(didScroll) {
                didScroll = false;
                console.log('You scrolled');
            }
        }, 2000);


    },

    resetMap: function () {
        var self = this;
        self.lmap.setView([40.685259, -73.977664], 10);

        if(this.storyMarkerLayer){
            self.lmap.removeLayer(this.storyMarkerLayer);
        }
    },

    renderStoryMarker: function (story) {
        var self = this;
        if(this.storyMarkerLayer){
            self.lmap.removeLayer(this.storyMarkerLayer);
        }

        var storyGeo = story.get('geometry');
        console.log(storyGeo);
        this.storyMarkerLayer = new L.GeoJSON(storyGeo);
        this.lmap.setView([
            storyGeo.coordinates[1],
            storyGeo.coordinates[0]
        ], 12);
        this.lmap.addLayer(this.storyMarkerLayer);

    }








});
