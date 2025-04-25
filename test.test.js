const readline = require('readline');
const calculator = require('./test.js'); // Assuming the calculator function is exported for testing

// JavaScript
jest.mock('readline');


describe('Calculator Tests', () => {
    let rl;

    beforeEach(() => {
        rl = {
            question: jest.fn(),
            close: jest.fn(),
        };
        readline.createInterface.mockReturnValue(rl);
    });

    test('should display welcome message and options', () => {
        console.log = jest.fn();
        calculator();
        expect(console.log).toHaveBeenCalledWith("Welcome to the Calculator!");
        expect(console.log).toHaveBeenCalledWith("Options:");
        expect(console.log).toHaveBeenCalledWith("1. Add");
        expect(console.log).toHaveBeenCalledWith("2. Subtract");
        expect(console.log).toHaveBeenCalledWith("3. Multiply");
        expect(console.log).toHaveBeenCalledWith("4. Divide");
        expect(console.log).toHaveBeenCalledWith("5. Exit");
    });

    test('should handle division by zero', () => {
        rl.question
            .mockImplementationOnce((_, cb) => cb('4')) // Choose "Divide"
            .mockImplementationOnce((_, cb) => cb('10')) // First number
            .mockImplementationOnce((_, cb) => cb('0')); // Second number

        console.log = jest.fn();
        calculator();

        expect(console.log).toHaveBeenCalledWith("Error: Division by zero is not allowed.");
    });

    test('should perform addition correctly', () => {
        rl.question
            .mockImplementationOnce((_, cb) => cb('1')) // Choose "Add"
            .mockImplementationOnce((_, cb) => cb('5')) // First number
            .mockImplementationOnce((_, cb) => cb('3')); // Second number

        console.log = jest.fn();
        calculator();

        expect(console.log).toHaveBeenCalledWith("Result: 8");
    });

    test('should perform subtraction correctly', () => {
        rl.question
            .mockImplementationOnce((_, cb) => cb('2')) // Choose "Subtract"
            .mockImplementationOnce((_, cb) => cb('10')) // First number
            .mockImplementationOnce((_, cb) => cb('4')); // Second number

        console.log = jest.fn();
        calculator();

        expect(console.log).toHaveBeenCalledWith("Result: 6");
    });

    test('should perform multiplication correctly', () => {
        rl.question
            .mockImplementationOnce((_, cb) => cb('3')) // Choose "Multiply"
            .mockImplementationOnce((_, cb) => cb('6')) // First number
            .mockImplementationOnce((_, cb) => cb('7')); // Second number

        console.log = jest.fn();
        calculator();

        expect(console.log).toHaveBeenCalledWith("Result: 42");
    });

    test('should exit when choice is 5', () => {
        rl.question.mockImplementationOnce((_, cb) => cb('5')); // Choose "Exit"

        console.log = jest.fn();
        calculator();

        expect(console.log).toHaveBeenCalledWith("Thanks for using the calculator. Goodbye!");
        expect(rl.close).toHaveBeenCalled();
    });

    test('should handle invalid input', () => {
        rl.question
            .mockImplementationOnce((_, cb) => cb('invalid')) // Invalid choice
            .mockImplementationOnce((_, cb) => cb('5')); // Exit

        console.log = jest.fn();
        calculator();

        expect(console.log).toHaveBeenCalledWith("Invalid choice. Please try again.");
    });
});