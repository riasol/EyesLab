package {
import flash.display.Graphics;

public class GraphicsTools {
    public static function drawArc(context:Graphics, x:Number, y:Number, radius:Number, startRadAngle:Number, endRadAngle:Number,isNew:Boolean=false):void {
        var p:Vector.<Number> = GraphicsTools.xy(startRadAngle, radius)
        if(isNew)
            context.moveTo(p[0], p[1])
        var steps:uint = radius * Math.abs(startRadAngle - endRadAngle)
        var radStep:Number = Math.abs(startRadAngle - endRadAngle) / steps
        for (var i:int = 0; i <= steps; i++) {//TODO <= is qfix
            p = GraphicsTools.xy(startRadAngle + i * radStep, radius)
            context.lineTo(p[0], p[1])
        }
    }

    private static function xy(radian:Number, r:Number):Vector.<Number> {
        return new <Number>[r * Math.cos(radian), r * Math.sin(radian)]
    }
}
}
