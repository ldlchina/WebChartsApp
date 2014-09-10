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
    
    // get all dashboards of the user
    expressApp.get('/api/1.0/dashboards', function(req, res, next){
        console.log('get ==> /api/1.0/dashboards');
		
		dashboardMgr.dashboardsByOwner(req.auth.userid, function(err, dashboards){
			if(err){
				next(err);
			}
			else{
				res.send(200, dashboards);
			}
		});
    });
	
	// create a new dashboard
    expressApp.post('/api/1.0/dashboards', function(req, res, next){
        console.log('post ==> /api/1.0/dashboards');
		
		if(!req.body){
			return;
		}
		
		var options = req.body;
		options.owner = req.auth.userid;
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
    expressApp.get('/api/1.0/dashboards/:dashboardid', function(req, res, next){
        console.log('get ==> /api/1.0/dashboards/:dashboardid');
		
		var id = req.params.dashboardid;
		if(!id || id == ''){
			return;
		}
		
		dashboardMgr.dashboardById(id, function(err, dashboard){
			if(err){
				next(err);
			}
			else{
				res.send(200, dashboard);
			}
		});
    });
	
    return this;
};


/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = addRoute;