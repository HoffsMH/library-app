import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',
  message: '',
  responseMessage: '',

  validEmail: Ember.computed('emailAddress', function() {
    return this.get('emailAddress').match(/^.+@.+\..+$/);
  }),
  validMessage: Ember.computed.gte('messageCharCount', 5),
  validForm: Ember.computed.and('validEmail' , 'validMessage'),

  messageCharCount: Ember.computed('message', function() {
    return this.get('message').length;
  }),


  isDisabled: Ember.computed.not('validForm'),

  actions: {
    saveContact() {
      alert(`Sending your message`);
      this.set('responseMessage', `We got your message and we'll get in touch soon.`);
      this.set('emailAddress', '');
      this.set('message', '');
    }
  }
});
