module.exports = {
  name: 'rockme',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/rockme',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
