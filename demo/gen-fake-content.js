(function (window, document) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  function genFakeContent() {
    for (var b = 0; b < 20; b++) {
      var contentBox = document.createElement('div');
      contentBox.classList.add('content-box');
      document.querySelector('body').appendChild(contentBox);

      for (var i = 0; i < 10; i++) {
        var span = document.createElement('span');
        contentBox.appendChild(span);
        span.textContent = (function () {
          var text = ' ';
          for (var j = 0; j < getRandomInt(20, 50); j++) {
            text += '一 ';
          }
          return text;
        })();
      }
    }
  }
  genFakeContent();
})(window, document);
