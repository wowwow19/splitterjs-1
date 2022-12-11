class Splitter {
    
    // Private Objects
    #container;
    #panel1;
    #panel2;
    #resizer;
    #contextMenu
    #expandButton1
    #expandButton2
    #divideButton
    #isDragging = false;
    
    // Public Constants
    TYPE_VERTICAL = 'vertical';
    TYPE_HORIZONTAL = 'horizontal';

    // Private Constants
    #RESIZER_SIZE;

    constructor(config) {
        this.id = this._createUniqueId();
        this.type = config.type;
        this.panels = config.panels;

        this.init();
    }

    // Parsing config.type
    set type(value) {
        if (typeof value !== 'string' || (value !== this.TYPE_HORIZONTAL && value !== this.TYPE_VERTICAL)) {
            throw new Error('Invalid Splitter Type.\nPlease set it in \'vertical\' or \'horizontal\'.');
        } else {
            if (value === this.TYPE_VERTICAL) {
                this._type = 'v';
            } else {
                this._type = 'h';
            }
        }
    }

    // Set panel object
    set panel1(value) {
        if (value == null) {
            throw new Error('error');
        } else {
            this.#panel1 = value;
        }
    }
    set panel2(value) {
        if (value == null) {
            throw new Error('error');
        } else {
            this.#panel2 = value;
        }
    }

    set panels(value) {
        
    }

    init = () => {
        this._setLayout();
        this._createResizer();
        this._createContextMenu();
    }
    
    _setLayout = () => {
        // Get and create private objects
        this.#container = document.createElement('div');
        this.#resizer = document.createElement('div');
        this.#contextMenu = document.createElement('div');
        this.panel1 = document.getElementById('panel1');
        this.panel2 = document.getElementById('panel2');
        
        let wrapper = null;
        if (this.#panel1.parentNode !== this.#panel2.parentNode) {
            throw new Error('The first panel and the second panel must be at the same depth.');
        } else {
            wrapper = this.#panel1.parentNode;
        }
        
        // Append objects to wrapper and container
        wrapper.appendChild(this.#container);
        this.#container.appendChild(this.#panel1);
        this.#container.appendChild(this.#resizer);
        this.#container.appendChild(this.#panel2);
        
        // Set a unique id for object
        this.#container.id = this._createUniqueId();
        
        // Set style of object
        this.#container.classList.add('bvs-ctn', 'bvs-ctn-' + this._type);
    }
    
    _createResizer = () => {
        // Get and create private objects
        this.#resizer.appendChild(this.#contextMenu);
        
        // Set a unique id for object
        this.#resizer.id = this._createUniqueId();
        this.#contextMenu.id = this._createUniqueId();
        
        // Set style of object
        this.#resizer.classList.add('bvs-rsz');
        this.#contextMenu.classList.add('bvs-rsz-ctx');

        this.#RESIZER_SIZE = this.#resizer.clientWidth / 2;
        
        // Add context menu event listeners
        this.#resizer.addEventListener('contextmenu', (e)=>{
            this._showContextMenu(e);
        });
        document.addEventListener("click", (e)=>{
            this._hideContextMenu(e);
        });
        
        // Add dragging event listeners
        this.#resizer.addEventListener("mousedown", (e)=>{
            this._showGhostBar(e);
        });
        document.addEventListener("mousemove", (e) => {
            if (this._isAvailableToDrag()) {
                this._changePanelSize(e);
            }
        });
        document.addEventListener("mouseup", (e)=>{
            this._hideGhostBar(e);
        });
    }

    _createContextMenu = () => {
        this.#expandButton1 = document.createElement('button');
        this.#expandButton2 = document.createElement('button');
        this.#divideButton = document.createElement('button');

        this.#contextMenu.appendChild(this.#expandButton1);
        this.#contextMenu.appendChild(this.#divideButton);
        this.#contextMenu.appendChild(this.#expandButton2);

        this.#expandButton1.classList.add('bvs-rsz-ctx-btn');
        this.#expandButton2.classList.add('bvs-rsz-ctx-btn');
        this.#divideButton.classList.add('bvs-rsz-ctx-btn');

        this.#expandButton1.addEventListener("click", () => {
            this.#panel1.style.width = '0px';
            this.#panel2.style.width = '100%';
        });
        this.#expandButton2.addEventListener("click", () => {
            this.#panel1.style.width = '100%';
            this.#panel2.style.width = '0px';
        });
        this.#divideButton.addEventListener("click", () => {
            this.#panel1.style.width = '50%';
            this.#panel2.style.width = '50%';
        });
    }
    
    _createUniqueId = () => {
        return Number(Math.random()).toString(32).substring(2);
    }

    _showContextMenu = (e) => {
        e.preventDefault();
        this.#contextMenu.style.opacity = 1;
    }
    _hideContextMenu = (e) => {
        if (this.#contextMenu.style.opacity == 0 || e.target.classList.contains('bvs-rsz-ctx') || e.target.classList.contains('bvs-rsz-ctx-btn')) return;
        this.#contextMenu.style.opacity = 0;
    }
    
    _showGhostBar = (e) => {
        e.stopPropagation();
        console.log("showGhostBar");
        if (!this.#isDragging) {
            e.preventDefault();
            this.#isDragging = true;
        }
    }
    _hideGhostBar = (e) => {
        e.stopPropagation();
        console.log("hideGhostBar");
        if (this.#isDragging) {
            e.preventDefault();
            this.#isDragging = false;
        }
    }

    _isAvailableToDrag = () => {
        const panel1Width = this.#panel1.clientWidth;
        const panel2Width = this.#panel2.clientWidth;
        return true;
    }
    
    _changePanelSize = (e) => {
        if(this.#isDragging) {
            if (this._type == 'v') {
                const panelLeft = this.#panel2.offsetLeft;
                const panelWidth = this.#panel2.clientWidth;
                const pageX = e.pageX;
                
                this.#panel2.style.width = (panelWidth + panelLeft - pageX - this.#RESIZER_SIZE) + "px";
            } else {
                const panelTop = this.#panel2.offsetTop;
                const panelHeight = this.#panel2.clientHeight;
                const pageY = e.pageY;
                
                this.#panel2.style.height = (panelHeight + panelTop - pageY - this.#RESIZER_SIZE) + "px";
            }
        }
    }

    on = () => {
        
    }
}