function sum (...args) {
	let result = 0;
	args.forEach(element => {
		result += Number(element);
	});
	return result
}

function subtract (one, two) {

	return Number(one) - Number(two);
}

//for arrays
// function sum (arr) {
// 	let result = 0;
// 	arr.forEach(element => {
// 		result += element;
// 	});
// 	return result
// }

function divide(x,y){
    return Number(x) / Number(y);
}

function multiply(x,y){
    return Number(x)*Number(y);
}

function remainder(x,y){
    return Number(x)%Number(y);
}
// function multiply (arr) {
// 	let result = 1;
// 	arr.forEach(element => {
// 		result *= element;
// 	});
// 	return result
// }

function power(one, two) {
	return Math.pow(one,two);
}

function factorial(num) {
	let result = 1;
	if(num <=0){
		return result;
	}else{
		for(let i = 1; i <=num; i++){
			result*=i;
		}
		return result;
	}
}

export  {
	sum,
	subtract,
    remainder,
    multiply,
    divide,
    power,
	factorial
}