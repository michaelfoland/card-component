class CardHeader extends HTMLElement {
  constructor() {
    super();
    
    this._root = this.attachShadow({mode: 'open'});
    
  }
  
  connectedCallback() {
    this._root.innerHTML = `${this.innerHTML}`;    
    
    this.setAttribute('slot','header');
  }
}

window.customElements.define('card-header',CardHeader);