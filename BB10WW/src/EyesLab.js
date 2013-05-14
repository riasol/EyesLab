var ColorPointer = (function () {
    function ColorPointer(color, x, y, html) {
        html.style.backgroundColor = color;
        html.style.left = x + 'px';
        html.style.top = y + 'px';
        html.onclick = function () {
            html.className = 'selected';
        };
    }
    return ColorPointer;
})();
var EyesLab = (function () {
    function EyesLab(native) {
        this.native = native;
        var first;
        first = 'rg_blindness';
        first = 'home';
        this.loadScreen(first);
    }
    EyesLab.prototype.loadScreen = function (name) {
        this.native.loadScreen(name);
    };
    EyesLab.prototype.onReady_home = function () {
        var _this = this;
        var el = document.getElementById('count');
        el.onchange = function () {
            _this.colorCount = el.value;
            _this.drawColors();
        };
        el.onchange();
    };
    EyesLab.prototype.home = function () {
        this.native.loadScreen('home');
    };
    EyesLab.prototype.drawColors = function () {
        var colors = '5ce800 ffcc00 ff0000 616c00 2b52ff d929e2 c9c9c9 00e0e0 009a00 b28200'.split(' ');
        var contain = document.getElementById('drawing');
        contain.innerHTML = '';
        var containerLen = 400;
        var selected = [];
        var itemsPerSide = 5;
        var newPosition = function () {
            while(true) {
                var idx = Math.ceil(Math.random() * Math.pow(itemsPerSide, 2));
                var searchIdx = -1;
                var count = 0;
                while(true) {
                    searchIdx = selected.indexOf(idx, searchIdx + 1);
                    if(searchIdx > -1) {
                        count++;
                    }
                    if(searchIdx == -1) {
                        break;
                    }
                }
                if(searchIdx == -1 || count <= 2) {
                    selected.push(idx);
                    break;
                }
            }
            return {
                x: Math.ceil(idx / itemsPerSide),
                y: idx % itemsPerSide
            };
        };
        var perSection = containerLen / itemsPerSide;
        for(var i = 0; i < this.colorCount; i++) {
            var obj = colors[i];
            var circ = document.createElement('div');
            contain.appendChild(circ);
            var pos = newPosition();
            new ColorPointer('#' + colors[i], pos.x * perSection, pos.y * perSection, circ);
        }
    };
    EyesLab.prototype.about = function () {
        this.native.loadScreen('rg_blindness');
    };
    return EyesLab;
})();
var NativeBB = (function () {
    function NativeBB(native) {
        this.bb = native;
        this.init();
    }
    NativeBB.prototype.init = function () {
        this.bb.init({
            bb10ForPlayBook: true,
            ondomready: function (element, name) {
                var methodName = 'onReady_' + name;
                if(app[methodName]) {
                    app[methodName]();
                }
            }
        });
    };
    NativeBB.prototype.loadScreen = function (name) {
        this.bb.pushScreen(name + '.html', name);
    };
    return NativeBB;
})();
//@ sourceMappingURL=EyesLab.js.map
