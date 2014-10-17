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

        var self = this;

        /*create an id for each spots geometry
        var spotMarkers = this.storyCollection.pluck('geometry');
        _.each(spotMarkers, function(spot){
            spotMarkers.id = 1;
        });
        console.log(spotMarkers);
        */

        /*
        * Rip the icon scroller from the desktop teaser site
        *
        * */

        var m1 = L.marker([40.699570, -73.925093]);
        var m2 = L.marker([40.702823, -73.981398]);
        var m3 = L.marker([40.617952, -73.919772]);
        var m4 = L.marker([40.577937, -73.970240]);


        if (1 > 0) {

            self.lmap.addLayer(m1);

        } else {

            self.lmap.removeLayer(m1);

        }












    }

});
