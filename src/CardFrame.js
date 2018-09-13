class CardFrame extends HTMLElement {
  constructor() {
    super();
  
    // shadow root
    this._root = this.attachShadow({mode: 'open'});
    
    // component state
    // this._contentHidden = false; // necessary
    this._expanded;
    this._color;
    
    
    // refs to els in shadow root
    this._visibilityManager;
    this._content;
  }
  
  attachListeners() {
    this.addEventListener('click', function(e) {
      this.expanded = !this.expanded;
    });

    // listener to deal with content height on expand
    // NOTE: This is attached to shadow root, NOT host
    this._root.addEventListener('transitionend', () => {
      if (this._expanded) {
        this._visibilityManager.style.height = 'auto';
      }
    });    
  }
  
  initializeState() {
    this.expanded = this.hasAttribute('expanded');
    this.color = this.getAttribute('color') || 'black';
  }
  
  getElementRefs() {
    this._visibilityManager = this._root.querySelector('.visibility-manager');
    this._content = this._root.querySelector('.content');
  }    
  

  // ACCESSOR & MUTATOR METHODS
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

  set color(value) {
    console.log('=== color setter ===');
    
    // TODO: Add colorIsValid() method
    // if (!colorIsValid(value)) return;
    
    // TODO: Choose appropriate header-font-color
    // based on theme color, and set the corresponding
    // CSS custom prop

    this._color = value;
    this.style.setProperty('--theme-color',this._color);
  }
  
  get color() {
    return this._color;
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
  color: black;
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