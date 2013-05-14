declare var app:EyesLab;
class ColorPointer {
    constructor(color:string, x:number, y:number, html:HTMLElement) {
        html.style.backgroundColor = color;
        html.style.left = x + 'px'
        html.style.top = y + 'px'
        html.onclick = ()=> {
            html.className = 'selected'
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

    private loadScreen(name:string) {
        this.native.loadScreen(name);
    }

    public onReady_home():void {
        var el=document.getElementById('count')
        el.onchange=()=>{
            this.colorCount=<number>el.value
            this.drawColors()
        }
        el.onchange()
    }

    public home():void {
        this.native.loadScreen('home');
    }

    private colorCount:number;

    private drawColors():void {
        var colors:string[] = '5ce800 ffcc00 ff0000 616c00 2b52ff d929e2 c9c9c9 00e0e0 009a00 b28200'.split(' ')
        var contain:HTMLElement = document.getElementById('drawing')
        contain.innerHTML = ''
        var containerLen:number = 400
        var selected:number[] = []
        var itemsPerSide:number = 5
        var newPosition = ()=> {
            while (true) {
                var idx:number = Math.ceil(Math.random() * Math.pow(itemsPerSide, 2))
                var searchIdx:number=-1
                var count:number=0
                while(true){
                    searchIdx=selected.indexOf(idx,searchIdx+1)
                    if(searchIdx>-1)
                    count++
                    if(searchIdx==-1)
                    break;
                }
                if (searchIdx == -1 || count<=2) {
                    selected.push(idx)
                    break
                }
            }
            return {x: Math.ceil(idx/itemsPerSide), y: idx%itemsPerSide}
        }
        var perSection:number=containerLen/itemsPerSide
        for (var i = 0; i < this.colorCount; i++) {
            var obj = colors[i];
            var circ = document.createElement('div')
            contain.appendChild(circ)
            var pos = newPosition();
            new ColorPointer('#'+colors[i], pos.x*perSection, pos.y*perSection, circ);
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