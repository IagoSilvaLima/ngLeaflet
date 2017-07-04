(function(){
    'use strict';

    angular.module('ng-leaflet').factory('$leafletMarker',$leafletMarker);

    function $leafletMarker(){
        return{
            createMarker : function(latitude, longitude, draggable){
                return L.marker([latitude, longitude], {draggable : draggable});
            }
        }
    }
})();