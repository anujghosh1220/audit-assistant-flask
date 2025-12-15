from setuptools import setup, find_packages

setup(
    name="audit-assistant",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "Flask==2.3.3",
        "gunicorn==21.2.0",
        "python-dotenv==1.0.0",
    ],
)
