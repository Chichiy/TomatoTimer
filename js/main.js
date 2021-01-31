let time = 25,
	status = "stop";

const display = document.getElementById("display"),
	stopBtn = document.getElementById("stop"),
	addBtn = document.getElementById("add"),
	decreaseBtn = document.getElementById("decrease"),
	startBtn = document.getElementById("start"),
	pauseBtn = document.getElementById("pause"),
	tomato = document.querySelector("#greenTomato  .cls-1"),
	minInput = document.getElementById("minInput");

addBtn.onclick = () => changeTime(1);
decreaseBtn.onclick = () => changeTime(-1);
startBtn.onclick = () => startCountdown(time);
display.onclick = openInput;
minInput.onblur = closeInput;

function openInput(e) {
	if (status === "stop") {
		minInput.value = time;
		minInput.classList.toggle("hide");
		minInput.focus();
		display.textContent = ": 00";
	}
}

function closeInput() {
	time = Number(minInput.value);
	display.textContent = time + " : 00";
	minInput.classList.toggle("hide");
}

function changeTime(par) {
	time += par;

	if (time > 0) {
		display.textContent = time + " : 00";
	} else {
		alert("請至少專注一分鐘！");
		time += 1;
	}
}

function startCountdown(min) {
	status = "counting";
	let duration = min * 60,
		sec = 0,
		count = 0,
		col = 0,
		timeoutId = setInterval(countdown, 1000);

	toggleBtns();
	pauseBtn.onclick = pauseCountdown;
	stopBtn.onclick = reset;

	function countdown() {
		countTime();
		updateView();
		handleTimesUp();

		function countTime() {
			if (sec === 0) {
				min -= 1;
				sec = 60;
			}
			sec -= 1;
			count++;
		}

		function updateView() {
			//display remaining time
			if (sec < 10) {
				display.textContent = min + " : 0" + sec;
			} else {
				display.textContent = min + " : " + sec;
			}
			document.title = String(display.textContent);

			//change color
			col = 120 * (1 - count / duration);
			tomato.style.fill = `hsl(${col},80%,50%)`;
		}

		function handleTimesUp() {
			if (min + sec === 0) {
				status = "stop";
				clearInterval(timeoutId);
				display.textContent = "Here's your tomato!";
				document.title = "Time's Up!";
				stopBtn.textContent = "Try again!";
				pauseBtn.classList.toggle("hide");
			}
		}
	}

	function toggleBtns() {
		stopBtn.classList.toggle("hide");
		startBtn.classList.toggle("hide");
		addBtn.classList.toggle("hide");
		decreaseBtn.classList.toggle("hide");
		pauseBtn.classList.toggle("hide");
	}

	function pauseCountdown() {
		if (status === "counting") {
			pauseBtn.textContent = "Resume";
			status = "pausing";
			pauseBtn.onclick = resumeCountdown;
			clearInterval(timeoutId);
			pauseBtn.classList.toggle("active");
		}
	}

	function resumeCountdown() {
		if (status === "pausing") {
			status = "counting";
			pauseBtn.textContent = "Pause";
			pauseBtn.onclick = pauseCountdown;
			timeoutId = setInterval(countdown, 1000);
			pauseBtn.classList.toggle("active");
		}
	}

	function reset() {
		if (min + sec === 0 || confirm("你確定要放棄嗎?")) {
			clearInterval(timeoutId);
			status = "stop";
			time = 25;

			display.textContent = time + " : 00";
			stopBtn.textContent = "Stop";
			tomato.style.fill = `hsl(120,80%,50%)`;

			toggleBtns();
			pauseBtn.classList.add("hide");
			document.title = "TOMATO TIMER";
		}
	}
}
