var local = 'en-us';
var uiStrings = require('../../public/strings/' + local + '/uiStrings.js');
var errorsStrings = require('../../public/strings/' + local + '/errorsStrings.js');

var addRoute = function(options){
    if(!options.expressApp)
        return this;
        
    var expressApp = options.expressApp;
	var serverApp = options.serverApp;
	var dashboardMgr = serverApp.dashboardManager;
	var widgetMgr = serverApp.widgetManager;
   
    /**********************************************************************/
    // Add the route implementation here
    /**********************************************************************/
    
	expressApp.get('/', function(req, res, next){
        console.log('get ==> /');
		
		res.redirect('/dashboards');
    });
	
	// get all dashboards of the user
    expressApp.get('/dashboards', function(req, res, next){
        console.log('get ==> /dashboards');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
		dashboardMgr.dashboardsByOwner(req.session.user.id, function(err, dashboards){
			if(err){
				next(err);
			}
			else{
				var dashboardsStrings = uiStrings.dashboards;
				res.locals.userAccount = req.session.user.email;
				res.locals.dashboardList = dashboards;
				res.render('dashboards', dashboardsStrings);
			}
		});
    });
	
	// query a dashboard
    expressApp.get('/dashboards/:dashboardid', function(req, res, next){
        console.log('get ==> /dashboards/:dashboardid');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
		var id = req.params.dashboardid;
		if(!id || id == ''){
			next(new Error(errorsStrings.dashboards.invalidDashboardId));
			return;
		}
		
		dashboardMgr.dashboardById(id, function(err, dashboard){
			if(err){
				next(err);
			}
			else{
				widgetMgr.widgetsByDashboardId(id, function(err, widgets){
					if(err){
						next(err);
					}
					else{
						var dashboardStrings = uiStrings.dashboard;
						res.locals.dashboardName = dashboard.name;
						res.locals.userAccount = req.session.user.email;
						res.locals.widgets = widgets;
						res.render('dashboard', dashboardStrings);
					}
				});
			}
		});
    });
    
    return this;
};


/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = addRoute;