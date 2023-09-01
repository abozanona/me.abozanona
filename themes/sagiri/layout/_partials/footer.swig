<p>The blog is already running since <span id="since"></span><span class="my-face">(●'◡'●)ﾉ♥</span></p>
{% if theme.footer.custom_text %}<p>{{ theme.footer.custom_text }}</p>{% endif %}
{% set current = date(Date.now(), "YYYY") %}
{% if theme.footer.counter %}
<div>
    <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
    <span id="busuanzi_container_site_pv"> Total visits to the site <span id="busuanzi_value_site_pv"></span> times</span>
    <span class="post-meta-divider">|</span>
    <span id="busuanzi_container_site_uv">Number of visitors <span id="busuanzi_value_site_uv"></span> people</span>
</div>
{% endif %}
<p>Made with <i class="fas fa-heart throb" style="color: #d43f57;"></i> by <span class="author" itemprop="copyrightHolder">{{ theme.footer.copyright || config.author }}</span>. </p>
