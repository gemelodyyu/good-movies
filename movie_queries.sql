DELETE FROM credits;
DELETE FROM ratings;
DELETE FROM oscars;
DELETE FROM oscarindex;
DELETE FROM movie_meta;


DROP TABLE IF EXISTS credits;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS oscars; 
DROP TABLE IF EXISTS oscarindex; 
DROP TABLE IF EXISTS movie_meta;

CREATE TABLE oscarindex(
	id SERIAL,
	film VARCHAR PRIMARY KEY,
 	oscar_nominations INT
 );
 
CREATE TABLE oscars (
	award VARCHAR,
	release_year INT,
	name VARCHAR,
	title VARCHAR,
	winner BOOLEAN,
	FOREIGN KEY (title) REFERENCES oscarindex(film)
 );
	
CREATE TABLE movie_meta ( 
	id INT PRIMARY KEY, 
	title VARCHAR,
	release_date DATE,
	runtime FLOAT,
	genres VARCHAR,
	adult BOOLEAN,
	budget INT,
	revenue FLOAT,
	production_companies VARCHAR,
	production_countries VARCHAR,
	imdb_id VARCHAR,
	overview VARCHAR
); 

CREATE TABLE credits ( 
	id INT PRIMARY KEY, 
	movie_cast VARCHAR,
	movie_crew VARCHAR
); 

CREATE TABLE ratings ( 
	"movieId" INT PRIMARY KEY, 
	rating FLOAT
); 


--Select films with high budgets
SELECT title, budget, revenue, (revenue-budget) as difference 
FROM movie_meta
WHERE budget > 15000000;

-- Select title, release date, budget, revenue, and rating for each movie
SELECT m.title, m.release_date, m.budget, m.revenue, r.rating
FROM movie_meta m INNER JOIN ratings r 
ON m.id = r."movieId";

-- Select title, release date, budget, revenue, and number of oscar nominations for each movie
SELECT m.title, m.release_date, m.budget, m.revenue, o.oscar_nominations
FROM movie_meta m INNER JOIN oscarindex o 
ON m.title = o.film
ORDER BY o.oscar_nominations DESC;

-- Select title, release date, budget, revenue, and number of oscar nominations for each family movie
SELECT m.title, m.release_date, m.budget, m.revenue, o.oscar_nominations
FROM movie_meta m INNER JOIN oscarindex o 
ON m.title = o.film
WHERE m.adult=False
ORDER BY o.oscar_nominations DESC;

-- Select award, nominee, title, release date, budget, revenue, and number of oscar nominations for each movie
SELECT o.award, o.name, m.title, m.release_date, m.budget, m.revenue, i.oscar_nominations as total_nominations
FROM movie_meta m RIGHT JOIN oscars o ON m.title = o.title
INNER JOIN oscarindex i ON m.title = i.film;

SELECT count(*) FROM movie_meta; 

-- DATA PAGE
-- Select title, genre, release date, movie crew (contains director), movie cast (actors), synopsis, rating
SELECT m.title, m.genres, m.release_date, c.movie_crew, c.movie_cast, m.overview, r.rating
FROM movie_meta m INNER JOIN credits c ON m.id = c.id
INNER JOIN ratings r ON m.id = r."movieId";


-- DASHBOARD PAGE
-- Select release date, budget, revenue, ratings 
SELECT m.release_date, m.budget, m.revenue, r.rating
FROM movie_meta m INNER JOIN ratings r
ON m.id = r."movieId";

-- OSCARS PAGE
-- Select budget, revenue, ratings, oscar nominations
SELECT m.budget, m.revenue, r.rating, i.oscar_nominations
FROM movie_meta m INNER JOIN ratings r ON m.id = r."movieId"
LEFT JOIN oscars o ON m.title = o.title
LEFT JOIN oscarindex i ON m.title = i.film;
