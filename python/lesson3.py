# Learning about functions
# What are functions in progamming?
# Functions are a block of reusable code that only runs when it is called.
# You can pass data, known as parameters or arguments, into a function. A function can return data as a result.
# Functions help to organize and modularize code.

# How to define a function in Python
# In Python, a function is defined using the "def" keyword.
def my_function():
    print("Hello from a function")

# How to call a function in Python
# To call a function, use the function name followed by parenthesis:
my_function()

def greetings(user_name):
    return(f"Hello {user_name}")

print(greetings("John"))

# Calculate the area of a circle
import math

def circle_area(radius):
    return math.pi * radius ** 2 # the formula is usualy pi * r^2

print(circle_area(int(input("Enter the radius of the circle: "))))

# not using math module
def circle_area(radius):
    return 3.142 * radius ** 2

def grade_score(score):
    if score >= 90:
        return "Your grade is A"
    elif score >= 80:
        return "Your grade is B"
    elif score >= 70:
        return "Your grade is C"
    elif score >= 60:
        return "Your grade is D"
    elif score >= 50:
        return "Your grade is E"
    else:
        return "Your grade is F"
    
score = int(input("Enter your exam score: "))
print(grade_score(score))
