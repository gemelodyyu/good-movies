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

@app.route('/data.html')
def data():
    return render_template("data.html")


# Create flask APIs for each web page
@app.route('/api/data')
def fetchData():
    cursor.execute('SELECT m.title, m.genres, m.release_date, c.movie_crew, c.movie_cast, m.overview, r.rating FROM movie_meta m INNER JOIN credits c ON m.id = c.id INNER JOIN ratings r ON m.id = r."movieId" LIMIT 10')
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