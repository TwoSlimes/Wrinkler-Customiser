	Game.registerMod("wrinklerCustomiser",{
		init:function(){
			Game.registerHook("check", this.unlockUpgrades);
			Game.getWrinklersMax=function(){return Game.mods.wrinklerCustomiser.wrinklerCount};
			new Game.Upgrade('Wrinkler Customiser','Allows you to customise how many wrinklers you have, what type they are, and how frequently shiny wrinklers spawn.',0,[19,8],function(){
				Game.Upgrades['Wrinkler Customiser'].bought=0;
				Game.Prompt('<h3>Customise Your Wrinklers</h3>'+
					'<div class="line"></div>'+
					'<div style="text-align:center;">'+
					'<h4>Wrinkler Type</h4><br>'+
					'<label for="normalSelect">Normal</label><input type="radio" name="wrinklerType" id="normalSelect" style="width:15px; margin-left:5px; margin-right:5px">'+
					'<label for="normalSelect">Shiny</label><input type="radio" name="wrinklerType" id="shinySelect" style="width:15px; margin-left:5px; margin-right:5px;">'+
					'<label for="normalSelect">Mixed</label><input type="radio" name="wrinklerType" id="mixedSelect" style="width:15px; margin-left:5px; margin-right:5px;" checked="true"><br>'+
					'<div class="line"></div>'+
					'<label for"wrinklerCount">Number of Wrinklers:</label><input type="number" id="wrinklerCount" value="14" style="left:3px;width:50px;height:15px;border-radius:4px;box-shadow:0px 0px 0px 1px rgba(0,0,0,0.5) inset,0px 1px 2px rgba(0,0,0,0.5) inset;"><br>'+
					'<label for"shinyChance">Chance for a Shiny:</label><input type="number" id="shinyChance" style="left:3px;width:50px;height:15px;border-radius:4px;box-shadow:0px 0px 0px 1px rgba(0,0,0,0.5) inset,0px 1px 2px rgba(0,0,0,0.5) inset;"><br>'+
					'<label for"winklerSwitch">Winklers:</label><input type="checkbox" id="winklerSwitch" style="left:3px;width:20px;height:15px;border-radius:4px;box-shadow:0px 0px 0px 1px rgba(0,0,0,0.5) inset,0px 1px 2px rgba(0,0,0,0.5) inset;">'+
					'<div class="line"></div>'+
					'<div class=optionBox"><a class="option focused" onclick="PlaySound(\'snd/tick.mp3\');Game.mods.wrinklerCustomiser.updateWrinklerCount()">Spawn Wrinklers</a></div>'+
					'','');
			});
			Game.Upgrades['Wrinkler Customiser'].order=16000;
			Game.Upgrades['Wrinkler Customiser'].pool='toggle';
			LocalizeUpgradesAndAchievs();
		},
		wrinklerCount:Game.wrinklerLimit,
		shinyChance:0.0001,
		decideWrinklerType:function(){
		if (Math.random()<Game.mods.wrinklerCustomiser.shinyChance) {return 1} else {return 0}
		},
		updateWrinklerCount:function() {
			
		let count = Number(document.getElementById('wrinklerCount').value);
		let chance = Number(document.getElementById('shinyChance').value);
		if (chance == '') {chance = 0.0001}
		if (document.getElementById('normalSelect').checked == true) {chance = 0}
		if (document.getElementById('shinySelect').checked == true) {chance = 1}
		if (document.getElementById('winklerSwitch').checked == true) {Game.WINKLERS=1} else {Game.WINKLERS=0}
		if (count != '') {
			Game.mods.wrinklerCustomiser.wrinklerCount = count
		}
		
		Game.mods.wrinklerCustomiser.shinyChance = chance
		eval('Game.SpawnWrinkler='+Game.SpawnWrinkler.toString().replace('0.0001','Game.mods.wrinklerCustomiser.shinyChance'));
		Game.wrinklers=[];
		for (let i=0;i<Game.mods.wrinklerCustomiser.wrinklerCount;i++)
			{
				Game.wrinklers.push({id:parseInt(i),close:0,sucked:0,phase:0,x:0,y:0,r:0,hurt:0,hp:Game.wrinklerHP,selected:0,type:Game.mods.wrinklerCustomiser.decideWrinklerType(),clicks:0});
			};
		console.log(Game.wrinklers);
		Game.ClosePrompt()
		},
	unlockUpgrades: function(){
		Game.Upgrades['Wrinkler Customiser'].unlocked=1
	},
	save: function(){},
    load: function(){},
	})
