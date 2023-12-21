const peerConnection = new RTCPeerConnection();
let dataChannel = peerConnection.createDataChannel("textChannel");

// Handle the data channel events
dataChannel.onopen = function (event) {
  dataChannel.send("Hello via WebRTC!");
};

dataChannel.onmessage = function (event) {
  console.log("Received message:", event.data);
};

// WebRTC signaling: exchange offer, answer, and ICE candidates
// (Use WebSocket connection to exchange this data between peers)