(function(){
    'use strict';

    angular.module('ng-leaflet').directive('ngLeafletMarker',ngLeafletMarker);

    ngLeafletMarker.$inject = ['$leafletHelper','$leafletMarkerConvert', '$leafletMarkerData'];

    function ngLeafletMarker($leafletHelper, $leafletMarkerConvert, $leafletMarkerData){
        return {
            require : '^^ngLeafletMap',
            restrict : 'E',
            scope :{
                ngConfigMarker : "=",
                ngMarkers : "="
            },
            link :_link
        }

        function _link(scope, element, attrs, mapController){   
            if($leafletHelper.isDefined(scope.ngConfigMarker)){
                scope.ngConfigMarker.readOnly = $leafletHelper.isDefined(scope.ngConfigMarker.readOnly) ? scope.ngConfigMarker.readOnly : false;
                scope.ngConfigMarker.limit = $leafletHelper.isDefined(scope.ngConfigMarker.limit) ? scope.ngConfigMarker.limit: 23;
            }

            scope.ngMarkers = $leafletHelper.isDefined(scope.ngMarkers) ? scope.ngMarkers: [];
            
            var map = mapController.map;
            
            

            scope.$watch('ngMarkers',function(newValue,oldValue){
                if(oldValue != newValue){
                    mapController.clearMarkers();
                    newValue.forEach(function(marker){
                        mapController.addMarker(marker);
                        if (!scope.ngConfigMarker.readOnly){
                            _markersEdit(marker);
                        }
                    });
                }      
            });

            if (!scope.ngConfigMarker.readOnly){
                map.on('click',function(e){
                    if (scope.ngMarkers.length  >= scope.ngConfigMarker.limit){
                        alert('Limite de marcadores atingidos')
                    }
                    else{
                        var marker = $leafletMarkerConvert.createMarker(e.latlng.lat, e.latlng.lng, true);
                        mapController.addMarker(marker);
                        _markersEdit(marker);
                    } 
                });
            }


            function _markersEdit(marker){
                scope.ngMarkers.push(marker);
                $leafletMarkerData.registerMarker(marker);

                marker.on('contextmenu',function(e){
                    mapController.removeMarker(marker);
                });

                marker.on('remove' ,function(e){
                    $leafletHelper.remove(scope.ngMarkers, marker);
                    $leafletMarkerData.removeMarker(marker);
                })
            }
        }
    }
})();