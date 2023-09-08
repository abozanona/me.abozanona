/*------------------------------------------------------------------------*
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
(function (root) {
  Josh.Example = (function (root) {

    // Enable console debugging, when Josh.Debug is set and there is a console object on the document root.
    var _console = (Josh.Debug && root.console) ? root.console : {
      log: function () {
      }
    };

    // Setup of Shell
    // --------------

    // build the *fake* directory structure used to illustrate path commands and completions.
    var treeroot = buildTree();

    // Create `History` by hand.
    var history = Josh.History();

    // we need to pass in `History` into `ReadLine` as well.
    var readline = new Josh.ReadLine({ history: history, console: _console });

    // Finally, create the `Shell`.
    var shell = Josh.Shell({ readline: readline, history: history, console: _console });


    // Setup PathHandler
    // -----------------

    // `PathHandler` is a mix-in for `Shell` to provide provide the standard unix `ls`, `pwd` and `cd` commands, as well
    // as standard *bash*-style path tab-completion. It expects a `Shell` instance as its first argument so that it can
    // attach its command handlers to the shell as well as overrride the default handler to support completion of path's
    // starting with `.` or `/` without a leading command.
    var pathhandler = new Josh.PathHandler(shell, { console: _console });
    var bash = new Josh.Bash(shell, { console: _console });

    // `PathHandler` operates on path nodes which are expected to be objects with the minimum structure of
    //
    //     {
    //       name: 'localname',
    //       path: '/full/path/to/localname'
    //     }
    //
    // where name is the `name` of the node and `path` is the absolute path to the node. PathHandler does not modify
    // these nodes, so any additional state your implementation requires can be attached to the nodes and be relied on
    // being part of the node when received by the handling methods you implement.
    //
    // The pathhandler expects to be initialized with the current *directory*, i.e. a path node.
    pathhandler.current = treeroot;

    // `PathHandler` requires two method, `getNode` and `getChildNodes`, to be provided in order to operate.
    //
    // `getNode` gets called with *path* string. This string is completely opaque to `PathHandler`, i.e. constructs such
    // as `.` and `..` are an implementation detail. `PathHandler` does assume that the path separator is `/`. `getNode`
    // is called anytime the pathhandler has a path and need to determine what if any node exists at that path which happens
    // during path completion as well as `cd` and `ls` execution.
    pathhandler.getNode = function (path, callback) {
      if (!path) {
        return callback(pathhandler.current);
      }
      var parts = path.split('/').filter(function (x) {
        return x;
      });
      var start = ((path || '')[0] == '/') ? treeroot : pathhandler.current;
      _console.log('start: ' + start.path + ', parts: ' + JSON.stringify(parts));
      return findNode(start, parts, callback);
    };

    // `getChildNodes` is used by path completion to determine the possible completion candidates. Path completion first
    // determines the node for the given path, looking for the nearest `/` in case if the given path does not return a
    // node via `getNode`. For our example, we've attached the child node objects directly to the node object, so we
    // can simply return it. Usually this would be used to call the server with the provided node's path or id so that
    // the appropriate children can be found.
    pathhandler.getChildNodes = function (node, callback) {
      _console.log("children for " + node.name);
      callback(node.childnodes);
    };

    // `findNode` is called recursively from `getNode` with the current node and remaining path already split into
    // segments. It then simply resolves the node for the next segment in `parts` to a node, including relative
    // references like `.` and `..`. In implementations that let you explore an hierarchy on a server, this function
    // would live on the server side and be called remotely via `getNode`.
    function findNode(current, parts, callback) {
      if (!parts || parts.length == 0) {
        return callback(current);
      }
      if (parts[0] == ".") {

      } else if (parts[0] == "..") {
        current = current.parent;
      } else {
        current = current.childnodes.filter(function (node) {
          return node.name == parts[0];
        })[0];
      }
      if (!current) {
        return callback();
      }
      var tempArray = [...parts];
      tempArray.shift();
      return findNode(current, tempArray, callback);
    }

    // Setup Document Behavior
    // -----------------------

    // Activation and display behavior happens at document ready time.
    document.addEventListener("DOMContentLoaded", () => {
      readline.attach(document.querySelector('#shell-panel'));
      document.querySelector('#shell-panel').focus();
    });

    // We attach the various objects we've created here to `Josh.Instance` purely so they can be inspected via a
    // javascript console. This is not required for the functionality of the example.
    Josh.Instance = {
      Tree: treeroot,
      Shell: shell,
      PathHandler: pathhandler,
      Bash: bash,
    };

    // This code builds our *fake* directory structure. Since most real applications of `Josh` would not keep their
    // entire hierarchy in memory, but instead make callbacks to a server to find nodes and node children, the details
    // of this function are of little interest.
    function buildTree() {
      var fs = {
        bin: {},
        boot: {},
        dev: {},
        etc: {
          default: {},
          'rc.d': {},
          sysconfig: {},
          x11: {}
        },
        home: {
          abozanona: {
            '.shh': {
              'luca_id_ed25519': {},
            },
            Desktop: {
              'todos.out' : {},
            },
            games: {
              'dota2.exe': {}
            },
            projects: {
              'abozanona.me': {},
              tinygames: {},
              'state.io': {},
              luca: {},
              'freiheit-chrome-extension': {},
            },
            videos: {
              'The-wind-rises.m4v': {},
              'Weathering-with-you.m4v': {},
              'Your-lie-in-april': {
                'Your-lie-in-april-S1-E1.m4v': {},
                'Your-lie-in-april-S1-E2.m4v': {},
                'Your-lie-in-april-S1-E3.m4v': {},
                'Your-lie-in-april-S1-E4.m4v': {},
                'Your-lie-in-april-S1-E5.m4v': {},
                'Your-lie-in-april-S1-E6.m4v': {},
                'Your-lie-in-april-S1-E7.m4v': {},
                'Your-lie-in-april-S1-E8.m4v': {},
                'Your-lie-in-april-S1-E9.m4v': {},
                'Your-lie-in-april-S1-E10.m4v': {},
                'Your-lie-in-april-S1-E11.m4v': {},
                'Your-lie-in-april-S1-E12.m4v': {},
                'Your-lie-in-april-S1-E13.m4v': {},
                'Your-lie-in-april-S1-E14.m4v': {},
                'Your-lie-in-april-S1-E15.m4v': {},
                'Your-lie-in-april-S1-E16.m4v': {},
                'Your-lie-in-april-S1-E17.m4v': {},
                'Your-lie-in-april-S1-E18.m4v': {},
                'Your-lie-in-april-S1-E19.m4v': {},
                'Your-lie-in-april-S1-E20.m4v': {},
                'Your-lie-in-april-S1-E21.m4v': {},
                'Your-lie-in-april-S1-E22.m4v': {},
              },
              'Your-name.m4v': {},
            },
          },
        },
        lib: {},
        'lost+found': {},
        misc: {},
        mnt: {
          cdrom: {},
          sysimage: {}
        },
        net: {},
        opt: {},
        proc: {},
        root: {},
        sbin: {},
        usr: {
          x11: {},
          bin: {},
          include: {},
          lib: {},
          local: {},
          man: {},
          sbin: {},
          share: {
            doc: {}
          },
          src: {}
        },
        var: {
          lib: {},
          lock: {},
          run: {},
          log: {
            httpd: {
              access_log: {},
              error_log: {}
            },
            'boot.log': {},
            cron: {},
            messages: {}
          }
        }
      };

      function build(parent, node) {
        parent.childnodes = Object.entries(node).map(function (pair) {
          var child = {
            name: pair[0],
            path: parent.path + "/" + pair[0],
            parent: parent
          };
          build(child, pair[1]);
          return child;
        });
        parent.children = Object.keys(node);
        return parent;
      }
      var tree = build({ name: "", path: "" }, fs);
      tree.path = '/';
      return tree;
    }
  })(root);
})(this);
