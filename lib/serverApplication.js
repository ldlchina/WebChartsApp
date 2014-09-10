var databaseAccessor = require('./database/databaseAccessor.js');
var nconf = require('nconf');


var ServerApplication = function () {

	// Load config settings.
	var config = nconf.argv().env().file({ file: __dirname + '/conf.json' });
	var serviceConf = config.get(config.get('build'));

	this.config = config;

	// database
	var webcharts_db = serviceConf.webcharts_db;
	var dbOptions = {
		host: webcharts_db.host,
		port: webcharts_db.port,
		name: webcharts_db.name
	};

	var dba = databaseAccessor(dbOptions);

	// user manager
	this.userManager = require('./userManager.js')({ 'databaseAccessor': dba });
	
	// dashboard manager
	this.dashboardManager = require('./dashboardManager.js')({ 'databaseAccessor': dba });
	
	// widget manager
	this.widgetManager = require('./widgetManager.js')({ 'databaseAccessor': dba });
	
	// auth manager
	this.authManager = require('./authManager.js')({ 'databaseAccessor': dba });
};


module.exports = new ServerApplication();

