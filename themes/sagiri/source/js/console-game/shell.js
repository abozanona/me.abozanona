
/* ------------------------------------------------------------------------*
 * Copyright 2013 Arne F. Claassen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *-------------------------------------------------------------------------*/

var Josh = Josh || {};


(function (root) {
  function createElementFromHTML(htmlString) {
    if (htmlString instanceof HTMLElement) {
      return htmlString;
    }
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  Josh.Shell = function (config) {
    config = config || {};

    // instance fields
    var _console = config.console || (Josh.Debug && root.console ? root.console : {
      log: function () {
      }
    });
    var _prompt = config.prompt || 'zshl';
    var _shell_view_id = config.shell_view_id || 'shell-view';
    var _shell_panel_id = config.shell_panel_id || 'shell-panel';
    var _input_id = config.input_id || 'shell-cli';
    var _blinktime = config.blinktime || 500;
    var _history = config.history || new Josh.History();
    var _readline = config.readline || new Josh.ReadLine({ history: _history, console: _console });
    var _active = false;
    var _cursor_visible = false;
    var _activationHandler;
    var _deactivationHandler;
    var _cmdHandlers = {
      clear: {
        exec: function (cmd, args, callback) {
          document.querySelector(id(_input_id)).parentElement.innerHTML = self.templates.input_cmd({ id: _input_id });
          if (document.querySelector("#license-note")) {
            document.querySelector("#license-note").remove();
          }
          callback();
        }
      },
      help: {
        exec: function (cmd, args, callback) {
          callback(createElementFromHTML(self.templates.help({ commands: commands() })));
        }
      },
      history: {
        exec: function (cmd, args, callback) {
          if (args[0] == "-c") {
            _history.clear();
            callback();
            return;
          }
          callback(createElementFromHTML(self.templates.history({ items: _history.items() })));
        }
      },
      _default: {
        exec: function (cmd, args, callback) {
          callback(createElementFromHTML(self.templates.bad_command(cmd)));
        },
        completion: function (cmd, arg, line, callback) {
          if (!arg) {
            arg = cmd;
          }
          return callback(self.bestMatch(arg, self.commands()))
        }
      }
    };
    var _line = {
      text: '',
      cursor: 0
    };
    var _searchMatch = '';
    var _view, _panel;
    var _promptHandler;
    var _initializationHandler;
    var _initialized;

    // public methods
    var self = {
      commands: commands,
      templates: {
        history: (obj) => {
          var res = "<div>";
          for (let i = 0; i < obj.items.length; i++) {
            res += "<div>&nbsp;" + i + "&nbsp;" + obj.items[i] + "&nbsp;</div>";
          }
          res += "</div>";
          return res;
        },
        help: () =>
          '<pre>' +
          '      _.=""_;=.                         <br/>' +
          '   ,-"_,=""     `"=.                    <br/>' +
          '   "=._o`"-._        `"=.               <br/>' +
          '       `"=._o`"=._      _`"=._          <br/>' +
          '         ___:=._o "=._."_.-="`"=.       <br/>' +
          '     __.--" , ; `"=._o." ,-"""-._ ".    <br/>' +
          '  ._"  ,. .` ` `` ,  `"-._"-._   ". `   <br/>' +
          '  |o`"=._` , "` `; .". ,  "-._"-._; ;   <br/>' +
          '  | ;`-.o`"=._; ." ` ``."\` . "-._ /    <br/>' +
          '  |o;    `"-.o`"=._``  `` " ,__.--o;    <br/>' +
          '  | ;     (#) `-.o `"=.`_.--"_o.-; ;    <br/>' +
          '  |o;._    "      `".o|o_.--"    ;o;    <br/>' +
          '   "=._o--._        ; | ;        ; ;    <br/>' +
          '        "=._o--._   ;o|o;     _._;o;    <br/>' +
          '             "=._o._; | ;_.--"o.--"     <br/>' +
          '                  "=.o|o_.--""          <br/>' +
          ' <br/>' +
          'Welcome to "The Open Source Code Quest: Escape Room Edition"! <br/>' +
          ' <br/>' +
          'Prepare yourselves for an exhilarating adventure where your <br/>' +
          'collective intellect, coding skills, and ingenuity will be <br/>' +
          'put to the ultimate test. In this digital labyrinth, you\'ll <br/>' +
          'embark on a quest to uncover the long-lost treasure of <br/>' +
          'open-source code, a treasure that holds the key to untold <br/>' +
          'technological riches! <br/>' +
          '</pre>'
        ,
        bad_command: (command) => {
          return '<div>Unrecognized command:&nbsp;' + command + '</div>';
        },
        input_cmd: (obj) => '<div id="' + obj.id + '"><span class="prompt"></span>&nbsp;<span class="input"><span class="left"></span><span class="cursor"></span><span class="right"></span></span></div>',
        input_search: (obj) => '<div id="' + obj.id + '">(reverse-i-search)`<span class="searchterm"></span>\':&nbsp;<span class="input"><span class="left"></span><span class="cursor"></span><span class="right"></span></span></div>',
        suggest: (obj) => {
          var res = "<div>";
          for (let i = 0; i < obj.suggestions.length; i++) {
            res += "<div>" + obj.suggestions[i] + "</div>";
          }
          res += "</div>";
          return res;
        },
      },
      isActive: function () {
        return _readline.isActive();
      },
      activate: function () {
        if (document.querySelector(id(_shell_view_id))) {
          _active = false;
          return;
        }
        _readline.activate();
      },
      deactivate: function () {
        _console.log("deactivating");
        _active = false;
        _readline.deactivate();
      },
      setCommandHandler: function (cmd, cmdHandler) {
        _cmdHandlers[cmd] = cmdHandler;
      },
      getCommandHandler: function (cmd) {
        return _cmdHandlers[cmd];
      },
      setPrompt: function (prompt) {
        _prompt = prompt;
        if (!_active) {
          return;
        }
        self.refresh();
      },
      onEOT: function (completionHandler) {
        _readline.onEOT(completionHandler);
      },
      onCancel: function (completionHandler) {
        _readline.onCancel(completionHandler);
      },
      onInitialize: function (completionHandler) {
        _initializationHandler = completionHandler;
      },
      onActivate: function (completionHandler) {
        _activationHandler = completionHandler;
      },
      onDeactivate: function (completionHandler) {
        _deactivationHandler = completionHandler;
      },
      onNewPrompt: function (completionHandler) {
        _promptHandler = completionHandler;
      },
      render: function () {
        var text = _line.text || '';
        var cursorIdx = _line.cursor || 0;
        if (_searchMatch) {
          cursorIdx = _searchMatch.cursoridx || 0;
          text = _searchMatch.text || '';
          document.querySelector(id(_input_id) + ' .searchterm').innerText = _searchMatch.term;
        }
        var left = escapeHtml(text.substr(0, cursorIdx)).replace(/ /g, '&nbsp;');
        var cursor = text.substr(cursorIdx, 1);
        var right = escapeHtml(text.substr(cursorIdx + 1)).replace(/ /g, '&nbsp;');
        document.querySelector(id(_input_id) + ' .prompt').innerHTML = _prompt;
        document.querySelector(id(_input_id) + ' .input .left').innerHTML = left;
        cursor = ''
        if (!cursor) {
          document.querySelector(id(_input_id) + ' .input .cursor').innerHTML = '&nbsp;'
          document.querySelector(id(_input_id) + ' .input .cursor').style.textDecoration = 'underline';
        } else {
          document.querySelector(id(_input_id) + ' .input .cursor').innerText = cursor;
          document.querySelector(id(_input_id) + ' .input .cursor').style.textDecoration = 'underline';
        }
        document.querySelector(id(_input_id) + ' .input .right').innerHTML = right;
        _cursor_visible = true;
        self.scrollToBottom();
        _console.log('rendered "' + text + '" w/ cursor at ' + cursorIdx);
      },
      refresh: function () {
        document.querySelector(id(_input_id)).outerHTML = self.templates.input_cmd({ id: _input_id });

        self.render();
        _console.log('refreshed ' + _input_id);
      },
      scrollToBottom: function () {
        _panel.scrollTop = _panel.scrollHeight;
      },
      bestMatch: function (partial, possible) {
        _console.log("bestMatch on partial '" + partial + "'");
        var result = {
          completion: null,
          suggestions: []
        };
        if (!possible || possible.length == 0) {
          return result;
        }
        var common = '';
        if (!partial) {
          if (possible.length == 1) {
            result.completion = possible[0];
            result.suggestions = possible;
            return result;
          }
          if (!possible.every(function (x) {
            return possible[0][0] == x[0]
          })) {
            result.suggestions = possible;
            return result;
          }
        }
        for (var i = 0; i < possible.length; i++) {
          var option = possible[i];
          if (option.slice(0, partial.length) == partial) {
            result.suggestions.push(option);
            if (!common) {
              common = option;
              _console.log("initial common:" + common);
            } else if (option.slice(0, common.length) != common) {
              _console.log("find common stem for '" + common + "' and '" + option + "'");
              var j = partial.length;
              while (j < common.length && j < option.length) {
                if (common[j] != option[j]) {
                  common = common.substr(0, j);
                  break;
                }
                j++;
              }
            }
          }
        }
        result.completion = common.substr(partial.length);
        return result;
      }
    };
    self.setPrompt('fhfhffh')

    function id(id) {
      return "#" + id;
    }

    function commands() {
      return Object.keys(_cmdHandlers);
    }

    function blinkCursor() {
      if (!_active) {
        return;
      }
      root.setTimeout(function () {
        if (!_active) {
          return;
        }
        _cursor_visible = !_cursor_visible;
        if (_cursor_visible) {
          document.querySelector(id(_input_id) + ' .input .cursor').style.textDecoration = 'underline';
        } else {
          document.querySelector(id(_input_id) + ' .input .cursor').style.textDecoration = '';
        }
        blinkCursor();
      }, _blinktime);
    }

    function split(str) {
      return str.split(/\s+/).filter(function (x) {
        return x;
      });
    }

    function getHandler(cmd) {
      return _cmdHandlers[cmd] || _cmdHandlers._default;
    }

    function renderOutput(output, callback) {
      if (output) {
        if (!(output instanceof HTMLElement)) {
          output = createElementFromHTML(output);
        }
        document.querySelector(id(_input_id)).after(output);
      }
      document.querySelector(id(_input_id) + ' .input .cursor').style.textDecoration = '';
      document.querySelector(id(_input_id)).removeAttribute('id');
      document.querySelector(id(_shell_view_id)).appendChild(createElementFromHTML(self.templates.input_cmd({ id: _input_id })));

      if (_promptHandler) {
        return _promptHandler(function (prompt) {
          self.setPrompt(prompt);
          return callback();
        });
      }
      return callback();
    }

    function activate() {
      _console.log("activating shell");
      if (!_view) {
        _view = document.querySelector(id(_shell_view_id));
      }
      if (!_panel) {
        _panel = document.querySelector(id(_shell_panel_id));
      }
      if (!document.querySelector(id(_input_id))) {
        _view.appendChild(createElementFromHTML(self.templates.input_cmd({ id: _input_id })));
      }
      self.refresh();
      _active = true;
      blinkCursor();
      if (_promptHandler) {
        _promptHandler(function (prompt) {
          self.setPrompt(prompt);
        })
      }
      if (_activationHandler) {
        _activationHandler();
      }
    }

    // init
    _readline.onActivate(function () {
      if (!_initialized) {
        _initialized = true;
        if (_initializationHandler) {
          return _initializationHandler(activate);
        }
      }
      return activate();
    });
    _readline.onDeactivate(function () {
      if (_deactivationHandler) {
        _deactivationHandler();
      }
    });
    _readline.onChange(function (line) {
      _line = line;
      self.render();
    });
    _readline.onClear(function () {
      _cmdHandlers.clear.exec(null, null, function () {
        renderOutput(null, function () {
        });
      });
    });
    _readline.onSearchStart(function () {
      document.querySelector(id(_input_id)).outerHTML = self.templates.input_search({ id: _input_id });
      _console.log('started search');
    });
    _readline.onSearchEnd(function () {
      document.querySelector(id(_input_id)).outerHTML = self.templates.input_cmd({ id: _input_id });
      _searchMatch = null;
      self.render();
      _console.log("ended search");
    });
    _readline.onSearchChange(function (match) {
      _searchMatch = match;
      self.render();
    });
    _readline.onEnter(function (cmdtext, callback) {
      _console.log("got command: " + cmdtext);
      var parts = split(cmdtext);
      var cmd = parts[0];
      var args = parts.slice(1);
      var handler = getHandler(cmd);
      return handler.exec(cmd, args, function (output, cmdtext) {
        renderOutput(output, function () {
          callback(cmdtext)
        });
      });
    });
    _readline.onCompletion(function (line, callback) {
      if (!line) {
        return callback();
      }
      var text = line.text.substr(0, line.cursor);
      var parts = split(text);

      var cmd = parts.shift() || '';
      var arg = parts.pop() || '';
      _console.log("getting completion handler for " + cmd);
      var handler = getHandler(cmd);
      if (handler != _cmdHandlers._default && cmd && cmd == text) {

        _console.log("valid cmd, no args: append space");
        // the text to complete is just a valid command, append a space
        return callback(' ');
      }
      if (!handler.completion) {
        // handler has no completion function, so we can't complete
        return callback();
      }
      _console.log("calling completion handler for " + cmd);
      return handler.completion(cmd, arg, line, function (match) {
        _console.log("completion: " + JSON.stringify(match));
        if (!match) {
          return callback();
        }
        if (match.suggestions && match.suggestions.length > 1) {
          return renderOutput(createElementFromHTML(self.templates.suggest({ suggestions: match.suggestions })), function () {
            callback(match.completion);
          });
        }
        return callback(match.completion);
      });
    });

    return self;
  }
})(this);
