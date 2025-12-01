if (!NexT.utils.isMobile()) {
    const apFixed = new APlayer({
      element: document.getElementById('aplayer-fixed'),
      mutex: true,
      theme: '#97dffd',
      order: 'random',
      lrcType: 3,
      fixed: true,
    });
    $.ajax({
      url: '/assets/playlest.json?v=0.0.81', //TODO: Read from theme settings
      success: function (list) {
        apFixed.list.add(list);
      }
    });
  }