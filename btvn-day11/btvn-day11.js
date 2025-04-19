// khai bao bien
// number
var a=10 ;
let b = 2; // uu tien dung
// string
let c = 'vanh';
// hang so
const d =3 ;


console.log(a);
console.log(b);
console.log(c);
console.log(d);
// toan tu so hoc + - * /

// phep cong
console.log(a+b);
//phep tru
console.log(a-b);
//phep nhan
console.log(a*b);
//phep chia
console.log(a/b);

// toan tu voi string

let name ='viet_anh'

let vanh = 'ha_';

console.log(name + vanh);
console.log(name - vanh); // NaN
console.log(name * vanh); // NaN
console.log(name / vanh); // NaN

// toan tu voi string link number

let e='12324'
let f='123'
console.log(e + f) ; // string
console.log(e - f);  // number
console.log(e * f); // number
console.log(e / f); // number

// phep luy thua

console.log(a**2); // a*a
console.log(a**3); // a*a*a
console.log(a**(1/2)); // can bac 2 cua a

// phep chia lay du

console.log(a % d);
console.log(a % b);

// toan tu ++ va toan tu  --

let g=10;
console.log(g++ +5) ; // g=15 log a truoc roi cong them 1 don vi
console.log(++g + 5) ; // g=17 cong truoc roi moi log

// data type

let h=10 ;
let k= 15 ;
console.log(typeof (h > k)) ;
console.log(typeof a) ;

// ep kieu string --> number
let x = 'abcdfs'
x = Number(x)
console.log(x);// x=NaN

// number --> bool
let y = '0'
let z = '1'
y = Boolean(y)
z = Boolean(z)
console.log(y); // y= true
console.log(z); // z= false

// bool --> number
let i = true ;
let j = false;
i = Number(i);
j = Number(j);
console.log(j); // j = 0
console.log(i); // i = 1

// bool --> string
let n = true;
let o = false;
n = String(n);
o = String(o);
console.log(o); // true
console.log(n); //false









