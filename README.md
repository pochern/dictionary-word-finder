# dictionary-word-finder
An application that allows the user to search a dictionary for their favorite words.

## To set up locally:
### Install flask and flask_sqlalchemy in backend folder
```
cd backend
pip install flask
pip install flask_sqlalchemy
```

### Run the client on your machine
```
cd frontend
npm start
```

### Run the server on your machine
```
cd backend
python app.py
```

### Create the Definition database
```
cd backend
python
from app import Definition
from app import db
db.create_all()
```
