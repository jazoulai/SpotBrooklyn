/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.MapView = Backbone.View.extend({

    initialize: function (collections) {
        this.storyCollection = collections.storyCollection;
        this.lmap = L.mapbox.map('map', 'spotbrooklyn.06i7wrk9', {
            attributionControl: false,
            zoomControl: false
        });


    },

    resetMap: function () {
        var self = this;
        self.lmap.setView([40.685259, -73.977664], 10);
    },

    renderSpotMarkers: function(){

        var spotMarkers = this.storyCollection.pluck('geometry');

        this.spotMarkersLayer = new L.GeoJSON(spotMarkers).addTo(this.lmap);





    }

});
