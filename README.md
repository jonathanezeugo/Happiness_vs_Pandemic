# Project 2: Happiness vs Pandemic

<p align="center">
<img src="https://i.gyazo.com/bbe4ea726d4c1901854c9f001d4dc49c.jpg" width="250" height="250"/>
</p>

## Members: Karen Pearson, Tamey Washington, Jonathan Ezeugo, Cade Culver

## Links to Data Used:

[data/un_govt.csv](https://github.com/Kpearson72/Happiness_vs_Pandemic/blob/0364f71e33ed2828100394c87af5b1b81d71e3ee/data/un_govt.csv)

[data/world_happiness.csv](https://github.com/Kpearson72/Happiness_vs_Pandemic/blob/0364f71e33ed2828100394c87af5b1b81d71e3ee/data/world_happiness.csv)

[data/world_covid_data.csv](https://github.com/Kpearson72/Happiness_vs_Pandemic/blob/0364f71e33ed2828100394c87af5b1b81d71e3ee/data/world_covid_data.csv)

[data/gov_response.csv](https://github.com/Kpearson72/Happiness_vs_Pandemic/blob/a74fdc9c144068fa66067497a61e4fb087c35096/data/gov_response.csv)

## Project Objective:

	Our project objective is to use a database containing Covid-19 data from different 
	countries and demographic data for each of these countries to create a dashboard with 
	interactive visualizations using PostgreSQL/pgAdmin4, Flask, AWS, Heroku, Javascript and HTML.
	
	
## *Note about data:
	
	*All data used is through 2020 and does not represent current Covid-19 data as of March 31, 2021.


## Breakdown of Interactive Visualizations:

	1. World Map: Our world map involves the relation of happiness scores and to number of deaths from Covid-19.
	We've included data for 136 countries in the UN. In the top right corner is a selection menu where the user can 
	choose to observe happiness scores (shown with green circles), number of deaths (shown with grey circles) or both.
	The user can see the country name, happiness score and number of deaths, depending on which options are selected 
	in the menu, by clicking on the circles contained in the map. The user can also zoom in and out with + and - buttons 
	on the left side of the visualization.
	
<a href="https://gyazo.com/e3e450f144ecc65d7bc90e746bf6162b"><img src="https://i.gyazo.com/e3e450f144ecc65d7bc90e746bf6162b.gif" alt="Image from Gyazo" width="500"/></a>
	
	2. Dropdown menu with Demographic Information table: We've included a dropdown menu with 136 UN countries, with an empty table.
	The user can select any country in the dropdown, which will then populate the demographics table with the following information
	about the selected country: country name/id, type of government, population (as of 2020), and the respective world region.
	
<a href="https://gyazo.com/9e98b8b260f13ba4384a86cd23c2b78b"><img src="https://i.gyazo.com/9e98b8b260f13ba4384a86cd23c2b78b.gif" alt="Image from Gyazo" width="500"/></a>
	
	3. Bubble Chart: The third interactive visualization is a bubble chart showing each country, along with their 
	respective Covid-19 data. The user can first choose between the 2 options below the chart: covid cases,
	and covid deaths. After clicking on one of these, the user can hover their pointer over each circle to see
	the following data about the corresponding country: country name, happiness score,
	covid cases (as of 2020) and covid deaths (as of 2020).
	
<a href="https://gyazo.com/a60610d91b4609b72395c2d6bc88fbd4"><img src="https://i.gyazo.com/a60610d91b4609b72395c2d6bc88fbd4.gif" alt="Image from Gyazo" width="500"/></a>

	
	
![Countries That Made the Cut](https://i.gyazo.com/d087eced613c645b3592952be3c6dc22.png)

## Below is the full list of countries observed in the data:

Afghanistan,
Albania,
Algeria,
Argentina,
Armenia,
Australia,
Austria,
Azerbaijan,
Bahrain,
Bangladesh,
Belarus,
Belgium,
Benin,
Bolivia,
Bosnia and Herzegovina,
Botswana,
Brazil,
Bulgaria,
Burkina Faso,
Burundi,
Cambodia,
Cameroon,
Canada,
Chad,
Chile,
China,
Colombia,
Democratic Republic of the Congo,
Costa Rica,
Croatia,
Cyprus,
Denmark,
Ecuador,
Egypt,
El Salvador,
Estonia,
Ethiopia,
Finland,
France,
Gabon,
Gambia,
Georgia,
Germany,
Ghana,
Greece,
Guatemala,
Guinea,
Haiti,
Honduras,
Hungary,
Iceland,
India,
Indonesia,
Iran,
Iraq,
Ireland,
Israel,
Italy,
Jamaica,
Japan,
Jordan,
Kazakhstan,
Kenya,
Kuwait,
Kyrgyzstan,
Laos,
Latvia,
Lebanon,
Lesotho,
Liberia,
Libya,
Lithuania,
Luxembourg,
Madagascar,
Malawi,
Malaysia,
Maldives,
Mali,
Malta,
Mauritania,
Mauritius,
Mexico,
Moldova,
Mongolia,
Montenegro,
Morocco,
Mozambique,
Myanmar,
Namibia,
Nepal,
Netherlands,
New Zealand,
Nicaragua,
Niger,
Nigeria,
Norway,
Pakistan,
Panama,
Paraguay,
Peru,
Philippines,
Poland,
Portugal,
Romania,
Russia,
Rwanda,
Saudi Arabia,
Senegal,
Sierra Leone,
Singapore,
Slovakia,
South Korea,
Spain,
Sri Lanka,
Sweden,
Switzerland,
Tajikistan,
Tanzania,
Thailand,
Togo,
Trinidad and Tobago,
Tunisia,
Turkey,
Uganda,
Ukraine,
United Arab Emirates,
United Kingdom,
United States,
Uruguay,
Uzbekistan,
Venezuela,
Vietnam,
Yemen,
Zambia,
Zimbabwe


