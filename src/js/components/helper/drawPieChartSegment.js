function drawPieChartSegment(canvas, context, arcSize, colour, startingAngle) {
    context.save();
    console.log("Width " + canvas.width)
    console.log("Height" + canvas.height)
    var centerX = Math.floor(canvas.width / 2)
    var centerY = Math.floor(canvas.height / 2)
    var radius = Math.floor(canvas.height / 2)
 
    var endingAngle = startingAngle + arcSize
 
    context.beginPath()
    context.moveTo(centerX, centerY)
    context.arc(centerX, centerY, radius, startingAngle, endingAngle, false)
    context.closePath()
 
    context.fillStyle = colour
    context.fill()
 
    context.restore() 
}

export default drawPieChartSegment