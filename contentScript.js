(async ()=>{

    const c = chrome.runtime.getURL("canvas.js")
    const m = await import(c)

    let controlPannel = document.querySelector(".kkoverlay-controlpannel")
    const controlOptions = [
        {
            title : "Delete Canvas",
            imageSrc : chrome.runtime.getURL("files/delete.png"),
            handleClick : function(e){
                const canvas = document.querySelector(".kkoverlay-canvas")
                
                if(!canvas) return

                let bdy = document.querySelector("body")
                bdy.removeChild(canvas)
            }
        },
        {
            title : "Hide Canvas",
            imageSrc : chrome.runtime.getURL("files/hide.png"),
            handleClick : function(e){
                const canvas = document.querySelector(".kkoverlay-canvas")

                if(!canvas) return

                const not_display = document.querySelector(".kkoverlay-hidecanvas")

                if(not_display){
                    canvas.classList.remove("kkoverlay-hidecanvas")
                }else{
                    canvas.classList.add("kkoverlay-hidecanvas")
                }
            }

        },
        {
            title : "Add Canvas",
            imageSrc : chrome.runtime.getURL("files/create.png"),
            handleClick : function(e){
                const canvas = document.querySelector(".kkoverlay-canvas")
                
                if(canvas) return

                let bdy = document.querySelector("body")
                bdy.appendChild(m.kkoverlay_getCanvas(bdy.clientHeight, bdy.clientWidth))
            }
        }
        
    ]

    if(!controlPannel){
        controlPannel = createControlPannel()
        document.querySelector("body").appendChild(controlPannel)
    }

    function createControlPannel(){
        let div = document.createElement("div")
        div.className = "kkoverlay-controlpannel"

        div.addEventListener("click",(e)=> e.preventDefault())
        div.addEventListener("mousedown",(e)=> e.preventDefault())
        div.addEventListener("mouseup",(e)=> e.preventDefault())
        div.addEventListener("mousemove",(e)=> e.preventDefault())
        
        div.appendChild(createPannelPrompt({ imageSrc : chrome.runtime.getURL("files/prompt.png") }))
        for(let i=0;i<controlOptions.length;i++){
            div.appendChild(createControlOption(controlOptions[i]))
        }

        return div
    }

    function createPannelPrompt({ imageSrc }){
        const div = document.createElement("div")
        div.className = "kkoverlay-controlprompt"

        const img = document.createElement("img")
        img.src = imageSrc
        img.alt = "prompt"

        div.appendChild(img)

        return div
    }

    function createControlOption({ imageSrc, title, handleClick }){
        const div = document.createElement("div")
        div.className = "kkoverlay-controloption"

        const img = document.createElement("img")
        img.src = imageSrc
        img.alt = title
        img.title = title

        img.addEventListener("click", handleClick)

        div.appendChild(img)

        return div
    }

})();