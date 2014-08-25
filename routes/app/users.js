var local = 'en-us';
var uiStrings = require('../../public/strings/' + local + '/uiStrings.js');
var errorsStrings = require('../../public/strings/' + local + '/errorsStrings.js');

var addRoute = function(options){
    if(!options.expressApp)
        return this;
        
    var expressApp = options.expressApp;
	var serverApp = options.serverApp;
	var userMgr = serverApp.userManager;
	var cookieMaxAge = 1000 * 60 * 60 * 24 * 30;
	
    /**********************************************************************/
    // Add the route implementation here
    /**********************************************************************/
    
    expressApp.get('/users/login', function(req, res, next){
        console.log('get ==> /users/login');
		
		if(req.session.user){
			res.redirect('/dashboards');
			return;
		}
		
		res.locals.userAccount = '';
		
		var loginStrings = uiStrings.login;
		res.render('login', loginStrings);
    });
	
	expressApp.post('/users/login', function(req, res, next){
        console.log('post ==> /users/login');
		
		userMgr.login(req.body, function(err, user){
			if(err){
				next(err);
			}
			else{
				res.cookie('uid', user.id, { maxAge: cookieMaxAge });  

				req.session.regenerate(function(){
					req.session.user = user;
					res.redirect('/dashboards');
				});
			}
		});
    });
	
	expressApp.get('/users/signup', function(req, res, next){
        console.log('get ==> /users/signup');
		
		if(req.session.user){
			res.redirect('/dashboards');
			return;
		}
		
		res.locals.userAccount = '';
		
		var signupStrings = uiStrings.main;
		signupStrings.title = 'WebCharts - Sign up';
		res.render('signup', signupStrings);
    });
	
	expressApp.post('/users/signup', function(req, res, next){
        console.log('post ==> /users/signup');
		
		userMgr.addUser(req.body, function(err, user){
			if(err){
				next(err);
			}
			else{
				res.cookie('uid', user.id, { maxAge: cookieMaxAge });

				req.session.regenerate(function(){
					req.session.user = user;
					res.redirect('/dashboards');
				});
			}
		});
    });
	
	expressApp.get('/users/logout', function(req, res, next){
        console.log('get ==> /users/logout');
		
		res.cookie('uid', '', { maxAge: 1000 * 60 * 60 * 24 * 30 });

		req.session.destroy(function(){
			res.redirect('/users/login');
		});
    });
    
    return this;
};


/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = addRoute;