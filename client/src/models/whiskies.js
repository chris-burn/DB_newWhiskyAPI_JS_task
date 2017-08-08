var Whisky = require('./whisky');

var Whiskies = function() {


}

Whiskies.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
  },

  all: function(callback){
    this.makeRequest("http://localhost:3000/api/whiskies", function(){
      if (this.status !== 200) return;
        // this.response text needs to be in the context of makeRequest, rather than a new function
        var jsonString = this.responseText;
        var results = JSON.parse(jsonString);
        // similar to Ruby Map, BUT we want this to mean something different to above this.response. Global prototype 
        var whiskies = Whiskies.prototype.populateWhiskies(results);
        // callback whiskies which is called in New UI
        callback(whiskies);
      });
  },

  populateWhiskies: function(results){
    var whiskies = [];
      // pull out each JSON object, loops through and adds to new array
      for(var result of results){
        var whisky = new Whisky(result);
        whiskies.push(whisky);
      }
      // then return array then CALLBACK above
      return whiskies;
    },

  // callback to hit the API.  Cant use make request above as its a GET request.  We need a POST request.  See makePostRequest
  add: function(newWhisky, callback){
    var whiskyToAdd = JSON.stringify(newWhisky);
    this.makePostRequest("http://localhost:3000/api/whiskies", callback, whiskyToAdd);
  },

    // additional parameter. payload is data you want to add
    makePostRequest: function(url, callback, payload){
      var request = new XMLHttpRequest();
      request.open('POST', url);
      // we need to tell function that the data in in JSON format as its a POST
      request.setRequestHeader("Content-type", "application/json");
      request.addEventListener('load', callback);
      // payload fed back, will be a call back
      request.send(payload);
    }

}

module.exports = Whiskies;