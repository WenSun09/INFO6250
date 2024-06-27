const chatWeb = {
  chatPage: function (chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      Object.values(chat.messages).map(message => `
      <li>
        <div class="message">
          <span class="username">${message.sender}:</span>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
    `).join('') +
      `</ol>`;
  },
  getUserList: function (chat) {
    return `<ul class="users">` +
      Object.values(chat.users).map(user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;
  },
  getOutgoing: function () {
    // Fill in
    // Generate the HTML for a form to send a message
    return `<div class="outgoing">
        <form action="/chat" method="POST">
          <input name="username" value="Amit" hidden/>
          <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
          <button type="submit">Send</button>
        </form>
      </div>`
  }
};
module.exports = chatWeb;
