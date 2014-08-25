// Strings to localize

var errorsStrings = function(){}

errorsStrings.signup = {
	emailUsed:'The email is used',
	nullError:'All fields should be not null',
	passError:'The two passwords are not same'
};

errorsStrings.login = {
	accountError:'The account is not registered',
	incorretPassword:'Incorrect password'
};

errorsStrings.dashboards = {
	invalidDashboardId:'Invalid dashboard id'
};

errorsStrings.dashboard = {
	invalidWidgetId:'Invalid widget id'
};


module.exports = errorsStrings;