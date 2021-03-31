import pandas as pd
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy import create_engine
# from secrets import username, password



engine = create_engine('postgresql://postgres:Red72todaywood!@localhost:5432/Happiness_db')
conn=engine.connect()

govt_list = pd.read_sql_query("SELECT * FROM un_govt",conn)
world_hap_list = pd.read_sql_query("SELECT * FROM world_happiness",conn)
world_covid_list = pd.read_sql_query("SELECT * FROM world_covid_data",conn)
gov_resp_list = pd.read_sql_query("SELECT * FROM gov_response",conn)



# govt_list .to_json('static/js/govt.json')
# world_hap_list.to_json('static/js/world_hap.json')
# world_covid_list.to_json('static/js/world_covid.json')
# gov_resp_list.to_json('static/js/gov_resp.json')

def demographics():
    results=engine.execute("""select  u.id, u.country, u.constitutional_form, u.population_2020, w.world_region, w.gdp_per_capita
    from un_govt as u
    join world_happiness as w
    on (u.id=w.country_id)""", conn).fetchall()
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
        demo=demographics.append(country_data)
    return jsonify(demographics)
    demo.to_json('static/js/demographics.json')
    print(demo)

print('DONE')


