-- For each year, national team and position, the total market value, the mean overall, improvement, age, height, weight and strength.
SELECT year, nationalTeam, position, totalMarketValue, averageOverall, averageImprovement, averageAge, averageHeight, averageWeight, averageStrength
FROM Statistics_Per_National_Team_FT JOIN National_Team_DT ON Statistics_Per_National_Team_FT.nationalTeamId=National_Team_DT.nationalTeamId
ORDER BY year DESC, position ASC, totalMarketValue DESC, averageOverall DESC, averageImprovement DESC;

-- For each year, club and position, the total market value, the mean overall, improvement, age, height, weight and strength.
SELECT year, club, position, totalMarketValue, averageOverall, averageImprovement, averageAge, averageHeight, averageWeight, averageStrength
FROM Statistics_Per_Club_FT JOIN Club_DT ON Statistics_Per_Club_FT.clubId=Club_DT.ClubId
ORDER BY year DESC, position ASC, averageOverall DESC, averageImprovement DESC;