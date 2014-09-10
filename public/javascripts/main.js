$(document).ready(function(){
	$("#nav-signup").hide();
	$("#nav-login").hide();
	$("#nav-logout").hide();
	
	if($("#nav-userAccount").text() != ''){
		$("#nav-logout").show();
	}
});

function sendRequest(type, url, body, cb){
	$.ajax({
		type:type,
		url:url, 
		beforeSend:function(xhr){
		},
		complete:function(xhr, ts){
		},
		contentType:'application/x-www-form-urlencoded',
		data:body,
		dataFilter:function(data, type){
			return data;
		},
		datatype:'json',
		error:function(xhr, err, e){
			cb(err + ': ' + xhr.responseText);
		},
		success:function(data){
			cb(null, data);
		}
	});
}