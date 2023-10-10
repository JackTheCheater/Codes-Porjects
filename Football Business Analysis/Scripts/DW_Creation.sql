-- Create the ClubDT materialized view
CREATE MATERIALIZED VIEW Club_DT AS
SELECT
    row_number() OVER (ORDER BY club) AS clubId,
    club
FROM
    (SELECT DISTINCT club FROM Player) subquery;

-- Create the NationalTeamDT materialized view
CREATE MATERIALIZED VIEW National_Team_DT AS
SELECT
    row_number() OVER (ORDER BY nationalTeam) AS nationalTeamId,
    nationalTeam
FROM
    (SELECT DISTINCT nationalTeam FROM Player) subquery;

-- Create the StatisticsPerClubFT materialized view
CREATE MATERIALIZED VIEW Statistics_Per_Club_FT AS
SELECT
    c.clubId,
    p.year,
    p.position,
    ROUND(SUM(p.marketValue),2) AS totalMarketValue,
    ROUND(AVG(p.overall),2) AS averageOverall,
    ROUND(AVG(p.improvement),2) AS averageImprovement,
    ROUND(AVG(p.age),2) AS averageAge,
    ROUND(AVG(p.height),2) AS averageHeight,
    ROUND(AVG(p.weight),2) AS averageWeight,
    ROUND(AVG(p.strength),2) AS averageStrength
FROM
    Club_DT c
JOIN
    Player p ON c.club = p.club
GROUP BY
    c.clubId, p.year, p.position
ORDER BY clubId, year, position;

-- Create the StatisticsPerNationalTeamFT materialized view
CREATE MATERIALIZED VIEW Statistics_Per_National_Team_FT AS
SELECT
    c.nationalTeamId,
    p.year,
    p.position,
    ROUND(SUM(p.marketValue),2) AS totalMarketValue,
    ROUND(AVG(p.overall),2) AS averageOverall,
    ROUND(AVG(p.improvement),2) AS averageImprovement,
    ROUND(AVG(p.age),2) AS averageAge,
    ROUND(AVG(p.height),2) AS averageHeight,
    ROUND(AVG(p.weight),2) AS averageWeight,
    ROUND(AVG(p.strength),2) AS averageStrength
FROM
    National_Team_DT c
JOIN
    Player p ON c.nationalTeam = p.nationalTeam
GROUP BY
    c.nationalTeamId, p.year, p.position
ORDER BY nationalTeamId, year, position;