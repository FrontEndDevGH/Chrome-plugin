var toggle = true

let UIversion = 'RT Style Version is undefined'

toggleGrid = function () {
    if (toggle) {
        var div = document.createElement("div");
        div.classList.add('grid')
        div.classList.add('grid--active')
        div.setAttribute('id', 'gridID');
        document.body.appendChild(div);

        var div2 = document.createElement("div");
        div2.classList.add('row')
        div.appendChild(div2);

        //child elems

        var child1 = document.createElement("div");
        child1.classList.add('rt-col-1')
        child1.classList.add('rt-col-td-1')
        child1.classList.add('rt-col-md-1')
        child1.classList.add('demo-col')
        div2.appendChild(child1);

        var child2 = document.createElement("div");
        child2.classList.add('rt-col-1')
        child2.classList.add('rt-col-td-1')
        child2.classList.add('rt-col-md-1')
        child2.classList.add('demo-col')
        div2.appendChild(child2);

        var child3 = document.createElement("div");
        child3.classList.add('rt-col-1')
        child3.classList.add('rt-col-td-1')
        child3.classList.add('rt-col-md-1')
        child3.classList.add('demo-col')
        div2.appendChild(child3);



        var child4 = document.createElement("div");
        child4.classList.add('rt-col-1')
        child4.classList.add('rt-col-td-1')
        child4.classList.add('demo-col')
        child4.classList.add('md-d-none')
        div2.appendChild(child4);

        var child5 = document.createElement("div");
        child5.classList.add('rt-col-1')
        child5.classList.add('rt-col-td-1')
        child5.classList.add('demo-col')
        child5.classList.add('md-d-none')
        div2.appendChild(child5);

        var child6 = document.createElement("div");
        child6.classList.add('rt-col-1')
        child6.classList.add('rt-col-td-1')
        child6.classList.add('demo-col')
        child6.classList.add('md-d-none')
        div2.appendChild(child6);



        var child7 = document.createElement("div");
        child7.classList.add('rt-col-1')
        child7.classList.add('demo-col')
        child7.classList.add('md-d-none')
        child7.classList.add('td-d-none')
        div2.appendChild(child7);

        var child8 = document.createElement("div");
        child8.classList.add('rt-col-1')
        child8.classList.add('demo-col')
        child8.classList.add('md-d-none')
        child8.classList.add('td-d-none')
        div2.appendChild(child8);

        var child9 = document.createElement("div");
        child9.classList.add('rt-col-1')
        child9.classList.add('demo-col')
        child9.classList.add('md-d-none')
        child9.classList.add('td-d-none')
        div2.appendChild(child9);

        var child10 = document.createElement("div");
        child10.classList.add('rt-col-1')
        child10.classList.add('demo-col')
        child10.classList.add('md-d-none')
        child10.classList.add('td-d-none')
        div2.appendChild(child10);

        var child11 = document.createElement("div");
        child11.classList.add('rt-col-1')
        child11.classList.add('demo-col')
        child11.classList.add('md-d-none')
        child11.classList.add('td-d-none')
        div2.appendChild(child11);

        var child12 = document.createElement("div");
        child12.classList.add('rt-col-1')
        child12.classList.add('demo-col')
        child12.classList.add('md-d-none')
        child12.classList.add('td-d-none')
        div2.appendChild(child12);
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

// Find components on pages section start

var setPageTitle = function (response) {
    debugger
    if (response.includes('<title>')) {
        let startPos = response.indexOf('<title');
        startPos = response.indexOf('>', startPos) + 1;
        let endPos = response.indexOf('</title>', startPos);
        return response.slice(startPos, endPos)
    }
    return ''
}

let widgetID = `elementId: 'banner'`
let widgetsArr = []
// Send request to get stylesheet
const Http = new XMLHttpRequest();
const url = 'https://krasnodar.rt.ru/b2b/telephony/vats';
Http.open("GET", url);
Http.send();
Http.onreadystatechange = (e) => {
    if (Http.readyState === 4 && Http.status === 200) {
        if (Http.responseText.indexOf(widgetID) > 0) {
            widgetsArr.push({ title: setPageTitle(Http.responseText), pageURL: url })
            // sendPagesList(widgetsArr);
        }
    }
}
console.log(widgetsArr);

var getComponents = function () {
    chrome.extension.sendMessage({
        type: "set-components",
        data: {
            myProperty: widgetsArr
        }
    });
};


// Find components on pages section end


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
        case "show-components":
            getComponents();
        break;
    }
});

