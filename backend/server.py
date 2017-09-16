from flask import Flask, url_for, json, request, Response, make_response
import nmap # import nmap.py module
from multiprocessing import Process
import subprocess

from datetime import timedelta

from functools import update_wrapper

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

devices = {}
class processClass:

    def __init__(self):
        self.nm = nmap.PortScanner()
        p = Process(target=self.scan, args=())
        p.daemon = True                       # Daemonize it
        p.start()                             # Start the execution

def scan():
    #nmap scan
    nm = nmap.PortScanner()
    nm.scan(hosts="192.168.178.0/24", arguments=' -sP  -PE -PA21,23,80,3389');
    #lookup ARP table to find MAC addresses
    ips = { }
    proc = subprocess.Popen(['arp', '-a'], stdout=subprocess.PIPE)
    while True:
        line = proc.stdout.readline()
        if line != '':
            # the real code does filtering here
            line = line.split(" ")
            # print line
            if len(line) > 2 and line[1] != "(incomplete)":
                ips[line[1].translate(None, '()')] = [line[0], line[3]] #name and mac
        else:
            break

    hosts_list = [ nm[x] for x in nm.all_hosts()]
    for host in hosts_list:
        update = {"ip": "", "mac": "", "name": "name", "online": False }
        if host['status']['state']== 'up':
            update["online"]=True
        else:
            update['online']=False
        for name in host['hostnames']:
           update['name']=  name['name']
        ip = host['addresses']['ipv4']
        update['ip']=ip
        if ip in ips:
            update['mac']=ips[ip][1]
        update_host_info(update)





app = Flask(__name__)


'''
id
name
manufacturer
model
qr_code
ip
mac
online
secure
registered
vulnerabilities
'''

@app.route('/')
def api_root():
    return 'Welcome'

# get device list     curl -i -H "Accept: application/json" "http://127.0.0.1:5000/devices"
@app.route('/devices' , methods = ['GET', 'ORIGIN'])
@crossdomain(origin='*',headers='Content-Type')
def all_deices():
    print devices
    return  Response(json.dumps(devices.values()), status=200, mimetype='application/json')


@app.route('/devices/<device_id>', methods=['GET', 'ORIGIN'])
@crossdomain(origin='*',headers='Content-Type')
def get_device(device_id):
    if device_id in devices:
        return Response(json.dumps(devices[device_id]), status=200, mimetype='application/json')
    else:
        return Response(json.dumps(""), status=404, mimetype='application/json')


#curl -d '{"ip": "127.0.0.13"}' -X POST  -H "Content: application/json"  http://127.0.0.1:5000/devices/new
@app.route('/devices/new', methods=['POST', 'ORIGIN'])
@crossdomain(origin='*',headers='Content-Type')
def add_device():
#check if device already present
    update_host_info({'ip': '192.168.178.23', 'mac': '00:14:22:01:23:45', 'name': 'KPs-iPhone.fritz.box', 'online': True})

    '''new_device= request.json
    if device_id in devices:
        ##update device information with one supplied
        devices[device_id].update((k, v) for k, v in new_device.iteritems() if v is not None)
        ##TODO: assess vulnerability
    else:
        devices[device_id] = request.json'''

    return Response(json.dumps(devices), status=200, mimetype='application/json')

#curl   http://127.0.0.1:5000/devices/1/online
@app.route('/devices/<device_id>/online', methods=['GET', 'ORIGIN'])
@crossdomain(origin='*',headers='Content-Type')
def is_online(device_id):
#check if device online
    if device_id in devices:
        if "ip" in devices[device_id]:
            nm = nmap.PortScanner()
            nm.scan(hosts=devices[device_id]['ip'], arguments='-n -sP -PE -PA21,23,80,3389')
            hosts_list = [(x, nm[x]['status']['state']) for x in nm.all_hosts()]
            for host, status in hosts_list:
                if status=="up":
                    return Response(json.dumps(True), status=200, mimetype='application/json')
        ##TODO: assess vulnerability
        return Response(json.dumps(False), status=200, mimetype='application/json')
    else:
        return Response(json.dumps(""), status=404, mimetype='application/json')


##scan devices
@app.route('/scan', methods=['POST', 'ORIGIN'])
@crossdomain(origin='*',headers='Content-Type')
def start_scan():

    try:
        #begin = processClass()
        scan()
    except :
        return "Scan failed"

    return "Scan completed"

def update_host_info(update):
    print "update" , update # {'ip': '192.168.178.23', 'mac': 'kps-iphone.fritz.box', 'name': 'KPs-iPhone.fritz.box', 'online': True}
    if "mac" in devices:
        devices[update['mac']].update(update)
    else:
        devices[update["mac"]] = update
        print devices
        print 'added device'





if __name__ == '__main__':
    #processClass()
    app.run(threaded=False )
