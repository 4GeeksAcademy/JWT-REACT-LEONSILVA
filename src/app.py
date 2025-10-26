"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('GETKEY')  # key= secret_key!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = User()
    
    if data is None:
        return jsonify({"msn": "no se ah encontrado un body o no formato JSON valido"}), 400
    if "email" not in data:
        return jsonify({"msn": "no se ah encontrado un email en el body"}), 400
    if "password" not in data:
        return jsonify({"msn": "no se ah encontrado un password en el body"}), 400
    if "name" not in data:
        return jsonify({"msn": "no se ah encontrado un name en el body"}), 400
    if "edad" not in data:
        return jsonify({"msn": "no se ah encontrado un edad en el body"}), 400
    if "description" not in data:
        return jsonify({"msn": "no se ah encontrado un description en el body"}), 400
    
    user.email = data["email"]
    user.password = data["password"]
    user.name = data["name"]
    user.edad = data["edad"]
    user.description = data["description"]
    user.is_active = True

    access_token = create_access_token(identity=user.email)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "new_user": user.serialize(),
        "acces_token": access_token
    })


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True)

    if data is None:
        return jsonify({"msn": "no se ah encontrado un body o no formato JSON valido"}), 400
    if "email" not in data:
        return jsonify({"msn": "no se ah encontrado un email en el body"}), 400
    if "password" not in data:
        return jsonify({"msn": "no se ah encontrado un password en el body"}), 400

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email, password=password).first()
    access_token = create_access_token(identity=user.email)

    return jsonify({
        "user": user.serialize(),
        "JWT": access_token
    }), 200


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
