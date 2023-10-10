CREATE TABLE Player (
	year INTEGER NOT NULL,
	name TEXT NOT NULL,
	position TEXT NOT NULL,
	club TEXT NOT NULL,
	nationalTeam TEXT NOT NULL,
	overall INTEGER NOT NULL,
	improvement INTEGER NOT NULL,
	marketValue INTEGER NOT NULL,
	age INTEGER NOT NULL,
	height INTEGER NOT NULL,
	weight INTEGER NOT NULL,
	strength INTEGER NOT NULL,
	PRIMARY KEY(year, name, position, club, nationalTeam, overall, improvement, marketValue, age, height, weight, strength)
);
