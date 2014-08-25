$(document).ready(function(){
	$("#nav-signup").hide();
	$("#nav-login").hide();
	$("#nav-logout").hide();
	
	if($("#nav-userAccount").text() != ''){
		$("#nav-logout").show();
	}
});