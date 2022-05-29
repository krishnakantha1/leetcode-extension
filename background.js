chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab)=>{
    if(changeInfo.status === "loading")    
        chrome.scripting.insertCSS({ files : ["kkoverlay-main.css"], target : {tabId : tabID}},()=>{
            console.log("inserted")
        })
})