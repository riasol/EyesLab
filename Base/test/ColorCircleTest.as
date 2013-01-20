package {
import flexunit.framework.Assert;

[Test]
public class ColorCircleTest {
    private var instance:ColorCircle;

    [Before]
    public function setUp():void {
        instance = new ColorCircle(100)
    }

    [Test]
    public function testDrawCicrcle():void {
        Assert.assertNotNull(instance)
        instance.drawCircle()
    }

    [Test]
    public function testSetOneColor():void {
        instance.setOneColor(0,0x888888)

    }

    [Test]
    public function testGetSegment():void {
        instance.drawCircle()
        var point:Array=instance.getSegment([25,10])
        Assert.assertEquals(0x1FDD79,point[1])
        point=instance.getSegment([-25,-25])
        Assert.assertEquals(0x762A17,point[1])
    }
}
}
