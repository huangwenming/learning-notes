
var backgroundPageConnection = chrome.runtime.connect({name: "devtools-page"});

backgroundPageConnection.onMessage.addListener(function (message) {
	//获得消息
    console.log('recieved by pop.html: ' + message)
});

window.addEventListener("load", function() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
    	initQrcode(tabs[0].url)
    })
});
var initQrcode = function(url) {
	var pre = {
		'web': url,
		'map': 'baidumap://map/cost_share?url=' + url,
        'carowner': 'baidumap://map/component?comName=carowner&target=open_web_page&popRoot=no&param=' +
        encodeURIComponent(JSON.stringify({'url':url, 'from':"chrome-qrcode", "showShare":"0"})),
        'shoubai': 'baiduboxapp://v1/easybrowse/open?url=' + encodeURIComponent(url),
		'nuo': 'bainuo://component?url=' + encodeURIComponent(url),
		'nuoweb': 'bainuo://web?url=' + encodeURIComponent(url),
        'lbc': 'baidumap://map/component?comName=lbc&target=webshell_login_page&param=' +
        encodeURIComponent(JSON.stringify({'url':url})),
	};
	// 正常浏览器url
	jQuery('#qrcodeWeb').qrcode({
		text: pre.web
	});

	// 百度地图url 
	jQuery('#qrcodeMap').qrcode({
		text: pre.map
	});

    // 百度地图车主壳浏览器url
    jQuery('#qrcodeCarowner').qrcode({
        text: pre.carowner
    });

    // 手机百度轻浏览url
    jQuery('#shoubai').qrcode({
        text: pre.shoubai
    });

	// 百度糯米浏览器组件版本
	jQuery('#qrcodeNuo').qrcode({
		text: pre.nuo
	});	

	// 百度糯米浏览器web版本 
	jQuery('#qrcodeNuoWeb').qrcode({
		text: pre.nuoweb
	});

    // lbc壳浏览器url
    jQuery('#qrcodeLbc').qrcode({
        text: pre.lbc
    });
    var util = {
        hasClass: function (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass: function (obj, cls) {
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        },
        removeClass: function(obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }
    }

    document.querySelector('#app').addEventListener('click', function (e) {
        var id = e.target.getAttribute('data-id');
        console.log(id);
        if (id) {
            copyTextToClipboard(pre[id], function () {
                showElement(e.target.previousElementSibling);
            });
        }
    });
    function showElement(el) {
        util.removeClass(el, 'hidden');
        setTimeout(function () {
            util.addClass(el, 'hidden');
        }, 2000);
    }

    function copyTextToClipboard(text, success) {
        var textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var msg = document.execCommand('copy') ? '成功' : '失败';
            if (msg === '成功') {
                success();
            }
            console.log('复制内容 ' + msg);
        } catch (err) {
            console.log('不能使用这种方法复制内容');
        }

        document.body.removeChild(textArea);
    }
}