/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.Story = Backbone.Model.extend({
    defaults: {
        back_button_href: "",
        back_button_text: "< Home"
    },

    /**
     * Returns the spot ID after the one passed in.  If the passed spot ID is
     * the last, returns undefined.
     *
     * @param searchSpotId The spot to find the spot after.
     */
    nextSpotIdFrom: function (searchSpotId) {
        var spotIds = this.get('spots');

        // Look through our spotIds trying to find the spot ID which was passed
        // in.
        var i = 0;
        while (i < spotIds.length) {
            var spotId = spotIds[i];
            if (spotId === searchSpotId) {
                return spotIds[i + 1];
            }
            i += 1;
        }
    },

    /**
     * Returns the spot ID before the spot ID passed in.  If the passed spot
     * ID is the first, returns undefined.
     *
     * @param spotId The spot ID to find the spot ID before.
     */
    previousSpotIdFrom: function (searchSpotId) {
        var spotIds = this.get('spots');

        // Look through our spotIds trying to find the spot ID which was passed
        // in.
        var i = 0;
        while (i < spotIds.length) {
            var spotId = spotIds[i];
            if (spotId === searchSpotId) {
                return spotIds[i - 1];
            }
            i += 1;
        }
    }
});