var _ = require('lodash');

function isPrimitive(v){
  return _.isString(v) || _.isNumber(v) || _.isBoolean(v);
}

function isSimple(v){
  return isPrimitive(v) || _.isNull(v);
}

function stringValue(v){
  if(isPrimitive(v)){
    return JSON.stringify(v);
  } else if(_.isNull(v)){
    return "pp::Var::Null()";
  }
}


var uPrefixes = Object.create(null);
function getUniqueName(prefix){
  if (!uPrefixes[prefix]) {
    // prefix available. create it.
    uPrefixes[prefix] = 0;
    return prefix;

  } else {
    // prefix already taken, increment it.
    return prefix + "_" + uPrefixes[prefix]++;
  }
}


var jsonPepper = function(j, name){
  // base cases: string, number, boolean
  if(isSimple(j)){
    return _.isString(name) ? 'pp::Var '+ name + "("+stringValue(j)+");" : 'pp::Var('+stringValue(j)+')';
  }


  // if not primitive, force a name.
  name = _.isString(name) ? name : (_.isArray(j) ? getUniqueName('array') : getUniqueName('obj'));

  // arrays, a bit more complicated
  if(_.isArray(j)){
    var str = 'pp::VarArray '+name+';\n';
    for(var i = 0 ; i < j.length; i++){
      var valueJS = j[i];
      var value;
      // if primitive, simplify things a bit.
      if(isSimple(valueJS)){
        value = stringValue(valueJS);
      } else {
        // else, give it a name
        var valueName = getUniqueName(name+'_'+i);
        str += jsonPepper(valueJS, valueName);
        value = valueName;
      }
      str += name+'.Set('+i+', '+ value + ');\n';
    }
    return str;
  }

  // objects, complicated.
  if(_.isObject(j)){
    var str = 'pp::VarDictionary ' + name +';\n';
    var keys = Object.keys(j);
    for(var k = 0; k < keys.length; k++){
      var key = keys[k];
      if(j.hasOwnProperty(key)){
        var valueJS = j[key];
        var value;
        if(isSimple(valueJS)){
          value = stringValue(valueJS);
        } else {
          // else, give it a name
          var valueName = getUniqueName(name+'_'+key);
          str += jsonPepper(valueJS, valueName);
          value = valueName;
        }

        str += name+'.Set('+stringValue(key)+','+value+');\n';
      }
    }
    return str;

  }

};

module.exports = jsonPepper;