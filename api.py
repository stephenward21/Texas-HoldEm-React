# sudo pip install flask
# Get Flask class, request, and Jsonfiy from flask
from flask import Flask, request, jsonify
# sudo pip install flask-cors
from flask_cors import CORS

app = Flask(__name__);
CORS(app)
@app.route('/', methods=['GET'])
def home_page():
	return "Hello, World!"

@app.route('/hand-checker', methods=['POST'])
def hand_checker():
	hand = request.form.getlist('hand[]');
	print hand[0]
	return jsonify({
		"message": "You have %s and %s!" % (hand[0],hand[1]) 
	})

if __name__ == '__main__':
	app.run(debug=True)