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
	
	// create a new dashboard
    expressApp.post('/dashboards', function(req, res, next){
        console.log('post ==> /dashboards');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
		var options = req.body;
		options.owner = req.session.user.id;
		dashboardMgr.addDashboard(options, function(err, dashboard){
			if(err){
				next(err);
			}
			else{
				res.send(200, dashboard);
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
	
	// delete a dashboard
    expressApp.post('/dashboards/:dashboardid/delete', function(req, res, next){
        console.log('post ==> /dashboards/:dashboardid/delete');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
		var id = req.params.dashboardid;
		if(!id || id == ''){
			next(new Error(errorsStrings.dashboards.invalidDashboardId));
			return;
		}
		
		dashboardMgr.deleteDashboardById(id, function(err, dashboard){
			if(err){
				next(err);
			}
			else{
				res.send(200);
			}
		});
    });
    
    return this;
};


/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = addRoute;