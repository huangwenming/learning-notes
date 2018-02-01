
var backgroundPageConnection = chrome.runtime.connect({name: "devtools-page"});

backgroundPageConnection.onMessage.addListener(function (message) {
	//获得消息
    console.log('recieved by pop.html: ' + message)
});

window.addEventListener("load", function() {
    var base64EncodeBtn = document.querySelector('#base64-encode-btn');
    var base64DecodeBtn = document.querySelector('#base64-decode-btn');
    var base64SourceText = document.querySelector('#base64-source');
    var base64ResultText = document.querySelector('#base64-result');
    base64EncodeBtn.addEventListener('click', function () {
        var text = base64SourceText.value;
        text !== '' && (base64ResultText.value = util.base64Encode(text));
    });
    base64DecodeBtn.addEventListener('click', function () {
        var text = base64ResultText.value;
        text !== '' && (base64SourceText.value = util.base64Decode(text));
    });

    var URIEncodeBtn = document.querySelector('#URI-encode-btn');
    var URIDecodeBtn = document.querySelector('#URI-decode-btn');
    var URISourceText = document.querySelector('#URI-source');
    var URIResultText = document.querySelector('#URI-result');
    URIEncodeBtn.addEventListener('click', function () {
        var text = URISourceText.value;
        text !== '' && (URIResultText.value = encodeURIComponent(text));
    });
    URIDecodeBtn.addEventListener('click', function () {
        var text = URIResultText.value;
        text !== '' && (URISourceText.value = decodeURIComponent(text));
    });
});