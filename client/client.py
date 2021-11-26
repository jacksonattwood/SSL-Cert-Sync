import requests
import os
import config

SERVER = config.SERVER
AUTHKEY = config.AUTHKEY
SAVE_PATH = config.SAVE_PATH
files = config.files

def filenameshort(i):
    file_name = i.split('/')[2]
    return file_name

for i in files: 
    file_name = filenameshort(i)
    print("Downloading '" + SERVER + i + "' to " + SAVE_PATH + "/" + file_name)
    headers = {"auth-key": AUTHKEY,"file": i }
    response = requests.get(SERVER, headers=headers)
    savelocation = SAVE_PATH + "/" + file_name
    open(f"{savelocation}", "w").write(response.text)

