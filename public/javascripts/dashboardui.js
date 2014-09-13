// This file was automatically generated from dashboardui.soy.
// Please don't edit this file by hand.

if (typeof webchartsapp == 'undefined') { var webchartsapp = {}; }
if (typeof webchartsapp.ui == 'undefined') { webchartsapp.ui = {}; }
if (typeof webchartsapp.ui.dashboard == 'undefined') { webchartsapp.ui.dashboard = {}; }


webchartsapp.ui.dashboard.widget = function(opt_data, opt_ignored) {
  return '<li class=\'dashboard-widget-li\' id=\'' + soy.$$escapeHtml(opt_data.widgetId) + '\' draggable="true"><div class=\'dashboard-widget\'><div class=\'dashboard-widget-dnd\'></div><div class=\'dashboard-widget-content\'></div><ol class=\'dashboard-widget-actions\'><li><a class=\'dashboard-widget-actions-edit\'>' + soy.$$escapeHtml(opt_data.widgetEdit) + '</a></li><li><a class=\'dashboard-widget-actions-delete\'>' + soy.$$escapeHtml(opt_data.widgetDelete) + '</a></li></ol></div></li>';
};


webchartsapp.ui.dashboard.widgetInner = function(opt_data, opt_ignored) {
  return '<div class=\'dashboard-widget\'><div class=\'dashboard-widget-dnd\'></div><div class=\'dashboard-widget-content\'></div><ol class=\'dashboard-widget-actions\'><li><a class=\'dashboard-widget-actions-edit\'>' + soy.$$escapeHtml(opt_data.widgetEdit) + '</a></li><li><a class=\'dashboard-widget-actions-delete\'>' + soy.$$escapeHtml(opt_data.widgetDelete) + '</a></li></ol></div>';
};
