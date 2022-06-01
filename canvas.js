export const kkoverlay_getCanvas = (height,width) => {
    
    let canvas = document.createElement("canvas")
    canvas.className = "kkoverlay-canvas"
    let ctx = canvas.getContext("2d")
    canvas.height = height
    canvas.width = width

    let drawing = false

    let strokes = []

    const strokeStart = (e) => {
        e.preventDefault()

        if(drawing) return

        drawing = true
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
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
        ctx.moveTo(x, y)
    }

    HTMLCanvasElement.prototype.kkoverlay_undo = function(){
        strokes.pop()

        console.log(strokes)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        strokes.forEach( stroke => {
            stroke.forEach( inst => {
                if(inst.type==="strokeStart") {
                    strokeStart({ 
                        preventDefault : ()=> null,
                        clientX : inst.clientX,
                        clientY : inst.clientY
                     })
                }else if(inst.type === "drawStroke"){
                    drawStroke({
                        clientX : inst.clientX,
                        clientY : inst.clientY
                    })
                }else if(inst.type === "strokeEnd"){
                    strokeEnd({
                        preventDefault : ()=> null
                    })
                }
            })
        })
    }

    


    canvas.addEventListener("mousedown",(e) => {
        const pannel = document.querySelector(".kkoverlay-controlpannel")
        pannel.style.pointerEvents = "none"

        strokeStart(e)

        if(!drawing) return

        strokes.push([{
            type : "strokeStart",
            clientX : e.clientX,
            clientY : e.clientY
        }])

    })

    canvas.addEventListener("mouseup",(e) => {
        const pannel = document.querySelector(".kkoverlay-controlpannel")
        pannel.style.pointerEvents = "all"

        strokeEnd(e)

        if(drawing) return

        strokes[strokes.length-1].push({
            type : "strokeEnd",
        })

    })

    canvas.addEventListener("mousemove",(e) => {
        drawStroke(e)

        if(!drawing) return

        strokes[strokes.length-1].push({
            type : "drawStroke",
            clientX : e.clientX,
            clientY : e.clientY
        })

    })

    return canvas
}