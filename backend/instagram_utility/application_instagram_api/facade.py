# https://github.com/LevPasha/Instagram-API-python
# pip install -e git+https://github.com/LevPasha/Instagram-API-python.git#egg=InstagramAPI
import imageio

imageio.plugins.ffmpeg.download()

from InstagramAPI import InstagramAPI

class MyInstagramAPI:
  def __init__(self, username, password):
    self.username = username
    self.password = password

    self.api = InstagramAPI(self.username, self.password)
    self.api.login()
    self.user_id = self.api.username_id
    self.__clear()

  def get_current_user_profile(self):
    return {
      'username': self.username,
      'n_feed': len(self.getFeed()),
      'n_followers': len(self.getFollowers()),
      'followers': self.getFollowers(),
      'n_followings': len(self.getFollowings()),
      'followings': self.getFollowings()
    }

  def __clear(self):
    self.feed = None
    self.followers = None
    self.followings = None

  def getFeed(self):
    if not self.feed:
      self.feed = self.api.getTotalUserFeed(self.user_id)
    return self.feed

  def getFollowers(self):
    if not self.followers:
      self.followers = self.api.getTotalSelfFollowers()
    return self.followers

  def getFollowings(self):
    if not self.followings:
      self.followings = self.api.getTotalSelfFollowings()
    return self.followings

  @staticmethod
  def getUsernames(users):
    return [user['username'] for user in users]

  @staticmethod
  def getUserIDs(users):
    return {user['username']: user['pk'] for user in users}
