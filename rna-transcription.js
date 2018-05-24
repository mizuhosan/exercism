var DnaTranscriber = function () {
};

DnaTranscriber.prototype.toRna = function(dna){
  const dnaMap = {"C":"G","G":"C","T":"A","A":"U"};
  return dna.split("").map(function(x){
    if(dnaMap[x]){
      return dnaMap[x];
    }else{
      throw new Error("Invalid input");
    }
  }).join("");
}

module.exports = DnaTranscriber;
