/* potential-happiness -- Riemann dashboard for the TTY
 * Copyright (C) 2015  Gergely Nagy <algernon@madhouse-project.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var blessed = require ('blessed'),
    contrib = require ('blessed-contrib');

function Grid (screen, options) {
    options = options || {};
    options.grid = options.grid || {rows: 12, cols: 12};
    options.grid.rows = options.grid.rows || 12;
    options.grid.cols = options.grid.cols || 12;
    options.widgets = options.widgets || [];
    this.options = options;

    var grid = new contrib.grid ({rows: options.grid.rows,
                                  cols: options.grid.cols,
                                  screen: screen});
    var x = 0;
    var y = 0;
    for (w in options.widgets) {
        widget = options.widgets[w];

        widget.options = widget.options || {};
        widget.options.source.host = widget.options.source.host ||
            options.defaults.source.host;

        px = widget.pos_x || x;
        py = widget.pos_y || y;
        grid.set (py, px, widget.height, widget.width,
                  widget.widget, widget.options);
        x += widget.width;
        if (x >= options.grid.cols) {
            y += widget.height;
            x = 0;
        }
    }
}

module.exports = Grid
