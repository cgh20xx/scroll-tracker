const showDebugInfo = (function (window, document) {
  const div = document.createElement('div');
  div.style =
    'position: fixed; z-index: 99999; padding: 1rem 2rem; left: 0; top: 0';

  document.body.appendChild(div);
  return function (st) {
    const template = `
  <ul>
    <li>scrollY: ${st.scrollY}</li>
    <li>deltaY: ${st.deltaY}</li>
    <li>direction: ${st.direction}</li>
    <li>scrollHeight: ${st.scrollHeight}</li>
    <li>scrollBarHeight: ${st.scrollBarHeight}</li>
    <li>scrollRatio: ${st.scrollRatio}</li>
  </ul>`;
    div.innerHTML = template;
  };
})(window, document);
