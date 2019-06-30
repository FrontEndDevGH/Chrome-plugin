var toggle = true

let UIversion = ''

toggleGrid = function () {
    if (toggle) {
        var div = document.createElement("div");
        div.classList.add('grid')
        div.classList.add('grid--active')
        div.setAttribute('id', 'gridID');
        document.body.appendChild(div);
        div.innerHTML = `
                        <div class="row">
                        <div class="rt-col-1 rt-col-td-1 rt-col-md-1 demo-col"></div>
                        <div class="rt-col-1 rt-col-td-1 rt-col-md-1 demo-col"></div>
                        <div class="rt-col-1 rt-col-td-1 rt-col-md-1 demo-col"></div>
                        <div class="rt-col-1 rt-col-td-1 demo-col md-d-none"></div>
                        <div class="rt-col-1 rt-col-td-1 demo-col md-d-none"></div>
                        <div class="rt-col-1 rt-col-td-1 demo-col md-d-none"></div>
                        <div class="rt-col-1 demo-col md-d-none td-d-none"></div>
                        <div class="rt-col-1 demo-col md-d-none td-d-none"></div>
                        <div class="rt-col-1 demo-col md-d-none td-d-none"></div>
                        <div class="rt-col-1 demo-col md-d-none td-d-none"></div>
                        <div class="rt-col-1 demo-col md-d-none td-d-none"></div>
                        <div class="rt-col-1 demo-col md-d-none td-d-none"></div>
                        </div>
                        `
       
        toggle = !toggle
    } else {
        var grid = document.getElementById('gridID')
        grid.remove();
        toggle = !toggle
    }

}

var getUiVersion = function () {
    chrome.extension.sendMessage({
        type: "send-ui-version",
        data: {
            myProperty: UIversion
        }
    });
};

// Getting relative styles.css URL
let styleSheetArr = [...document.getElementsByTagName('link')]
styleSheetArr = styleSheetArr.filter((item) => {
    if (item.getAttribute('href').indexOf('styles.css') !== -1) {
        return true
    }
    return false
})

var setUIversion = function (response) {
    if (response.includes('rt-style-ver')) {
        let startPos = response.indexOf('rt-style-ver');
        startPos = response.indexOf('"', startPos) + 1;
        let endPos = response.indexOf('"', startPos);
        UIversion = response.slice(startPos, endPos)
    }
}

// Creating full styles.css URL

if (styleSheetArr.length) {
    let styleURL = styleSheetArr[0].baseURI + styleSheetArr[0].getAttribute('href')

    // Send request to get stylesheet
    const Http = new XMLHttpRequest();
    const url = styleURL;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            setUIversion(Http.responseText);
        }
    }
}

// Listener
chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "colors-div":
            toggleGrid();
        break;
        case "get-ui-version":
            getUiVersion();
        break;
    }
});

