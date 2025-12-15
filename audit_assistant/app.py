from flask import Flask, render_template, request
import os

# Get the absolute path to the templates directory
base_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
template_dir = os.path.join(base_dir, 'templates')
static_dir = os.path.join(base_dir, 'static')

app = Flask(__name__, 
            static_folder=static_dir,
            static_url_path='',
            template_folder=template_dir)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', '3a359880a6ca37316e5e9565d7f731f89e676a0c3956a286')

@app.route('/')
def index():
    return render_template('dashboard.html', active_page='master')

@app.route('/master')
def master():
    return render_template('dashboard.html', active_page='master')

@app.route('/audit-assistant')
def audit_assistant():
    section = request.args.get('section', '')
    active_page = f'audit-assistant-{section}' if section else 'audit-assistant'
    return render_template('dashboard.html', active_page=active_page)

@app.route('/checklist')
def checklist():
    option = request.args.get('option', '')
    active_page = f'checklist-{option}' if option else 'checklist'
    return render_template('dashboard.html', active_page=active_page)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=False)
