/**
 * Created by huangwenming on 2018/5/31.
 */
/**
 * @file chrome快速粘贴插件
 * @desc 功能是在一个页面ctrl+v时，如果这个页面有唯一的input且没有focus，自动focus过去，完成粘贴
 *
 */

function keyPress(event){
    var keyCode = event.keyCode || event.which || event.charCode;
    var ctrlKey = event.ctrlKey || event.metaKey;
    // 如果是ctrl+v，读取粘贴板的内容，同时查询未focus的唯一input
    if(ctrlKey && keyCode == 86) {
        // event.preventDefault();
        // 读取focus的元素
        var focusEle = document.activeElement;
        if (!focusEle || !focusEle.type) {
            var inputs = document.querySelectorAll('input');
            if (inputs.length === 1) {
                pasteTextFromClipboard(function (text) {
                    inputs[0].value = text;
                });
            }
        }
    }
}
function pasteTextFromClipboard(success) {
    // Firefox: content scripts only works with a <textarea>
    // 相关参考https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = '-2em';
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);

    // 设置为textarea为focus，准备写入内容
    textArea.focus();
    try {
        // manifest中需打开clipboardRead权限
        var msg = document.execCommand('paste') ? '成功' : '失败';
        if (msg === '成功') {
            // 异步回调
            setTimeout(function () {
                success(textArea.value);
            }, 0);
        }
        console.log('粘贴内容 ' + msg);
    } catch (err) {
        console.log('不能使用这种方法粘贴内容');
    }
    document.body.removeChild(textArea);

}
document.addEventListener('keydown', keyPress);