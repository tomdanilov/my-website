var fill_skill = document.getElementById('fill-skill');
const IMG_DIR = 'img/';
var skills = ['python-logo.png', 'html5-logo.png', 'css3-logo.png', 'javascript-logo.png', 'nodejs-logo.png', 'php-mysql.png', 'electronjs-logo.png', 'c-logo.png', 'cpp_logo.png', 'flask-logo.png', 'discord-bots.jpg'];
var skill_index = 0;

// Skills Interval.
setInterval(() => {
    if (skills[skill_index] == undefined) {
        skill_index = 0;
    }

    fill_skill.src = IMG_DIR + skills[skill_index];
    fill_skill.classList.remove('invisible');
    setTimeout(() => {fill_skill.classList.add('invisible')}, 2000);

    skill_index++;
}, 3500);

var lines = document.getElementById('lines');
var pixel_size = 70;

function update_max_pos() {
    max_pos = window.innerWidth - pixel_size;
}

function update_name_size() {
    name_obj.style.fontSize = Math.floor(window.innerWidth * 0.2) + 'px';
}

var min_pos = 0;
update_max_pos();

var name_obj = document.getElementById('name');
update_name_size();

function on_resize() {
    update_max_pos();
    update_name_size();
}

window.onresize = on_resize;

var rain_button = document.getElementById('rain_button');
var rain = 0;
var rain_interval = 0;

function gen_hex() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

function gen_number() {
    return Math.floor(Math.random() * max_pos) + min_pos;
}

function put_line() {
    var line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.top = 0;
    line.style.left = gen_number() + 'px';
    line.style.width = pixel_size + 'px';
    line.style.height = 0 + 'px';
    line.style.transition = '.6s';
    line.style.backgroundColor = gen_hex();

    lines.appendChild(line);
    setTimeout(() => {line.style.height = '100%'}, 200);
    setTimeout(() => {line.style.height = 0}, 3000);
    setTimeout(() => {line.remove()}, 6000);
}

function update_interval(input) {
    rain_interval = input.value;
}

function line_rain() {
    if (rain) {
        return;
    }

    rain_button.onclick = clear_rain;
    rain_button.innerText = 'Stop The Rain';

    rain = setInterval(() => {
        put_line()
    }, rain_interval);
}

function clear_rain() {
    clearInterval(rain);
    rain = 0;

    rain_button.onclick = line_rain;
    rain_button.innerText = 'Make It Rain';
}

line_rain();
