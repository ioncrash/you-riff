import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('videos');
  this.route('video', { path: 'videos/:video_id' });
  this.route('riff', { path: 'riffs/:riff_id' });
  this.route('about');
});

export default Router;
