from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

jwt = JWTManager()
cors = CORS()
bcrypt = Bcrypt()
migrate = Migrate()
