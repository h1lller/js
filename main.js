flatten([1, 'any [complex] string', null, function () { }, [1, 2, [3, '4'], 0], [], { a: 1 }]);
// возвращает
//      [1, 'any [complex] string', null, function() {}, 1, 2, 3, '4', 0, { a: 1 }]

function flatten(list) {
  let newList = [];

  (function fillList(list) {
    list.forEach(element => {
      if (Array.isArray(element)) {
        fillList(element);
        return true;
      }
      else {
        newList.push(element);
      }
    });
  })(list)

  console.log(newList);
}
