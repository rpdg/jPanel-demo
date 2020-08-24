/// <reference types="epg-panel" />

x$.log.active(true);

let container = document.getElementById('divTest');
let dataItems = x$.dom.select('#divTest>.divItem');
let overCount = 0;
let divItemLength = 17;

let a = x$.grid('#divTest>.curRow', {
	cols: 7,
	frameId: 'divHelper',
	edgeRule: {
		down: function () {
			let nodeIdIndex = parseInt(a.selectedElement.id.substr(5), 10);

			if (nodeIdIndex + a.cols < divItemLength) {
				overCount++;
				for (let i = 0, len = a.items.length; i < len; i++) {
					a.items[i].className = 'divItem';
					if (i + overCount * a.cols < dataItems.length) {
						dataItems[i + overCount * this.cols].className = 'divItem curRow';
					}
				}
				container.style.marginTop = -40 * overCount + 'px';
				a.reset(a.selectedIndex);
				//console.log('down:---' , this.items);
			}
		},
		up: function () {
			let nodeIdIndex = parseInt(a.selectedElement.id.substr(5), 10);
			if (overCount > 0) {
				overCount--;
				for (let i = 0, len = a.items.length; i < len; i++) {
					a.items[i].className = 'divItem';
				}

				let t = ((nodeIdIndex / a.cols) | 0) - 1;
				for (let j = 0; j < a.cols; j++) {
					dataItems[t * a.cols + j].className = 'divItem curRow';
				}
				container.style.marginTop = -40 * overCount + 'px';
				a.reset(a.selectedIndex);
				//console.log('up:--- ' , this.items);
			}
		},
		left: function () {
			a.jumpToBox(1);
		},
	},
	onOk: function () {
		console.log(a.selectedIndex, this.selectedElement);
	},
});

let b = x$.grid('#divTest2>.current', {
	cols: 4,
	frameId: 'divHelper2',
	offset: { x: -2, y: -2 },
	forceRec: { w: 40, h: 40, x: 17, y: 297 },
	onChange: function (w) {
		if (w != 'auto') {
			let obj = b.selectedElement.firstChild as HTMLElement;
			obj.className = 'z1';
			obj = b.previousElement;
			if (obj) {
				(obj.firstChild as HTMLElement).className = 'z0';
			}
		}
	},
	edgeRule: {
		// right: function (d) {
		// 	if (b.selectedIndex + this.overCount + 1 < this.fullIemList.length) {
		// 		this.overCount++;

		// 		this.items[0].className = 'divItem';
		// 		this.fullIemList[0].style.marginLeft = -this.overCount * 40 + 'px';
		// 		this.fullIemList[this.selectedIndex + this.overCount].className = 'divItem current';
		// 		this.reset(this.selectedIndex);
		// 		//
		// 		var obj = this.items[this.selectedIndex - 1].firstChild;
		// 		obj.className = 'z0';
		// 	}
		// },
	},
});

x$.box.addGrid(a, b).active();
