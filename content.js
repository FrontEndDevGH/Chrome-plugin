var toggle = true

let UIversion = 'RT Style Version is undefined'

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

// Find components on pages section start

let siteDomain = document.location.hostname

var getComponents = function (elem) {
    var setPageTitle = function (response) {
        if (response.includes('<title>')) {
            let startPos = response.indexOf('<title');
            startPos = response.indexOf('>', startPos) + 1;
            let endPos = response.indexOf('</title>', startPos);
            return response.slice(startPos, endPos)
        }
        return ''
    }
    
    let widgetID = elem
    let widgetsArr = []
    // Send request to get stylesheet
    const url = [
                    `https://${siteDomain}/b2b/telephony/vats`, 
                    `https://${siteDomain}/b2b/corp_iptv/restaurants`,
                    `https://${siteDomain}/b2b/`,
                    `https://${siteDomain}/b2b/be-in-plus`,
                    `https://${siteDomain}/b2b/telephony/mobile`,
                    `https://${siteDomain}/b2b/telephony/8800`,
                    `https://${siteDomain}/b2b/telephony/audioconference`,
                    `https://${siteDomain}/b2b/internet/fix`,
                    `https://${siteDomain}/b2b/internet/business_wifi`,
                    `https://${siteDomain}/b2b/internet/vpn`,
                    `https://${siteDomain}/b2b/internet/managed_services`,
                    `https://${siteDomain}/b2b/corp_iptv/office`,
                    `https://${siteDomain}/b2b/corp_iptv/hotels`,
                    `https://${siteDomain}/b2b/corp_iptv/children`,
                    `https://${siteDomain}/b2b/security`,
                    `https://${siteDomain}/b2b/videocomfort`,
                    `https://${siteDomain}/b2b/service_cloudy`,
                    `https://${siteDomain}/b2b/service_cloudy/virtual_dc`,
                    `https://${siteDomain}/b2b/solutions/sms_advertising`,
                    `https://${siteDomain}/b2b/help`,
                    `https://${siteDomain}/b2b/sale-office`,
                    `https://${siteDomain}/b2b/internet/big_internet`,
                    `https://${siteDomain}/b2b/business_drive`,
                    `https://${siteDomain}/b2b/registration_business_drive`,
                    `https://${siteDomain}/b2b/telephony/vats/action`,
                    `https://${siteDomain}/b2b/telephony/8800/action`,
                ];

    // Send request for URL
        var fetchComponents = function (setUrl, i, arr) {
        const Http = new XMLHttpRequest();
        Http.open("GET", setUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.readyState === 4 && Http.status === 200) {
                if (Http.responseText.indexOf(widgetID) > 0) {
                    widgetsArr.push({ title: setPageTitle(Http.responseText), pageURL: setUrl })
                        chrome.extension.sendMessage({
                            type: "set-components",
                            data: {
                                myProperty: widgetsArr
                            }
                        });
                }
            }
        }
    }

    // Get components data from URL
    url.forEach((item, i, arr) => {
        fetchComponents(item, i, arr);
    })
    
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
            getComponents(message.elem);
        break;
    }
});

