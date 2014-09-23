function startLoading(parentId){
	
	var options = {
		loadingbarsId:'loadingbars_' + parentId,
	};
	
	$('#' + parentId).append(webchartsapp.ui.loadingbars.loadingBars(options));
							
	var count = 0;
	function rotate() {
		var elem = document.getElementById(options.loadingbarsId);
		if(elem){
			elem.style.transform = 'scale(0.5) rotate('+count+'deg)';
			if (count==360) { 
				count = 0;
			}
			count+=45;
			window.setTimeout(rotate, 100);
		}
	}
	window.setTimeout(rotate, 100);
}
