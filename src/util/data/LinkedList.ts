export class LinkedList<ItemType> {
    private _head?: LinkedNode<ItemType>;
    private _tail?: LinkedNode<ItemType>;
    private _length = 0;

    constructor(...items: ItemType[]) {
        this.push(...items);
    }

    public push(...items: ItemType[]) {
        for (const item of items) {
            this.insertBack(item);
        }
    }

    public unshift(...items: ItemType[]) {
        for (const item of items) {
            this.insertFront(item);
        }
    }

    public shift(count = 1): ItemType[] {
        const results: ItemType[] = [];
        for (let i = 0, current = this._head; i < count && current; i++, current = current?.next, this._head = current) {
            results.push(current.data);
            this._length--;
            if (current.next) {
                current.next.previous = undefined;
            }
        }
        return results;
    }

    public pop(count = 1): ItemType[] {
        const results: ItemType[] = [];
        for (let i = 0, current = this._tail; i < count && current; i++, current = current?.previous, this._tail = current) {
            results.push(current.data);
            this._length--;
            if (current.previous) {
                current.previous.next = undefined;
            }
            current.previous = undefined;
            current.next = undefined;
        }
        return results;
    }

    public forEach(fn: (item: ItemType, index: number) => void) {
        for(let i = 0, curr = this._head; curr != undefined; curr = curr.next, i++) {
            fn(curr.data, i);
        }
    }

    public map<MappedType>(fn: (item: ItemType, index: number) => MappedType): LinkedList<MappedType> {
        const res = new LinkedList<MappedType>();
        for(let i = 0, curr = this._head; curr != undefined; curr = curr.next, i++) {
            res.push(fn(curr.data, i));
        }
        return res;
    }

    /**
     * Finds the first instance of a given value and moves it to the top of the list.
     */
    public top(value: ItemType, eq: (a: ItemType, b: ItemType) => boolean) {
        for(let curr = this._head; curr != undefined; curr = curr.next) {
            if (eq(curr.data, value)) {
                this.topNode(curr);
            }
        }
    }

    /**
     * Finds the first instance of a given value and moves it to the bottom of the list.
     */
    public bottom(value: ItemType, eq: (a: ItemType, b: ItemType) => boolean) {
        for(let curr = this._head; curr != undefined; curr = curr.next) {
            if (eq(curr.data, value)) {
                this.bottomNode(curr);
            }
        }
    }

    public clear() {
        this._head = undefined;
        this._tail = undefined;
        this._length = 0;
    }

    public insertBack(item: ItemType): LinkedNode<ItemType> {
        const node = new LinkedNode(item, this._tail);
        if (!this._head) {
            this._head = node;
        }
        if (this._tail) {
            this._tail.next = node;
            node.previous = this._tail;
        }
        this._tail = node;
        this._length++;
        return node;
    }

    public insertFront(item: ItemType): LinkedNode<ItemType> {
        const node = new LinkedNode(item, this._tail);
        if (!this._tail) {
            this._tail = node;
        }
        if (this._head) {
            this._head.previous = node;
            node.next = this._head;
        }
        this._head = node;
        this._length++;
        return node;
    }

    public removeNode(node: LinkedNode<ItemType>) {
        if (this._tail == node) {
            this._tail = node.previous;
        }
        if (this._head == node) {
            this._head = node.next;
        }
        const next = node.next;
        const prev = node.previous;
        if (next) {
            next.previous = node.previous;
        }
        if (prev) {
            prev.next = node.next;
        }
        node.next = undefined;
        node.previous = undefined;
        this._length--;
    }

    public topNode(node: LinkedNode<ItemType>) {
        this.removeNode(node);
        return this.insertFront(node.data);
    }

    public bottomNode(node: LinkedNode<ItemType>) {
        this.removeNode(node);
        return this.insertBack(node.data);
    }

    public getHead() {
        return this._head;
    }

    public getTail() {
        return this._tail;
    }

    public [Symbol.iterator]() {
        let current = this._head;
        return {
            next: () => {
                const res = {
                    value: current?.data,
                    done: current == undefined
                }; 
                current = current?.next;
                return res;
            }
        };
    }

    public get length() {
        return this._length
    }
}

export class LinkedNode<T> {
    constructor(public data: T, public previous?: LinkedNode<T>, public next?: LinkedNode<T>) { }
}