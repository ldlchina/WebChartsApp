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
    expressApp.post('/dashboards/:dashboardid/widgets', function(req, res, next){
        console.log('post ==> /dashboards/:dashboardid/widgets');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
		var options = req.body;
		options.uid = req.session.user.id;
		options.dashboardid = req.params.dashboardid;
		
		widgetMgr.addWidget(options, function(err, dashboard){
			if(err){
				next(err);
			}
			else{
				//res.send(200);
				res.redirect('/dashboards/' + options.dashboardid);
			}
		});
    });
    
	// query a widget
    expressApp.get('/widgets/:widgetid', function(req, res, next){
        console.log('get ==> /widgets/:widgetid');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
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
				request(
					{
						method: "GET",
						uri: widget.dataurl
					},
					function (err, response, body) {
						if(err || response.statusCode < 200 || response.statusCode >= 300){
							next(new Error('disconnectfailed'));
							return;
						}
						else{
							res.send(200, body);
						}
					}
				);
			}
		});
    });
	
	// delete a widget
    expressApp.post('/widgets/:widgetid/delete', function(req, res, next){
        console.log('post ==> /widgets/:widgetid/delete');
		
		if(!req.session.user){
			res.redirect('/users/login');
			return;
		}
		
		var id = req.params.widgetid;
		if(!id || id == ''){
			next(new Error(errorsStrings.dashboard.invalidWidgetId));
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