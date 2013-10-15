
<div style="position: absolute; top: 0px; left: 0px;pointer-events: none;position: fixed;">
    <img id="background" src="<?php echo DOMAIN_IMG;?>city.jpg"
        style="display: none;">
    <canvas id="canvas" width="1178" height="723"
        style="width: 1178px; height: 723px; position: absolute; top: 0px; left: 0px; opacity: 0.2; "></canvas>
    <script src="<?php echo DOMAIN_JS;?>rainyday.0.1.1.js"
        type="text/javascript"></script>
    <script type="text/javascript">
            function demo() {
                var engine = new RainyDay('canvas','background', window.innerWidth, window.innerHeight,1);
                    engine.gravity = engine.GRAVITY_NON_LINEAR;
                    engine.trail = engine.TRAIL_DROPS;
                    engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
                    engine.rain([
                        engine.preset(0, 2, 0.5),
                        engine.preset(4, 4, 1)
                    ], 50);
            }
            demo();
        </script>
</div>
