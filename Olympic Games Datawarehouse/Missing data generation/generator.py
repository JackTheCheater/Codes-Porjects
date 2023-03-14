import random

p = open("pairs.csv")
f = open("followers.sql","w")
m = open("mentions.sql","w")

#the first row of the csv file is the header, so it has to be skipped
first = True
for line in p:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    year = tuple[1][:len(tuple[1])-1]
    v=0

    if year == 2016:
        v=10000
    if year == 2020:
        v=20000

    tw = random.randint(5000+v,15000+v)
    fb = random.randint(7000+v,18000+v)
    men = random.randint(15000,30000)
    f.write("INSERT INTO followers VALUES(\'"+name+"\',"+str(year)+","+str(fb)+","+str(tw)+");\n")
    m.write("INSERT INTO mentions VALUES(\'"+name+"\',"+str(year)+","+str(men)+");\n")
