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


# Render HTML pages
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/star.html')
def star():
    return render_template("star.html")

@app.route('/comparison.html')        #31 - 43 are Geoff's lines
def CompData():
    return render_template("comparison.html")

@app.route('/api/comparison')
def fetchOscarData():
    cursor.execute('SELECT m.release_date, m.budget, m.revenue, r.rating, i.oscar_nominations FROM movie_meta m INNER JOIN ratings r ON m.id = r."movieId" LEFT JOIN oscars o ON m.title = o.title LEFT JOIN oscarindex i ON m.title = i.film')
    columns = ('release_date', 'budget', 'revenue', 'ratings', 'oscar_nominations')
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns,row)))
    films = json.dumps(results, default=str)
    return films

@app.route('/data.html')
def data():
    return render_template("data.html")

@app.route('/api/data')
def fetchData():
    columns = ('title', 'genres', 'release_date', 'movie_crew', 'movie_cast', 'overview', 'rating')
    
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns,row)))

    films = json.dumps(results, default=str)
    
    return films

@app.route('/api/')
def getData():
    cursor.execute("SELECT * FROM movie_meta LIMIT 10")
    columns = ('id', 'title', 'release_date', 'runtime', 'genres', 'adult', 'budget', 'revenue','production_companies',
        'imdb_id')
    
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns,row)))

    films = json.dumps(results, default=str)
    
    return films

if __name__ == '__main__':
    app.run()