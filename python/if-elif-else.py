game_score  = int(input("Enter your Game score: "))

if game_score >= 90:
    print("Qualifies for Group A")
elif game_score >= 80:
    print("Qualify for Group B")
elif game_score >= 60:
    print("Qualify for Group C")
elif game_score < 60:
    print("You are Religated")