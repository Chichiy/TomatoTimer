//manually input

//get riped tomatos

//change color

//preset
let time = 25;
let display = document.getElementById("display"),
	stopBtn = document.getElementById("stop"),
	addBtn = document.getElementById("add"),
	decreaseBtn = document.getElementById("decrease"),
	startBtn = document.getElementById("start");
tomato = document.querySelector("#greenTomato  .cls-1");

//install eventhandlers
addBtn.onclick = function () {
	changeTime(1);
};
decreaseBtn.onclick = function () {
	changeTime(-1);
};
startBtn.onclick = function () {
	timer(time);
};

// display.onclick = manuallyInput;

function manuallyInput(e) {
	console.dir(e.currentTarget);
	e.currentTarget.outerHTML = `<input class="manuallyInput" type="text" value="${e.currentTarget.innerHTML}"/ >`;
}

//input time
function changeTime(par) {
	if (par === 1) {
		time += 1;
	} else {
		time -= 1;
	}
	if (time > 0) {
		display.innerHTML = time + " : 00";
	} else {
		alert("請至少專注一分鐘！");
		time += 1;
	}
}

//start-stop switch
function toggleBtns() {
	stopBtn.classList.toggle("hide");
	startBtn.classList.toggle("hide");
	addBtn.classList.toggle("hide");
	decreaseBtn.classList.toggle("hide");
}

//timer
function timer(min) {
	toggleBtns();
	let duration = min * 60,
		sec = 0,
		count = 0,
		col = 0,
		timeoutId = setInterval(countdown, 1000);

	//countdown
	function countdown() {
		//logic
		if (sec == 0) {
			min -= 1;
			sec = 60;
		}
		sec -= 1;
		count++;

		//display remaining time
		if (sec < 10) {
			display.innerHTML = min + " : 0" + sec;
		} else {
			display.innerHTML = min + " : " + sec;
		}
		document.title = String(display.innerHTML);

		//change color
		col = 120 * (1 - count / duration);
		tomato.style.fill = `hsl(${col},100%,50%)`;

		//stop countdown
		if (min + sec === 0) {
			clearInterval(timeoutId);
			display.innerHTML = "Here's your tomato!";
			document.title = "Time's Up!";
			stopBtn.innerHTML = "Try again!";
		}
	}

	//reset timer, display, color
	stopBtn.onclick = reset;
	function reset() {
		if (
			confirm("你確定要放棄嗎?") ||
			min + sec == 0 //when try again
		) {
			clearInterval(timeoutId);
			time = 25;
			display.innerHTML = time + " : 00";
			document.documentElement.style.setProperty("--tomatoColor", "hsl(120,100%,50%)");
			toggleBtns();
			document.title = "TOMATO TIMER";
			stopBtn.innerHTML = "Stop";
		}
	}
}
