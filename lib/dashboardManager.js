var dashboardObjectFactory = require('./objects/dashboardObjects.js');
var util = require('./util.js');

/**
* @constructor
* @class DashboardManager
* @param {Object} options
*    	databaseAccessor - the database accessor
*/
var DashboardManager = function (options) {

	// Memory storage
	var _options = options || {};
	this._databaseAccessor = _options.databaseAccessor;
};

DashboardManager.prototype.errorList = {
	NullDashboardName:'NullDashboardName',
	InvalidDashboardId:'InvalidDashboardId',
	InvalidUserId:'InvalidUserId',
	NullObject:'NullObject'
};

DashboardManager.prototype.addDashboard = function(options, cb){
	var _options = options || {};
	var _self = this;
	
	if(!_options.name || _options.name == ''){
		cb(new Error(_self.errorList.NullDashboardName));
		return;
	}

	var newDashboard = dashboardObjectFactory.apiDashboardObject(_options);
	_self._databaseAccessor.insert("DASHBOARD", newDashboard, cb);
};

DashboardManager.prototype.dashboardById = function(id, cb){
	var _self = this;
	
	if(!id || id == ''){
		cb(new Error(_self.errorList.InvalidDashboardId));
		return;
	}
	
	var queryObject = {};
	queryObject.id = id;
	
	_self._databaseAccessor.query("DASHBOARD", queryObject, function(err, dashboard){
		if(err || !dashboard){
			cb(util.internalErr());
		}
		else{
			dashboard = dashboardObjectFactory.apiDashboardObject(dashboard);
			cb(null, dashboard);
		}
	});
}

DashboardManager.prototype.dashboardsByOwner = function(uid, cb){
	var _self = this;
	
	if(!uid || uid == ''){
		cb(new Error(_self.errorList.InvalidUserId));
		return;
	}
	
	var queryObject = {};
	queryObject.owner = uid;
	
	_self._databaseAccessor.queryItems("DASHBOARD", queryObject, function(err, dashboards){
		if(err || !dashboards){
			cb(util.internalErr());
		}
		else{
			var apiObjects = [];
			
			dashboards.forEach(function(item){
				apiObject =  dashboardObjectFactory.apiDashboardObject(item);	
				apiObjects.push(apiObject);
			});
			
			cb(null, apiObjects);
		}
	});
}

DashboardManager.prototype.deleteDashboardById = function(id, cb){
	var _self = this;
	
	if(!id || id == ''){
		cb(new Error(_self.errorList.InvalidDashboardId));
		return;
	}
	
	var queryObject = {};
	queryObject.id = id;
	
	_self._databaseAccessor.remove("DASHBOARD", queryObject, function(err, dashboard){
		if(err || !dashboard){
			cb(util.internalErr());
		}
		else{
			
			// Remove all widgets belong to this dashboard
			var queryWidgets = {};
			queryWidgets.dashboardid = id;

			_self._databaseAccessor.queryItems("WIDGET", queryWidgets, function(err, widgets){
				if(widgets){
					widgets.forEach(function(item){
						var queryWidget = {};
						queryWidget.id = item.id;

						_self._databaseAccessor.remove("WIDGET", queryWidget, function(err, widget){});
					});
				}
			});
			
			cb(null, null);
		}
	});
}

DashboardManager.prototype.accessLevel = function(uid, dashboard, cb){
	cb(null, util.accessLevel(uid, dashboard));
}

DashboardManager.prototype.accessLevelById = function(uid, dashboardId, cb){
	var _self = this;
	
	if(!uid || uid == ''){
		cb(new Error(_self.errorList.InvalidUserId));
		return;
	}
	
	if(!dashboardId || dashboardId == ''){
		cb(new Error(_self.errorList.InvalidDashboardId));
		return;
	}
	
	this.dashboardById(dashboardId, function(err, dashboard){
		if(err || !dashboard){
			cb(util.internalErr());
		}
		else{
			_self.accessLevel(uid, dashboard, cb);
		}
	});
}

var createDashboardManager = function(options){
	return new DashboardManager(options);
};

module.exports = createDashboardManager;