const soapRequest = require('easy-soap-request')
const parser = require('fast-xml-parser')

exports.callWS = async (idCotacao) => {

	const envelope = (
    '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pub="http://publico.ws.casosdeuso.sgs.pec.bcb.gov.br">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
            '<pub:getUltimoValorXML soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                '<in0 xsi:type="xsd:long">'+ idCotacao +'</in0>' +
            '</pub:getUltimoValorXML>' +
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
		const xmlResp = (json
						['soapenv:Envelope']
						['soapenv:Body']
						['ns1:getUltimoValorXMLResponse']
						.getUltimoValorXMLReturn)
							.replace(/&lt;/g , '<' )
							.replace(/&gt;/g , '>' )
		const jsonResp = parser.parse(xmlResp)
		return parseFloat((jsonResp
				['resposta']
				['SERIE']
				['VALOR']).replace(',', '.'))
					
	}
	else
		return response.statusCode
}