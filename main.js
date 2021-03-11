function get(object, key, argen) {
  var value;
  var stroke = key.split('.');
  var i = stroke.shift();
  var newString = stroke.join('.');

  Object.keys(object).some(function (k) {
    if (object[i] && typeof object[i] === 'object') {
      value = get(object[i], newString, argen);
      return true;
    }
    else {
      value = argen ? argen : i ? object[i] : object || undefined;
      return
    }
  });
  return value;
}

const obj = {
  a: {
    b: {
      c: 'd'
    },
    e: 'f'
  }
};

get(obj, 'a.b');   // { c : 'd' }
get(obj, 'a.b.c'); // 'd'
get(obj, 'a.e');   // 'f'
get(obj, 'a.x.e'); // undefined
get(obj, 'a.x.e', true); // true
get(obj, 'a.x.e', 'My default value'); // My default value
