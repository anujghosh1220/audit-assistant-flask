from setuptools import setup, find_packages
import os

# Get the base directory
base_dir = os.path.abspath(os.path.dirname(__file__))

# Get the list of template files
template_files = []
for (dirpath, dirnames, filenames) in os.walk('templates'):
    for filename in filenames:
        template_files.append(os.path.join('..', dirpath, filename))

# Get the list of static files
static_files = []
for (dirpath, dirnames, filenames) in os.walk('static'):
    for filename in filenames:
        static_files.append(os.path.join('..', dirpath, filename))

setup(
    name="audit-assistant",
    version="0.1",
    packages=find_packages(),
    package_data={
        'audit_assistant': template_files + static_files,
    },
    include_package_data=True,
    install_requires=[
        "Flask==2.3.3",
        "gunicorn==21.2.0",
        "python-dotenv==1.0.0",
        "Werkzeug==2.3.7",
        "Jinja2==3.1.2",
        "itsdangerous==2.1.2",
        "click==8.1.7",
    ],
)
