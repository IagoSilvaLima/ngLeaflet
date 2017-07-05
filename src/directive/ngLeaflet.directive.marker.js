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
                scope.ngConfigMarker.readOnly = $leafletHelper.isDefined(scope.ngConfigMarker.readOnly) ? scope.ngConfigMarker.readOnly : false;
                scope.ngConfigMarker.limit = $leafletHelper.isDefined(scope.ngConfigMarker.limit) ? scope.ngConfigMarker.limit: 23;
                scope.markers = $leafletHelper.isDefined(scope.markers) ? scope.markers: [];
            }
            
            var map = mapController.map;
            
            scope.markers.forEach(function(marker) {
                mapController.addMarker(marker);   
            });

            scope.$watch('markers',function(newValue,oldValue){
                if(oldValue != newValue){
                    mapController.clearMarkers();
                    newValue.forEach(function(marker){
                        mapController.addMarker(marker);
                    });
                }      
            });

            if (!scope.ngConfigMarker.readOnly){
                map.on('click',function(e){
                    if (scope.markers.length  >= scope.ngConfigMarker.limit){
                        alert('Limite de marcadores atingidos')
                    }
                    else{
                        var marker = $leafletMarker.createMarker(e.latlng.lat, e.latlng.lng, true);
                        scope.markers.push(marker);
                        $leafletMarkerData.registerMarker(marker);
                        mapController.addMarker(marker);
                        marker.on('contextmenu',function(e){
                            mapController.removeMarker(marker);
                        });

                        marker.on('remove' ,function(e){
                            $leafletMarkerData.removeMarker(marker);
                        })
                    } 
                });
            }
        }
    }
})();