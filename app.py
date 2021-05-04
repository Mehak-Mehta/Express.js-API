from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# Init App
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)


# Class Hunter
class Hunter(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    description = db.Column(db.String)

    def __init__(self,name,age,description):
        self.name = name
        self.age = age
        self.description = description

# Schema
class HunterSchema(ma.Schema):
    class Meta:
        fields = ('id','name','age','description')

# Init Schema
hunter_schema = HunterSchema()
hunters_schema = HunterSchema()

# Create Route

@app.route('/hunter' , methods = ['PUT'])
def add_hunter():
    name = request.json['name']
    age = request.json['age']
    description = request.json['description']

    new_hunter = Hunter(name,age,description)
    db.session.add(new_hunter)
    db.session.commit()

    return hunter_schema.jsonify(new_hunter)
    
# Get all Hunters

@app.route('/hunter' , methods=['GET'])
def get_all():
    all_hunters = Hunter.query.all()
    res = hunters_schema.dump(all_hunters)
    return jsonify(res.data)

# Run Server
if __name__ == '__main__':
  app.run(debug=True)