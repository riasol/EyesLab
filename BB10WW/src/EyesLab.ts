declare var app:EyesLab;
class ColorPointer {
    constructor(color:string, x:number, y:number, html:HTMLElement) {
        html.style.backgroundColor = color;
        html.style.left = x + 'px'
        html.style.top = y + 'px'
        html.onclick = ()=> {
            html.className = html.className == 'selected' ? '' : 'selected'
            var add = html.className == 'selected' ? 1 : -1
            window.app.countNumber = window.app.countNumber + add;
        };
    }
}
class EyesLab {
    constructor(public native:INative) {
        var first;
        first = 'rg_blindness'
        first = 'home'
        this.loadScreen(first)
    }

    private _countNumber:number=0;
    public get countNumber():number {
        return this._countNumber
    }

    public set countNumber(v:number) {
        this._countNumber = v;
        document.getElementById('currentSectionCount').innerHTML=<string>this._countNumber;
    }
onCountChange:()=>{};
    private loadScreen(name:string) {
        this.native.loadScreen(name);
    }

    public onReady_home():void {
        var el = document.getElementById('count')
        el.onchange = ()=> {
            this.colorCount = <number>el.value
            this.drawColors()
        }
        el.onchange()
        document.getElementById('checkBtn').onclick=this.onCheck
    }
private onCheck():void{
    var el:HTMLElement=document.getElementById('checkResult')
    if(this._countNumber){
        el.innerText='Right'
        el.className='ok'
    }else{
        el.innerText='Wrong'
        el.className='fail'
    }
}
    public home():void {
        this.loadScreen('home');
    }

    private colorCount:number;

    private drawColors():void {
        var colors:string[] = '5ce800 ffcc00 ff0000 616c00 2b52ff d929e2 c9c9c9 00e0e0 009a00 b28200'.split(' ').sort()
        var contain:HTMLElement = document.getElementById('drawing')
        contain.innerHTML = ''
        var containerLen:number = 400
        var selectedPositions:number[] = []
        var selectedColors:number[] = []
        var itemsPerSide:number = 5
        var newPosition = ():Object=> {
            var colorCount:number = 0;
            var cIdx:number;
            while (true) {
                cIdx = Math.floor(Math.random() * colors.length)
                var cSearch:number = -1;
                var cOnes:number = 0
                while (true) {
                    cSearch = selectedColors.indexOf(cIdx, cSearch + 1);
                    if (cSearch > -1)
                        cOnes++
                    else
                        break;
                }
                if (cOnes < 2)
                    break
            }
            selectedColors.push(cIdx)
            var idx:number;
            while (true) {
                idx = Math.ceil(Math.random() * Math.pow(itemsPerSide, 2))
                if (selectedPositions.indexOf(idx) == -1)
                    break;
            }
            selectedPositions.push(idx)
            return {x: Math.ceil(idx / itemsPerSide), y: idx % itemsPerSide, cIdx: cIdx}
        }
        var perSection:number = containerLen / itemsPerSide
        for (var i = 0; i < this.colorCount; i++) {
            var obj = colors[i];
            var circ = document.createElement('div')
            contain.appendChild(circ)
            var pos = newPosition();
            new ColorPointer('#' + colors[pos.cIdx], pos.x * perSection, pos.y * perSection, circ);
        }
    }

    public about():void {
        this.native.loadScreen('rg_blindness');
    }
}
interface INative{
    init():void;
    loadScreen(name:string):void;
}
class NativeBB implements INative {
    private bb:any;

    constructor(native:any) {
        this.bb = native
        this.init()
    }

    private init():void {
        this.bb.init({
            bb10ForPlayBook: true,
            ondomready: function (element, name) {
                var methodName = 'onReady_' + name
                if (app[methodName])
                    app[methodName]();
            }})
    }

    public loadScreen(name:string):void {
        this.bb.pushScreen(name + '.html', name);
    }
}