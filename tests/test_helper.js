import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import testdom from 'testdom';
import mockery from 'mockery'

testdom('<html><body></body></html>');

chai.use(chaiImmutable);

mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
})
mockery.registerMock('firebase', {
  initializeApp: () => {}
})
