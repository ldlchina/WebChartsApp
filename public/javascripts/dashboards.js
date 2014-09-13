$(document).ready(function(){
	$('#model-create-dashboard').hide();
	
	$('#dashboards-add').click(function(sender){
		$('#model-create-dashboard').show();
	});
	
	$('#dashboards-create-cancel').click(function(sender){
		$('#model-create-dashboard').hide();
	});
	
	$('#form-create-dashboard').submit(onCreateDashboardSubmit);
	
	resetClassesToTableRows();
});

function clearDashboardList(){
	$('.dashboards-tr-even').remove();
	$('.dashboards-tr-odd').remove();
}

function openDashboardEvent(sender){
	var parentTr = $(this).parents('tr')[0];
	sendRequest('get', 'dashboards/' + parentTr.id, null, function(err, data){
	});
}

function editDashboardEvent(sender){
	alert('edit');
	var parentTr = $(this).parents('tr')[0];
	var data = parentTr.data;
}

function deleteDashboardEvent(sender){
	var parentTr = $(this).parents('tr')[0];
	sendRequest('post', '/api/1.0/dashboards/' + parentTr.id + '/delete', null, function(err, data){
		if(!err){
			$(parentTr).remove();
			resetClassesToTableRows();
		}
	});
}

function onCreateDashboardSubmit(sender){
	var body = {};
	
	var inputs = $('#form-create-dashboard').find('input');
	for(var i=0; i<inputs.length; i++) {
		if(inputs[i].name == 'name'){
			body.name = inputs[i].value;
		}
	}
	
	sendRequest('post', '/api/1.0/dashboards', body, function(err, data){
		if(data){
			var options = {
				dashboardId:data.id,
				dashboardName:data.name,
				dashboardEdit:'Edit',
				dashboardDelete:'Delete'
			};
			$('.dashboards-tb').append(webchartsapp.ui.dashboards.dashboardItem(options));
			resetClassesToTableRows();

			$('#model-create-dashboard').hide();
		}
	});
	
	return false;
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
	
	$('.dashboards-action-item.edit').unbind('click');
	$('.dashboards-action-item.delete').unbind('click');
	$('.dashboards-action-item.edit').click(editDashboardEvent);
	$('.dashboards-action-item.delete').click(deleteDashboardEvent);
}
