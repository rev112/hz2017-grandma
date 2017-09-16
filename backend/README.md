## setup

    python setup.py install

## API

Trigger a new scan:

    curl  -X POST  -H "Content: application/json"  http://127.0.0.1:5000/scan

Get list of current devices:

    curl -H "Accept: application/json" http://127.0.0.1:5000/devices

Add a mock device (for testing only)

    curl -d '{"ip": "127.0.0.13"}' -X POST  -H "Content: application/json"  http://127.0.0.1:5000/devices/new