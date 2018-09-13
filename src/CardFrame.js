class CardFrame extends HTMLElement {
  constructor() {
    super();
    
    this._root = this.attachShadow({mode: 'open'});
  }
  
  connectedCallback() {
    this._root.innerHTML = 
`
I'm the card frame.
`;
  }
}

window.customElements.define('card-frame',CardFrame);