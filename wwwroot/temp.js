t.prototype.renderText = function (e, t) {
    var o, n = U.percentToPoint(null !== (o = t.textProps.fontScaling) && void 0 !== o ? o : "".concat(100, "%"));
    1 === n ? e.fillText(
        t.text,
        (0, c.twipsToPx)(t.frame.x),
        (0, c.twipsToPx)(t.frame.y)) :
        (
            e.save(),
            e.transform(
                n,
                0,
                0,
                1,
                (0, c.twipsToPx)(t.frame.x) * (1 - n),
                0),
            e.fillText(
                t.text,
                (0, c.twipsToPx)(t.frame.x),
                (0, c.twipsToPx)(t.frame.y)),
                e.restore())
}