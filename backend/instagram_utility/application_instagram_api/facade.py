# https://github.com/LevPasha/Instagram-API-python
# pip install -e git+https://github.com/LevPasha/Instagram-API-python.git#egg=InstagramAPI
import imageio

imageio.plugins.ffmpeg.download()

# import wave
# import pafy
# import os
# import moviepy.editor as mpy
# import datetime

from InstagramAPI import InstagramAPI

class MyInstagramAPI:
    def __init__(self, username, password):
        self.username = username
        self.password = password

        self.api = InstagramAPI(self.username, self.password)
        self.api.login()
        self.user_id = self.api.username_id

    def __getFollwxs(self, api_function):
        following = []
        next_max_id = True
        while next_max_id:
            # first iteration hack
            if next_max_id == True: next_max_id = ''
            _ = api_function(self.user_id, maxid=next_max_id)
            following.extend(self.api.LastJson.get('users', []))
            next_max_id = self.api.LastJson.get('next_max_id', '')
        return following

    def getFollowings(self):
        return self.__getFollwxs(self.api.getUserFollowings)

    def getFollowers(self):
        return self.__getFollwxs(self.api.getUserFollowers)

    @staticmethod
    def getUsernames(users):
        return [user['username'] for user in users]

    @staticmethod
    def getUserIDs(users):
        return {user['username']: user['pk'] for user in users}
