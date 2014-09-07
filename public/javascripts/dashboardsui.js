// This file was automatically generated from dashboardsui.soy.
// Please don't edit this file by hand.

if (typeof webcharts == 'undefined') { var webcharts = {}; }
if (typeof webcharts.ui == 'undefined') { webcharts.ui = {}; }
if (typeof webcharts.ui.dashboards == 'undefined') { webcharts.ui.dashboards = {}; }


webcharts.ui.dashboards.dashboardItem = function(opt_data, opt_ignored) {
  return '<tr id=' + soy.$$escapeHtml(opt_data.dashboardId) + ' class=\'dashboard-tr-new\'><td class=\'dashboards-tr-left\'><a class=\'dashboards-item-name\' href=\'/dashboards/' + soy.$$escapeHtml(opt_data.dashboardId) + '\'>' + soy.$$escapeHtml(opt_data.dashboardName) + '</a></td><td class=\'dashboards-tr-right\'><ol><li class=\'dashboards-action-item edit\'><a>Edit</a></li><li class=\'dashboards-action-item delete\'><a>Delete</a></li></ol></td></tr>';
};
