var util = require('../util.js');


var WidgetObjectFactory = function () {};

WidgetObjectFactory.apiWidgetObject = function (options) {
	options = options || {};

	return {
		"type": "widget",
		"id": options.id || util.generateGUID(),
		"owner": options.owner,
		"dashboardid": options.dashboardid,
		"dataurl": options.dataurl,
		"interval": options.interval
	};
};


module.exports = WidgetObjectFactory;