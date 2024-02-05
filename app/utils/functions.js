export default function checkPageStatus(message, user) {
    if(!("Notification" in window)) {

    } 
    else if(Notification.permission === "granted") {
      sendNotification(message, user)
    }
    else if(Notification.permission !== "denied") {
       Notification.requestPermission((permission)=> {
          if (permission === "granted") {
            sendNotification(message, user)
          }
       })
    }
}

function sendNotification(message, user) {
  const notification = new Notification("New message from Open Chat", {
    icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    body: `@${user}: ${message}`
  })
  notification.onclick = ()=> function() {
    window.open("http://localhost:3000/chat")
  }
}

