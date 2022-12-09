class Splitter {
    
    TYPE_VERTICAL = 'vertical';
    TYPE_HORIZONTAL = 'horizontal';

    constructor(config) {
        this.id = this._createUniqueId();
        this.type = config.type;
        
        // Inner Object
        this.container = null;
        this.panel1 = document.getElementById('panel1');
        this.panel2 = document.getElementById('panel2');
        this.dragBarContainer = null;

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
            this._panel1 = value;
        }
    }
    set panel2(value) {
        if (value == null) {
            throw new Error('error');
        } else {
            this._panel2 = value;
        }
    }
    set container(value) {
        this._container = value;
    }
    set dragBarContainer(value) {
        this._dragBarContainer = value;
    }

    init() {
        this._setLayout();
        this._createDragBar();
    }

    _setLayout() {
        const wrapper = this._panel1.parentNode;
        this.container = document.createElement('div');
        this.dragBarContainer = document.createElement('div');

        // Append objects to wrapper and container
        wrapper.appendChild(this._container);
        this._container.appendChild(this._panel1);
        this._container.appendChild(this._dragBarContainer);
        this._container.appendChild(this._panel2);

        // Set a unique id for object
        this._container.id = this._createUniqueId();
        this._dragBarContainer.id = this._createUniqueId();
        
        // Set style of object
        this._container.classList.add('bvs-ctn', 'bvs-ctn-' + this._type);
        this._dragBarContainer.classList.add('bvs-drb-ctn');

    }

    _createDragBar() {
    }

    _createUniqueId() {
        return Number(Math.random()).toString(32).substring(2);
    }
    
    on() {
        
    }
}