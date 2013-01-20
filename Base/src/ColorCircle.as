package {
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;
import flash.geom.Matrix;

public class ColorCircle extends Sprite {
    private var _colors:Vector.<uint> = new <uint>[0x1FDD79,0x0F7641,0x762A17,0x522CBE,0xF6F243]
    private var amounts:Vector.<Number> = new <Number>[2, 3, 1.5,1,1.8]
    private var radius:Number

    public function drawCircle(isRandomStart:Boolean=false):void {
        var sum:Number = 0
        amounts.forEach(function (el:Number, i:int, all:Vector.<Number>) {
            sum += el
        })
        var radNow:Number = isRandomStart?Math.random()*Math.PI*2: 0
        var p:Vector.<Number> = xy(radNow,radius)
        var pDest:Vector.<Number>
        graphics.clear()
        for (var i:uint; i < _colors.length; i++) {
            var part:Number = amounts[i] / sum*2*Math.PI
            graphics.beginFill(_colors[i])
            graphics.moveTo(0, 0)
            graphics.lineTo(p[0], p[1])
            GraphicsTools.drawArc(graphics,0,0,radius,radNow,radNow+part)
            radNow += part
            graphics.endFill()
            p = xy(radNow,radius)
        }

    }

    private function xy(radian:Number,r:Number):Vector.<Number> {
        return new <Number>[r * Math.cos(radian), r * Math.sin(radian)]
    }

    public function get colors():Vector.<uint> {
        return _colors;
    }
    public function setOneColor(index:uint,color:uint):void{
        _colors[index]=color
        drawCircle()
    }

    public function ColorCircle(diameter:Number) {
        radius=diameter/2
    }

    public function getSegment(point:Array):Array {
        var idx:uint
        var color:int=-1
        var bd:BitmapData=new BitmapData(width,height)
        var m:Matrix=new Matrix()
        m.translate(width/2,height/2)
        bd.draw(this, m)
        var bdColor:uint=bd.getPixel(point[0]+width/2,point[1]+height/2)
        for (var i:int = 0; i < _colors.length; i++) {
            if(_colors[i]==bdColor){
                idx = i
                color=bdColor
                break
            }
        }
        /*var b:Bitmap=new Bitmap(bd)
        addChild(b)
        with(b){
            x = 200
            y = 200
        }*/
        return[idx,color]
    }
}
}
