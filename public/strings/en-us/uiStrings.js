// Strings to localize

var uiStrings = function(){}

uiStrings.main = {
	title:'WebCharts - Dashboards', 
	signupText:'Sign up', 
	loginText:'Login', 
	logoutText:'Logout', 
	copyright:'@Copyright ldl 2014'
};

uiStrings.login = {
	title:'WebCharts - Login',
	signupText:uiStrings.main.signupText, 
	loginText:uiStrings.main.loginText, 
	logoutText:uiStrings.main.logoutText, 
	copyright:uiStrings.main.copyright,
	loginHeader:'Login',
	loginEmail:'Email',
	loginPassword:'Password',
	loginForgetPassword:'(forgot password)',
	loginCommit:'Login'
};

uiStrings.dashboards = {
	title:'WebCharts - Dashboards',
	signupText:uiStrings.main.signupText, 
	loginText:uiStrings.main.loginText, 
	logoutText:uiStrings.main.logoutText, 
	copyright:uiStrings.main.copyright
};

uiStrings.dashboard = {
	title:'WebCharts - Dashboard',
	signupText:uiStrings.main.signupText, 
	loginText:uiStrings.main.loginText, 
	logoutText:uiStrings.main.logoutText, 
	copyright:uiStrings.main.copyright,
};

module.exports = uiStrings;