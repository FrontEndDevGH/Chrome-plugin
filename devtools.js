window.onload = function() {
    // Copyright (c) 2012 The Chromium Authors. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.
  
    // The function below is executed in the context of the inspected page.
    
    function sendMsg () {
        console.log($0);
    }

    function updateElementProperties() {
        let currentEl = 'element'

        chrome.devtools.inspectedWindow.eval("setSelectedElement($0)",
    { useContentScriptContext: true });
        
    }

    chrome.devtools.panels.elements.onSelectionChanged.addListener(
        updateElementProperties);
  }
  