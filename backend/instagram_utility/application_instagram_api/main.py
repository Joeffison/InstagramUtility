from .facade import *

import csv
with open('C:/Users/joeff/Documents/workspace/InstagramUtility.input.csv', 'rb') as f:
    reader = csv.reader(f)
    app_input = list(reader)[0]

api = MyInstagramAPI(app_input[0], app_input[1], app_input[2])
print("Followings", len(api.getFollowings()))
print("Followers", len(api.getFollowers()))
