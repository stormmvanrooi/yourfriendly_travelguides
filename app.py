import json
from flask import Flask, render_template, jsonify, request

# create instance of Flask app
app = Flask(__name__)

# Data Store
with open("test.json") as fp:
    search_results = json.load(fp)

# ========================================
# Flask as Data Presentation
# ========================================

# create route that renders index.html template
@app.route("/")
def index():
    return render_template("index.html", searchResults=search_results)

@app.route("/api")
def api():
    return jsonify(search_results)

if __name__ =="__main__":
    app.run(debug=True, port=5005)