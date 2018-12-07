const soapRequest = require('easy-soap-request')
const parser = require('fast-xml-parser')

exports.callWS = async (idCotacao, data) => {

	const envelope = (
    '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pub="http://publico.ws.casosdeuso.sgs.pec.bcb.gov.br">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
            '<pub:getValor soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                '<in0 xsi:type="xsd:long">'+ idCotacao +'</in0>' +
                '<in1 xsi:type="xsd:string">'+ data +'</in1>' +
            '</pub:getValor>' +
        '</soapenv:Body>' +
    '</soapenv:Envelope>')

    const soapAction = ''
	const soapContent = 'text/xml; charset=utf-8'

	const url = 'https://www3.bcb.gov.br/wssgs/services/FachadaWSSGS'
	const headers = {
	  'Content-Type': soapContent,
	  'soapAction': soapAction
	}

	const { response } = await soapRequest(url, headers, envelope)
	const { body, statusCode } = response
	if(statusCode == 200){
		const json = parser.parse(body)
		return parseFloat(json
				['soapenv:Envelope']
				['soapenv:Body']
				.multiRef)

	}
	else
		return response.statusCode
}