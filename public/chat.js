// make connection
var socket = io.connect("http://localhost:5000");

// query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//emmit events
btn.addEventListener("click", (e) => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

// listen for events
socket.on("chat", (data) => {
  output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}</p>`;
  message.value = "";
  feedback.innerHTML = "";
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
})