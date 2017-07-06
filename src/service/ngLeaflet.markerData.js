(function(){
    'use strict';

    angular.module('ng-leaflet').service('$leafletMarkerData',$leafletMarkerData);

    $leafletMarkerData.$inject = [];

    function $leafletMarkerData(){
        var self = this;
        var markers = [];

        self.getMarkers = _getMarkers;
        self.clearMarkers = _clearMarkers;
        self.registerMarker = _registerMarker;
        self.removeMarker = _removeMarker;

        function _registerMarker(marker){
            markers.push(marker);
        }

        function _removeMarker(marker){
            
        }

        function _clearMarkers(){
            markers = [];
        }

        function _getMarkers(){
            return markers;
        }
    }
})();