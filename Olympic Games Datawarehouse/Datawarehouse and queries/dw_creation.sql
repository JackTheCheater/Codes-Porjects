create materialized view participants_dt as
(select row_number() over (order by 1) as participant_id, name, state, discipline 
from participants
group by name, state, discipline);

create materialized view results_ft as
(select total_mentions, facebook_followers+twitter_followers as total_followers, golds+silvers+bronzes as total_medals,
medals.year, participant_id
from participants_dt join medals on participants_dt.name=medals.name join mentions on mentions.name=participants_dt.name
join followers on followers.name=participants_dt.name
where medals.year=mentions.year and mentions.year=followers.year);



create view results_per_state_ft as
(select sum(total_mentions) as total_mentions, sum(total_followers) as total_followers,
sum(total_medals) as total_medals, year, state
from results_ft join participants_dt on results_ft.participant_id=participants_dt.participant_id
group by state, year);



create view results_per_discipline_ft as
(select sum(total_mentions) as total_mentions, sum(total_followers) as total_followers,
sum(total_medals) as total_medals, year, discipline
from results_ft join participants_dt on results_ft.participant_id=participants_dt.participant_id
group by discipline, year);