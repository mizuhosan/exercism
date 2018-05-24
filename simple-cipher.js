let charset = "abcdefghijklmnopqrstuvwxyz";
var Cipher = function (key) {
  if(/^[a-z]+$/.test(key)===false){
    throw Error("Bad key");
  }
  this.key = (key === undefined) ? randomKey() : key
};

Cipher.prototype.encode = function(chars){
  return chars
  .split("")
  .map(function(char,index){
    encodedChar(char,index,this.key))
  .join("")
  }
}

Cipher.prototype.deconde = function(chars){
  return chars
  .split("")
  .map(function(char,index){
    decodedChar(char,index,this.key))
  .join("")
  }
}

function encodedChar(char,index,key){
  return charset[charset.indexOf(char) + charset.indexOf(key[index % key.length])) % charset.length];
}

function decodedChar (char, index, key) {
  return charset[(charset.indexOf(char) - charset.indexOf(key[index % key.length]) + charset.length) % charset.length];
}

function randomKey () {
  return Array(10)
    .fill()
    .map(e => charset[Math.floor(Math.random() * Math.floor(25))])
    .join('')
}

module.exports = Cipher;
