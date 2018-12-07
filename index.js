const getValor = require('./methods/getValor')
const getUltimoValorXML = require('./methods/getUltimoValorXML')
const csv = require('./methods/csv')

const d = new Date()
const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
const date = d.toLocaleDateString('pt-BR', options)
let quotation = null

if(d.getDay() == 0 || d.getDay() == 6){

}else{
	getValor.callWS(1, '06/12/2018')
		.then(result => quotation = result)
		.then(result => csv.writeData(`${quotation},${date}`))
}

