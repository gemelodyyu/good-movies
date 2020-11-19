from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import json
import os


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://"postgres":postgres@127.0.0.1:5432/ETL_Project'
conn = psycopg2.connect(
    host ="datavizgroup7.c0yvlavqskus.us-west-2.rds.amazonaws.com",
    dbname="postgres",
    user="postgres",
    password="sealab2021")
cursor = conn.cursor()
db = SQLAlchemy(app)

# What are we doing with flask? Goal of web scraping hw is different from
# goal of this assignment -- want to bring in data from postgresql server
# to use in JS files to make web app.
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api')
def fetchData():
    cursor.execute("SELECT * FROM movie_meta LIMIT 10")
    columns = ('id', 'title', 'release_date', 'runtime', 'genres', 'adult', 'budget', 'revenue','production companies',
        'imdb_id')
    
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns,row)))

    films = json.dumps(results, default=str)
    
    return films




if __name__ == '__main__':
    app.run()