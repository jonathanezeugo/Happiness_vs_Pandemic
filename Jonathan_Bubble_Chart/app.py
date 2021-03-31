import pandas as pd
import numpy as np
import datetime as dt
import sqlalchemy
from flask import Flask, jsonify, render_template, redirect
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from config import password

# engine = create_engine(f'postgresql://postgres:{password}@http://happinesscoviddb.cy7ekxurfwul.us-east-2.rds.amazonaws.com:5432/Happiness_db')

engine = create_engine(f'postgresql://postgres:{password}@http://happinesscoviddb.cy7ekxurfwul.us-east-2.rds.amazonaws.com:5432/postgres')

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/countries")
def countries():
    results=engine.execute("SELECT country FROM un_govt").fetchall()
    country=[]
    for result in results:
        country.append(result[0])
    return jsonify(country)

# add route for world_covid_data bellybutton-type graphs
@app.route()
def bellybutton():
    return render_template('bellybutton.html')

@app.route("/demographics")
def demographics():
    results=engine.execute("""select  u.id, u.country, u.constitutional_form, u.population_2020, w.world_region, w.gdp_per_capita
    from un_govt as u
    join world_happiness as w
    on (u.id=w.country_id)""").fetchall()
    demographics=[]

    for result in results:
        country_data={}
        country_data["id"] = result[0]
        country_data["country_name"] = result[1]
        country_data["type_of_government"] = result[2]
        country_data["population"] = result[3]
        country_data["world_region"] = result[4]
        country_data["gdp"] = result[5]
        
        demographics.append(country_data)

    return jsonify(demographics)
    demographics.to_json('static/js/demographics.json')

# grabbing one country at a time

@app.route("/demographics/<country>")
def country_demographic(country):
    results=engine.execute(f"""select  u.id, u.country, u.constitutional_form, u.population_2020, w.world_region, w.gdp_per_capita
    from un_govt as u
    join world_happiness as w
    on (u.id=w.country_id) where u.country= '{country}'""").fetchall()

    demographics=[]
    for result in results:
        country_data={}
        country_data["id"] = result[0]
        country_data["country_name"] = result[1]
        country_data["type_of_government"] = result[2]
        country_data["population"] = result[3]
        country_data["world_region"] = result[4]
        country_data["gdp"] = result[5]
        
        demographics.append(country_data)

    return jsonify(demographics)
    


@app.route("/happiness_vs_covid_map")
def happiness_vs_covid():
    results = engine.execute("""select u.country, w.happiness_score,  u.latitude, u.longitude,sum(c.new_deaths) as "total_new_deaths", sum(c.new_cases) as "total_new_cases"
    from un_govt as u
	inner join world_happiness as w
	on (u.id=w.country_id)
	inner join world_covid_data as c
	on (w.country_id = c.country_id)
	group by u.id, w.happiness_score
	order by u.country """).fetchall()


    happiness_vs_covid = []
    for result in results:
        covid_happiness={}
        covid_happiness["country"] = result[0]
        covid_happiness["happiness_score"] = result[1]
        covid_happiness["latitude"] = result[2]
        covid_happiness["longitude"] = result[3]
        covid_happiness["total_new_deaths"] = result[4]
        covid_happiness["total_new_cases"] = result[5]


        happiness_vs_covid.append(covid_happiness)

    return jsonify(happiness_vs_covid)
    happiness_vs_covid.to_json('static/js/happiness_vs_covid.json')
    
@app.route("/happiness_vs_covid_charts/<country>")
def happiness_vs_covid_charts(country):
    
    results = engine.execute(f"""select u.id, u.country, w.new_cases, w.new_deaths, wh.happiness_score
    from un_govt as u
	inner join world_covid_data as w
	on (u.id=w.country_id) inner join world_happiness as wh
	on (w.country_id = wh.country_id) where u.country = '{country}' 
	group by u.id, w.new_cases, w.new_deaths, wh.happiness_score
	order by w.new_cases desc, w.new_deaths desc
	limit 10; """).fetchall()
    
    hap_vs_covid_charts=[]
    for result in results:
        select_country={}
        select_country["id"] = result[0]
        select_country["country"] = result[1]
        select_country["new_cases"] = result[2]
        select_country["new_deaths"] = result[3]
        select_country["happiness_score"] = result[4]
        
        hap_vs_covid_charts.append(select_country)
    
    results.to_json('static/js/hap2covid.json')
    return jsonify(results)
    
@app.route("/government_response/<country>")
def government_response(country):
    results = engine.execute(f"""select u.id, u.country, r.gov_resp_date,r.gov_resp_type,r.gov_resp_link_src
    from un_govt as u
	join gov_response as r
	on (u.id=r.country_id)
    where u.country= '{country}'
	group by u.id, r.gov_resp_date, r.gov_resp_type, r.gov_resp_link_src
    order by r.gov_resp_date  """).fetchall()

    government_response=[]
    for result in results:
        country_resp={}
        country_resp["id"] = result[0]
        country_resp["country"] = result[1]
        country_resp["gov_resp_date"] = result[2]
        country_resp["gov_resp_type"] = result[3]
        country_resp["gov_resp_link_src"] = result[4]
        
        government_response.append(country_resp)

    return jsonify(government_response)
    government_response.to_json('static/js/government_response.json')
    



if __name__ == '__main__':
    app.run(debug=True)