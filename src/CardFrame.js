class CardFrame extends HTMLElement {
  constructor() {
    super();
  
    // shadow root
    this._root = this.attachShadow({mode: 'open'});
    
    // component state
    // this._contentHidden = false; // necessary
    this._expanded;
    
    
    // refs to els in shadow root
    this._visibilityManager;
    this._content;
  }
  
  attachListeners() {
    this.addEventListener('click', function(e) {
      this.expanded = !this.expanded;
    });
  }
  
  initializeState() {
    this.expanded = this.hasAttribute('expanded');
  }
  
  getElementRefs() {
    this._visibilityManager = this._root.querySelector('.visibility-manager');
    this._content = this._root.querySelector('.content');
  }    
  
  
  set expanded(value) {
    if (this._expanded == value) return; // bail if the value is unchanged

    this._expanded = !!value;
    
    if (this._expanded) {
      this.showCardContent();
    } else {
      this.hideCardContent();
    }
  }
  
  get expanded() {
    return this._expanded;
  }

  hideCardContent() {
    let height = this._content.getBoundingClientRect().height;
    this._visibilityManager.style.height = height + 'px';
    setTimeout(() => {
      this._visibilityManager.style.height = '0px';
    }, 20);
  }
  
  showCardContent() {
    let height = this._content.getBoundingClientRect().height;
    this._visibilityManager.style.height = height + 'px';
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
.visibility-manager {
  overflow: hidden;
  transition: height 200ms linear;
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
    this.getElementRefs();
    this.initializeState();    
    this.attachListeners();
  }
}

window.customElements.define('card-frame',CardFrame);