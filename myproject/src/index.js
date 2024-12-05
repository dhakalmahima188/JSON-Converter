const  { Router } = require('cloudworker-router') ;
const router = new Router();

function generatePayload(schema, emails, tag, listid) {
    console.log("update", schema.update_existing)
    if (schema.type == "") {
        return emails.map(email => ({ email }));
    }
    return {
        [schema.type]: emails.map(email => {
            let entry = {};
            for (const key in schema.fields) {
                if (key === 'email' || key === 'email_address') {
                    entry[key] = email;
                } else if (key === 'tag') {
                    entry[key] = [tag];
                } else if (key === 'subscribe') {
                    entry[key] = [{listid}];
                } else {
                    entry[key] = schema.fields[key];
                }
            }
            return entry;
        }),
        ...(schema.update_existing !== undefined && { update_existing: schema.update_existing })
    };
}

router.get('/', () => {
	return new Response("Hello, welcome to the API! - mahima");
  }); 

router.post('/send-email', async ({ request }) => {
    try {
        const { clientschema, tag, listid, emails, update_existing } = await request.json();
        console.log("HERE", clientschema.fields.tags, emails, clientschema.fields.status, clientschema.update_existing);
        if (!clientschema) {
            return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 });
        }
        const payload = generatePayload(clientschema, emails, tag, listid);
        console.log("Payload:", JSON.stringify(payload));
        return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to parse JSON.' }), { status: 400 });
    }
});


router.post('/parseData', async ({ request }) => {
    try {
        const { emails } = await request.json();
   
        if (!emails) {
            return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 });
        }
        const parsedEmails = JSON.parse(emails)
        const emailList  = parsedEmails.map(item => item.email[0]);
        console.log("Payload:", emailList);
        return new Response(JSON.stringify(emailList), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to parse JSON.' }), { status: 400 });
    }
});



addEventListener('fetch', event => {
    event.respondWith(router.handle(event.request));
});
