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
							try{
								var data = {widget:widget, highcharts:JSON.parse(body)};
								res.send(200, data);
							}
							catch(e){
								next(new Error('unhandledata'));
								return;
							}
						}
					}
				);
			}
		});
    });
	
    return this;
};


/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = addRoute;