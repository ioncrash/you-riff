import Ember from 'ember';

export default Ember.Component.extend({

  classNameBindings: ['chat-box'],
  videoTime: Ember.computed.alias('currentTime'),
  sortedRiffs: Ember.computed.sort('video.riffs', 'sortDefinition'),
  sortDefinition: ['stamp'],
  chatBoxHeight: Ember.computed(function(){
    return this.$('.chat-box')[0].scrollHeight;
  }),
  chatBoxClientHeight: Ember.computed(function() {
    return this.$('.chat-box')[0].clientHeight;
  }),
  chatBoxScrollTop: Ember.computed(function() {
    return this.$('.chat-box')[0].scrollTop;
  }),

  // isScrolledToBottom: Ember.computed(this.$('.chat-box')[0].scrollHeight out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

  newRiff: {
    text: '',
    flagged: false,
  },

  actions: {
    createRiff() {
      if ((this.get('newRiff.text') !== '' && this.get('newRiff.text'))&& this.get('videoTime')) {
        let data = this.get('newRiff');
        data.video = this.get('video');
        data.stamp = this.get('videoTime');
        this.sendAction('createRiff', this.get('newRiff'));
        this.set('newRiff.text', null);
      }
    },
    clickRiff() {
      this.sendAction('clickRiff', this.get('riff'));
    },
  }
});
