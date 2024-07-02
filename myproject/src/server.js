
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());


function generatePayload(schema, emails, tag,listid) {
    console.log("update",schema.update_existing)
    if(schema.type=="") {
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
                } else if (key === 'subscribe'){
                    entry[key] = [{listid}];}
                else {
                    entry[key] = schema.fields[key];
                }
            }
            return entry;
        }),
        ...(schema.update_existing !== undefined && { update_existing: schema.update_existing })
    };
}

app.post('/send-email', (req, res) => {
    const { clientschema, tag ,listid,emails,update_existing} = req.body;
    console.log("HERE",clientschema.fields.tags, emails,clientschema.fields.status,clientschema.update_existing)
    if (!clientschema) {
        return res.status(400).send({ error: 'Invalid request.' });
    }
    const payload = generatePayload(clientschema, emails, tag,listid);
    console.log("Payload:", JSON.stringify(payload));
    res.send(JSON.stringify(payload));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


  