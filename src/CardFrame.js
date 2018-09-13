class CardFrame extends HTMLElement {
  constructor() {
    super();
    
    this._root = this.attachShadow({mode: 'open'});
  }
  
  connectedCallback() {
    this._root.innerHTML = 
`
<h2 class="header"><slot name="header">Card Header</slot></h2>
<div class="content-frame">
  <div class="visibility-manager">
    <div class="content">
      <slot name="content">Card Content</slot>
    </div>
  </div>
</div>
`;
  }
}

window.customElements.define('card-frame',CardFrame);