from flask import Flask, request, jsonify
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


@app.route('/data.json', methods=['POST'])
def add_data():
    json_data = request.get_json()
    request_definition = json_data['definition']
    request_example = json_data['example']
    request_image_url = json_data['image_url']
    request_word_type = json_data['word_type']
    request_word = json_data['word']
    aDefinition = Definition(definition=request_definition,
                             example=request_example,
                             image_url=request_image_url,
                             word_type=request_word_type,
                             word=request_word)
    db.session.add(aDefinition)
    db.session.commit()

    return jsonify(json_data)


@app.route('/data.json', methods=['DELETE'])
def delete_data():
    json_data = request.get_json()
    request_id = json_data['id']
    Definition.query.filter(Definition.id == request_id).delete()
    db.session.commit()

    return jsonify(json_data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
