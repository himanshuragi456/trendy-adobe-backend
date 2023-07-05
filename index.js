let testArr = [22, 1, 35, 21, 90, 56];

let sortedArr = [];

let max_num = 0;

for (let index = 0; index < testArr.length; index++) {
    const element = testArr[index];
    if(element > max_num){
        max_num = element
        sortedArr.push(element)
    }
}