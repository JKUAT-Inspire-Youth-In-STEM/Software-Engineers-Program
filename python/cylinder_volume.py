# Formula to  get the volume of a cylinder
# V = πr²*h
import math
def cylinder_volume(radius, height):
    return math.pi * radius ** 2 * height

radius = int(input("Enter the radius of the cylinder: "))
height = int(input("Enter the height of the cylinder: "))
print(cylinder_volume(radius, height))