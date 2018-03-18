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
      'full_name': self.get_full_name(),
      'biography': self.get_biography(),
      'profile_picture': self.get_profile_picture(),
      'n_feed': self.get_n_feed(),
      'n_followers': self.get_n_followers(),
      'n_followings': self.get_n_followings(),

      # TO IMPROVE: Get Followers and Followings only when necessary
      'followers': self.get_followers(),
      'followings': self.get_followings()
    }

  def __clear(self):
    self.__full_info = None
    self.__feed = None
    self.__followers = None
    self.__followings = None

  def __get_full_info(self):
    if not self.__full_info and self.api.searchUsername(self.username):
      self.__full_info = self.api.LastJson['user']
    return self.__full_info

  def __get_user_info_in_search(self, attribute, attribute_in_search=None):
    if not hasattr(self, attribute):
      attribute_in_search = attribute_in_search or attribute.replace('__', '')
      value = self.__get_full_info()[attribute_in_search]
      setattr(self, attribute, value)

    return getattr(self, attribute)

  def get_full_name(self):
    return self.__get_user_info_in_search('__full_name')

  def get_profile_picture(self):
    return self.__get_user_info_in_search('__profile_picture', 'profile_pic_url')

  def get_biography(self):
    return self.__get_user_info_in_search('__biography')

  def get_n_feed(self):
    return self.__get_user_info_in_search('__n_feed', 'media_count')

  def get_n_followers(self):
    return self.__get_user_info_in_search('__n_followers', 'follower_count')

  def get_n_followings(self):
    return self.__get_user_info_in_search('__n_followings', 'following_count')

  def get_feed(self):
    if not self.__feed:
      self.__feed = self.api.getTotalUserFeed(self.user_id)
    return self.__feed

  def get_followers(self):
    if not self.__followers:
      self.__followers = self.api.getTotalSelfFollowers()
    return self.__followers

  def get_followings(self):
    if not self.__followings:
      self.__followings = self.api.getTotalSelfFollowings()
    return self.__followings

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
