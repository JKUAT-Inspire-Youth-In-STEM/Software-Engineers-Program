# Variables in Python and Data Types
student_name = "John" # string
student_second_name = 'Doe' # string
student_age = 25 # integer
student_height = 1.75 # float
student_admited = True # boolean

# Operators in Python
#1. Arithmetic operators
num1 = 10
num2 = 20
addition = num1 + num2
# print(addition)
subtraction = num1 - num2
# print(subtraction)

#2. Comparison operators
# print(num1 == num2) # False
# print(num1 != num2) # True
# print(num1 > num2) # False
# print(num1 < num2) # True

# 3. Logical operators
# and, or, not
# print(num1 < num2 and num1 > num2) # False
# print(num1 < num2 or num1 < num2) # True
# print(not num1 < num2) # False

# 4. Assignment operators
# =, +=, -=, *=, /=
# num1 += 5
# print(num1) # 15
# num1 -= 5
# print(num1) # 10
# num1 *= 5
# print(num1) # 50

# 5. Identity operators
# is, is not
# print(num1 is not num2) # True
# print(num1 is num2) # False

# 6. Conditional statements
# if, elif, else

if student_age >= 18:
    print("You are an adult")

enter_name = input("Enter your name: ")
enter_age = int(input("Enter your age: "))
if enter_age >= 18:
    print(enter_name, " is an adult")

enter_speed = input("Enter your speed: ")
enter_speed = int(enter_speed)

# print the entered speed data type
print(type(enter_speed))

#1. Write a Python program that asks the user to enter their exam score (0 - 100). The program should then print the corresponding grade based on the following criteria: 90 - 100: A, 80 - 89: B, 70 - 79: C, 60 - 69: D, 50 - 59: E, 0 - 49: F

# Write a Python program that asks the user to enter the current temperature (in °C). The program should give different advice based on the temperature:

# Above 30°C → "It's too hot! Stay hydrated."
# 20°C - 30°C → "The weather is pleasant."
# 10°C - 19°C → "It's a bit chilly. Wear a sweater."
# Below 10°C → "It's very cold! Wear a jacket."
