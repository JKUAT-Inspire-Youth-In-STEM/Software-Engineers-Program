import hashlib
import os

FILENAME = 'passwords.txt'

# Function to hash the password
def hash_password(password):
    """Hash a password for storing."""
    return hashlib.sha256(password.encode()).hexdigest()

# Function to save password
def save_password(site, password):
    hashed_password = hash_password(password)
    with open(FILENAME, 'a') as file:
        file.write(f"{site} {hashed_password}\n")
    print(f"Password for {site} saved successfully")

# Function to get the password
def get_password(site):
    if not os.path.exists(FILENAME):
        print("No password saved yet")
        return None, False
    with open(FILENAME, "r") as f:
        for line in f:
            stored_site, stored_password = line.strip().split(" ")
            if stored_site == site:
                return stored_password, True
    print(f"No password saved for {site}")
    return None, False

# Function to update the password
def update_password(site, new_password):
    temp_filename = 'temp_passwords.txt'
    new_hashed_password = hash_password(new_password)

    with open(FILENAME, 'r') as file, open(temp_filename, 'w') as temp_file:
        updated = False
        for line in file:
            stored_site, stored_password = line.strip().split(" ")
            if stored_site == site:
                temp_file.write(f"{site} {new_hashed_password}\n")
                updated = True
            else:
                temp_file.write(line)
        if not updated:
            temp_file.write(f"{site} {new_hashed_password}\n")

    os.replace(temp_filename, FILENAME)
    print(f"Password for {site} updated successfully")

def main():
    if not os.path.exists(FILENAME):
        with open(FILENAME, 'w') as file:
            pass  # Create the file if it does not exist

    action = input("Enter 'save' to save a password or 'get' to get a password: ")

    if action == 'save':
        site = input("Enter the site: ")
        password, exists = get_password(site)
        if exists:
            overwrite = input("A password for this site already exists. Do you want to overwrite it? (yes/no): ")
            if overwrite.lower() != 'yes':
                print("Password save operation cancelled.")
                return
        import string
        import random

        # Generate a random password
        characters = string.ascii_letters + string.digits + string.punctuation
        password = ''.join(random.choices(characters, k=10))
        print(f"Generated password: {password}")
        if exists:
            update_password(site, password)
        else:
            save_password(site, password)
    elif action == 'get':
        site = input("Enter the site name: ")
        password, _ = get_password(site)
        if password:
            print(f"Password for {site} is {password}")
    else:
        print("Invalid action")

if __name__ == "__main__":
    main()