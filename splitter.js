class Splitter {
    
    // Private Objects
    #container;
    #panel1;
    #panel2;
    #dragBarContainer;
    
    // Public Constants
    TYPE_VERTICAL = 'vertical';
    TYPE_HORIZONTAL = 'horizontal';

    constructor(config) {
        this.id = this._createUniqueId();
        this.type = config.type;
        

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

    init = () => {
        this._setLayout();
        this._createDragBar();
    }

    _setLayout = () => {
        // Get and create private objects
        this.#container = document.createElement('div');
        this.#dragBarContainer = document.createElement('div');
        this.panel1 = document.getElementById('panel1');
        this.panel2 = document.getElementById('panel2');
        const wrapper = this.#panel1.parentNode;

        // Append objects to wrapper and container
        wrapper.appendChild(this.#container);
        this.#container.appendChild(this.#panel1);
        this.#container.appendChild(this.#dragBarContainer);
        this.#container.appendChild(this.#panel2);

        // Set a unique id for object
        this.#container.id = this._createUniqueId();
        this.#dragBarContainer.id = this._createUniqueId();
        
        // Set style of object
        this.#container.classList.add('bvs-ctn', 'bvs-ctn-' + this._type);
        this.#dragBarContainer.classList.add('bvs-drb-ctn');
    }

    _createDragBar = () => {
    }

    _createUniqueId = () => {
        return Number(Math.random()).toString(32).substring(2);
    }
    
    on = () => {
        
    }
}