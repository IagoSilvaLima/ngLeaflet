(function(){
    'use strict';

    angular.module('ng-leaflet').service('$leafletHelper',$leafletHelper);

    function $leafletHelper(){
        var self = this;
        self.isDefined = function(value){
            return angular.isDefined(value) && value !== null;
        }
    }
    
})();