export default class Tracer {

    static calls = {};

    static register(call) {
        if (!Tracer.calls[call]) Tracer.calls[call] = true;
    }

    static print(call, msg) {
        if (Tracer.calls[call]) console.log(msg);
    }

    static error(call, error) {
        if (Tracer.calls[call]) {
            const { name, message } = error
            console.error(name);
            console.error(message);
        }
    }
}