$(document).ready(function(){
	$('#model-create-dashboard').hide();
	
	$('#dashboards-add').click(function(sender){
		$('#model-create-dashboard').show();
	});
	
	$('#dashboards-create-cancel').click(function(sender){
		$('#model-create-dashboard').hide();
	});
});

function clearDashboardList(){
	$('.dashboards-tr-even').remove();
	$('.dashboards-tr-odd').remove();
}

function openDashboardEvent(sender){
	var parentTr = $(this).parents('tr')[0];
	$.get('dashboards/' + parentTr.id, function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
	});
}

function editDashboardEvent(sender){
	alert('edit');
	var parentTr = $(this).parents('tr')[0];
	var data = parentTr.data;
}

function deleteDashboardEvent(sender){
	var parentTr = $(this).parents('tr')[0];
	$.post('/dashboards/' + parentTr.id + '/delete', function(data,status){
		if(status == 'success'){
			$(parentTr).remove();
			resetClassesToTableRows();
		}
	});
}

function attachDataToEachItem(dashboardList){
	alert('attach');
	for(var i=0; i<dashboardList.length; i++) {
		var item = $('.'+dashboardList[i].id).first;
		item.data = dashboardList[i];
	}
}

function resetClassesToTableRows(){
	$('tr:even').removeClass('dashboards-tr-odd');
	$('tr:even').addClass('dashboards-tr-even');
	
	$('tr:odd').removeClass('dashboards-tr-even');
	$('tr:odd').addClass('dashboards-tr-odd');
	
	$('tr:first').removeClass('dashboards-tr-even');
	$('tr:first').addClass('dashboards-tr-header');
}
