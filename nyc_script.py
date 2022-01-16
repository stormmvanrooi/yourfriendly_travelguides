#!/usr/bin/env python
# coding: utf-8

# In[ ]:





# In[3]:


get_ipython().run_line_magic('matplotlib', 'inline')
from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt
import datetime as dt
import requests
import json
from flask import jsonify
from pprint import pprint
from  jsonmerge import merge
import pymongo
from pymongo import MongoClient


# In[4]:


import numpy as np
import pandas as pd
import datetime as dt


# In[ ]:





# In[66]:


import requests

queries = ["hotel", "restaurant", "shopping", "museum", "grocery store"]
hotels = []
restaurants = []
shopping = []
museums = []
groceries = []
for i in range(5):
    print(queries[i])
    url = "https://api.foursquare.com/v3/places/nearby?ll=40.7128%2C-74.0060&hacc=10000&query=" + queries[i] + "&limit=50"

    headers = {
        "Accept": "application/json",
        "Authorization": "fsq39JU8BJKumYvy8NsgYZPmgv/XJEH17AoYu8gSSNy6v1I="
    }
    response = requests.request("GET", url, headers=headers)
    
    data_json = response.json()
    data = data_json["results"]
    for x in data:
        hotel_dict = {}
        restaurant_dict = {}
        shopping_dict = {}
        museums_dict = {}
        groceries_dict = {}
        #Collect data for each category and store it corresponding list
        try:
            if i == 0:
                name = x["name"]
                location = [x["geocodes"]["main"]["latitude"],x["geocodes"]["main"]["longitude"]]
                distance = x["distance"]
                address = x["location"]["address"]+' '+x["location"]["locality"]+' '+x["location"]["region"]+' '+ x["location"]["postcode"]
                ctg = x["categories"][0]["name"]
                hotel_dict = {"name":name, "location":location,"address":address,"distance":distance,"category":ctg}
                hotels.append(hotel_dict)

            elif i == 1:
                name = x["name"]
                location = [x["geocodes"]["main"]["latitude"],x["geocodes"]["main"]["longitude"]]
                distance = x["distance"]
                address = x["location"]["address"]+' '+x["location"]["locality"]+' '+x["location"]["region"]+' '+ x["location"]["postcode"]
                ctg = x["categories"][0]["name"]
                restaurant_dict = {"name":name, "location":location,"address":address,"distance":distance,"category":ctg}
                restaurants.append(restaurant_dict)

            elif i == 2:
                name = x["name"]
                location = [x["geocodes"]["main"]["latitude"],x["geocodes"]["main"]["longitude"]]
                distance = x["distance"]
                address = x["location"]["address"]+' '+ x["location"]["locality"]+' '+ x["location"]["region"]+' '+ x["location"]["postcode"]
                #ctg = x["categories"][0]["name"]
                shopping_dict = {"name":name, "location":location,"address":address,"distance":distance}
                shopping.append(shopping_dict)
                
            elif i == 3:
                name = x["name"]
                location = [x["geocodes"]["main"]["latitude"],x["geocodes"]["main"]["longitude"]]
                distance = x["distance"]
                address = x["location"]["address"]+' '+x["location"]["locality"]+' '+x["location"]["region"]+' '+x["location"]["postcode"]
                ctg = x["categories"][0]["name"]
                museums_dict = {"name":name, "location":location,"address":address,"distance":distance,"category":ctg}
                museums.append(museums_dict)
                
            elif i == 4:
                name = x["name"]
                location = [x["geocodes"]["main"]["latitude"],x["geocodes"]["main"]["longitude"]]
                distance = x["distance"]
                address = x["location"]["address"]+' '+x["location"]["locality"]+' '+x["location"]["region"]+' '+x["location"]["postcode"]
                ctg = x["categories"][0]["name"]
                groceries_dict = {"name":name, "location":location,"address":address,"distance":distance,"category":ctg}
                groceries.append(groceries_dict)
            else:
                pass
        except KeyError:
            print("Something is squeeky!")
            
    
with open('hotels_data.json', 'w') as file:
   json.dump(hotels, file)
with open('restaurants_data.json', 'w') as file:
   json.dump(restaurants, file)
with open('shopping_data.json', 'w') as file:
   json.dump(shopping, file)
with open('museums_data.json', 'w') as file:
   json.dump(museums, file)
with open('groceries_data.json', 'w') as file:
   json.dump(groceries, file)
    
    



# In[67]:


pprint(groceries)


# In[70]:



# Making Connection
myclient = MongoClient("mongodb://localhost:27017/") 
# database
myclient.drop_database('NYC')
db = myclient["NYC"]

# Created or Switched to collection 

Collection0 = db["hotel_data"]
Collection1 = db["restaurant_data"]
Collection2 = db["shopping_data"]
Collection3 = db["museums_data"]
Collection4 = db["groceries_data"]

# Loading or Opening the json file      
# Inserting the loaded data in the Collection
# if JSON contains data more than one entry
# insert_many is used else inser_one is used
if isinstance(hotels, list):
    Collection0.insert_many(hotels) 
    print('Created Collection 1 of 5')
else:
    Collection0.insert_one(hotels)
if isinstance(restaurants, list):
    Collection1.insert_many(restaurants)
    print('Created Collection 2 of 5')
else:
    Collection1.insert_one(restaurants)
if isinstance(shopping, list):
    Collection2.insert_many(shopping)
    print('Created Collection 3 of 5')
else:
    Collection2.insert_one(shopping)
if isinstance(museums, list):
    Collection3.insert_many(museums)
    print('Created Collection 4 of 5')
else:
    Collection3.insert_one(museums)
if isinstance(groceries, list):
    Collection4.insert_many(groceries)
    print('Created Collection 5 of 5')
else:
    Collection4.insert_one(groceries)


# In[ ]:





# In[ ]:




