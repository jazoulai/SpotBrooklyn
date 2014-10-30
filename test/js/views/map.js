/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.MapView = Backbone.View.extend({

    initialize: function (collections) {
        this.storyCollection = collections.storyCollection;
        this.spotCollection = collections.spotCollection;
        this.lmap = L.mapbox.map('map', 'spotbrooklyn.4e3989f5', {
            attributionControl: false,
            zoomControl: false
        });
        ga('send', 'event', 'test', 'load map');
    },

    //todo: this function comes with a huge performance penalty. FIX!!
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

            var spotIcon = L.icon({
                iconUrl: 'http://spotbrooklyn.com.s3.amazonaws.com/images/icons/spot_icon.svg',
                iconSize: [32, 37],
                iconAnchor: [16, 37],
                popupAnchor: [0, -28]
            });

            self.storyMarkerLayer = new L.GeoJSON(storyGeometry, {
                onEachFeature: function(feature, layer){
                    layer.on('click', function () {
                       sbk.app.navigate('!' + feature.id, {trigger: true});
                    });
                },
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: spotIcon});
                }
            });
            var markerLoad = self.lmap.addLayer(self.storyMarkerLayer);
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
            }
        }, 2000);
    },

    resetMap: function () {
        var self = this;
        self.lmap.setView([40.685259, -73.977664], 10);

        if(this.storyMarkerLayer){
            self.lmap.removeLayer(this.storyMarkerLayer);
        }

        ga('send', 'event', 'test', 'reset map');
    },

    renderStoryMarker: function (story) {
        var self = this;
        if(this.storyMarkerLayer){
            self.lmap.removeLayer(this.storyMarkerLayer);
        }
        var storyGeo = story.get('geometry');
        var spotIcon = L.icon({
            iconUrl: 'http://spotbrooklyn.com.s3.amazonaws.com/images/icons/spot_icon.svg',
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        this.storyMarkerLayer = new L.GeoJSON(storyGeo, {
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: spotIcon});
            }
        });
        this.lmap.addLayer(this.storyMarkerLayer);
        this.lmap.setView([
            storyGeo.coordinates[1],
            storyGeo.coordinates[0]
        ], 12);

        ga('send', 'event', 'test', 'zoom to spot marker');

    }








});
