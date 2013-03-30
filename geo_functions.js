
var R = 6371000; //mean radius of the earth in metres

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}
/* Get the great-circle distance between two points
   using the Haversine formula
   
   @param {Number} lat1, lon1: first point in decimal degrees
   @param {Number} lat2, lon2: second point in decimal degrees
   @returns (Number) distance between points in meters
*/
function getDistance(lat, lon1, lat2, lon2)
{
    var dlon = (lon2 - lon1).toRad();
    var dlat = (lat2 - lat1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();
    var a = Math.sin(dlat/2)*Math.sin(dlat/2) + 
	Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)*Math.sin(dlon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = R * c;
    return distance;
}

/* Get the relative bearing between two points
   
   @param {Number} lat1, lon1: first point in decimal degrees
   @param {Number} lat2, lon2: second point in decimal degrees
   @returns (Number) bearing between points in decimal degrees
*/

function getBearing(lat1, lon1, lat2, lon2)
{
    var dlon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();
    var y = Math.sin(dlon) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) -
        Math.sin(lat1)*Math.cos(lat2)*Math.cos(dlon);
    var bearing = Math.atan2(y, x).toDeg();
    return bearing;
}

/* Get the coorinate a given distance from a given point at 
   a given bearing.
   
   @param {Number} lat1, lon1: start point in decimal degrees
   @param {Number} bearing: bearing in decimal degrees
   @param {Number} distance: distance in meters
   @returns (Object) resulting coordinate.lat, coordinate.lon 
*/ 
function coordAtDistBearFromPoint(lat1, lon1, bearing, distance)
{
    var bearing = bearing.toRads();
    var lat = lat1.toRad();
    var lon = lon1.toRad(); 
    var endLat = Math.asin( Math.sin(lat)*Math.cos(distance/R) + 
			    Math.cos(lat)*Math.sin(distance/R)*Math.cos(bearing) );
    var endLon = lon1 + 
	Math.atan2(Math.sin(bearing)*Math.sin(distance/R)*Math.cos(lat), 
                   Math.cos(distance/R)-Math.sin(lat)*Math.sin(endLat));
    var coord = {
	lat : endLat
	lon : endLon
    };
    return coord;
}

