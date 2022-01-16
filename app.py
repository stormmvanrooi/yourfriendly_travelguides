from flask import Flask, render_template, redirect, jsonify
import pymongo
app = Flask(__name__)
from pymongo import MongoClient
import json

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.NYC

restaurants_collection = db.restaurant_data
hotels_collection = db.hotel_data
museums_collection = db.museums_data
groceries_collection = db.groceries_data
shopping_collection = db.shopping_data

with open("data/hotels_data.json") as fp:
    hotels = json.load(fp)

with open("data/restaurants_data.json") as fp:
    restaurants = json.load(fp)

with open("data/museums_data.json") as fp:
    museums = json.load(fp)

with open("data/shopping_data.json") as fp:
    shopping = json.load(fp)

with open("data/groceries_data.json") as fp:
    groceries = json.load(fp)

# ========================================
# Flask as Data Presentation
# ========================================

@app.route("/")
def data():
    rest_res = list(restaurants_collection.find({},{'_id':0}))
    hotel_res = list(hotels_collection.find({},{'_id':0}))
    museum_res = list(museums_collection.find({},{'_id':0}))
    groceries_res = list(groceries_collection.find({},{'_id':0}))
    shopping_res = list(shopping_collection.find({},{'_id':0}))
    #return(str(shopping_res[0]))

    return render_template("index.html",htmlRestaurant = rest_res, htmlHotel = hotel_res, htmlMuseum = museum_res, htmlGroceries = groceries_res, htmlShopping = shopping_res )

@app.route("/api/hotels")   
def hotel():
    return jsonify(hotels)

@app.route("/api/restaurants")   
def restaurant():
    return jsonify(restaurants)

@app.route("/api/museums")   
def museum():
    return jsonify(museums)

@app.route("/api/shopping")   
def shop():
    return jsonify(shopping)

@app.route("/api/groceries")   
def grocery():
    return jsonify(groceries)

if __name__ == "__main__":
    app.run(debug=True)
