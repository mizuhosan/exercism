/*
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
  return charset[charset.indexOf(char) + charset.indexOf(key[index % key.length]) % charset.length];
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
*/

var Cipher = function (key) {
    var cipher = {key:""};
    var possible = "abcdefghijklmnopqrstuvwxyz";
    var possibleMap = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25};

    // 1) Random key generation generates keys at random
    // 5) Random key cipher has a key that is at least 100 characters long
    if (key == null){
        for (var i = 0; i < 100; i++) {

            // Math.floor(x) 引数として与えた数以下の最大の整数を返します。
            // Math.random() 0以上1未満の疑似ランダムな浮動小数点。
            cipher.key += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    } else {
        var myError = new Error('Bad key')

        // 14) Incorrect key cipher throws an error with an empty key
        // 15) Incorrect key cipher throws an error with a numeric key
        // 16) Incorrect key cipher throws an error with an all caps key
        if(key == '' | parseInt(key) | key == key.toUpperCase()){
            throw myError;
        } else {
            cipher.key = key;
        }
    }

    // 3) Random key cipher can encode
    cipher.encode = function (encodeInput) {
        if (encodeInput){
            if (encodeInput.length > cipher.key.length){
                var difference = encodeInput.length - cipher.key.length
                for (var k = 0; k < difference; k++) {
                    cipher.key += cipher.key[k]
                }
            }
            var encodeOutput = '';
            var current;
            var encodedChar;
            for (var j = 0; j < encodeInput.length; j++){
                var offset =  possibleMap[cipher.key.charAt(j)];
                current = possibleMap[encodeInput.charAt(j)]
                if ((offset+current) > 25){
                    encodedChar = (offset+current) - 26
                } else {
                    encodedChar = offset+current
                }
                encodeOutput += possible[encodedChar]
            }
        }
        return encodeOutput;
    }

    // 2) Random key cipher can decode
    // 4) Random key cipher is reversible
    cipher.decode = function (decodeInput) {
            if (decodeInput){
                var decodeOutput = '';
                var current;
                for (var i = 0; i < decodeInput.length; i++){
                    var keyChar =  possibleMap[cipher.key.charAt(i)];
                    current = possibleMap[decodeInput.charAt(i)]
                    if ((current - keyChar) < 0){
                        decodedChar = (current - keyChar) + 26
                    } else {
                        decodedChar = current - keyChar
                    }
                    decodeOutput += possible[decodedChar]
                }
            }
            return decodeOutput;
        }

    return cipher;
};

module.exports = Cipher;
