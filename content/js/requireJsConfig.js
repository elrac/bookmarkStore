var require = {
    baseUrl: 'js/lib',
    paths:{
      'jquery':'ext/jquery',
      'handlebars':'ext/handlebars',
      'main':'..'
    }
};

require.add = function(obj){
  var oldObj;
  var newObject;
  for(var key in obj){
    oldObj = require[key];
    newObj = obj[key];
    if(oldObj &&
      ( typeof oldObj === 'object') &&
      ( typeof newObj === 'object')){
      for(var inkey in newObj){
        oldObj[inkey] = newObj[inkey];
      }
    }else{
      require[key] = obj[key];
    }
  }
};

Object.defineProperty(require,'add',{
  enumerable: false
});
