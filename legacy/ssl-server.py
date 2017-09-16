#!/usr/bin/env python2
# SimpleHTTPServer flavoured with ssl
# Thanks to https://gist.github.com/rozifus/c529caf170699f117c53
import os
import ssl
import sys
import BaseHTTPServer
import SimpleHTTPServer

CURRENT_DIR = os.path.dirname(__file__)
DIR_TO_SERVE = os.path.join(CURRENT_DIR, '..', 'my-app', 'src', 'assets')

if len(sys.argv) > 1:
    host, port = sys.argv[1].split(':')
    port = int(port)
else:
    host, port = 'localhost', 4443

httpd = BaseHTTPServer.HTTPServer((host, port), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, server_side=True,
                               certfile='yourpemfile.pem')
print('Starting the server at https://{}:{}'.format(host,port))
os.chdir(DIR_TO_SERVE)
httpd.serve_forever()
