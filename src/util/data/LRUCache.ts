import { LinkedList, LinkedNode } from "./LinkedList";

export class LRUCache<KeyType, ValueType> {
    private list: LinkedList<KeyType> = new LinkedList();
    private values: Map<KeyType, ValueType> = new Map();
    private nodes: Map<KeyType, LinkedNode<KeyType>> = new Map();

    constructor(private readonly capacity = Infinity, private readonly onDestroy?: (key: KeyType, value: ValueType) => void) { }

    public set(key: KeyType, value: ValueType) {
        const oldValue = this.nodes.get(key);
        if (oldValue) {
            this.list.removeNode(oldValue);
        }
        this.values.set(key, value);
        const node = this.list.insertFront(key);
        this.nodes.set(key, node);

        while (this.list.size() > this.capacity) {
            const node = this.list.getTail();
            if (node) {
                const key = node.data;
                console.log(`Deleting ${key} due to length`);
                const value = this.values.get(node.data);
                this.list.removeNode(node);
                this.values.delete(key);
                this.nodes.delete(key);
                if (value) {
                    this.onDestroy?.(key, value);
                }
            }
        }
        this.print();
    }

    public print() {
        this.list.print();
    }

    public get(key: KeyType): ValueType | undefined {
        const node = this.nodes.get(key);
        if (node) {
            const newNode = this.list.topNode(node);
            this.nodes.set(key, newNode);
            this.print();
            return this.values.get(key);
        }
        return undefined;
    }
}