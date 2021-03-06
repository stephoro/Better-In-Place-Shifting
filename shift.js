/**
Mimics the python 2 range function
*/
function range(a, b, s) {
    if (arguments.length == 1) {
        b = a;
        a = 0;
        s = 1;
    }
    b -= a;
    if (!s) {
        s = 1;
        if (b < a)
            s = -1;
    }
    var l = Math.ceil(b / s);
    if (l < 0)
        l = 0;
    var d = new Array(l);
    for (var i = 0; i < l; ++i) {
        d[i] = i * s + a;
    }
    return d;
}

/*
any generic swapping function
@param x {Array} The array
@param a {int} A position within the array to swap
@param b {int} A position within the array to swap
*/
function swap(array, a, b) {
    var t = array[a];
    array[a] = array[b];
    array[b] = t;
}

/**
Circular shifts an entire array to the right by an
integer amount in place.

*NOTE* the swap function can be replaced by any
swap function of your desire. (And should be inline)

@param {Array} ary The array to work on
@param {int} amount The amount of 
places to shift by
*/
function shift(ary, amt) { //smaller of 2 shift
    amt %= ary.length;
    if (amt == 0)
        return ary;
    var d = ary.length - amt;
    var s = 0;

    while (s < d) {
        var left = d - s;
        var check = amt > left;
        if (check) {
            amt = left;
        }
        for (var k = 0; k < amt; ++k) {
            swap(ary, s, k + d);
            ++s;
        }
        if (check) {
            d += amt;
            amt = ary.length - d;
        }
    }
    return ary;
}

/**
Circular shifts a sub-array to the right by an
integer amount in place.
@param {Array} ary The array to work on
@param {int} amount The amount of 
places to shift by
@param {int} start The array where shifting
begins (inclusive)
@param {int} end The array where shifting
ends (exclusive)
@param {Function(array, i, j)} How two elements should be swapped
*/
function shift2(ary, amt, start, end, swap) { //smaller of 2 shift
    var len = end - start;
    amt %= len;
    if (amt == 0)
        return ary;
    var d = start + len - amt;
    var s = start;
    while (s < d) {
        var left = d - s;
        var check = amt > left;
        if (check) {
            amt = left;
        }
        for (var k = 0; k < amt; ++k) {
            swap(ary, s, k + d);
            ++s;
        }
        if (check) {
            d += amt;
            amt = start + len - d;
        }
    }
    return ary;
}

/**
Logs tests
*/
function test(size){
    for(var i = 0; i < size; ++i)
        console.log(shift(range(size), i));
}

test(100);