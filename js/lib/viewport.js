var contentWidth = 1000;
var ua = navigator.userAgent;
if((ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || ua.indexOf('iPad') > 0 || ua.indexOf('Kindle') > 0 || ua.indexOf('Silk') > 0){
	document.write('<meta name="viewport" content="width=' + contentWidth + '">');
} else {
	document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
}
