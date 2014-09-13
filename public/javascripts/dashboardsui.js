// This file was automatically generated from dashboardsui.soy.
// Please don't edit this file by hand.

if (typeof webchartsapp == 'undefined') { var webchartsapp = {}; }
if (typeof webchartsapp.ui == 'undefined') { webchartsapp.ui = {}; }
if (typeof webchartsapp.ui.dashboards == 'undefined') { webchartsapp.ui.dashboards = {}; }


webchartsapp.ui.dashboards.dashboardItem = function(opt_data, opt_ignored) {
  return '<tr id=' + soy.$$escapeHtml(opt_data.dashboardId) + ' class=\'dashboard-tr-new\'><td class=\'dashboards-tr-left\'><a class=\'dashboards-item-name\' href=\'/dashboards/' + soy.$$escapeHtml(opt_data.dashboardId) + '\'>' + soy.$$escapeHtml(opt_data.dashboardName) + '</a></td><td class=\'dashboards-tr-right\'><ol><li class=\'dashboards-action-item edit\'><a>' + soy.$$escapeHtml(opt_data.dashboardEdit) + '</a></li><li class=\'dashboards-action-item delete\'><a>' + soy.$$escapeHtml(opt_data.dashboardDelete) + '</a></li></ol></td></tr>';
};
