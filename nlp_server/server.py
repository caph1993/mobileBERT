from flask import Flask, jsonify, request
from os import environ

from mobile_bert import answer_question


def prefix_route(route_function, prefix="", mask="{0}{1}"):
    """
    Defines a new route function with a prefix.
    The mask argument is a `format string` formatted with, in that order:
      prefix, route
    """

    def newroute(route, *args, **kwargs):
        """New function to prefix the route"""
        return route_function(mask.format(prefix, route), *args, **kwargs)

    return newroute


# Initialize the Flask app
app = Flask(__name__)
app.config["APPLICATION_ROOT"] = environ.get("BASE_URL", "/")
app.route = prefix_route(app.route, app.config["APPLICATION_ROOT"])  # type:ignore


@app.route("/backend/echo", methods=["POST"])
def echo():
    return jsonify(request.json)


# Define a route for the server
@app.route("/backend/predict", methods=["POST"])
def predict():
    assert request.json
    question = request.json["question"]
    text = request.json["text"]
    try:
        answer, scores = answer_question(question, text)
    except RuntimeError as e:
        if "The size of tensor " in str(e):
            print("ERROR: input too long", len(text.split(" ")), flush=True)
            return jsonify(None), 500
        raise e
    return jsonify({"answer": answer, "scores": scores})


# Run the server
if __name__ == "__main__":
    app.run(
        debug=True,
        port=int(environ.get("NLP_PORT", "3000")),
        # threaded=True,
    )
