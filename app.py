from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta

app = Flask(__name__)

launch_end_time = None

@app.route('/', methods=['GET', 'POST'])
def index():
    global launch_end_time
    if request.method == 'POST':

        days = int(request.form['days'])
        hours = int(request.form['hours'])
        minutes = int(request.form['minutes'])
        seconds = int(request.form['seconds'])

        launch_end_time = datetime.now() + timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds)
        return redirect(url_for('countdown'))

    return render_template('index.html')

@app.route('/countdown')
def countdown():
    if launch_end_time:
        remaining_time = launch_end_time - datetime.now()
        return render_template('countdown.html', remaining_time=remaining_time)
    else:
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
