class Splitter {
    
    constructor(config) {
        this.type = config.type || "vertical";
        this.min = config.min || { unit: ["%", "%"], size: [20, 20] };
        this.cookie = config.cookie || false;

        this.#firstPanel = document.getElementById('firstPanel');
        this.#secondPanel = document.getElementById('secondPanel');
    }

    get type() { return this._type; }
    set type(value) {
        if (typeof value !== 'string' || (value !== 'vertical' && value !== 'horizontal')) {
            throw new Error('Invalid Splitter Type.\nPlease set it in \'vertical\' or \'horizontal\'.');
        } else {
            this._type = value; 
        }
    }
    get min() { return this._minSize; }
    set min(value) {
        let unit = value.unit;
        if (unit) {
            if (Array.isArray(unit)) {
                for (let u of unit) {
                    if (u !== 'px' && u !== '%' && u !== 'vw' && u !== 'vh') {
                        throw new Error('Invalid Splitter Minimum Size Unit.\nPlease set it in \'px\', \'%\', \'vw\' or \'vh\'');
                    }
                }
            } else {
                if (unit !== 'px' && unit !== '%' && unit !== 'vw' && unit !== 'vh') {
                    throw new Error('Invalid Splitter Minimum Size Unit.\nPlease set it in \'px\' or \'%\', \'vw\' or \'vh\'');
                }
            }
        }

        let size = value.size;
        if (size) {
            if (Array.isArray(size)) {
                for (let s of size) {
                    if (typeof s !== 'number') {
                        throw new Error('Invalid Splitter Minimum Size.\nPlease set it in number type');
                    }
                }
            } else {
                if (typeof size !== 'number') {
                    throw new Error('Invalid Splitter Minimum Size.\nPlease set it in number type');
                }
            }
        }

        this._min = value;
    }
    get cookie() { return this._cookie; }
    set cookie(value) {
        if (typeof value !== 'boolean') {
            throw new Error('Invalid Splitter Cookie Value.\nPlease set it in true or false.');
        } else {
            this._cookie = value;
        }
    }
    get #firstPanel() { return this._firstPanel; }
    set #firstPanel(value) {
        if (!value) {
            throw new Error('Object with id=\'firstPanel\' does not exist.');
        } else {
            this._firstPanel = value;
        }
    }
    get #secondPanel() { return this._secondPanel; }
    set #secondPanel(value) {
        if (!value) {
            throw new Error('Object with id=\'secondPanel\' does not exist.');
        } else {
            this._secondPanel = value;
        }
    }

    init() {
        this.#createContainer();
    }

    #createContainer() {
        if (this.#firstPanel.parentNode !== this.#secondPanel.parentNode) {
            throw new Error('The first panel and the second panel must be at the same depth.');
        }
        
        const wrapper = this.#firstPanel.parentNode;
        const container = document.createElement('div');
        
        wrapper.appendChild(container);
        container.appendChild(this.#firstPanel);
        container.appendChild(this.#secondPanel);
        container.id = 'panelContainer';
        container.classList.add(this.type);
    }
    
    on() {

    }
}