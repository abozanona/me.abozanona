require('social-share.js/dist/js/jquery.share.min.js');

function share () {
  if ($('.post-share').length) {
    $('.post-share').share({
      disabled: ['tencent', 'douban', 'diandian', 'google', 'weibo', 'qq', 'wechat', 'qzone'],
      wechatQrcodeTitle: "微信扫一扫",
      wechatQrcodeHelper: '<p>微信扫一扫，右上角分享</p>',
      source: CONFIG.site.title
    });
  }
}

module.exports = share;
