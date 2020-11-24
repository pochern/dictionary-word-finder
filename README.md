# dictionary-word-finder
An application that allows the user to search a dictionary for their favorite words.

## To set up locally:
```
cd dictionary-word-finder
```
### Install flask and flask_sqlalchemy in backend folder
```
cd backend
pip install flask
pip install flask_sqlalchemy
```

### Initialize database
```
cd backend
python initialize_db.py
```

### Create .env file in frontend folder to store the Owlbot Dictionary API key
- Visit https://owlbot.info/ to get a token (on the bottom of the page)
```
cd frontend
```
Create .env file. Inside your .env file, enter:
```
REACT_APP_API_KEY=my-secret-api-key
```

### Run the client on your machine
```
cd frontend
npm install
npm start
```

### Run the server on your machine
```
cd backend
python app.py
```
