import { LinkedList } from "./LinkedList";

describe(module.id, () => {
    describe("High-level interface", () => {
        it("should add and remove items properly", () => {
            const ll = new LinkedList<number>();

            ll.push(1, 2, 3);

            const [a, b, c, ...rest1] = ll;
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            expect(rest1.length).toBe(0);
            expect(ll.length).toBe(3);

            ll.unshift(0);

            const [a2, b2, c2, d2, ...rest2] = ll;
            expect(a2).toBe(0);
            expect(b2).toBe(1);
            expect(c2).toBe(2);
            expect(d2).toBe(3);
            expect(rest2.length).toBe(0);
            expect(ll.length).toBe(4);

            ll.shift(2);

            const [a3, b3, ...rest3] = ll;
            expect(a3).toBe(2);
            expect(b3).toBe(3);
            expect(rest3.length).toBe(0);
            expect(ll.length).toBe(2);

            const [popped] = ll.pop(1);
            expect(popped).toBe(3);

            const [a4, ...rest4] = ll;
            expect(a4).toBe(2);
            expect(rest4.length).toBe(0);
            expect(ll.length).toBe(1);
        });

        it("should map properly", () => {
            const ll = new LinkedList(1, 2, 3, 4);
            const newList = ll.map((item) => item * item);
            const [a, b, c, d] = newList;
            expect(a).toBe(1);
            expect(b).toBe(4);
            expect(c).toBe(9);
            expect(d).toBe(16);
        });

        it("should pull to top properly", () => {
            const ll = new LinkedList(1, 2, 3, 4);
            ll.top(4, (a, b) => a == b);
            const [a, b, c, d] = ll;
            expect(a).toBe(4);
            expect(b).toBe(1);
            expect(c).toBe(2);
            expect(d).toBe(3);
        });

        it("should remove and reorder nodes properly", () => {
            const ll = new LinkedList();
            const n1 = ll.insertBack(0);
            const n2 = ll.insertBack(1);
            const n3 = ll.insertBack(2);
            const n4 = ll.insertBack(3);

            ll.topNode(n4);
            expect(ll.length).toBe(4);
            expect([...ll].length).toBe(4);
            expect([...ll]).toEqual([3, 0, 1, 2]);

            ll.bottomNode(n1);
            expect(ll.length).toBe(4);
            expect([...ll].length).toBe(4);
            expect([...ll]).toEqual([3, 1, 2, 0]);

            ll.removeNode(n2);
            expect(ll.length).toBe(3);
            expect([...ll].length).toBe(3);
            expect([...ll]).toEqual([3, 2, 0]);
        });
    });
});