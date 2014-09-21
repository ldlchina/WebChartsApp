var request = require('request');

var addRoute = function(options){
    if(!options.expressApp)
        return this;
        
    var expressApp = options.expressApp;
	var serverApp = options.serverApp;
	var widgetMgr = serverApp.widgetManager;
	var dashboardMgr = serverApp.dashboardManager;
   
    /**********************************************************************/
    // Add the route implementation here
    /**********************************************************************/
    
	// create a widget
    expressApp.post('/api/1.0/dashboards/:dashboardid/widgets', function(req, res, next){
        console.log('post ==> /api/1.0/dashboards/:dashboardid/widgets');
		
		dashboardMgr.accessLevelById(req.auth.userid, req.params.dashboardid, function(err, data){
			if(err){
				next(err);
			}
			else{
				if(data != 'rw'){
					next(new Error('AccessDenied'));
					return;
				}
				
				var options = req.body;
				options.owner = req.auth.userid;
				options.dashboardid = req.params.dashboardid;
				
				widgetMgr.addWidget(options, function(err, widget){
					if(err){
						next(err);
					}
					else{
						res.send(200, widget);
					}
				});
			}
		});
    });
    
	// query a widget
    expressApp.get('/api/1.0/widgets/:widgetid', function(req, res, next){
        console.log('get ==> /api/1.0/widgets/:widgetid');
		
		var id = req.params.widgetid;
		if(!id || id == ''){
			next(new Error('InvalidWidgetId'));
			return;
		}
		
		widgetMgr.accessLevel(req.auth.userid, id, function(err, data){
			if(err){
				next(err);
			}
			else{
				if(data == 'ad'){
					next(new Error('AccessDenied'));
					return;
				}
				
				widgetMgr.widgetById(id, function(err, widget){
					if(err){
						next(err);
						return;
					}
					else{
						res.send(200, widget);
					}
				});
			}
		});
    });
	
	// delete a widget
    expressApp.post('/api/1.0/widgets/:widgetid/delete', function(req, res, next){
        console.log('post ==> /api/1.0/widgets/:widgetid/delete');
		
		var id = req.params.widgetid;
		if(!id || id == ''){
			next(new Error('InvalidWidgetId'));
			return;
		}
		
		widgetMgr.accessLevel(req.auth.userid, id, function(err, data){
			if(err){
				next(err);
			}
			else{
				if(data != 'rw'){
					next(new Error('AccessDenied'));
					return;
				}
				
				widgetMgr.deleteWidgetById(id, function(err, widget){
					if(err){
						next(err);
					}
					else{
						res.send(200);
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