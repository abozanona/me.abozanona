/* global NexT: true */
function postDetails () {

  $(document).ready(function () {



  });

  $(document).ready(function () {
    var html = $('html');
    var TAB_ANIMATE_DURATION = 200;
    var hasVelocity = typeof html.velocity === 'function';

    $('.des-of-author-title').click(function () {
      $('.des-of-author-title.active').removeClass('active');
      $('.des-of-author-des.active').removeClass('active');
      const index = $(this).data('index');
      $(this).addClass('active');
      $(`.des-of-author-des[data-index="${index}"]`).addClass('active');
    });

    $('.sidebar-nav li').on('click', function () {
      var item = $(this);
      var activeTabClassName = 'sidebar-nav-active';
      var activePanelClassName = 'sidebar-panel-active';
      if (item.hasClass(activeTabClassName)) {
        return;
      }

      var currentTarget = $('.' + activePanelClassName);
      var target = $('.' + item.data('target'));

      hasVelocity ?
        currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function () {
          target
            .velocity('stop')
            .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
            .addClass(activePanelClassName);
        }) :
        currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function () {
          currentTarget.hide();
          target
            .stop()
            .css({ 'opacity': 0, 'display': 'block' })
            .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function () {
              currentTarget.removeClass(activePanelClassName);
              target.addClass(activePanelClassName);
            });
        });

      item.siblings().removeClass(activeTabClassName);
      item.addClass(activeTabClassName);
    });

    // TOC item animation navigate & prevent #item selector in adress bar.
    $('.post-toc-content a').on('click', function (e) {
      e.preventDefault();
      var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
      var offset = $(targetSelector).offset().top;

      hasVelocity ?
        html.velocity('stop').velocity('scroll', {
          offset: offset + 'px',
          mobileHA: false
        }) :
        $('html, body').stop().animate({
          scrollTop: offset
        }, 500);
    });

    // Expand sidebar on post detail page by default, when post has a toc.
    var $tocContent = $('.post-toc-content');
    var isSidebarCouldDisplay = CONFIG.sidebar.display === 'post' ||
      CONFIG.sidebar.display === 'always';
    var hasTOC = $tocContent.length > 0 && $tocContent.html().trim().length > 0;
    if (isSidebarCouldDisplay && hasTOC) {
      NexT.utils.displaySidebar();
    }
  });
}

module.exports = postDetails;
