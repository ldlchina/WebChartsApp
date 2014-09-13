var request = require('request');

var addRoute = function(options){
    if(!options.expressApp)
        return this;
        
    var expressApp = options.expressApp;
	var serverApp = options.serverApp;
	var widgetMgr = serverApp.widgetManager;
   
    /**********************************************************************/
    // Add the route implementation here
    /**********************************************************************/
    
	// create a widget
    expressApp.post('/api/1.0/dashboards/:dashboardid/widgets', function(req, res, next){
        console.log('post ==> /api/1.0/dashboards/:dashboardid/widgets');
		
		var options = req.body;
		options.uid = req.session.user.id;
		options.dashboardid = req.params.dashboardid;
		
		widgetMgr.addWidget(options, function(err, widget){
			if(err){
				next(err);
			}
			else{
				res.send(200, widget);
			}
		});
    });
    
	// query a widget
    expressApp.get('/api/1.0/widgets/:widgetid', function(req, res, next){
        console.log('get ==> /api/1.0/widgets/:widgetid');
		
		var id = req.params.widgetid;
		if(!id || id == ''){
			next(new Error(errorsStrings.dashboard.invalidWidgetId));
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
    });
	
	// delete a widget
    expressApp.post('/api/1.0/widgets/:widgetid/delete', function(req, res, next){
        console.log('post ==> /api/1.0/widgets/:widgetid/delete');
		
		var id = req.params.widgetid;
		if(!id || id == ''){
			next(new Error('invalidWidgetId'));
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
    });
	
    return this;
};


/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = addRoute;