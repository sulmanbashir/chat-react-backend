const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pusher = new Pusher({
	appId: '512092',
	key: 'ecf7d04f686fb58cb8d9',
	secret: '5985b8710bb5b322d3ae',
	cluster: 'eu',
	encrypted: true
    });

app.set('PORT', process.env.PORT || 5000);

app.get('/', function(req, res){
console.log("HOMEPAGE");
res.sendFile(__dirname+'/index.html')
});

app.post('/message', (req, res) => {
	const payload = req.body;
	pusher.trigger(payload.channel, 'message', payload);
	res.send(payload)
    });


app.listen(app.get('PORT'), () =>
	   console.log('Listening at ' + app.get('PORT')))