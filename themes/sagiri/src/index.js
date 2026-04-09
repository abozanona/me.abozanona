window.FastClick = require('fastclick');
require('lazyload');

window.APlayer = require('aplayer');
window.DPlayer = require('dplayer');

window.NexT = window.NexT || {};
window.CONFIG = window.CONFIG || {};
require('./utils');
require('./motion');
require('./affix');
require('./pisces')();
require('./post-details')();
require('./bootstrap');
require('./evanyou');
require('./share')();
require('./scroll');
require('./since');
require('./title');
require('./type');
require('./mix');
require('./pjax');
require('./search');
require('./zoom')();
require('./aplayer');
require('./cursor-effects');
require('./weather');
