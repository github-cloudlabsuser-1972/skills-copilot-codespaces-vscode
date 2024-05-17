// Test case 1: Multiply two positive numbers
const calculator1 = new Calculator();
calculator1.multiply(3);
console.log(calculator1.getResult()); // Expected output: 0

// Test case 2: Multiply a positive number with zero
const calculator2 = new Calculator();
calculator2.add(5).multiply(0);
console.log(calculator2.getResult()); // Expected output: 0

// Test case 3: Multiply a negative number with a positive number
const calculator3 = new Calculator();
calculator3.add(-2).multiply(4);
console.log(calculator3.getResult()); // Expected output: -8

// Test case 4: Multiply two negative numbers
const calculator4 = new Calculator();
calculator4.add(-3).multiply(-2);
console.log(calculator4.getResult()); // Expected output: 6