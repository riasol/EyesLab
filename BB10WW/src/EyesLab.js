var ColorPointer = (function () {
    function ColorPointer(color, x, y, html) {
        html.style.backgroundColor = color;
        html.style.left = x + 'px';
        html.style.top = y + 'px';
        html.onclick = function () {
            html.className = html.className == 'selected' ? '' : 'selected';
            var add = html.className == 'selected' ? 1 : -1;
            window.app.countNumber = window.app.countNumber + add;
        };
    }
    return ColorPointer;
})();
var EyesLab = (function () {
    function EyesLab(native) {
        this.native = native;
        this._countNumber = 0;
        var first;
        first = 'rg_blindness';
        first = 'home';
        this.loadScreen(first);
    }
    Object.defineProperty(EyesLab.prototype, "countNumber", {
        get: function () {
            return this._countNumber;
        },
        set: function (v) {
            this._countNumber = v;
            document.getElementById('currentSectionCount').innerHTML = this._countNumber;
        },
        enumerable: true,
        configurable: true
    });
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
        document.getElementById('checkBtn').onclick = this.onCheck;
    };
    EyesLab.prototype.onCheck = function () {
        var el = document.getElementById('checkResult');
        if(this._countNumber) {
            el.innerText = 'Right';
            el.className = 'ok';
        } else {
            el.innerText = 'Wrong';
            el.className = 'fail';
        }
    };
    EyesLab.prototype.home = function () {
        this.loadScreen('home');
    };
    EyesLab.prototype.drawColors = function () {
        var colors = '5ce800 ffcc00 ff0000 616c00 2b52ff d929e2 c9c9c9 00e0e0 009a00 b28200'.split(' ').sort();
        var contain = document.getElementById('drawing');
        contain.innerHTML = '';
        var containerLen = 400;
        var selectedPositions = [];
        var selectedColors = [];
        var itemsPerSide = 5;
        var newPosition = function () {
            var colorCount = 0;
            var cIdx;
            while(true) {
                cIdx = Math.floor(Math.random() * colors.length);
                var cSearch = -1;
                var cOnes = 0;
                while(true) {
                    cSearch = selectedColors.indexOf(cIdx, cSearch + 1);
                    if(cSearch > -1) {
                        cOnes++;
                    } else {
                        break;
                    }
                }
                if(cOnes < 2) {
                    break;
                }
            }
            selectedColors.push(cIdx);
            var idx;
            while(true) {
                idx = Math.ceil(Math.random() * Math.pow(itemsPerSide, 2));
                if(selectedPositions.indexOf(idx) == -1) {
                    break;
                }
            }
            selectedPositions.push(idx);
            return {
                x: Math.ceil(idx / itemsPerSide),
                y: idx % itemsPerSide,
                cIdx: cIdx
            };
        };
        var perSection = containerLen / itemsPerSide;
        for(var i = 0; i < this.colorCount; i++) {
            var obj = colors[i];
            var circ = document.createElement('div');
            contain.appendChild(circ);
            var pos = newPosition();
            new ColorPointer('#' + colors[pos.cIdx], pos.x * perSection, pos.y * perSection, circ);
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
