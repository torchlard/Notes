const str = "PAYPALISHIRING"

const init = line => {
  let j = []
  for(let i=0; i<line; i++){
    j.push('')
  }
}

function* cycle(max) {
  let i = 0, sign = -1;
  while (true) {
    if (max === 0) yield 0
    else {
      if (i === max || i === 0)
        sign = -1 * sign;
      yield i
      i += sign;
    }
  }
}

const fn = (str, obj, cycleSrc) => {
  if(str.length === 0) return obj
  obj[cycleSrc.next().value] += str[0]
  return fn(str.slice(1), obj, cycleSrc )
}

const convert = (s, numRows) =>
  fn(s, init(numRows), cycle(numRows - 1)).reduce((x, y) => x + y, '')


console.log(convert(str, 3));  

const fn = (max, current = '(', l = 1, r = 0) => {
  if (l === max) return [current + ')'.repeat(max - r)]
  return fn(max, current + '(', l + 1, r).concat(l > r ? fn(max, current + ')', l, r + 1) : [])
}

const generateParenthesis = n => n === 0 ? [] : fn(n)


console.log(generateParenthesis(3));


const str = "bab"
const str = "babaababb"
const str = "babaabacc"
const str = "aab"

// exclude 0,1,2
const fn = str => {
  let center = 1, max=str[0], maxLen=1, current='', len = str.length;
  let start=0, end=0;

  while(center < len-1){
    current = '';
    // if no more left
    if ( 2*(len - center -1)+2 <= maxLen) return max;

    // obtain core
    let ts = center-1; te = center+1;
    let start=-1, end=-1;
    while (ts >= 0 && str[ts] === str[center]) {
      ts--;
    }
    while (te <= len-1 && str[te] === str[center]) {
      te++;
    }
    current = str.slice(ts+1, te)
    start = ts; end = te;

    // console.log(start,end,center);
    // check two ends
    while (start >= 0 && end <= len-1){
      if (str[start] === str[end] ){
        current = str[start] + current + str[end];
        start--;
        end++;
      } else {
        break;
      }
    }

    // go to next round
    if(current.length > maxLen) {
      max = current;
      maxLen = max.length;
    } 
    center++;
  }

  return max;
}


const longestPalindrome = s => {
  const len = s.length;

  if(len <= 1) return s;
  if(len === 2) return s[0] === s[1] ? s : s[0];
  return fn(s)
}


const longestPalindrome = s => {
  if (s === '' || s.length < 1 ) return ""
  let start = 0, end = 0;
  for(let i=0; i < s.length; i++){ // i = center
    let len1 = expandAroundCenter(s, 1, i)
    let len2 = expandAroundCenter(s, 1, i+1)
    let len = Math.max(len1, len2)
    if (len > end - start){
      start = i - (len-1)/2
      end = i + len/2
    }
  }
  return s.substr(start, end+1)
}

const expandAroundCenter = (s, left, right) => {
  let l=left, r=right
  while(l>=0 && r < s.length && s[l] === s[r] ){
    l--;
    r++;
  }
  return r - l - 1;
}

console.log( longestPalindrome(str) );



public String longestPalindrome(String s) {
  if (s == null || s.length() < 1) return "";
  int start = 0, end = 0;
  for (int i = 0; i < s.length(); i++) {
    int len1 = expandAroundCenter(s, i, i);
    int len2 = expandAroundCenter(s, i, i + 1);
    int len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - (len - 1) / 2;
      end = i + len / 2;
    }
  }
  return s.substring(start, end + 1);
}

private int expandAroundCenter(String s, int left, int right) {
  int L = left, R = right;
  while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
    L--;
    R++;
  }
  return R - L - 1;
}

const str = "()(()";
const str = ")()())"
const str = ")()(()))"
const str = "))(()"

const longestValidParentheses = str => {
  let max=0, l=0, open=0, close=0;
  const len = str.length;

  while (l < len){
    open = 0; close = 0;
    // console.log(l, max);
    if (len - l <= max) break;
    if(str[l] === ')') {
      l++;
      continue;
    } 
    
    for(let i=l; i < len; i++){
      str[i] === '(' ? open++ : close++;
      // console.log('op',open,close);

      if(open === close) {
        let tmp = i-l+1;
        if(tmp > max) max = tmp;
      } else if (open < close){
        l = i;
        break;
      }
    }

    l++;
  }
  return max;
}

const helper = stack => {
  let a = stack[0], b = stack[1];
  if (typeof(a) === 'Number' && typeof(b) === 'Number'){
    stack = stack.substr(2);
    stack = 
  }
}

const max = arr => Math.max(...arr)

const longestValidParentheses = str => {
  let numList=[0], stack='';

  for (let i=0; i<str.length; i++){
    console.log(stack);

    if(str[i] === ')'){
      if (stack[0] === '[') {
        stack = stack.substr(1);
        // let num = numList.shift();
        numList[0] += num + 2;
        while (stack[0] === '['){
          let num = numList.shift();
          numList[0] += num;
        }
      }
      else if (stack[0] === '('){
        stack = stack.substr(1);
        numList.unshift(2);

        if (stack.charAt(0) === '(') stack = '[' + stack.substr(1);
        else {
          let num = numList.shift();
          numList[0] += num;
        }
      }
    } else {
      stack = '(' + stack;
    }
  }

  console.log(numList);
  return max(numList);
}

const longestValidParentheses = str => {
  let maxans = 0, stack = [-1];

  for (let i=0; i < str.length; i++){
    if(str.charAt(i) === '('){
      stack.push(i)
    } 
    else {
      stack.pop()
      if (stack.length === 0){
        stack.push(i)
      } else {
        // console.log('max', stack.length);
        // starting position: stack[stack.length-1], current position: i
        maxans = Math.max(maxans, i - stack[stack.length-1] )
      }
    }
    // console.log(stack, maxans);
  }
  return maxans;
}


public class Solution {

  public int longestValidParentheses(String s) {
    int maxans = 0;
    Stack < Integer > stack = new Stack<>();
    stack.push(-1);
    for (int i = 0; i < s.length(); i++) {
      if (s.charAt(i) == '(') {
        stack.push(i);
      } else {
        stack.pop();
        if (stack.empty()) {
          stack.push(i);
        } else {
          maxans = Math.max(maxans, i - stack.peek());
        }
      }
    }
    return maxans;
  }
}


console.log(longestValidParentheses(str));

const nums = [5, 7, 7, 8, 8, 10]
// const nums = [1,2]

const helper = (index, nums, target) => {
  let start = index-1, end = index+1;
  while(nums[end] === target) end++;
  while(nums[start] === target) start--;

  return [start+1, end-1];
}


const searchRange = (nums, target) => {
  let start = 0, end = nums.length-1;
  let index = Math.floor(end/2);
  
  // exit loop when only 2 elements left
  while (start < end -1){
    if(nums[index] !== target){
      if(nums[index] > target){
        end = index;
      } else {
        start = index + 1;
      }
      index = Math.floor((start + end)/2);
    }  // bingo
    else {
      return helper(index, nums, target);
    }
    console.log(start,end, index);
  }

  if (start === end) {
    return nums[start] === target ? [start, start] : [-1, -1]
  }
  else if (start === end-1) {
    let xs = nums[start] === target ? start : end
    let xt = nums[end] === target ? end : start
    return xs > xt ? [-1, -1] : [xs, xt]
  }

  return [-1, -1];
}


console.log(searchRange(nums, 7));

let table = Array(600000);

const f = n => {
  if (n == 0 || n == 1) return 1
  if (table[n]) return table[n];
  
  table[n] = f(n - 1) + f(n - 2);
  return table[n];
}

const stairs_climbing = (m) => {

  for (let i = 0; i <= 5; i++)
    table[i] = 0


  let n = 0;
  while (n >= 0 && n <= m){
    f(n)
    n++;
  }
  console.log('climb to', m, 'with', f(m), 'methods')
}const maxArea = nums => {
let res = []
for (let i = 1; i < nums.length; i++) {
  for (let j = 0; j < nums.length - i; j++) {
    res.push(Math.min(nums[j], nums[j + i]) * i)
  }
}

return Math.max(...res);
}


stairs_climbing(40000)

const x = 8, y = 8;
let c = Array(x * y)

const staircase_walk = () => {
  for (let j = 0; j < y; ++j) c[j] = 1

  for (let i = 1; i < x; i++)
    for (let j = 1; j < y; j++)
      c[j] += c[j - 1]
}

staircase_walk()
for(let i=0; i<8; i++) 
  console.log(c[i]);


const X=16, Y=16;
const a = [...Array(X)].map(_ => Array(Y))
const c = [...Array(X)].map(_ => Array(Y))

for(let i=0; i<X; i++)
  for(let j=0; j<Y; j++)
    a[i][j] = Math.floor(Math.random() * 10)

const staircase_walk = () => {
  c[0][0] = a[0][0]
  // one column first
  for(let i=1; i<X; i++)
    c[i][0] = c[i-1][0] + a[i][0]
  // fill first row
  for (let j=1; j<Y; j++)
    c[0][j] = c[0][j-1] + a[0][j]

  for(let i=1; i<X; i++)  
    for(let j=1; j<Y; j++)
      c[i][j] = Math.min(c[i-1][j], c[i][j-1]) + a[i][j]
}

staircase_walk()
console.log(a);
console.log(c[7][7]);
console.log(c);

const nums = [1, 8, 6, 2, 5, 4, 8, 3, 7]
const nums = [2,10,4,6,4,5,8,6]


const maxArea = nums => {
  let res = [], max = 0, tmp = 0;
  for (let i=1; i<nums.length; i++){
    for(let j=0; j<nums.length - i; j++ ){
      res.push(Math.min(nums[j], nums[j+i])*i)
    }
    tmp = Math.max(...res);
    if (tmp > max) max = tmp;
    res = []
  }

  return max;
}

console.log(maxArea(nums));


const pow = (x, n) => {
  if (n == 0) return 1;
  if (n<0) {
    n = -n;
    x = 1/x;
  }
  return pow(x*x, Math.floor(n/2)) * (n%2 === 0 ? 1.0 : x)
}

console.log(pow(8784379821774892,16));


