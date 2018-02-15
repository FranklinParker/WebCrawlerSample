const Sequelize = require('sequelize');
const sequelize = new Sequelize('compose', 'admin', 'ARJKDCRVIPIGPLAG', {
	host: 'sl-us-south-1-portal.20.dblayer.com',
	dialect: 'postgres',
	port: 34751,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	// SQLite only
	//storage: 'path/to/database.sqlite',

	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
	operatorsAliases: false
});

const SapGlossary = sequelize.define('SapGlossary', {
	//username: {type: Sequelize.STRING, unique: true},
	name: Sequelize.STRING,
	term: Sequelize.STRING,
	softwareComponent: Sequelize.STRING,
	text: Sequelize.STRING,
	url: Sequelize.STRING

});

var insertSapGlossary = (sapGloss) => {
	return sequelize.sync()
		.then(() => SapGlossary.create({
			url: sapGloss.url,
			name: sapGloss.name,
			term: sapGloss.term,
			softwareComponent: sapGloss.softwareComponent,
			text: sapGloss.text

		}))
		.then(sapGlossary => {
			//console.log(sapGlossary.toJSON());
			return sapGlossary;
		}, err => console.log(JSON.stringify(err, null, 2)));

}

insertSapGlossary({
	url: "https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/8a/02cb8a77ddd31184080004aca6e0d1/content.htm",
	name: "tracking point (SCM-APO-PPS-AHT)",
	term: "Action Handler -  Tracking ",
	softwareComponent: "SCM-APO-PPS-AHT",
	text: "Point on a production line or at a work center at which an event is triggered.This event can be linked to a receiver action via event type linkage.\r\n This action is then carried out when the event occurs.",
}).then(sapGlossary => console.log('insert is done:'+ JSON.stringify(sapGlossary,null,2 )));
