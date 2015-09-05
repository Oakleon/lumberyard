
/*eslint-disable */
export function uuid(a,b) {for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}
/*eslint-enable */

export function makeLog(name, start_time = Date.now()) {
    return {name: name, start_time: start_time, length: 0, log: []};
}

export function push(key, tags, message, t) {

    key = key || uuid();

    let line = {
        time_offset: Date.now() - t.start_time,
        index: t.length,
        key: key,
        tags: tags,
        message: message
    };

    t.length += 1;

    t.log.push(line);
    return t;
}

export function get(index, t) {
    return t.log[index];
}

export function makeReader(id = uuid()){
    return {id, read_index: -1};
}

export function readNext(reader, t) {
    if(t.length <= reader.read_index) {
        return false;
    }

    reader.read_index += 1;
    let m = get(reader.read_index, t);
    return m;
}

export function readNextNotNull(reader, t) {
    let m = null;
    while(m === null) {
        m = readNext(reader, t);
    }
    return m;
}


export function read(reader, how_many, t) {
    let messages = [];

    while (messages.length < how_many) {
        let m = readNextNotNull(reader, t);
        if(!m) break;
        messages.push(m);
    }

    return messages;
}

export function compactByKey(t) {
    let has_key = {};
    let log = t.log;
    for(let i = log.length - 1; i >= 0; i--) {
        let k = log[i].key;
        if(has_key[k]) {
            log[i] = null;
        }

        has_key[k] = true;
    }

    return t;
}
