CREATE TABLE participants (
    name text NOT NULL,
    state text NOT NULL,
    year integer NOT NULL,
    discipline text NOT NULL,
    PRIMARY KEY (name,year,discipline)
);



CREATE TABLE medals (
    name text NOT NULL,
    golds integer,
    silvers integer,
    bronzes integer,
    year integer NOT NULL,
    PRIMARY KEY(name,year)
);



CREATE TABLE followers (
    name text NOT NULL,
    facebookfollowers numeric,
    twitterfollowers numeric,
    year integer NOT NULL,
    PRIMARY KEY(name,year)
);



CREATE TABLE mentions (
    name text NOT NULL,
    nbrmentions numeric,
    year integer NOT NULL,
    PRIMARY KEY(name,year)
);