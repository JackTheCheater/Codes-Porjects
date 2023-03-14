a_2020 = open("athletes_2020.csv")
a_2016 = open("athletes_2016.csv")
a_2012 = open("athletes_2012.csv")
p = open("participants.sql","w")

#first row of csv files contains header, so it has to be skipped
first = True
for line in a_2020:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    discipline = tuple[1]
    state = tuple[2][:len(tuple[2])-1]
    p.write("INSERT INTO participants VALUES(\'"+name+"\',2020,\'"+discipline+"\',\'"+state+"\');\n")

first = True
for line in a_2016:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    discipline = tuple[1]
    state = tuple[2][:len(tuple[2])-1]
    p.write("INSERT INTO participants VALUES(\'"+name+"\',2016,\'"+discipline+"\',\'"+state+"\');\n")

first = True
for line in a_2012:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    discipline = tuple[1]
    state = tuple[2][:len(tuple[2])-1]
    p.write("INSERT INTO participants VALUES(\'"+name+"\',2012,\'"+discipline+"\',\'"+state+"\');\n")
