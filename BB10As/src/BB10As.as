package {
import flash.display.Sprite;
import flash.display.StageAlign;
import flash.display.StageScaleMode;

import views.HomeView;
[SWF(height="1280", width="768", frameRate="60",backgroundColor="#FFFFFF")]
public class BB10As extends Sprite {

    public function BB10As() {
        stage.align = StageAlign.TOP_LEFT;
        stage.scaleMode = StageScaleMode.NO_SCALE;
        var view:HomeView = new HomeView()
        addChild(view)
    }
}
}