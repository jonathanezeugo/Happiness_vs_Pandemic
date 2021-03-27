select  u.id, u.country, u.constitutional_form, u.population_2020, w.world_region, w.gdp_per_capita
from un_govt as u
	join world_happiness as w
		on (u.id=w.country_id)
		where u.country='Brazil'
		
		
select w.happiness_score, u.country, u.id, c.new_cases, c.new_deaths
from un_govt as u
	join world_happiness as w
		on (u.id=w.country_id)
			join world_covid_data as c
				on (u.id=w.country_id)
				
				
				
select SUM(new_cases) as "total new cases" from world_covid_data

select u.country, w.happiness_score, sum(c.new_deaths)as "sum of new deaths"
from un_govt as u
	inner join world_happiness as w
		on (u.id=w.country_id)
			inner join world_covid_data as c
				on (w.country_id = c.country_id)
				group by u.id, w.happiness_score
				order by u.country
				
select u.country, sum(c.new_deaths) as "sum of new deaths"
from un_govt as u
	join world_covid_data as c
	on (u.id=c.country_id)
	group by u.id
    order by u.country			
			
			
				
select w.happiness_score, u.country, u.id
from un_govt as u
	join world_happiness as w
	 	on (u.id = w.country_id)
	 		group by u.id, w.happiness_score
				order by u.country
				
				
				
select u.id, u.country, u.population_2020, u.head_of_state,u.constitutional_form, u.basis_of_executive_legitimacy, c.covid_times_life_expectancy, w.gdp_per_capita
from un_govt as u
	join world_covid_data as c
		on (u.id=c.country_id)
			join world_happiness as w
				on (c.country_id=w.country_id)
				group by u.id, c.covid_times_life_expectancy,w.gdp_per_capita
    			order by u.country	
				
				
select u.id, u.country, r.gov_resp_date,r.gov_resp_type,r.gov_resp_link_src
from un_govt as u
	join gov_response as r
		on (u.id=r.country_id)
		group by u.id, r.gov_resp_date, r.gov_resp_type, r.gov_resp_link_src
    	order by r.gov_resp_date	