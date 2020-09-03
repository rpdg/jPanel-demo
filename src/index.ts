/// <reference types="@rpdg/epg-panel" />

x$.log.active(true);

let a = x$
	.grid<{
		container: HTMLElement;
		dataItems: HTMLElement[];
		overCount: number;
		divItemLength: number;
	}>('#divTest>.curRow', {
		cols: 7,
		frameId: 'divHelper',
		edgeRule: {
			down: function () {
				let nodeIdIndex = parseInt(a.selectedElement.id.substr(5), 10);

				if (nodeIdIndex + a.cols < a.ex.divItemLength) {
					a.ex.overCount++;
					for (let i = 0, len = a.items.length; i < len; i++) {
						a.items[i].className = 'divItem';
						if (i + a.ex.overCount * a.cols < a.ex.dataItems.length) {
							a.ex.dataItems[i + a.ex.overCount * this.cols].className = 'divItem curRow';
						}
					}
					a.ex.container.style.marginTop = -40 * a.ex.overCount + 'px';
					a.reset(a.selectedIndex);
					//console.log('down:---' , this.items);
				} else {
					this.jumpToBox(1);
				}
			},
			up: function () {
				let nodeIdIndex = parseInt(a.selectedElement.id.substr(5), 10);
				if (a.ex.overCount > 0) {
					a.ex.overCount--;
					for (let i = 0, len = a.items.length; i < len; i++) {
						a.items[i].className = 'divItem';
					}

					let t = ((nodeIdIndex / a.cols) | 0) - 1;
					for (let j = 0; j < a.cols; j++) {
						a.ex.dataItems[t * a.cols + j].className = 'divItem curRow';
					}
					a.ex.container.style.marginTop = -40 * a.ex.overCount + 'px';
					a.reset(a.selectedIndex);
					//console.log('up:--- ' , this.items);
				}
			},
		},
		onOk: function () {
			console.log(a.selectedIndex, this.selectedElement);
		},
	})
	.extra({
		container: document.getElementById('divTest'),
		dataItems: x$.dom.select('#divTest>.divItem'),
		overCount: 0,
		divItemLength: 17,
	});

let b = x$
	.grid<{
		overCount: number;
		fullIemList: HTMLElement[];
	}>('#divTest2>.current', {
		cols: 4,
		frameId: 'divHelper2',
		offset: { x: -2, y: -2 },
		forceRec: { w: 40, h: 40, x: 217, y: 297 },
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
			right: function (d) {
				if (this.selectedIndex + b.ex.overCount + 1 < b.ex.fullIemList.length) {
					b.ex.overCount++;

					this.items[0].className = 'divItem';
					b.ex.fullIemList[0].style.marginLeft = -b.ex.overCount * 40 + 'px';
					b.ex.fullIemList[this.selectedIndex + b.ex.overCount].className = 'divItem current';
					this.reset(this.selectedIndex);
					//
					let obj = this.items[this.selectedIndex - 1].firstChild as HTMLElement;
					obj.className = 'z0';
				}
			},
			left: function () {
				if (this.selectedIndex + b.ex.overCount - 1 > -1) {
					b.ex.overCount--;

					this.items[this.cols - 1].className = 'divItem';
					b.ex.fullIemList[0].style.marginLeft = -b.ex.overCount * 40 + 'px';
					b.ex.fullIemList[this.selectedIndex + b.ex.overCount].className = 'divItem current';
					this.reset(this.selectedIndex);
					//
					let obj = this.items[this.selectedIndex + 1].firstChild as HTMLElement;
					obj.className = 'z0';
				}
			},
			up: function () {
				this.jumpToBox(0);
			},
			down: 'stop',
		},
	})
	.extra({
		overCount: 0,
		fullIemList: x$.dom.select('#divTest2>.divItem'),
	});

x$.box.addGrid(a, b).active();
