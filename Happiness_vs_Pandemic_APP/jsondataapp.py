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

govt_list .to_json('static/js/govt.json')
world_hap_list.to_json('static/js/world_hap.json')
world_covid_list.to_json('static/js/world_covid.json')
gov_resp_list.to_json('static/js/gov_resp.json')

print('DONE')