class CardFrame extends HTMLElement {
  constructor() {
    super();
    
    this._root = this.attachShadow({mode: 'open'});
  }
  
  connectedCallback() {
    this._root.innerHTML = 
`
<style>
:host {
  --theme-color: #111;
  --header-font-color: #fff;
  display: block;
  border: solid 2px var(--theme-color);
  background: var(--theme-color);
  border-radius: 1em;
  overflow: hidden;
  font-family: sans-serif;
  color: var(--header-font-color);
}
.header {
  margin: 0;
  background: inherit;
  color: var(--header-font-color);
  padding: .5em;
}
.content {
  background: white;
  color: var(--theme-color);
}
.content-frame {
  padding: 1em;
  background: white;
}
</style>

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