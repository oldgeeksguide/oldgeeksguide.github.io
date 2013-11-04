
global.setupMenus = function () {
	var gui = require('nw.gui');
	var win = gui.Window.get();

	var rootMenu = new gui.Menu({ type: 'menubar'});
	var myMenu = new gui.Menu();

	myMenu.append(new gui.MenuItem({
		type: 'normal',
		label: 'Debug',
		click: function () { win.showDevTools(); }
	}));

	myMenu.append(new gui.MenuItem({
		type: 'normal',
		label: 'Zoom In',
		click: function () { win.zoomLevel += 1; }
	}));

	myMenu.append(new gui.MenuItem({
		type: 'normal',
		label: 'Zoom Out',
		click: function () { win.zoomLevel -= 1; }
	}));

	myMenu.append(new gui.MenuItem({
		type: 'normal',
		label: 'Reset Zoom',
		click: function () { win.zoomLevel = 0; }
	}));

	myMenu.append(new gui.MenuItem({
		type: 'normal',
		label: 'Reload',
		click: function () {
			document.location.reload(true);
		}
	}));

	var fullscreenCheckbox = new gui.MenuItem({
		type: 'checkbox',
		label: 'Fullscreen',
		click: function () {
			if (fullscreenCheckbox.checked) {
				win.enterFullscreen();
			} else {
				win.leaveFullscreen();
			}
		}
	});

	myMenu.append(fullscreenCheckbox);

	myMenu.append(new gui.MenuItem({
		type: 'normal',
		label: 'Quit',
		click: function () {
			gui.App.quit();
		}
	}));

	rootMenu.append(new gui.MenuItem({
		label: 'NW-Reveal',
		submenu: myMenu
	}));

	win.menu = rootMenu;
}
