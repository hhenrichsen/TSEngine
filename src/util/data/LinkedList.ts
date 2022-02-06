export class LinkedList<ItemType> {
    private head?: LinkedNode<ItemType>;
    private tail?: LinkedNode<ItemType>;
    private length = 0;

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
        for (let i = 0, current = this.head; i < count && current; i++, current = current?.next, this.head = current) {
            results.push(current.data);
            this.length--;
            if (current.next) {
                current.next.previous = undefined;
            }
        }
        return results;
    }

    public pop(count = 1): ItemType[] {
        const results: ItemType[] = [];
        for (let i = 0, current = this.tail; i < count && current; i++, current = current?.previous, this.tail = current) {
            results.push(current.data);
            this.length--;
            if (current.previous) {
                current.previous.next = undefined;
            }
            current.previous = undefined;
            current.next = undefined;
        }
        return results;
    }

    public forEach(fn: (item: ItemType, index: number) => void) {
        for(let i = 0, curr = this.head; curr != undefined; curr = curr.next, i++) {
            fn(curr.data, i);
        }
    }

    public map<MappedType>(fn: (item: ItemType, index: number) => MappedType): LinkedList<MappedType> {
        const res = new LinkedList<MappedType>();
        for(let i = 0, curr = this.head; curr != undefined; curr = curr.next, i++) {
            res.push(fn(curr.data, i));
        }
        return res;
    }

    /**
     * Finds the first instance of a given value and moves it to the top of the list.
     */
    public top(value: ItemType, eq: (a: ItemType, b: ItemType) => boolean) {
        for(let curr = this.head; curr != undefined; curr = curr.next) {
            if (eq(curr.data, value)) {
                this.topNode(curr);
            }
        }
    }

    /**
     * Finds the first instance of a given value and moves it to the bottom of the list.
     */
    public bottom(value: ItemType, eq: (a: ItemType, b: ItemType) => boolean) {
        for(let curr = this.head; curr != undefined; curr = curr.next) {
            if (eq(curr.data, value)) {
                this.bottomNode(curr);
            }
        }
    }

    public insertBack(item: ItemType): LinkedNode<ItemType> {
        const node = new LinkedNode(item, this.tail);
        if (!this.head) {
            this.head = node;
        }
        if (this.tail) {
            this.tail.next = node;
            node.previous = this.tail;
        }
        this.tail = node;
        this.length++;
        return node;
    }

    public insertFront(item: ItemType): LinkedNode<ItemType> {
        const node = new LinkedNode(item, this.tail);
        if (!this.tail) {
            this.tail = node;
        }
        if (this.head) {
            this.head.previous = node;
            node.next = this.head;
        }
        this.head = node;
        this.length++;
        return node;
    }

    public removeNode(node: LinkedNode<ItemType>) {
        if (this.tail == node) {
            this.tail = node.previous;
        }
        if (this.head == node) {
            this.head = node.next;
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
        this.length--;
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
        return this.head;
    }

    public getTail() {
        return this.tail;
    }

    public [Symbol.iterator]() {
        let current = this.head;
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

    public size() {
        return this.length;
    }
}

export class LinkedNode<T> {
    constructor(public data: T, public previous?: LinkedNode<T>, public next?: LinkedNode<T>) { }
}