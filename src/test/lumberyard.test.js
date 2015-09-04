import _Assert from 'assert';
import * as Tree from '../js/lumberyard';
import _Lo from 'lodash';
//import _Forage from 'localforage';

//let refEqual = _Assert.equal;
let valueEqual = _Assert.deepEqual;


describe('Treehouse', function() {

    describe('makeLog', () => {
        it('tree should have properties', () => {
            let now = Date.now();
            let l1 = Tree.makeLog("foo", now);
            let l2 = {name: "foo", length: 0, start_time: now, log: []};
            valueEqual(l1, l2);
        });
    });

    describe('forage Set', () => {
        it('tree should have properties', (done) => {
            // let cb = (e) => {
            //     console.log(e);
            //     done();
            // };
            //
            // _Forage.setItem('key', 'value', cb);

            _Ls.setItem('bgcolor', 'red');
            let b = _Ls.getItem('bgcolor');
            console.log(b);
            done();
        });
    });

    describe('push', () => {

        let now = Date.now();
        let l1 = Tree.makeLog("foo", now);

        it('should add the message to the log', () => {

            l1 = Tree.push("abc", ["foo", "bar"], {a: 5, b: 6}, l1);
            let l2 = {name: "foo", length: 1, start_time: now, log: [
                {
                    index: 0,
                    time_offset: l1.log[0].time_offset,
                    key: "abc",
                    tags: ["foo", "bar"],
                    message: {a: 5, b: 6}
                }
            ]};
            valueEqual(l1, l2);
        });
    });

    describe('get', () => {

        let now = Date.now();
        let l1 = Tree.makeLog("foo", now);
        l1 = Tree.push("abc", ["foo", "bar"], {a: 5, b: 6}, l1);

        it('should get the message from the log', () => {

            let m1 = Tree.get(0, l1);
            let m2 = {
                index: 0,
                time_offset: l1.log[0].time_offset,
                key: "abc",
                tags: ["foo", "bar"],
                message: {a: 5, b: 6}
            };

            valueEqual(m1, m2);
        });
    });


    describe('makeReader', () => {

        let now = Date.now();
        let l1 = Tree.makeLog("foo", now);
        l1 = Tree.push("abc", ["foo", "bar"], {a: 5, b: 6}, l1);

        it('create a reader object', () => {

            let r1 = Tree.makeReader();

            _Assert.ok(r1.id);
        });
    });

    describe('readNext', () => {

        let now = Date.now();
        let l1 = Tree.makeLog("foo", now);
        l1 = Tree.push("abc", ["foo", "bar"], {a: 5, b: 6}, l1);
        let r1 = Tree.makeReader();
        it('read the next message according to the reader index', () => {

            let m = Tree.readNext(r1, l1);
            //console.log(m);
            valueEqual(m.message, {a: 5, b: 6});
        });
    });

    describe('compactByKey', () => {

        let l1 = Tree.makeLog("foo");
        let r1 = Tree.makeReader();
        l1 = Tree.push("key1", ["foo", "bar"], {a: 5, b: 6}, l1);
        l1 = Tree.push("key2", ["foo", "bar"], {a: 7, b: 7}, l1);
        l1 = Tree.push("key3", ["foo", "bar"], {a: 3, b: 3}, l1);
        l1 = Tree.push("key1", ["foo", "bar"], {a: 4, b: 1}, l1);

        it('replace duplicate keys with null', () => {

            l1 = Tree.compactByKey(l1);
            valueEqual(l1.log[0], null);
            let messages = _Lo.filter(l1.log, (m) => {
                if(m === null) {
                    return false;
                }
                return true;
            });
            valueEqual(messages.length, 3);
        });

        it('readNextNotNull(reader, t)', () => {

            let m1 = Tree.readNextNotNull(r1, l1);
            valueEqual(m1.key, "key2");
        });
    });
});
