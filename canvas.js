export const kkoverlay_getCanvas = (height,width) => {
    
    let canvas = document.createElement("canvas")
    canvas.className = "kkoverlay-canvas"
    let ctx = canvas.getContext("2d")
    canvas.height = height
    canvas.width = width

    let drawing = false

    const strokeStart = (e) => {
        e.preventDefault()

        if(drawing) return

        drawing = true
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.fillStyle = "black";
        ctx.beginPath();
        drawStroke(e)
    }

    const strokeEnd = (e) => {
        e.preventDefault()

        if(!drawing) return

        drawing = false
        ctx.stroke()
      

    }

    const drawStroke = (e) => {
        if(!drawing) return

        ctx.lineCap = "round"
        let x = e.clientX
        let y = e.clientY
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y);
    }


    canvas.addEventListener("mousedown",strokeStart)
    canvas.addEventListener("mouseup",strokeEnd)
    canvas.addEventListener("mousemove",drawStroke)

    return canvas
}