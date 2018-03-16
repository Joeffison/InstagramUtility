# https://github.com/LevPasha/Instagram-API-python
# pip install -e git+https://github.com/LevPasha/Instagram-API-python.git#egg=InstagramAPI
import imageio
from rest_framework.exceptions import APIException

imageio.plugins.ffmpeg.download()

from InstagramAPI import InstagramAPI


class LoginFailedException(APIException):
  pass


class MyInstagramAPI:
  def __init__(self, username, password):
    self.username = username
    self.password = password

    self.api = InstagramAPI(self.username, self.password)
    self.api.login()

    try:
      self.user_id = self.api.username_id
    except AttributeError:
      raise LoginFailedException()

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

  def follow(self, users_ids):
    for to_follow in users_ids:
      self.api.follow(to_follow)

  def unfollow(self, users_ids):
    for to_follow in users_ids:
      self.api.unfollow(to_follow)

  @staticmethod
  def getUsernames(users):
    return [user['username'] for user in users]

  @staticmethod
  def getUserIDs(users):
    return {user['username']: user['pk'] for user in users}
