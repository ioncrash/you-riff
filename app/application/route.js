import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    changeVideo(ytid) {
      let that = this;
      return new Ember.RSVP.Promise(function(resolve) {
        that.store.findAll('video')
          .then(function(videos) {
          resolve(videos.filterBy('ytid', ytid));
          });
      })
      .then((videos) => {
        if (videos.length > 0) {
          let video = videos[0];
          this.transitionTo('video', video.get('id'));
        }
        else {
          let newVid = this.store.createRecord('video', {
            ytid: ytid
          });
          newVid.save()
            .then((newVid) => {
              this.transitionTo('video', newVid.get('id'));
            });
        }
      });
    },
    signOut () {
      this.get('auth').signOut()
        .then(() => this.get('store').unloadAll())
        .then(() => this.transitionTo('sign-in'))
        .then(() => {
          this.get('flashMessages').warning('You have been signed out.');
        })
        .catch(() => {
          this.get('flashMessages')
          .danger('There was a problem. Are you sure you\'re signed-in?');
        });
    },

    error (reason) {
      let unauthorized = reason.errors && reason.errors.some((error) =>
        error.status === '401'
      );

      if (unauthorized) {
        this.get('flashMessages')
        .danger('You must be authenticated to access this page.');
        this.transitionTo('/sign-in');
      } else {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      }

      return false;
    },
  },
});
