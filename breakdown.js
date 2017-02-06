"use strict";

function toUTF8Hex(chars, withPrefix) {
  var byteStr = utf8.encode(chars);
  var result = [];
  for (let byte, i = 0; i < byteStr.length; i++) {
    byte = byteStr.codePointAt(i).toString(16).toUpperCase();
    result.push((withPrefix ? '0x': '') + (byte.length == 1 ? '0' + byte : byte));
  }
  return result.join(' ');
}

function fromUTF8Hex(inputHex) {
  var hexStr = inputHex.toUpperCase().replace(/[^ABCDEF0123456789]/g, '');
  if (hexStr.length % 2) {
    alert("Need an even number of hexadecimal characters");
    return;
  }
  var utf8Str = String.fromCharCode(...hexStr.match(/.{1,2}/g).map(function (n) {return parseInt(n, 16)}));
  try {
    return utf8.decode(utf8Str);
  }
  catch (e) {
    alert(e);
  }
}

function toUTF32Hex(chars) {
  var hexChars = '';
  var codePoint;
  for (let char of chars) {
    codePoint = char.codePointAt(0).toString(16).toUpperCase();
    hexChars += '0'.repeat(8 - codePoint.length) + codePoint;
  }
  return (hexChars.match(/(.{8})/g) || ['']).join(' ');
}

function fromUTF32Hex(inputHex) {
  var hexStr = inputHex.toUpperCase().replace(/[^ABCDEF0123456789]/g, '');
  if (hexStr.length % 8) {
    alert("Need a multiple of 8 hexadecimal characters");
    return;
  }
  try {
    return String.fromCodePoint(...hexStr.match(/.{8}/g).map(function (n) {return parseInt(n, 16)}));
  }
  catch (e) {
    alert(e);
  }
}
  
function updateRaw(text) {
  $('#ta-raw').val(text);
}

function updateUTF8Hex(text) {
  var hexStr = toUTF8Hex(text, false);
  $('#ta-utf8hex').val(hexStr);
}

function updateUTF32Hex(text) {
  var hexStr = toUTF32Hex(text, false);
  $('#ta-utf32hex').val(hexStr);
}
    
function updateCharList(text) {
  var list = $('#char-names');
  list.children().remove();
  for (let char of text) {
    list.append('<li>"' + char + '" ' + UCD.getName(char) + ' (U+' + char.codePointAt(0).toString(16) + ', ' + toUTF8Hex(char, true) + ')</li>');
  }
}
     
$(function() {
  $('#bt-raw').click(function(e) {
    var text = $('#ta-raw').val();
    updateUTF32Hex(text);
    updateUTF8Hex(text);
    updateCharList(text);    
  });
  $('#bt-utf8hex').click(function(e) {
    var text = fromUTF8Hex($('#ta-utf8hex').val());
    updateRaw(text);
    updateUTF32Hex(text);
    updateUTF8Hex(text);
    updateCharList(text);
  });
  $('#bt-utf32hex').click(function(e) {
    var text = fromUTF32Hex($('#ta-utf32hex').val());
    updateRaw(text);
    updateUTF32Hex(text);
    updateUTF8Hex(text);
    updateCharList(text);
  });
});


