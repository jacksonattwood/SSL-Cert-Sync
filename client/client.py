import config
import requests

SERVER = "http://" + config.SERVER
AUTHKEY = config.AUTHKEY
SAVE_PATH = config.SAVE_PATH
FILES = config.files

def shorten_filename(i) -> str:
    
    """ Returns formatted string """
    
    try:
        return i.split('/')[2];
    except TypeError as e:
        print(str(e)+'\n -> TypeError occured on attempted execute of shorten_frame function')
        return str();

for i in FILES:
    print("Downloading {} to {}/{}".format(SERVER + i,SAVE_PATH,filenameshort(i)))
    with open(str(SAVE_PATH + "/" + file_name), "w") as file: 
        file.write(
            requests.get(
                SERVER, headers={
                "auth-key": AUTHKEY,
                "file": i 
                }).text)
        


