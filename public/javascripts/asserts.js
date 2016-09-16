(function() {
    function isGreaterThan(a, b) {
        console.assert(a > b, {"message": "a is not greater than b", "a": a, "b": b});
    }

    function isEqualTo(a) {
        return function (b) {
            console.assert(a === b, {"message": "expected " + a + " saw" + b});
        }

    }
  window.asserts={
      isGreaterThan : isGreaterThan,
      isEqualTo : isEqualTo
  }
}());