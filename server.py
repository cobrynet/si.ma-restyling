#!/usr/bin/env python3
"""
Server HTTP personalizzato che rimuove .html dagli URL
"""
import http.server
import socketserver
from urllib.parse import unquote
import os

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Decodifica l'URL
        path = unquote(self.path)
        
        # Rimuovi query string se presente
        if '?' in path:
            path = path.split('?')[0]
        
        # Se il path non ha estensione e non è la root, prova ad aggiungere .html
        if path != '/' and not os.path.splitext(path)[1]:
            # Prova a servire il file .html
            html_path = path + '.html'
            if os.path.isfile('.' + html_path):
                self.path = html_path
        
        # Se è la root, servi index.html
        if path == '/':
            self.path = '/index.html'
        
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Server HTTP in esecuzione su http://localhost:{PORT}")
    print("URL puliti abilitati (senza .html)")
    httpd.serve_forever()
