
chrome.runtime.onConnect.addListener(function (port) {
    port.postMessage('message from background');
});