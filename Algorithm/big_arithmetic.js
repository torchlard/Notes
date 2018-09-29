const bigAdd = (a, b, m = 8) => {
  // m = limited digits
  const n1 = a.toString(),
    n2 = b.toString();
  const n1Len = n1.length,
    n2Len = n2.length;

  let i = 1,
    carrier = 0,
    numList = [];

  while (true) {
    const x1 = n1Len - i * m < -m + 1 ? '' : parseInt(
      n1.substr(Math.max(n1Len - i * m, 0), Math.min(m, m + n1Len - i * m)))
    const x2 = n2Len - i * m < -m + 1 ? '' : parseInt(
      n2.substr(Math.max(n2Len - i * m, 0), Math.min(m, m + n2Len - i * m)))

    // console.log(n1Len - i * m, n2Len - i * m);

    // add carrier if any to front
    if (x1 === '' && x2 === '') {
      if (carrier == 1) numList.push('1');
      break;
    }

    let res = (x1 === '' ? 0 : x1) + (x2 === '' ? 0 : x2) + carrier

    if (res > Math.pow(10, m)) {
      carrier = 1;
      res -= Math.pow(10, m)
    } else {
      carrier = 0;
    }
    // add safe number strings to array to concat
    numList.push(res.toString().padStart(m, "0"));

    i++; // next round
  }
  // console.log(numList);

  return numList.reduce((x, y) => y + x, '').replace(/^0*/g, '')
}

// console.log(bigAdd('450078747817847219847398172479832798424321', '448732740817047320989721'));

const karat = (m, n1, n2) => {
  const n1Len = n1.length,
    n2Len = n2.length

  if (n1Len < m && n2Len < m) return bigMul(n1, n2);

  const mid1 = Math.floor(n1Len / 2),
    mid2 = Math.floor(n2Len / 2)

  const x1 = n1.substr(0, mid1),
    y1 = n2.substr(0, mid2)
  const x0 = n1.substr(mid1),
    y0 = n2.substr(mid2)

  const z2 = karat(x1, y1);
  const z1 = karat(bigAdd(8, x1, x0), bigAdd(8, y0, y1));
  const z0 = karat(x0, y0);

  return
}


procedure karatsuba(num1, num2)
if (num1 < 10) or(num2 < 10)
return num1 * num2
/* calculates the size of the numbers */
m = max(size_base10(num1), size_base10(num2))
m2 = floor(m / 2)
/* split the digit sequences in the middle */
high1, low1 = split_at(num1, m2)
high2, low2 = split_at(num2, m2)
/* 3 calls made to numbers approximately half the size */
z0 = karatsuba(low1, low2)
z1 = karatsuba((low1 + high1), (low2 + high2))
z2 = karatsuba(high1, high2)
return (z2 * 10 ^ (m2 * 2)) + ((z1 - z2 - z0) * 10 ^ m2) + z0



function karatsubaMulti(x, y) {

  let n = Math.min(('' + x).length, ('' + y).length);

  if (n == 1)
    return x * y;

  let tenpowhalfn = Math.pow(10, parseInt(n / 2));
  let tenpown = Math.pow(10, 2 * parseInt(n / 2));

  let a = parseInt(x / tenpowhalfn);
  let b = x % tenpowhalfn;
  let c = parseInt(y / tenpowhalfn);
  let d = y % tenpowhalfn;

  let caller = arguments.callee;

  return tenpown * caller(a, c) + tenpowhalfn * (caller(a, d) + caller(b, c)) + caller(b, d);
}

console.log(karatsubaMulti(1234599999432, 6789099999432));


function multiply(x, y) {

  // if x and y are single digit numbers (the base case),
  // do simple integer multiplication
  if ((parseInt(x) < 10) && (parseInt(y) < 10)) {
    console.log('x - y = ', x, y, x * y);
    return parseInt(x) * parseInt(y);
  } else {
    const n = Math.min(('' + x).length, ('' + y).length);
    const m = Math.round(n / 2);
    const halfx = Math.floor(x.toString().length / 2);
    const halfy = Math.floor(y.toString().length / 2);

    const a = parseInt(x.toString().substring(0, x.toString().length - m));
    const b = parseInt(x.toString().substring(x.toString().length - m, x.toString().length));
    const c = parseInt(y.toString().substring(0, y.toString().length - m));
    const d = parseInt(y.toString().substring(y.toString().length - m, y.toString().length));

    const p = a + b;
    const q = c + d;

    const ac = multiply(a, c);
    const bd = multiply(b, d);
    const pq = multiply(p, q);

    const adbc = pq - ac - bd;

    const first = Math.pow(10, n) * ac;
    const second = Math.pow(10, n / 2) * adbc;
    const result = first + second + bd;

    return result;
  }
}

const mult = multiply(5678, 1234);
const diff = 5678 * 1234 - mult
console.log(mult);
