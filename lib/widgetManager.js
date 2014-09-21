var widgetObjectFactory = require('./objects/widgetObjects.js');
var util = require('./util.js');

/**
* @constructor
* @class WidgetManager
* @param {Object} options
*    	databaseAccessor - the database accessor
*/
var WidgetManager = function (options) {

	// Memory storage
	var _options = options || {};
	this._databaseAccessor = _options.databaseAccessor;
};

WidgetManager.prototype.errorList = {
	InvalidWidgetId:'InvalidWidgetId',
	InvalidDashboardId:'InvalidDashboardId',
	InvalidDataUrl:'InvalidDataUrl'
};

WidgetManager.prototype.addWidget = function(options, cb){
	var _options = options || {};
	var _self = this;
	
	if(!_options.dataurl || _options.dataurl == ''){
		cb(new Error(_self.errorList.InvalidDataUrl));
		return;
	}

	var newWidget = widgetObjectFactory.apiWidgetObject(_options);
	_self._databaseAccessor.insert("WIDGET", newWidget, cb);
};

WidgetManager.prototype.widgetById = function(id, cb){
	var _self = this;
	
	if(!id || id == ''){
		cb(new Error(_self.errorList.InvalidWidgetId));
		return;
	}
	
	var queryObject = {};
	queryObject.id = id;
	
	_self._databaseAccessor.query("WIDGET", queryObject, function(err, widget){
		if(err || !widget){
			cb(util.internalErr());
		}
		else{
			widget = widgetObjectFactory.apiWidgetObject(widget);
			cb(null, widget);
		}
	});
}

WidgetManager.prototype.widgetsByDashboardId = function(did, cb){
	var _self = this;
	
	if(!did || did == ''){
		cb(new Error(_self.errorList.InvalidDashboardId));
		return;
	}
	
	var queryObject = {};
	queryObject.dashboardid = did;
	
	_self._databaseAccessor.queryItems("WIDGET", queryObject, function(err, widgets){
		if(err || !widgets){
			cb(util.internalErr());
		}
		else{
			var apiObjects = [];
			
			widgets.forEach(function(item){
				apiObject =  widgetObjectFactory.apiWidgetObject(item);	
				apiObjects.push(apiObject);
			});
			
			cb(null, apiObjects);
		}
	});
}

WidgetManager.prototype.deleteWidgetById = function(id, cb){
	var _self = this;
	
	if(!id || id == ''){
		cb(new Error(_self.errorList.InvalidWidgetId));
		return;
	}
	
	var queryObject = {};
	queryObject.id = id;
	
	_self._databaseAccessor.remove("WIDGET", queryObject, function(err, widget){
		if(err || !widget){
			cb(util.internalErr());
		}
		else{
			cb(null, null);
		}
	});
}

WidgetManager.prototype.getWidgetData = function(url, cb){
	var _self = this;
	
	if(!url || url == ''){
		cb(new Error(_self.errorList.InvalidDataUrl));
		return;
	}
}

WidgetManager.prototype.accessLevel = function(uid, widgetId, cb){
	var _self = this;
	
	var queryObject = {};
	queryObject.id = widgetId;
	
	_self._databaseAccessor.query("WIDGET", queryObject, function(err, widget){
		if(err || !widget){
			cb(util.internalErr());
		}
		else{
			widget = widgetObjectFactory.apiWidgetObject(widget);
			queryObject.id = widget.dashboardid;
			
			_self._databaseAccessor.query("DASHBOARD", queryObject, function(err, dashboard){
				if(err || !dashboard){
					cb(util.internalErr());
				}
				else{
					cb(null, util.accessLevel(uid, dashboard));
				}
			});
		}
	});
}

var createWidgetManager = function(options){
	return new WidgetManager(options);
};

module.exports = createWidgetManager;