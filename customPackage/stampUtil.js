exports.measureText = function (context, text, x, y, maxWidth, fontSize,fontFace){
            let words = text.split(' ');
    let line = '';
    let lineHeight = fontSize + 2;
    context.font = fontSize + "px " + fontFace;
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth) {
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            return y
    }
exports.drawParagraph = function(context, text, x, y, maxWidth, fontSize, fontFace){
    let words = text.split(' ');
    let line = '';
    let lineHeight = fontSize + 2;
            context.font = fontSize + "px " + fontFace;

            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
    }
