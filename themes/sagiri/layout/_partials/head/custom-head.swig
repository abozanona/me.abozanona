{#
Custom head.
#}

<script>
var Josh = { Debug: false };
function lucaTreasureHunt() {
    document.getElementById('shell-panel').style.display = 'block';
}
</script>
<script type="text/javascript" src="{{ url_for(theme.js) }}/console-game/history.js?v={{ theme.version }}"></script>
<script type="text/javascript" src="{{ url_for(theme.js) }}/console-game/readline.js?v={{ theme.version }}"></script>
<script type="text/javascript" src="{{ url_for(theme.js) }}/console-game/shell.js?v={{ theme.version }}"></script>
<script type="text/javascript" src="{{ url_for(theme.js) }}/console-game/pathhandler.js?v={{ theme.version }}"></script>
<script type="text/javascript" src="{{ url_for(theme.js) }}/console-game/others.js?v={{ theme.version }}"></script>
<script type="text/javascript" src="{{ url_for(theme.js) }}/console-game/example.js?v={{ theme.version }}"></script>

<style type="text/css">
    #shell-panel {
        display: none;
        width: 100%;
        background-color: #27282c;
        color: #fff;
        padding: 20px 20px 20px 20px;
        font-family: monospace, monospace;
        word-break: break-all;
        overflow: scroll;
        overflow-x: auto;
        overflow-y: scroll;
        border: 1px dashed #E6EBE0;
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        z-index: 99999;
    }
</style>