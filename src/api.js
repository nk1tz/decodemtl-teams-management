module.exports = {
  fetchMessages: () => {
    return fetch("http://demo1195315.mockable.io/messages")
    .then(res => res)
  }
}
