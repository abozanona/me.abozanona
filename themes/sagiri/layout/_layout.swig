<!DOCTYPE html>

{% set html_class = 'theme-next ' + theme.scheme %}
{% if theme.motion.enable %}
  {% set html_class = html_class + ' use-motion' %}
{% endif %}

<html class="{{ html_class | lower }}" lang="{{ config.language }}">
<head>
  {% include '_partials/head.swig' %}
  <title>{% block title %}{% endblock %}</title>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-03W44XT8MV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-03W44XT8MV');
  </script>
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ page.lang || page.language || config.language }}" class="theme-darling">

  <canvas id="weather"></canvas>
  <div id="shell-panel" tabindex="0" class="ui-resizable">
    <div id="license-note">
      <code>GNU bash, version 5.0.17(1)-release (x86_64-pc-linux-gnu)<br/>
        Copyright (C) 2019 Free Software Foundation, Inc.<br/>
        License GPLv3+: GNU GPL version 3 or later.<br/>
        <br/>
        This is free software; you are free to change and redistribute it.<br/>
        There is NO WARRANTY, to the extent permitted by law.<br/>
        PLEASE NOTE THAT YOU NEED A KEYBOARD TO ACCESS THE TERMINAL</code>
    </div>
    <div id="shell-view">
      <div id="shell-cli"><span class="prompt">/ $</span>&nbsp;<span class="input"><span class="left"></span><span
            class="cursor" style="text-decoration: underline;">&nbsp;</span><span class="right"></span></span></div>
    </div>
    <div class="ui-resizable-handle ui-resizable-s" style="z-index: 1000;"></div>
  </div>


  {% set container_class = "container " %}
  {% if theme.sidebar.position %}
    {% set container_class = container_class + 'sidebar-position-' + theme.sidebar.position %}
  {% endif %}

  <div class="{{ container_class }} {% block page_class %}{% endblock %}">
    <header id="header" class="header" itemscope itemtype="http://schema.org/WPHeader">
      <div class="header-inner"> {%- include '_partials/header.swig' %} </div>
    </header>

    <main id="main" class="main">
      <div class="main-inner">
        <div class="content-wrap">
          <div id="content" class="content">
            {% block content %}{% endblock %}
          </div>
        </div>
        {% if theme.sidebar.display !== 'remove' %}
          {% block sidebar %}{% endblock %}
        {% endif %}
      </div>
    </main>

    <footer id="footer" class="footer">
      <div class="footer-image">
        
      </div>
      <div class="footer-inner">
        {% include '_partials/footer.swig' %}
        {% block footer %}{% endblock %}
      </div>
    </footer>

    {% if not theme.sidebar.b2t %}
      <div class="back-to-top">
        <img src="https://cdn.jsdelivr.net/gh/abozanona/me.abozanona/themes/sagiri/source/images/scroll.png">
        {% if theme.sidebar.scrollpercent %}
          <span id="scrollpercent"><span>0</span>%</span>
        {% endif %}
      </div>
    {% endif %}

    <canvas id="evanyou"></canvas>
    <div id="aplayer-fixed"></div>

    {% if theme.needmoreshare2.enable and theme.needmoreshare2.float.enable %}
      <div id="needsharebutton-float">
        <span class="btn">
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </span>
      </div>
    {% endif %}

  </div>

  <script type="text/javascript" src="{{ url_for(theme.js) }}/sagiri.min.js?v={{ theme.version }}"></script>

  {% include '_third-party/search/index.swig' %}
  {% include '_third-party/seo/baidu-push.swig' %}
  {% include '_third-party/needsharebutton.swig' %}
  {% include '_third-party/rating.swig' %}
  {% include '_third-party/mathjax.swig' %}
  {% include '_third-party/scroll-cookie.swig' %}
  {% include '_third-party/exturl.swig' %}

  <!--<script>
    // remove service worker cache
    // from https://stackoverflow.com/questions/33704791/how-do-i-uninstall-a-service-worker
    "use strict";
    if(navigator.serviceWorker)
    {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister()
            }
        })
    }
  </script>-->

  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  </script>
</body>
</html>
