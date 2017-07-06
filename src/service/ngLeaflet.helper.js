(function(){
    'use strict';

    angular.module('ng-leaflet').service('$leafletHelper',$leafletHelper);

    function $leafletHelper(){
        var self = this;
        self.isDefined = function(value){
            return angular.isDefined(value) && value !== null;
        }

        self.remove = function(array,element){
            var position = array.indexOf(element);
            if (position > -1)
                array.splice(position,1);
        }
    }
    
})();