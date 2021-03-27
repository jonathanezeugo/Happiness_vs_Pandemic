import pandas as pd
import numpy as np
import datetime as dt
import sqlalchemy
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

engine = create_engine('postgresql://postgres:Red72todaywood!@localhost:5432/Happiness_db')

app = Flask(__name__)


@app.route("/")
def home():
    return "hello world"

@app.route("/countries")
def countries():
    results=engine.execute("SELECT country FROM un_govt").fetchall()
    country=[]
    for result in results:
        country.append(result[0])
    return jsonify(country)



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


@app.route("/happiness_vs_covid")
def happiness_vs_covid():
    results = engine.execute("""select u.country, w.happiness_score, sum(c.new_deaths)as "sum of new deaths"
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
        covid_happiness["sum of new deaths"] = result[1]
        covid_happiness["happiness_score"] = result[2]

        happiness_vs_covid.append(covid_happiness)

    return jsonify(happiness_vs_covid)






if __name__ == '__main__':
    app.run(debug=True)