const fs = require('fs')

exports.writeData = (data) => {
	fs.writeFile('teste.csv', data, 'utf8', (err) => {
		err
		? console.log('Some error occured - file either not saved or corrupted file saved.')
		: console.log('It\'s saved!');
	})
}