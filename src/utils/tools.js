function tplReplace () {
	return /{{(.*?)}}/g;
}

function thumbShow (dom) {
	dom.on('load', function () {
      $(this).css('opacity', 1);
	});
}

function scrollToBottom (callback) {
  if (_getScrollTop() + _getWindowHeight() == _getScrollHeight()) {
    callback();
  }
}

function getUrlQueryValue (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
        res = window.location.search.substr(1).match(reg);

  return res != null ? decodeURIComponent(res[2]) : null;
}

module.exports = {
  tplReplace,
  thumbShow,
  scrollToBottom,
  getUrlQueryValue
}

/****************************** 内部方法 *********************************/

function _getScrollTop() {
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if (document.body) {
      bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
 
function _getScrollHeight() {
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}

function _getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
  } else {
      windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}