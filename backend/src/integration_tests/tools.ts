
export default async function assert(request: {path: string, method: string, user?: string, body?: object | string}, 
    expected: {status: number, body?: object | string},
    dependency?: {passed: boolean, res?: Response} | Promise<{passed: boolean, res?: Response}>): Promise<{passed: boolean, res: Response | null}> {

    process.stdout.write(`Testing route ${request.method} ${request.path} expecting: ${expected.status}... `);

    // @ts-expect-error
    if (dependency && dependency['then'] != undefined) dependency = await dependency;

    // @ts-expect-error
    if (dependency && !dependency.passed) {
        console.log(' dependency failed', 'color: red;');
        return {passed: false, res: null}
    }

    try {
    const headers: any = {}
    switch (typeof request.body) {
        case 'undefined':
        case 'string':
        case 'object':
            request.body = JSON.stringify(request.body);
            headers['Content-Type'] = 'application/json';
        default:
            request.body = String(request.body);
    }

    switch (typeof expected.body) {
        case 'undefined':
        case 'string':
        case 'object':
            expected.body = JSON.stringify(expected.body);
        default:
            expected.body = String(expected.body);
    }

    const res = await fetch('localhost:443/api/v1'+request.path,
        {
            method: 'POST',
            body: request.body as string,
            headers: headers
        });
    
    if (res.status != expected.status) {
        console.log(' failed', 'color: red;');
        console.log(`Incorrect status: `+res.status);
        return {passed: false, res: res};
    }

    if (typeof expected.body === 'string' && await res.text() != expected.body) {
        console.log(' failed', 'color: red;');
        console.log(`Returned data doesn't match expected: `+ await res.text());
        return {passed: false, res: res};
    }

    const body: string = await res.json();
    for (let key of Object.keys(expected.body)) {
        // @ts-ignore
        if (body[key] !== expected.body[key]) {
            console.log(' failed', 'color: red;');
            // @ts-ignore
            console.log(`Returned data doesn\'t match expected: ${key} field data mismatch ${body[key]} != ${expected.body[key]} (expected)`);
            return {passed: false, res: res};
        }
    }

    console.log(' passed', 'color: green;');
    return {passed: true, res: res};
    
    } catch (e) {
        console.log(' failed', 'color: red;');
        console.log(e);
        return {passed: false, res: null};
    }
}


