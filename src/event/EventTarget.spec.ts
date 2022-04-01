import { GameEventType } from "./Event";
import { GameEventTarget } from "./EventTarget";

describe(module.id, () => {
    const TestEvent = new GameEventType<"test", { count: number }>("test");

    test("should call events", () => {
        const target = new GameEventTarget();
        let data = 0;

        target.listen(TestEvent, (event) => {
            data = event.data.count;
        });

        target.raise(TestEvent.with({ count: 1 }));
        expect(data).toBe(1);
    });

    test("should cancel events", () => {
        const target = new GameEventTarget();
        let data = 0;

        target.listen(TestEvent, (event) => {
            data = event.data.count;
            event.cancel();
        });

        target.listen(TestEvent, (event) => {
            data = -event.data.count;
        });

        target.raise(TestEvent.with({ count: 1 }));
        expect(data).toBe(1);
    });

    test("should stop propagating events", () => {
        const parent = new GameEventTarget();
        const target = new GameEventTarget(parent);
        let data = 0;

        target.listen(TestEvent, (event) => {
            data = event.data.count;
            event.stopPropagation();
        });

        target.listen(TestEvent, (event) => {
            data = -event.data.count;
        });

        parent.listen(TestEvent, (event) => {
            data *= event.data.count;
        });

        target.raise(TestEvent.with({ count: 2 }));
        expect(data).toBe(-2);
    });
});
