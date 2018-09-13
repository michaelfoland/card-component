class CardContent extends HTMLElement {
  constructor() {
    super();
    
    this._root = this.attachShadow({mode: 'open'});
  }
  
  connectedCallback() {
    this._root.innerHTML = `
<style>
:host {
  display: block;
}
</style>
${this.innerHTML}`;
    
    this.setAttribute('slot','content');
  }
}

window.customElements.define('card-content',CardContent);