m_2020 = open("medals_2020.csv")
m_2016 = open("medals_2016.csv")
m_2012 = open("medals_2012.csv")
m = open("medals.sql","w")

#first row of csv files contains header, so it has to be skipped
first = True
for line in m_2020:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    golds = tuple[1]
    silvers = tuple[2]
    bronzes = tuple[3][:len(tuple[3])-1]
    m.write("INSERT INTO medals VALUES(\'"+name+"\',2020,"+golds+","+silvers+","+bronzes+");\n")

first = True
for line in m_2016:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    golds = tuple[1]
    silvers = tuple[2]
    bronzes = tuple[3][:len(tuple[3])-1]
    m.write("INSERT INTO medals VALUES(\'"+name+"\',2016,"+golds+","+silvers+","+bronzes+");\n")

first = True
for line in m_2012:
    if first == True:
        first = False
        continue
    tuple = line.split(";")
    name = tuple[0]
    golds = tuple[1]
    silvers = tuple[2]
    bronzes = tuple[3][:len(tuple[3])-1]
    m.write("INSERT INTO medals VALUES(\'"+name+"\',2012,"+golds+","+silvers+","+bronzes+");\n")
