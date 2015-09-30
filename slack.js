var Slack = require('slack-client');
 
var token = 'xoxb-10252562021-LrNmCNWXbVg4VWm2p1NGFPK0';
 
var slack = new Slack(token, true, true);
 
slack.on('open', function () {
    var channels = Object.keys(slack.channels)
        .map(function (k) { return slack.channels[k]; })
        .filter(function (c) { return c.is_member; })
        .map(function (c) { return c.name; });
 
    var groups = Object.keys(slack.groups)
        .map(function (k) { return slack.groups[k]; })
        .filter(function (g) { return g.is_open && !g.is_archived; })
        .map(function (g) { return g.name; });
 
    console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);
 
    if (channels.length > 0) {
        console.log('You are in: ' + channels.join(', '));
    }
    else {
        console.log('You are not in any channels.');
    }
 
    if (groups.length > 0) {
       console.log('As well as: ' + groups.join(', '));
    }
});
 
slack.login();

slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);
    if(message.channel=="D0A7EGJ13"){
	if(message.text=="status"||message.text=="system"){
		var txt = "System information as of ";
		var spawn = require('child_process').spawn,
			date = spawn('date');
		
		date.stdout.on('data', function(data){
			txt += data;
		});

		date.on('close', function (code) {
  			var spawn = require('child_process').spawn,
				landscape = spawn('landscape-sysinfo');

			landscape.stdout.on('data', function(data){
				txt += data;
			});

			landscape.on('close', function(code){
				channel.send(txt);
			});
		});
	}
	else if(message.text=="hi"||message.text=="hello"||message.text=="hey"){
		channel.send("Hi " + user.name + ", I'm Gitbot");
	}
	else{
		channel.send(message.text);
	}
    }
    else if(message.channel=="C0A5D3YCA"){
       if(message.text=="deez nuts hah got eem"){
        	channel.send(":deeznuts:");
       }
       else if(message.text=="deez nuts"){
                channel.send("hah. got eem :deeznuts:");
       }	
       else if(message.text=="pull"){
		channel.send('Stopping...');
		var spawn = require('child_process').spawn,
			stop = spawn('sudo',['forever','stop','test.js']);

		stop.on('close', function(code){
			channel.send('Pulling...');
			var spawn = require('child_process').spawn,
				git = spawn('git',['-C','/root/robotics-site','pull']);

			git.on('close', function(code){
				channel.send('Restarting...');
				var spawn = require('child_process').spawn,
					forever = spawn('sudo',['forever','start','test.js']);
			
				forever.on('close', function(code){
					channel.send('Git Pull Finished. :deeznuts:');
				});
			});
		});
	}
    }
    else{
	channel.send("deez nuts. hah got eem :deeznuts:");
    }
});
