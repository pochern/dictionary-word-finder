from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./test.db'
db = SQLAlchemy(app)


class Definition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    definition = db.Column(db.String(1000), unique=False, nullable=False)
    example = db.Column(db.String(1000), unique=False, nullable=False)
    image_url = db.Column(db.String(2000), unique=False, nullable=False)
    word_type = db.Column(db.String(80), unique=False, nullable=False)
    word = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Definition %r>' % self.word


@app.route('/data.json', methods=['GET'])
def get_data():
    favorites = Definition.query.all()
    
    printing = {
        'definitions': [{
            'id': favorite.id,
            'definition': favorite.definition,
            'example': favorite.example,
            'image_url': favorite.image_url,
            'word_type': favorite.word_type,
            'word': favorite.word,
        } for favorite in favorites],
    }
    
    return jsonify(printing)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
