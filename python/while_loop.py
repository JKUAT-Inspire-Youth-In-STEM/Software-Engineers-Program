# while loop is used to execute a block of statements repeatedly until a given condition is satisfied.

count = 0

while count<9:
    print(count)
    count += 1

# Using user input

password = "1234"

user_input = "" 
while user_input != password:
    user_input = input("Enter the password again: ")

print("Access granted")