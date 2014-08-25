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
	InvalidUserId:'InvalidUserId'
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
			if(err){
				cb(err);
			}
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
			if(err){
				cb(err);
			}
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
		if(err){
			if(err){
				cb(err);
			}
		}
		else{
			cb(null, null);
		}
	});
}

var createDashboardManager = function(options){
	return new DashboardManager(options);
};

module.exports = createDashboardManager;