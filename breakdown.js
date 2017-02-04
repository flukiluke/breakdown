function toUTF8Hex(char) {
  var byteStr = utf8.encode(char);
  var result = [];
  for (let byte, i = 0; i < byteStr.length; i++) {
    byte = byteStr.codePointAt(i).toString(16).toUpperCase();
    result.push('0x' + (byte.length == 1 ? '0' + byte : byte));
  }
  return result.join(' ');
}
    
$(function() {
  $('#bt-raw').click(function(e) {
    var text = $('#ta-raw').val();
    var list = $('#char-names');
    list.children().remove();
    for (let char of text) {
      list.append('<li>"' + char + '" ' + UCD.getName(char) + ' (' + char.charCodeAt(0) + ', ' + toUTF8Hex(char) + ')</li>');
    }
  });
});


