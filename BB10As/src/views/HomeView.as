package views {
import flash.events.Event;

import qnx.fuse.ui.buttons.LabelButton;
import qnx.fuse.ui.core.Container;
import qnx.fuse.ui.core.UIComponent;
import qnx.fuse.ui.layouts.Align;
import qnx.fuse.ui.layouts.gridLayout.GridData;
import qnx.fuse.ui.layouts.gridLayout.GridLayout;
import qnx.fuse.ui.layouts.rowLayout.RowData;
import qnx.fuse.ui.layouts.rowLayout.RowLayout;
import qnx.fuse.ui.layouts.rowLayout.RowLayoutType;
import qnx.fuse.ui.titlebar.TitleBar;

public class HomeView extends UIComponent {
    public function HomeView() {
        addEventListener(Event.ADDED_TO_STAGE, onAddedToStage)
    }

    private function onAddedToStage(event:Event):void {
        initUI()
        removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage)
    }

    private function initUI():void {
        var topCont:Container = new Container()
        topCont.setActualSize(stage.stageWidth, stage.stageHeight)
        var lay:RowLayout = new RowLayout
		lay.type=RowLayoutType.HORIZONTAL
        topCont.layout = lay
        var t:TitleBar = new TitleBar()
        addChild(t)
        t.addChild(topCont)
        t.title = 'Red-green blindness test'
        var b:LabelButton = new LabelButton()
        b.label = 'more'
        var rd:RowData = new RowData()
        rd.hAlign = Align.END
        b.layoutData = rd
		topCont.addChild(b)
		var mainCont:Container=new Container
		mainCont.setActualSize(stage.stageWidth,stage.stageHeight)
		addChild(mainCont)
		lay=new RowLayout
		lay.type=RowLayoutType.VERTICAL
		mainCont.layout=lay
		var cW:Number=.8*stage.stageWidth
		var drawer:ColorCircle = new ColorCircle(cW)
		var drawerCont:UIComponent=new UIComponent
		drawerCont.width=stage.stageWidth
		rd=new RowData
		rd.hAlign=Align.CENTER
		rd.vAlign=Align.CENTER
		drawerCont.layoutData=rd
		drawerCont.addChild(drawer)
		mainCont.addChild(drawerCont)
		drawer.drawCircle()
    }
}
}
