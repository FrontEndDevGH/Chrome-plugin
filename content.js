var toggle = true

toggleGrid = function() {
        if (toggle) {
        var div=document.createElement("div");
        div.classList.add('grid')
        div.classList.add('grid--active')
        div.setAttribute('id', 'gridID');
        document.body.appendChild(div);
    
        var div2=document.createElement("div");
        div2.classList.add('row')
        div.appendChild(div2);
    
        //child elems
    
        var child1=document.createElement("div");
        child1.classList.add('rt-col-1')
        child1.classList.add('rt-col-td-1')
        child1.classList.add('rt-col-md-1')
        child1.classList.add('demo-col')
        div2.appendChild(child1);
    
        var child2=document.createElement("div");
        child2.classList.add('rt-col-1')
        child2.classList.add('rt-col-td-1')
        child2.classList.add('rt-col-md-1')
        child2.classList.add('demo-col')
        div2.appendChild(child2);
    
        var child3=document.createElement("div");
        child3.classList.add('rt-col-1')
        child3.classList.add('rt-col-td-1')
        child3.classList.add('rt-col-md-1')
        child3.classList.add('demo-col')
        div2.appendChild(child3);
    
    
    
        var child4=document.createElement("div");
        child4.classList.add('rt-col-1')
        child4.classList.add('rt-col-td-1')
        child4.classList.add('demo-col')
        child4.classList.add('md-d-none')
        div2.appendChild(child4);
    
        var child5=document.createElement("div");
        child5.classList.add('rt-col-1')
        child5.classList.add('rt-col-td-1')
        child5.classList.add('demo-col')
        child5.classList.add('md-d-none')
        div2.appendChild(child5);
    
        var child6=document.createElement("div");
        child6.classList.add('rt-col-1')
        child6.classList.add('rt-col-td-1')
        child6.classList.add('demo-col')
        child6.classList.add('rmd-d-none')
        div2.appendChild(child6);
    
    
    
        var child7=document.createElement("div");
        child7.classList.add('rt-col-1')
        child7.classList.add('demo-col')
        child7.classList.add('md-d-none')
        child7.classList.add('td-d-none')
        div2.appendChild(child7);
    
        var child8=document.createElement("div");
        child8.classList.add('rt-col-1')
        child8.classList.add('demo-col')
        child8.classList.add('md-d-none')
        child8.classList.add('td-d-none')
        div2.appendChild(child8);
    
        var child9=document.createElement("div");
        child9.classList.add('rt-col-1')
        child9.classList.add('demo-col')
        child9.classList.add('md-d-none')
        child9.classList.add('td-d-none')
        div2.appendChild(child9);
    
        var child10=document.createElement("div");
        child10.classList.add('rt-col-1')
        child10.classList.add('demo-col')
        child10.classList.add('md-d-none')
        child10.classList.add('td-d-none')
        div2.appendChild(child10);
    
        var child11=document.createElement("div");
        child11.classList.add('rt-col-1')
        child11.classList.add('demo-col')
        child11.classList.add('md-d-none')
        child11.classList.add('td-d-none')
        div2.appendChild(child11);
    
        var child12=document.createElement("div");
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
var getUiVersion = function() {
    alert('ui');
};


chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "colors-div":
            toggleGrid();
        break;
        case "get-ui-version":
            getUiVersion();
        break;
    }
});

window.addEventListener("load", function() {
    chrome.extension.sendMessage({
        type: "ui", 
        data: {
            myProperty: "value"
        }
    });
}, true);