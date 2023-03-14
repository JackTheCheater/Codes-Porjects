--queries discussed in the report

--category: Comparison of summarized data at different aggregation levels [group by exten- sions]
select state, discipline, sum(total_mentions) as totalmentions
from participants_dt join results_ft on participants_dt.participant_id=results_ft.participant_id
where year=2020
group by rollup(state, discipline)
order by state, discipline;

--category: Comparison of detailed and summarized data [window partitioning]
select discipline, year, total_medals, sum(total_medals) over (partition by discipline) as totalmedals_ofalltime
from results_per_discipline_ft
order by totalmedals_ofalltime desc;

--category: Computing rankings [window ordering]
select distinct name, dense_rank() over (order by sum(total_medals) desc) as rank_dense
from participants_dt join results_ft on participants_dt.participant_id=results_ft.participant_id
group by name
order by rank_dense;

--category: Computing cumulative totals [window framing]
select name, year, avg(total_mentions) over (partition by name order by year) as avg_mentions
from participants_dt join results_ft on participants_dt.participant_id=results_ft.participant_id;

--category: Computing mobile aggregates [window framing]
select state, year, avg(total_mentions) over (partition by state order by year rows 1 preceding) as mobile_mentions
from results_per_state_ft;







--other queries we used for derive our outcomes

--received mentions of the best performing athletes
select name,sum(total_medals) as totalmedals,sum(total_mentions) as totalmentions
from participants_dt join results_ft on participants_dt.participant_id=results_ft.participant_id
group by name,total_medals,total_mentions
order by totalmedals desc

--received mentions of the most followed athletes
select name,sum(total_followers) as totalfollowers,sum(total_mentions) as totalmentions
from participants_dt join results_ft on participants_dt.participant_id=results_ft.participant_id
group by name,total_followers,total_mentions
order by totalfollowers desc

--medals won by the most mentioned athletes
select name,sum(total_mentions) as totalmentions,sum(total_medals) as totalmedals
from participants_dt join results_ft on participants_dt.participant_id=results_ft.participant_id
group by name,total_mentions,total_medals
order by totalmentions desc

--comparison between mentions and medals per discipline
select discipline,sum(total_mentions) as totalmentions,sum(total_medals) as totalmedals
from results_per_discipline_ft
group by discipline,total_mentions,total_medals
order by totalmentions desc

--comparison between mentions and medals per state
select state,sum(total_mentions) as totalmentions,sum(total_medals) as totalmedals
from results_per_state_ft
group by state,total_mentions,total_medals
order by totalmentions desc

--most discussed disciplines per year
select discipline,year,sum(total_mentions) as totalmentions
from results_per_discipline_ft
group by discipline,total_mentions
order by totalmentions desc

--total mentions per year and state
select state,year,total_mentions
from results_per_state_ft
order by total_mentions desc

--total medals per year and state
select state,year,total_medals
from results_per_state_ft
order by total_medals desc