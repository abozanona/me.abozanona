(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

(function () {
    var flakes = [],
        canvas = document.getElementById("weather"),
        ctx = canvas.getContext("2d"),
        flakeCount = 200,
        mX = -100,
        mY = -100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 150,
                x2 = flake.x,
                y2 = flake.y;
            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

            if (flake.type == 'rain') {
                if (dist < minDist) {
                    var force = minDist / (dist * dist),
                        xcomp = (x - x2) / dist,
                        ycomp = (y - y2) / dist,
                        deltaV = force / 2;

                    flake.velX -= deltaV * xcomp;
                    flake.velY -= deltaV * ycomp;
                } else {
                    flake.velX = Math.random() * 2 - 1;
                    flake.velY += 3;

                    if (flake.velY <= flake.speed) {
                        flake.velY = flake.speed;
                    }
                }

                ctx.strokeStyle = "rgba(169,169,169," + flake.opacity + ")";
                ctx.lineWidth = 1;

                flake.x += flake.velX;
                flake.y += flake.velY;

                if (flake.y >= canvas.height) {
                    reset(flake);
                }

                if (flake.x >= canvas.width || flake.x <= 0) {
                    reset(flake);
                }

                ctx.beginPath();
                ctx.moveTo(flake.x, flake.y);
                ctx.lineTo(flake.x - flake.velX * 2, flake.y - flake.velY * 2);
                ctx.stroke();
            } else {
                if (dist < minDist) {
                    var force = minDist / (dist * dist),
                        xcomp = (x - x2) / dist,
                        ycomp = (y - y2) / dist,
                        deltaV = force / 2;

                    flake.velX -= deltaV * xcomp;
                    flake.velY -= deltaV * ycomp;

                } else {
                    flake.velX *= .98;
                    if (flake.velY <= flake.speed) {
                        flake.velY = flake.speed
                    }
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                }

                ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
                flake.y += flake.velY;
                flake.x += flake.velX;

                if (flake.y >= canvas.height || flake.y <= 0) {
                    reset(flake);
                }

                if (flake.x >= canvas.width || flake.x <= 0) {
                    reset(flake);
                }

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                ctx.fill();
            }

        }
        requestAnimationFrame(snow);
    };

    function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;
        flake.speed = (Math.random() * 1) + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;
    }

    function init(type) {
        for (var i = 0; i < flakeCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = Math.floor(Math.random() * canvas.height),
                size = (Math.random() * 3) + 2,
                speed = (Math.random() * 1) + 0.5,
                opacity = (Math.random() * 0.5) + 0.3;

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30 * 1,
                step: 0,
                angle: 180,
                opacity: opacity,
                type: type,
            });
        }

        snow();
    };

    document.addEventListener("mousemove", function (e) {
        mX = e.clientX,
            mY = e.clientY
    });
    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Hamburg&appid=e02deadac1ffb8516a608324617dc35c")
        .then(res => res.json())
        .then(res => {
            // https://openweathermap.org/weather-conditions
            const weatherCode = res?.weather[0]?.id ?? 9999
            if (weatherCode < 600) {
                init('rain');
            } else if (weatherCode < 700) {
                init('snow');
            }
            if (res?.weather[0]?.description) {
                console.log("Weather in Hamburg is " + res?.weather[0]?.description);
            }
        })
})();
