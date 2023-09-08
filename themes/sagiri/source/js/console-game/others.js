var Josh = Josh || {};
(function (root) {
    Josh.Bash = function (shell, config) {
        config = config || {};
        var _shell = shell;
        var self = {
            current: null,
            getNode: function (path, callback) {
                callback();
            },
            getChildNodes: function (node, callback) {
                callback([]);
            },
            getPrompt: function () {
                return _shell.templates.prompt({ node: self.current });
            },
            achievements: {
                quest1: false, // for installing luca package
                quest2: false, // for playing dota2
                quest3: false, // Read luca deployment instructions
                quest4: false, // Deploy Luca to server
                quest5: false, // Test Luca; watch a movie.
                quest6: false, // Do some coding
            }
        };

        _shell.setCommandHandler("bash", {
            exec: function (cmd, args, callback) {
                var arg = args[0] || '';
                var response = '';
                if (arg === '--version') {
                    response = 'GNU bash, version 5.0.17(1)-release (x86_64-pc-linux-gnu)<br/>' +
                        'Copyright (C) 2019 Free Software Foundation, Inc.<br/>' +
                        'License GPLv3+: GNU GPL version 3 or later.<br/>' +
                        '<br/>' +
                        'This is free software; you are free to change and redistribute it.<br/>' +
                        'There is NO WARRANTY, to the extent permitted by law.<br/>';
                } else {
                    response = 'bash: ' + arg + ': invalid option<br/>Usage:	bash --version';
                }
                callback('<div>' + response + '</div>');
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, ['--version']))
            }
        });

        _shell.setCommandHandler("apt-get", {
            exec: function (cmd, args, callback) {
                var response = '';
                if (args[0] === 'install') {
                    if (args[1] === 'luca' && self.isUpdated) {
                        if (self.quest1) {
                            response = 'Reading package lists... Done <br/>' +
                                'Building dependency tree <br/>' +
                                'Reading state information... Done <br/>' +
                                '0 upgraded, 0 newly installed, 0 to remove, and 0 not upgraded. <br/>'
                        } else {
                            self.quest1 = true;
                            insertLucaCommand();
                            response = 'Reading package lists... Done <br/>' +
                                'Building dependency tree <br/>' +
                                'Reading state information... Done <br/>' +
                                'The following additional packages will be installed: <br/>' +
                                ' package1 package2 <br/>' +
                                'Suggested packages: <br/>' +
                                ' suggested-package <br/>' +
                                'The following NEW packages will be installed: <br/>' +
                                ' luca <br/>' +
                                'The following packages will be upgraded: <br/>' +
                                ' upgraded-package <br/>' +
                                '2 upgraded, 1 newly installed, 0 to remove, and 0 not upgraded. <br/>' +
                                'Need to get 1234 kB/5678 kB of archives. <br/>' +
                                'After this operation, 12345 kB of additional disk space will be used. <br/>' +
                                'Do you want to continue? [Y/n] <br/>' +
                                'Get:1 http://archive.abozanona.me/luca focal/main amd64 luca amd64 1.2.3-4 [1234 kB] <br/>' +
                                'Get:2 http://archive.abozanona.me/luca focal/main amd64 luca-mobile amd64 5.6.7-8 [5678 kB] <br/>' +
                                'Get:3 http://archive.abozanona.me/luca focal/main amd64 luca-server amd64 9.0.1-1 [987 kB] <br/>' +
                                'Fetched 1234 kB in 2s (567 kB/s) <br/>' +
                                'Preconfiguring packages ... <br/>' +
                                '... <br/>' +
                                '... <br/>' +
                                'Unpacking luca (9.0.1-1) ... <br/>' +
                                'Setting up package1 (1.2.3-4) ... <br/>' +
                                'Setting up package2 (5.6.7-8) ... <br/>' +
                                'Setting up luca (9.0.1-1) ... <br/>' +
                                'Processing triggers for libc-bin (2.31-0ubuntu9.10) ... <br/>'
                        }
                    } else {
                        response = 'E: Unable to locate package ' + args[1];
                    }
                } else if (args[0] === 'update') {
                    self.isUpdated = true;
                    response = 'Get:1 http://archive.ubuntu.com/ubuntu focal InRelease [265 kB] <br/>' +
                        'Get:2 http://archive.ubuntu.com/ubuntu focal-updates InRelease [114 kB] <br/>' +
                        'Get:3 http://archive.ubuntu.com/ubuntu focal-backports InRelease [101 kB ] <br/>' +
                        'Get:4 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB] <br/>' +
                        'Get:5 http://archive.ubuntu.com/ubuntu focal/main amd64 Packages [1,275 kB ] <br/>' +
                        'Get:5 http://archive.abozanona.me/luca focal/main amd64 Packages [3,500 kB ] <br/>' +
                        'Fetched 5,369 kB in 2s (2,550 kB/s) <br/>' +
                        'Reading package lists... Done <br/>'
                } else {
                    response = 'bash: ' + args[0] + ': invalid option<br/>Usage:	apt-get install [package-name]';
                }
                callback('<div>' + response + '</div>');
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, ['install', 'update']))
            }
        });

        _shell.setCommandHandler("whoami", {
            exec: function (cmd, args, callback) {
                callback('<div>whoami<br/>luca<br/></div>');
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, ['']))
            }
        });

        _shell.setCommandHandler("wine", {
            exec: function (cmd, args, callback) {
                if (args[0] === '--version') {
                    callback('<div>wine-6.0 (Staging)</div>');
                } else if (args[0] && args[0].includes('dota2.exe')) {
                    self.quest2 = true;
                } else if (args[0]) {
                    callback("<div>wine: cannot find '" + args[0] + "'</div>")
                } else {
                    response = '<div>' +
                        'Wine 6.0 (Staging) <br/>' +
                        'Usage: wine PROGRAM [ARGUMENTS...]<br/>' +
                        '<br/>' +
                        'Run the specified program' +
                        '</div>';
                    callback(response);
                }
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, ['--version']))
            }
        });

        _shell.setCommandHandler("progress", {
            exec: function (cmd, args, callback) {
                let isCheck = (boolValue) => boolValue ? '✅' : ' ';
                var response = '<div>';
                response += "[" + isCheck(self.quest1) + "] Install luca <br/>";
                response += "[" + isCheck(self.quest2) + "] Play dota2 <br/>";
                response += "[" + isCheck(self.quest3) + "] Read luca deployment instructions <br/>";
                response += "[" + isCheck(self.quest4) + "] Deploy Luca to server <br/>";
                response += "[" + isCheck(self.quest5) + "] Test Luca; watch a movie! <br/>";
                response += "[" + isCheck(self.quest6) + "] Do some coding <br/>";
                if (self.quest1 && self.quest2 && self.quest3 && self.quest4 && self.quest5 && self.quest6) {
                    response += "<br/> 🎉👏🌟💼🚀 Congratulations on completing all the coding challenges! 🚀💼🌟👏🎉 <br/>";
                    response += "🌟 You have now earned the prestigious title of Official Developer for the Luca Chrome extension. 🏆🌐💡 <br/>";
                    response += "📩 Send me a message at abozanona@gmail.com for a more detailed guide on how to start with Luca. 📩📚📝 <br/>";
                    response += "🤩 I look forward to your contributions! 🤩💪👨‍💻👩‍💻 <br/>";
                }
                response += '</div>';
                callback(response);
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, []))
            }
        });

        function insertLucaCommand() {
            _shell.setCommandHandler("luca", {
                exec: function (cmd, args, callback) {
                    if (args[0] === '--help') {
                        self.quest3 = true;
                        callback(`<div>Welcome to Luca deployment guide. The steps to deploy luca to the server are very simple. You just need to connect to the Luca server WITH IP 236.15.16.245 via ssh and git-pull changes there. A pm2 process is listening to the luca files directory and it will automatically deploy the new changes in the project.</div>`);
                    }
                    else if (args[0] === '--code') {
                        self.quest6 = true;
                    }
                    else {
                        window.open('https://github.com/abozanona/luca', "_blank");
                        callback("<div>Opening Luca repo ...</div>");
                    }
                },
                completion: function (cmd, arg, line, callback) {
                    callback(shell.bestMatch(arg, ['--help', '--code']))
                }
            });
        }

        _shell.setCommandHandler("ssh", {
            exec: function (cmd, args, callback) {
                if (args[0] === 'luca@236.15.16.245') {
                    self.quest3 = true;
                    if (args[1] === '-i' && (args[2].includes('luca_id_ed25519'))) {
                        callback('<div>Connection to server was succesfull. Starting app deployment now.</div>')
                        self.quest4 = true;
                    } else {
                        callback('<div>Permission denied(publickey), please try again.</div>')
                    }
                }
                else {
                    callback('<div> ssh: connect to host ' + args[0] + ' : Network is unreachable</div>')
                }
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, ['-i']))
            }
        });

        _shell.setCommandHandler("vlc", {
            exec: function (cmd, args, callback) {
                if (args[0].includes('m4v')) {
                    self.quest5 = true;
                    callback("<div>VLC media player x.x.x (revision xxxxx)<br/>" +
                        "[00007f5014007d80] main libvlc: Running vlc with the default interface. Use 'cvlc' to use vlc without interface.<br/>" +
                        "</div>")
                }
                else {
                    callback("<div>Your input can't be opened:<br/>" +
                        "VLC is unable to open the MRL '" + args[0] + "'. Check the log for details." +
                        "</div>")
                }
            },
            completion: function (cmd, arg, line, callback) {
                callback(shell.bestMatch(arg, ['-i']))
            }
        });

        return self;
    };
})(this);