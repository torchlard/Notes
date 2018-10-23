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


// const data = 'flight_node[1-3,5,7].qunar.com'
const data = 'flight_[nod]e.qu[1-3,5-8,9,0]nar.com'

// const data = read_line()

const getNames = data => {

  if (!data.match(/\[[0-9,\,,\-]+\]/g)) {
    console.log(data);
    // print(data);
    return;
  }

  const fstr1 = data.match(/.+\[/g)[0]
  const fstr = fstr1.substr(0, fstr1.length - 1)
  const sstr = data.match(/\](.+)$/g)[0].substr(1)

  const brac = data.match(/\[[0-9,\,,\-]+\]/g)[0]
  const nums = brac.substr(1, brac.length -2).split(',')
  console.log(fstr1)
  console.log(sstr)

  let res = []
  for (let i of nums){
    if(i.includes('-')){
      let [a,b] = i.split('-')
      for(let j = a; j <= b; j++)
        res.push(j.toString()); 
    } else {
      res.push(i)
    }
  }


  for(let i of res){
    console.log(fstr + i + sstr)
    // print( fstr.substr(0, fstr.length-1) + i + sstr )
  }
  return;
}

getNames(data)



function ListNode(val) {
  this.val = val;
  this.next = null;
}

const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const len = numList.length
const buildList = (i = 0) => {
  if (i === len)
    return null;
  const n = new ListNode(numList[i])
  n.next = buildList(i + 1)
  return n;
}

const traverse_print = (node) => {
  let n = node;
  do {
    console.log(n.val)
    n = n.next
  } while (n !== null)
}

traverse_print(buildList())

============

const traverse = (head, n) => {
  let node = head;
  for(let i=1; i<n; i++){
    node = node.next;
  }
  return node;
}

const removeNthFromEnd = (head, n) => {
  let left = head;
  let right = traverse(head, n);

  if(right.next === null){
    return head.next;
  }
  right = right.next;

  while(right.next !== null){
    left = left.next;
    right = right.next;
  }

  left.next = left.next.next;
  return head;
}

traverse_print(removeNthFromEnd(buildList(), 1))

const swapPairs = head => {
  if(head === null)
    return null;
  if(head.next === null)
    return head;

  let [a1, a2] = [head, head.next]  
  let n = a2.next;
  a1.next = n;
  a2.next = a1;
  head = a2;
  let p = a1;

  while(n !== null){
    a1 = n;
    a2 = a1.next;
    if(a2 === null)
      break;
    n = a2.next;
    p.next = a2;
    a1.next = n;
    a2.next = a1;
    p = a1;
  }

  return head;  
}

traverse_print(swapPairs(buildList()))



var swapPairs = function (head) {
  let dummy = new ListNode();
  dummy.next = head;
  let current = head;
  let previous = dummy;
  while (current !== null && current.next !== null) {
    let next = current.next.next;
    current.next.next = current;
    previous.next = current.next;
    current.next = next;

    previous = current;
    current = current.next;
  }
  return dummy.next;
};

let data = [1, 2,3,4,5,6]
let data = [3, 2, 1]
let data = [11, 12, 0, 27, 3, 11, 21, 9, 0, 15, 26, 27, 17, 24, 0, 16, 4, 17, 14, 8, 15, 8, 2, 16, 10, 6, 6, 24, 16, 2, 18, 19, 6, 10, 17, 10, 21, 0, 11, 13, 7, 7, 2, 16, 24, 25, 2, 20, 12, 9, 20, 19]


const findNext = (target, nums) => {
  if(nums.length === 1){
    return nums.concat([target])
  }
  const min = Math.min(...nums.filter(i => i > target))
  const index = nums.indexOf(min)
  let res = nums
  res[index] = target
  return [min].concat(res.sort((a,b) => a-b))
}

const nextPermutation = nums => {
  const len = nums.length;
  let i = len-1;

  while(i > 0){
    if(nums[i] > nums[i-1]){
      const res = findNext(nums[i - 1], nums.slice(i))
      nums.splice(i-1, len-i+1, ...res)
      return;
    }
    i--;
  }
  nums.sort((a,b) => a-b)
}

nextPermutation(data)
console.log(data);

const data = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "9", ".", ".", ".", ".", "6", "."],
  ["2", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

let hash = {}

const unique = nums => {
  hash = {}
  nums = nums.filter(x => x !== '.')
  for(let i of nums){
    if(hash[i])
      return false;
    hash[i] = true;
  }
  return true;
}

const row = 9;
const column = 9;

const isValidSudoku = board => {
  for(let i=0; i < row; i++){
    if(! unique(board[i]))
      return false;
  }
  for (let i = 0; i < column; i++) {
    if (! unique(board.map(x => x[i])) )
      return false;
  }

  let tmp = []
  for(let i=0; i<row; i+=3){
    for (let j=0; j<column; j+=3){
      tmp = board.slice(i, i+3).map(x => x.slice(j, j+3)).reduce((i, j) => i.concat(j))
      if(! unique(tmp))
        return false;
    }
  }

  return true;
}

console.log( data.slice(0,3).map(x => x.slice(3,6)).reduce((i,j) => i.concat(j) )  )

const isValidSudoku = function (board) {

  const map = {};
  let row = 0;
  let column = 0;

  while (row < 9) {
    let num = board[row][column];

    if (num != '.') {
      if (map[num]) {

        for (let i = 0; i < map[num].length; i++) {
          // check if the same value violates the rule
          if ((Math.floor(map[num][i][0] / 3) == Math.floor(row / 3) 
          && Math.floor(map[num][i][1] / 3) == Math.floor(column / 3)) 
          || map[num][i][0] == row || map[num][i][1] == column) {
            return false
          }
        }
        map[num].push([row, column]);

      } else {
        map[num] = [[row, column]];
      }

    }

    column++;
    if (column == 9) {
      column = 0;
      row++;
    }
  }

  return true;
};

console.log(isValidSudoku(data) )

const data = [2,5,2,1,2]
const target = 5

const unique = (results, target) => {
  return results.every(i => ! i.every((elem,idx) => elem === target[idx]))
}

const combinationSum2 = (candidates, target) => {

  candidates.sort((a,b) => a-b)

  const tree = (elemList, candid, sum, result) => {
    // console.log('elemList', elemList)

    if(sum === target){
      // console.log('-------->')
      return result.push(elemList);
    }
    else if(sum > target)
      return;

    for (let i = 0; i < candid.length; i++) {
      const elem = candid[i]
      if (elem !== candid[i - 1])
        tree(elemList.concat([elem]), candid.slice(i+1), sum+elem, result);
    }
  }

  const res = []
  for (let i=0; i < candidates.length; i++) {
    if( candidates[i] !== candidates[i-1])
      tree([candidates[i]], candidates.slice(i+1), candidates[i], res)
  }
  return res;
}

console.log( combinationSum(data, target) )

var combinationSum2 = function (c, target) {
  var res = [];
  c = c.sort((a, b) => a - b);

  helper(target, [], 0);

  function helper(need, tmp, start) {
    if (need === 0) {
      res.push(tmp.slice());
    } else {
      for (var i = start; i < c.length; i++) {
        if (c[i] > need) continue;
        if (i > start && c[i - 1] == c[i]) continue;
        tmp.push(c[i]);
        helper(need - c[i], tmp, i + 1);
        tmp.pop();
      }
    }
  }
  return res;
};

const data = [4, 5, 6, 7, 0, 1, 2]
// const data = [0,1,2,3,4,5,6,7]
const target = 5

const search = (nums, target) => {
  const len = nums.length

  if (nums[0] === target)
    return 0;
  if (nums[len-1] === target)
    return len-1;

  const subSearch = (l,r) => {
    console.log('lr',l,r)

    if(r-l <= 1) {
      if (nums[l] === target)
        return l;
      else if (nums[r] === target)
        return r;
      else 
        return -1;
    }

    const mid = Math.floor((r + l) / 2)
    const midVal = nums[mid]

    if(midVal === target){
      return mid;
    } else {
      if(nums[l] < nums[r]){
        return (midVal > target) ? subSearch(l, mid) : subSearch(mid, r)
      } else {
        if(midVal > nums[l]){
          if(target > )
          return subSearch(mid,r)
        } else {
          return (midVal > target) ? subSearch(l, mid) : subSearch(mid, r)
        }
      }
    }
  }

  return subSearch(0 ,len-1)
}

console.log(search(data, target))
