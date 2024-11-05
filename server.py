from flask import Flask, send_file, render_template, abort
from gevent.pywsgi import WSGIServer

app = Flask(__name__, template_folder=".")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/<path:p>")
def fs(p):
    try:
        return send_file(p)
    except FileNotFoundError:
        return abort(404)


if __name__ == "__main__":
    http_server = WSGIServer(("127.0.0.1", 7722), app)
    http_server.serve_forever()
