$(document).ready(function(){
	$('#model-create-widget').hide();
	
	$('#dashboard-addWidget').click(function(sender){
		var path = window.location.pathname;
		var arr = path.split("/");
		var dashboardid = arr[arr.length - 1];
		$('#create_widget_form').attr('action', '/dashboards/' + dashboardid + '/widgets');
		
		$('#model-create-widget').show();
	});
	
	$('#widgets-create-cancel').click(function(sender){
		$('#model-create-widget').hide();
	});
});

function clearWidgetList(){
	$('.dashboard-widget').remove();
}

function loadWidget(id){
	var widgetLi = $('#'+id)[0];
	if(!widgetLi){
		return;
	}
	
	var widgetContent = $(widgetLi).find('.dashboard-widget-content')[0];
	widgetContent.id = 'widgetContent_' + id;
	
	$(widgetContent).empty();
	attachDragAndDropEvents(widgetLi);
	
	var cl = new CanvasLoader(widgetContent.id);
	cl.show(); 

	var loaderObj = $(widgetContent).children("#canvasLoader")[0];
	$(loaderObj).css('padding-top', '180px');
	
	sendRequest('get', '/widgets/' + id, null, function(err, data){
		if(err || !data){
			$(widgetContent).html('error');
			setTimeout("loadWidget('" + id + "')", 60 * 1000);//try again in one minute
		}
		else{
			if($('#widgetContent_' + id).length){
				$('#widgetContent_' + id).highcharts(data.highcharts); 
				setTimeout("loadWidget('" + id + "')", parseInt(data.widget.interval) * 1000);
			}
		}
	});
}

function loadWidgets(){
	var widgets = $('.dashboard-widget-li');
	for(var i = 0; i < widgets.length; i++){
		var widget = widgets[i];
		loadWidget(widget.id);
	}
}

function editWidgetEvent(sender){
	alert('edit');
}

function deleteWidgetEvent(sender){
	var parentLi = $(this).parents('li')[0];
	parentLi = $(parentLi).parents('li')[0];
	sendRequest('post', '/widgets/' + parentLi.id + '/delete', null, function(err, data){
		if(!err){
			$(parentLi).remove();
		}
	});
}

// on source element
function ondragstart (ev) {
	ev.dataTransfer.effectAllowed = "move";
	ev.dataTransfer.setData("text", ev.currentTarget.id);
}
function ondragend(ev) {
	ev.dataTransfer.clearData("text");
}

// on target element
function ondragover(ev) {
	ev.preventDefault();
}
function ondrop(ev) {
	var srcId = ev.dataTransfer.getData("text");
	var srcObj = $('#' + srcId)[0];
	if(srcObj != ev.currentTarget){
		$(ev.currentTarget).before(srcObj);
	}
}

function attachDragAndDropEvents(e){
	e.ondragstart = ondragstart;
	e.ondragend = ondragend;
	e.ondragover = ondragover;
	e.ondrop = ondrop;
}