(function(){
    'use strict';

    angular.module('ng-leaflet').directive('ngLeafletMarker',ngLeafletMarker);

    ngLeafletMarker.$inject = ['$leafletHelper','$leafletMarker', '$leafletMarkerData'];

    function ngLeafletMarker($leafletHelper, $leafletMarker, $leafletMarkerData){
        return {
            require : '^^ngLeafletMap',
            restrict : 'E',
            scope :{
                ngConfigMarker : "=",
                markers : "="
            },
            link :_link
        }

        function _link(scope, element, attrs, mapController){
            
            if($leafletHelper.isDefined(scope.ngConfigMarker)){
                scope.ngConfigMarker.clickable = $leafletHelper.isDefined(scope.ngConfigMarker.clickable) ? scope.ngConfigMarker.clickable : false;
                scope.ngConfigMarker.draggable = $leafletHelper.isDefined(scope.ngConfigMarker.draggable) ? scope.ngConfigMarker.draggable : false;
                scope.ngConfigMarker.limit = $leafletHelper.isDefined(scope.ngConfigMarker.limit) ? scope.ngConfigMarker.limit: 23;
                scope.markers = $leafletHelper.isDefined(scope.markers) ? scope.markers: [];
            }
            
            var map = mapController.map;
            
            scope.markers.forEach(function(marker) {
                mapController.addMarker(marker);   
            });

            if (scope.ngConfigMarker.clickable){
                map.on('click',function(e){
                    if (scope.markers.length  >= scope.ngConfigMarker.limit){
                        alert('Limite de marcadores atingidos')
                    }
                    else{
                        var marker = $leafletMarker.createMarker(e.latlng.lat, e.latlng.lng, scope.ngConfigMarker.draggable);
                        scope.markers.push(marker);
                        $leafletMarkerData.registerMarker(marker);
                        mapController.addMarker(marker);
                        marker.on('contextmenu',function(e){
                            marker.remove();
                        });
                    }
                    
                });
            }
        }
    }
})();