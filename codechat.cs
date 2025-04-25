using System;

class Program
{
static void Main()
{
    int health = 100;
    int score = 0;

    Console.WriteLine("Welcome to the Adventure Game!");
    Console.WriteLine("You are in a dark forest.");

    while (health > 0)
    {
        Console.WriteLine("\nOptions:");
        Console.WriteLine("1. Go deeper into the forest.");
        Console.WriteLine("2. Rest by the campfire.");
        Console.WriteLine("3. Quit the game.");

        int choice;
        Console.Write("Enter your choice: ");
        if (int.TryParse(Console.ReadLine(), out choice))
        {
            if (choice == 1)
            {
                Console.WriteLine("You go farther into the forest and discover a treasure chest!");
                score += 10;
            }
            else if (choice == 2)
            {
                Console.WriteLine("You rest by the campfire and regain 20 health.");
                health += 20;
            }
            else if (choice == 3)
            {
                Console.WriteLine($"Thanks for playing! Your score: {score}");
                return;
            }
            else
            {
                Console.WriteLine("Invalid choice. Try again.");
            }

            health -= 10;
            if (health <= 0)
            {
                Console.WriteLine($"Game over. Your score: {score}");
            }
        }
        else
        {
            Console.WriteLine("Invalid input. Please enter a valid number.");
        }
    }
}
}