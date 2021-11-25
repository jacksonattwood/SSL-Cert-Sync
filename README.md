# SSL_CERT_SYNC
 A script to sync multiple servers with a central listening server, that provides them all with the same SSL certificate (for ease of use)

# Installation
1. Clone into the repo: `git clone https://github.com/jacksonattwood/SSL-Cert-Sync.git && cd SSL-Cert-Sync`
2. Run the following command on your CLI: `npm install`
3. Copy "config.json.example" to "config.json" and edit to your needs (DO NOT SHARE YOUR AUTH KEY WITH ANYONE)
4. Run the following command on your CLI to start the NodeJS Server: `node server.js`


# Testing
curl -X GET http://localhost:7080 -H "auth-key: auth1" -H "file: /Users/spy21/test.html"