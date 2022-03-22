\Python310/python.exe
# -*- coding: UTF-8 -*-

# ライブラリをロード
import os
import cgi
import json
import sys
import datetime
import pandas as pd
import csv

# XMLHttpRequest受け取り
data = sys.stdin.read()
print('Status: 200 OK_http')
print('Content-Type: text/html;charset=UTF-8\n')
result = json.loads(data)
recieve = data + "ok"
print(recieve)
print(result)
print(type(result))


# filename
name = ''
motion = 'walk'
item = 'text'
dirjson = './json/' + name
dircsvtime = './csvtime/' + name
dircsv = './csv/' + name
os.makedirs(dirjson,exist_ok=True)
os.makedirs(dircsvtime,exist_ok=True)
os.makedirs(dircsv,exist_ok=True)

nowtime = datetime.datetime.now()
filename = '/ex_' + motion + '_' + item + '_' + nowtime.strftime('%Y%m%d_%H%M')
jsonname =  dirjson + filename + '.json'
csvnametime =  dircsvtime + filename + '.csv'
csvname = dircsv + filename + '.csv'

# json出力
with open(jsonname, 'w') as f:
    json.dump(result,f)

print(type(recieve))
# csv出力time
with open(csvnametime,"w",newline = '') as f:
    writer = csv.writer(f,delimiter = "\n")
    writer.writerow(result)