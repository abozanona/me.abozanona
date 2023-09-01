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
      url: 'https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/assets/playlest.json',
      success: function (list) {
        apFixed.list.add(list);
      }
    });
  }