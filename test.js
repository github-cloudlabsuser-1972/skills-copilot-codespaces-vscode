// Calculator function
function calculator() {
    console.log("Welcome to the Calculator!");
    console.log("Options:");
    console.log("1. Add");
    console.log("2. Subtract");
    console.log("3. Multiply");
    console.log("4. Divide");
    console.log("5. Exit");

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function getOperation() {
        rl.question("Enter your choice (1-5): ", function (choice) {
            if (choice === '5') {
                console.log("Thanks for using the calculator. Goodbye!");
                rl.close();
                return;
            }

            if (!['1', '2', '3', '4'].includes(choice)) {
                console.log("Invalid choice. Please try again.");
                return getOperation();
            }

            rl.question("Enter the first number: ", function (num1) {
                if (isNaN(num1)) {
                    console.log("Invalid input. Please enter a valid number.");
                    return getOperation();
                }

                rl.question("Enter the second number: ", function (num2) {
                    if (isNaN(num2)) {
                        console.log("Invalid input. Please enter a valid number.");
                        return getOperation();
                    }

                    num1 = parseFloat(num1);
                    num2 = parseFloat(num2);

                    switch (choice) {
                        case '1':
                            console.log(`Result: ${num1 + num2}`);
                            break;
                        case '2':
                            console.log(`Result: ${num1 - num2}`);
                            break;
                        case '3':
                            console.log(`Result: ${num1 * num2}`);
                            break;
                        case '4':
                            if (num2 === 0) {
                                console.log("Error: Division by zero is not allowed.");
                            } else {
                                console.log(`Result: ${num1 / num2}`);
                            }
                            break;
                    }
                    getOperation();
                });
            });
        });
    }

    getOperation();
}

// Start the calculator
calculator();